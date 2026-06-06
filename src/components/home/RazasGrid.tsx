import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const CATEGORIA_LABELS: Record<string, string> = {
  leche: "Leche",
  carne: "Carne",
  doble_proposito: "Doble Propósito",
  criolla: "Criolla",
};

const CATEGORIA_COLORS: Record<string, string> = {
  leche: "#3b82f6",
  carne: "#ef4444",
  doble_proposito: "#22c55e",
  criolla: "#a855f7",
};

// Razas que son cruces — reciben color y badge especial
const CRUCES = new Set(["Girolando", "Jerhol"]);
const CRUCE_COLOR = "#f59e0b"; // ámbar

// Mapa de imágenes por raza — se irán agregando
const RAZA_IMAGES: Record<string, string> = {
  "Ayrshire": "/RAZAS/AYRSHIRE.jpg",
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
    <section className="py-20" style={{ background: "#111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Razas disponibles
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Encuentra tu raza ideal
          </h2>
          <p className="text-dark-400 text-sm max-w-lg mx-auto">
            Selecciona una raza para ver los ejemplares disponibles en el catálogo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {razas.map((raza) => {
            const img = RAZA_IMAGES[raza.nombre];
            const esCruce = CRUCES.has(raza.nombre);
            const color = esCruce ? CRUCE_COLOR : (CATEGORIA_COLORS[raza.categoria] ?? "#d4a017");
            const label = esCruce ? "Cruce lechero" : (CATEGORIA_LABELS[raza.categoria] ?? raza.categoria);

            return (
              <Link
                key={raza.id}
                href={`/ganado?raza=${raza.id}`}
                className="group flex flex-col rounded-2xl overflow-hidden border hover:-translate-y-1 transition-all duration-200 shadow-lg"
                style={{
                  borderColor: esCruce ? `${CRUCE_COLOR}40` : "#1f2937",
                  background: esCruce ? "#1c1508" : "#1f2937",
                }}
              >
                {/* Imagen / placeholder */}
                <div className="w-full aspect-square overflow-hidden bg-dark-700 flex items-center justify-center relative">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt={raza.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-2"
                      style={{ background: `${color}12` }}
                    >
                      <span
                        className="text-5xl font-black opacity-30"
                        style={{ color }}
                      >
                        {raza.nombre.charAt(0)}
                      </span>
                      <span className="text-xs text-dark-500">{raza.origen}</span>
                    </div>
                  )}
                  {/* Badge categoría */}
                  <span
                    className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${color}25`, color }}
                  >
                    {label}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-2">
                  <p className="text-white font-bold text-sm text-center leading-tight group-hover:text-gold-400 transition-colors">
                    {raza.nombre}
                  </p>
                  <span
                    className="w-full text-center text-xs font-semibold py-1.5 rounded-lg border transition-all group-hover:text-dark-900"
                    style={{
                      borderColor: esCruce ? `${CRUCE_COLOR}50` : "#92400e60",
                      color: esCruce ? CRUCE_COLOR : "#d4a017",
                    }}
                  >
                    Ver ganado →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/ganado" className="btn-gold inline-flex items-center gap-2 text-sm">
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}
