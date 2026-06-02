import { ShieldCheck, FileCheck, Users, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Vendedores Verificados",
    description:
      "Cada vendedor pasa por un proceso de verificación de identidad y legalidad antes de publicar en la plataforma.",
  },
  {
    icon: FileCheck,
    title: "Documentación Completa",
    description:
      "Accede a registros de pedigrí, certificados sanitarios, historial genético y documentos de propiedad.",
  },
  {
    icon: Users,
    title: "Red de Ganaderos",
    description:
      "Conecta directamente con los mejores ganaderos y criadores de genética de élite en toda Latinoamérica.",
  },
  {
    icon: Headphones,
    title: "Soporte Especializado",
    description:
      "Nuestro equipo de expertos ganaderos te acompaña en cada paso de la compra para garantizar tu satisfacción.",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            ¿Por qué Ganadex?
          </p>
          <h2 className="section-heading text-white mb-4">
            La plataforma en la que los ganaderos confían
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Seguridad, transparencia y genética de élite en una sola plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-dark-700 border border-dark-600 flex items-center justify-center group-hover:border-gold-600/50 group-hover:bg-dark-600 transition-all">
                <Icon size={26} className="text-gold-500" />
              </div>
              <h3 className="text-white font-bold mb-3">{title}</h3>
              <p className="text-dark-300 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-20 flex items-center gap-6 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-dark-600" />
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-700 border border-gold-600/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-xs font-semibold text-gold-400 tracking-wider uppercase">
              Plataforma activa 24/7
            </span>
          </div>
          <div className="flex-1 h-px bg-dark-600" />
        </div>
      </div>
    </section>
  );
}
