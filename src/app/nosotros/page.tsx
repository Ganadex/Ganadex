import { ShieldCheck, Globe, Users, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia y misión detrás de Ganadex, el marketplace premium de ganado elite en Latinoamérica.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Confianza",
    description: "Verificamos a cada vendedor para garantizar transacciones seguras y transparentes.",
  },
  {
    icon: Globe,
    title: "Alcance regional",
    description: "Conectamos ganaderos de Colombia, México, Perú, Brasil y toda Latinoamérica.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Construimos la red más grande de ganaderos de genética elite del continente.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Solo publicamos ganado con información completa, documentación y genética verificada.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Nosotros
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Transformando la ganadería{" "}
            <span className="text-gradient-gold">latinoamericana</span>
          </h1>
          <p className="text-dark-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Ganadex nació con una visión clara: crear la plataforma más confiable
            y completa para la compraventa de ganado de alta genética en Latinoamérica.
          </p>
        </div>

        {/* Story */}
        <div className="card-dark p-10 mb-16">
          <h2 className="text-2xl font-black text-white mb-5">Nuestra historia</h2>
          <div className="space-y-4 text-dark-200 leading-relaxed">
            <p>
              Ganadex fue creada por ganaderos para ganaderos. Después de años de
              experiencia en el sector, identificamos una necesidad urgente: los
              compradores de ganado de elite carecían de una plataforma digital
              especializada, confiable y fácil de usar.
            </p>
            <p>
              Las transacciones de ganado de alta genética requieren información
              detallada: pedigrí, datos genéticos, historial sanitario, fotos y videos.
              Diseñamos Ganadex para que cada publicación cuente toda la historia
              del ejemplar.
            </p>
            <p>
              Hoy conectamos a los mejores criadores y ganaderos de Colombia,
              México, Perú, Brasil y más países, ofreciendo una experiencia digital
              premium a la altura del ganado que representamos.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white mb-8 text-center">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card-dark p-6 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="text-center bg-gradient-to-br from-dark-700 to-dark-800 border border-gold-600/30 rounded-3xl p-12">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Misión
          </p>
          <p className="text-xl text-white font-medium leading-relaxed max-w-2xl mx-auto">
            "Democratizar el acceso al mercado de ganado de alta genética, conectando
            a los mejores criadores con compradores calificados en toda Latinoamérica,
            con total transparencia y confianza."
          </p>
        </div>
      </div>
    </div>
  );
}
