"use client";

import Link from "next/link";

interface Raza {
  id: string;
  nombre: string;
  categoria: "leche" | "carne" | "doble_proposito";
  origen: string;
}

const CATEGORIA_LABELS: Record<string, string> = {
  leche: "Ganado de Leche",
  carne: "Ganado de Carne",
  doble_proposito: "Doble Propósito",
};

const CATEGORIA_ORDER = ["leche", "carne", "doble_proposito"];

// Placeholder SVG por categoría
function BreedPlaceholder({ categoria }: { categoria: string }) {
  const colors: Record<string, string> = {
    leche: "#3b82f6",
    carne: "#ef4444",
    doble_proposito: "#8b5cf6",
  };
  const color = colors[categoria] ?? "#d4a017";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill={color} opacity="0.15" />
      {/* Silueta de vaca simplificada */}
      <ellipse cx="60" cy="72" rx="28" ry="18" fill={color} opacity="0.6" />
      <circle cx="60" cy="48" r="14" fill={color} opacity="0.7" />
      {/* Cuernos */}
      <path d="M50 38 Q44 28 40 32" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M70 38 Q76 28 80 32" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Orejas */}
      <ellipse cx="46" cy="44" rx="5" ry="7" fill={color} opacity="0.5" transform="rotate(-20 46 44)" />
      <ellipse cx="74" cy="44" rx="5" ry="7" fill={color} opacity="0.5" transform="rotate(20 74 44)" />
      {/* Patas */}
      <rect x="38" y="85" width="7" height="16" rx="3" fill={color} opacity="0.5" />
      <rect x="50" y="85" width="7" height="16" rx="3" fill={color} opacity="0.5" />
      <rect x="63" y="85" width="7" height="16" rx="3" fill={color} opacity="0.5" />
      <rect x="75" y="85" width="7" height="16" rx="3" fill={color} opacity="0.5" />
    </svg>
  );
}

interface Props {
  razas: Raza[];
}

export function RacesBanner({ razas }: Props) {
  const byCategoria = CATEGORIA_ORDER.reduce<Record<string, Raza[]>>((acc, cat) => {
    acc[cat] = razas.filter((r) => r.categoria === cat);
    return acc;
  }, {});

  return (
    <div className="mb-12">
      <div className="mb-6">
        <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-1">
          Explora por raza
        </p>
        <h2 className="text-2xl font-black text-white">
          ¿Qué raza estás buscando?
        </h2>
      </div>

      {CATEGORIA_ORDER.map((cat) => {
        const lista = byCategoria[cat];
        if (!lista?.length) return null;
        return (
          <div key={cat} className="mb-10">
            {/* Título de categoría */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px flex-1 bg-dark-700" />
              <span className="text-gold-500 font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                {CATEGORIA_LABELS[cat]}
              </span>
              <span className="h-px flex-1 bg-dark-700" />
            </div>

            {/* Grid de razas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {lista.map((raza) => (
                <Link
                  key={raza.id}
                  href={`/ganado?raza=${raza.id}`}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-dark-800 border border-dark-700 hover:border-gold-500/50 hover:bg-dark-750 transition-all duration-200"
                >
                  {/* Imagen circular */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-dark-700 ring-2 ring-dark-600 group-hover:ring-gold-500/40 transition-all duration-200">
                    <BreedPlaceholder categoria={raza.categoria} />
                  </div>

                  {/* Nombre */}
                  <span className="text-center text-sm font-semibold text-dark-200 group-hover:text-gold-400 transition-colors leading-tight">
                    {raza.nombre}
                  </span>

                  {/* Origen */}
                  <span className="text-xs text-dark-500 -mt-1">{raza.origen}</span>

                  {/* Botón */}
                  <span className="mt-auto text-xs font-semibold text-gold-500 border border-gold-500/30 rounded-full px-3 py-1 group-hover:bg-gold-500 group-hover:text-dark-900 transition-all duration-200">
                    Ver ganado
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
