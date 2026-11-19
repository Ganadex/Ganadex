import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SellerProfileForm, type SellerData } from "@/components/dashboard/SellerProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mi perfil — Ganadex" };

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Los datos privados (documento, teléfono, correo) solo se leen con esta función,
  // que devuelve únicamente la fila del usuario con sesión iniciada.
  const { data: seller } = await supabase.rpc("get_my_seller").single();

  if (!seller) redirect("/dashboard/vendedor/nuevo");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Mi perfil</h1>
        <p className="text-dark-400 text-sm mt-1">
          Información interna de tu cuenta de vendedor. No es visible para los compradores.
        </p>
      </div>
      <SellerProfileForm userId={user.id} initialData={seller as SellerData} />
    </div>
  );
}
