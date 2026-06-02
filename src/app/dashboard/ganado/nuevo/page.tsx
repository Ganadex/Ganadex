import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PublishAnimalForm } from "@/components/dashboard/PublishAnimalForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nueva publicación" };

export default async function NewAnimalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: seller } = await supabase
    .from("vendedores")
    .select("id")
    .eq("user_id", user!.id)
    .single();

  if (!seller) redirect("/dashboard");

  const { data: breeds } = await supabase
    .from("razas")
    .select("*")
    .order("nombre");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1">Nueva publicación</h1>
        <p className="text-dark-400 text-sm">Publica un nuevo ejemplar en Ganadex</p>
      </div>
      <PublishAnimalForm sellerId={seller.id} breeds={breeds ?? []} />
    </div>
  );
}
