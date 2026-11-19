import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { PublishAnimalForm } from "@/components/dashboard/PublishAnimalForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar publicación" };

export default async function EditAnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: seller } = await supabase
    .from("vendedores")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!seller) redirect("/dashboard");

  // Solo puede editar el dueño: si el animal no es suyo, se muestra 404.
  const { data: animal } = await supabase
    .from("ganado")
    .select("*")
    .eq("id", id)
    .eq("vendedor_id", seller.id)
    .single();

  if (!animal) notFound();

  const [{ data: breeds }, { data: images }] = await Promise.all([
    supabase.from("razas").select("*").order("nombre"),
    supabase
      .from("imagenes_ganado")
      .select("id, url")
      .eq("ganado_id", id)
      .order("orden"),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1">Editar publicación</h1>
        <p className="text-dark-400 text-sm">{animal.nombre}</p>
      </div>
      <PublishAnimalForm
        sellerId={seller.id}
        breeds={breeds ?? []}
        initialData={animal}
        animalId={animal.id}
        initialStatus={animal.status}
        existingImages={images ?? []}
      />
    </div>
  );
}
