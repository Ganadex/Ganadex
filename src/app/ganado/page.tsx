import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { AnimalGrid } from "@/components/catalog/AnimalGrid";
import { Pagination } from "@/components/catalog/Pagination";
import { RacesBanner } from "@/components/catalog/RacesBanner";
import type { Animal, Breed } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Ganado",
  description: "Explora todos los ejemplares disponibles en Ganadex. Ganado de leche, carne y doble propósito de alta genética.",
};

const PAGE_SIZE = 12;

interface SearchParams {
  page?: string;
  categoria?: string;
  sexo?: string;
  raza?: string;
  precio_min?: string;
  precio_max?: string;
  edad_min?: string;
  edad_max?: string;
  estado?: string;
}

async function CatalogContent({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const page = Math.max(1, parseInt(searchParams.page ?? "1"));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("ganado")
    .select(
      `*, breed:razas(*), seller:vendedores(id, nombre_completo, ubicacion, estado, verificado),
      images:imagenes_ganado(url, es_portada, orden)`,
      { count: "exact" }
    )
    .eq("status", "disponible")
    .order("destacado", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (searchParams.categoria) query = query.eq("categoria", searchParams.categoria);
  if (searchParams.sexo) query = query.eq("sexo", searchParams.sexo);
  if (searchParams.raza) query = query.eq("raza_id", searchParams.raza);
  if (searchParams.precio_min) query = query.gte("precio", searchParams.precio_min);
  if (searchParams.precio_max) query = query.lte("precio", searchParams.precio_max);
  if (searchParams.edad_min) query = query.gte("edad_meses", searchParams.edad_min);
  if (searchParams.edad_max) query = query.lte("edad_meses", searchParams.edad_max);
  if (searchParams.estado) query = query.eq("estado", searchParams.estado);

  const { data: animals, count } = await query;

  const [{ data: breeds }, { data: statesRaw }] = await Promise.all([
    supabase.from("razas").select("*").order("nombre"),
    supabase.from("ganado").select("estado").eq("status", "disponible"),
  ]);

  const states = [...new Set((statesRaw ?? []).map((r: { estado: string }) => r.estado))].sort();
  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Suspense>
        <FilterSidebar breeds={(breeds ?? []) as Breed[]} states={states} />
      </Suspense>
      <div className="flex-1 min-w-0">
        <AnimalGrid animals={(animals ?? []) as unknown as Animal[]} total={total} />
        <Suspense>
          <Pagination page={page} totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: razas } = await supabase
    .from("razas")
    .select("id, nombre, categoria, origen")
    .order("nombre");

  const hasActiveFilters =
    params.raza || params.categoria || params.sexo ||
    params.precio_min || params.precio_max ||
    params.edad_min || params.edad_max || params.estado;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Catálogo
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Ganado disponible
          </h1>
          <p className="text-dark-300">
            Encuentra el ejemplar perfecto para tu proyecto ganadero.
          </p>
        </div>

        {/* Banner de razas — solo si no hay filtros activos */}
        {!hasActiveFilters && razas?.length ? (
          <RacesBanner razas={razas as any} />
        ) : null}

        <Suspense fallback={<div className="text-dark-400 text-sm">Cargando catálogo...</div>}>
          <CatalogContent searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
