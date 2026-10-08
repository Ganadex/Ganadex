import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TEAM_SECTIONS, TEAM_SECTION_KEYS } from "@/lib/team-sections";

export async function getAccess() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, permisos")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const permisos: string[] = isAdmin
    ? TEAM_SECTION_KEYS
    : (profile?.permisos ?? []).filter((p: string) => TEAM_SECTION_KEYS.includes(p));

  return {
    user,
    isAdmin,
    permisos,
    sections: TEAM_SECTIONS.filter((s) => permisos.includes(s.key)),
  };
}

export async function requireAdmin() {
  const access = await getAccess();
  if (!access) redirect("/auth/login?redirect=/dashboard");
  if (!access.isAdmin) redirect("/dashboard");
  return access;
}

export async function requireSection(key: string) {
  const access = await getAccess();
  if (!access) redirect("/auth/login?redirect=/dashboard");
  if (!access.permisos.includes(key)) redirect("/dashboard");
  return access;
}
