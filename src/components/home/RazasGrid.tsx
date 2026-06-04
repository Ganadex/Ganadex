import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const CATEGORIA_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  leche:          { bg: "bg-blue-900/20",   text: "text-blue-300",   border: "border-blue-700/30",  dot: "bg-blue-400" },
  carne:          { bg: "bg-red-900/20",    text: "text-red-300",    border: "border-red-700/30",   dot: "bg-red-400" },
  doble_proposito:{ bg: "bg-green-900/20",  text: "text-green-300",  border: "border-green-700/30", dot: "bg-green-400" },
};

const CATEGORIA_LABELS: Record<string, string> = {
  leche: "Leche",
  carne: "Carne",
  doble_proposito: "Doble Propósito",
};

export async function RazasGrid() {
  const supabase = await createClient();
  const { data: razas } = await supabase
    .from("razas")
    .select("id, nombre, categoria, origen")
    .order("categoria")
    .order("nombre");

  if (!razas || razas.length === 0) return null;

  return (
    <section className="py-20 bg-dark-950" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Catálogo de razas
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Razas disponibles en Ganadex
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto text-sm">
            Explora nuestra selección de razas bovinas especializadas para el mercado colombiano.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {razas.map((raza) => {
            const colors = CATEGORIA_COLORS[raza.categoria] ?? CATEGORIA_COLORS.carne;
            return (
              <Link
                key={raza.id}
                href={`/ganado?raza=${raza.id}`}
                className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border ${colors.bg} ${colors.border} hover:border-gold-600/50 hover:bg-gold-900/10 transition-all duration-200`}
              >
                {/* Icono / avatar */}
                <div className="w-16 h-16 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center group-hover:border-gold-600/40 transition-colors overflow-hidden shrink-0">
                  <BreedIcon categoria={raza.categoria} nombre={raza.nombre} />
                </div>

                {/* Nombre */}
                <div className="text-center">
                  <p className="text-white text-xs font-semibold leading-tight group-hover:text-gold-400 transition-colors">
                    {raza.nombre}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    <span className={`text-xs ${colors.text} opacity-70`}>
                      {CATEGORIA_LABELS[raza.categoria]}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/ganado"
            className="btn-gold inline-flex items-center gap-2 text-sm"
          >
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BreedIcon({ categoria, nombre }: { categoria: string; nombre: string }) {
  const colors: Record<string, string> = {
    leche: "#3b82f6",
    carne: "#ef4444",
    doble_proposito: "#22c55e",
  };
  const color = colors[categoria] ?? "#d4a017";
  const initial = nombre.charAt(0).toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: `${color}15` }}>
      <span className="text-xl font-black" style={{ color }}>{initial}</span>
    </div>
  );
}
