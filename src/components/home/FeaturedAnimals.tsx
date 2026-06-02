import Link from "next/link";
import { AnimalCard } from "@/components/catalog/AnimalCard";
import { createClient } from "@/lib/supabase/server";
import type { Animal } from "@/types";

export async function FeaturedAnimals() {
  const supabase = await createClient();

  const { data: animals } = await supabase
    .from("ganado")
    .select(
      `*,
      breed:razas(*),
      seller:vendedores(nombre_completo, ubicacion, estado, verificado),
      images:imagenes_ganado(url, es_portada, orden)`
    )
    .eq("status", "disponible")
    .eq("destacado", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (!animals || animals.length === 0) return null;

  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Destacados
            </p>
            <h2 className="section-heading text-white">
              Ejemplares de élite
            </h2>
          </div>
          <Link
            href="/ganado"
            className="hidden sm:flex items-center gap-2 text-gold-500 hover:text-gold-400 text-sm font-semibold transition-colors"
          >
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal as unknown as Animal} />
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link href="/ganado" className="btn-outline-gold inline-block text-sm">
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
