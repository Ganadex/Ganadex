import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SellerProfileForm } from "@/components/dashboard/SellerProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Crear perfil de vendedor — Ganadex" };

export default async function NuevoVendedorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: existing } = await supabase
    .from("vendedores")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existing) redirect("/dashboard/perfil");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Crear perfil de vendedor</h1>
        <p className="text-dark-400 text-sm mt-1">
          Esta información es interna — los compradores solo verán el ganado que publiques.
        </p>
      </div>
      <SellerProfileForm userId={user.id} />
    </div>
  );
}
