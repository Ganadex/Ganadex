import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export async function RegistroCarousel() {
  const supabase = await createClient();

  const { data: animals } = await supabase
    .from("ganado")
    .select(`
      id, nombre, precio, moneda, categoria, edad_meses, peso_kg,
      raza:razas(nombre),
      images:imagenes_ganado(url, es_portada)
    `)
    .eq("status", "disponible")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!animals || animals.length === 0) return null;

  return (
    <section className="py-12 bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gold-600/10 border border-gold-600/30 rounded-full px-4 py-1.5">
              <BadgeCheck size={15} className="text-gold-500" />
              <span className="text-gold-400 text-sm font-semibold">Calidad Garantizada</span>
            </div>
            <h2 className="text-white font-black text-xl hidden sm:block">
              Ganado con Registro
            </h2>
          </div>
          <Link
            href="/ganado"
            className="flex items-center gap-1 text-gold-500 hover:text-gold-400 text-sm font-medium transition-colors"
          >
            Ver catálogo
            <ChevronRight size={16} />
          </Link>
        </div>

        <h2 className="text-white font-black text-xl mb-5 sm:hidden">
          Ganado con Registro
        </h2>

        {/* Carrusel horizontal */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
          {animals.map((a) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cover = (a.images as any[])?.find((i) => i.es_portada) ?? (a.images as any[])?.[0];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const razaNombre = (a.raza as any)?.nombre ?? a.categoria;

            return (
              <Link
                key={a.id}
                href={`/ganado/${a.id}`}
                className="shrink-0 snap-start w-56 card-dark overflow-hidden hover:border-gold-600/50 transition-all group"
              >
                {/* Foto */}
                <div className="w-full h-36 bg-dark-700 overflow-hidden">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover.url}
                      alt={a.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-dark-600 text-xs">Sin foto</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <BadgeCheck size={11} className="text-gold-500 shrink-0" />
                    <span className="text-gold-500 text-xs font-medium truncate">{razaNombre}</span>
                  </div>
                  <p className="text-white font-bold text-sm truncate mb-2">{a.nombre}</p>
                  <p className="text-gold-400 font-black text-sm">
                    {formatPrice(a.precio, a.moneda)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
