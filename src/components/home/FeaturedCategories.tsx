import Link from "next/link";
import { Droplets, Beef, Layers } from "lucide-react";

const categories = [
  {
    href: "/ganado-leche",
    icon: Droplets,
    title: "Ganado de Leche",
    description:
      "Holstein, Jersey, Pardo Suizo, Girolando y más razas especializadas en producción lechera de alto rendimiento.",
    breeds: ["Holstein", "Jersey", "Girolando", "Pardo Suizo"],
    color: "from-blue-900/20 to-blue-800/10",
    borderColor: "border-blue-700/30",
    iconColor: "text-blue-400",
    badgeColor: "bg-blue-900/40 text-blue-300",
    bgImage: "/categoria-leche.jpg",
  },
  {
    href: "/ganado-carne",
    bgImage: undefined,
    icon: Beef,
    title: "Ganado de Carne",
    description:
      "Angus, Brahman, Nelore, Hereford y las mejores razas cárnicas con genética comprobada y conversión alimenticia superior.",
    breeds: ["Angus", "Brahman", "Nelore", "Hereford"],
    color: "from-red-900/20 to-red-800/10",
    borderColor: "border-red-700/30",
    iconColor: "text-red-400",
    badgeColor: "bg-red-900/40 text-red-300",
    featured: true,
  },
  {
    href: "/doble-proposito",
    bgImage: undefined,
    icon: Layers,
    title: "Doble Propósito",
    description:
      "Simmental, Normando, Lucerna y razas criollas colombianas adaptadas para producción mixta de leche y carne.",
    breeds: ["Simmental", "Normando", "Lucerna", "Gyr"],
    color: "from-green-900/20 to-green-800/10",
    borderColor: "border-green-700/30",
    iconColor: "text-green-400",
    badgeColor: "bg-green-900/40 text-green-300",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Categorías
          </p>
          <h2 className="section-heading text-white mb-4">
            Encuentra el ganado que necesitas
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Tres especialidades, una sola plataforma. Explora por categoría y
            descubre los mejores ejemplares disponibles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(
            ({
              href,
              icon: Icon,
              title,
              description,
              breeds,
              color,
              borderColor,
              iconColor,
              badgeColor,
              featured,
              bgImage,
            }) => (
              <Link
                key={href}
                href={href}
                className={`relative group rounded-2xl border p-8 transition-all duration-300 overflow-hidden bg-gradient-to-br ${color} ${borderColor} hover:border-gold-600/50 hover:shadow-xl hover:shadow-gold-900/20 hover:-translate-y-1`}
              >
                {/* Imagen de fondo opcional */}
                {bgImage && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bgImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-dark-900/60 to-dark-900/40" />
                  </>
                )}
                <div className="relative z-10">
                {featured && (
                  <div className="absolute top-0 right-0 bg-gold-600 text-dark-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    Popular
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center mb-6 ${iconColor} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed mb-6">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {breeds.map((b) => (
                    <span
                      key={b}
                      className={`text-xs px-2.5 py-1 rounded-full ${badgeColor}`}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-gold-500 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>Ver {title}</span>
                  <span>→</span>
                </div>
                </div>{/* end relative z-10 */}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
