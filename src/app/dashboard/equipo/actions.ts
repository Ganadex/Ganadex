"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAccess } from "@/lib/permissions";
import { TEAM_SECTION_KEYS } from "@/lib/team-sections";

type Result = { ok: true } | { ok: false; error: string };

async function assertAdmin(): Promise<string | null> {
  const access = await getAccess();
  return access?.isAdmin ? null : "No autorizado";
}

function cleanPermisos(permisos: string[]) {
  return Array.from(new Set(permisos)).filter((p) => TEAM_SECTION_KEYS.includes(p));
}

export async function createTeamMember(input: {
  email: string;
  password: string;
  fullName: string;
  permisos: string[];
}): Promise<Result> {
  const denied = await assertAdmin();
  if (denied) return { ok: false, error: denied };

  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const permisos = cleanPermisos(input.permisos);

  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Correo inválido" };
  if (input.password.length < 8) return { ok: false, error: "La contraseña debe tener al menos 8 caracteres" };
  if (permisos.length === 0) return { ok: false, error: "Selecciona al menos una sección" };

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: input.password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });
  if (error || !data.user) {
    return { ok: false, error: error?.message ?? "No se pudo crear el usuario" };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .upsert({ id: data.user.id, email, full_name: fullName || null, permisos });
  if (profileError) return { ok: false, error: profileError.message };

  revalidatePath("/dashboard/equipo");
  return { ok: true };
}

export async function updateTeamMemberAccess(input: {
  userId: string;
  permisos: string[];
}): Promise<Result> {
  const denied = await assertAdmin();
  if (denied) return { ok: false, error: denied };

  const { error } = await createAdminClient()
    .from("profiles")
    .update({ permisos: cleanPermisos(input.permisos) })
    .eq("id", input.userId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/equipo");
  return { ok: true };
}
