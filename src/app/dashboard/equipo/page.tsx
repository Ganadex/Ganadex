import { requireAdmin } from "@/lib/permissions";
import { createAdminClient } from "@/lib/supabase/admin";
import { TeamManager, type TeamMember } from "@/components/dashboard/TeamManager";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Equipo — Ganadex" };

export default async function EquipoPage() {
  await requireAdmin();

  const { data } = await createAdminClient()
    .from("profiles")
    .select("id, email, full_name, role, permisos")
    .order("created_at", { ascending: false });

  const members: TeamMember[] = (data ?? [])
    .filter((p) => p.role !== "admin" && (p.permisos ?? []).length > 0)
    .map((p) => ({
      id: p.id,
      email: p.email,
      fullName: p.full_name ?? "",
      permisos: p.permisos ?? [],
    }));

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Equipo</h1>
        <p className="text-dark-400 text-sm mt-1">
          Crea usuarios para tu equipo y elige a qué secciones tienen acceso.
        </p>
      </div>
      <TeamManager members={members} />
    </div>
  );
}
