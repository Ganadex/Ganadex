import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-dark-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-dark-700 to-dark-800 border border-gold-600/30 p-12 md:p-16 text-center overflow-hidden">
          {/* Glow decorations */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-gold-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold-800/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              ¿Eres ganadero?
            </p>
            <h2 className="section-heading text-white mb-6 max-w-2xl mx-auto">
              Publica tu ganado y llega a miles de compradores
            </h2>
            <p className="text-dark-300 max-w-lg mx-auto mb-10 leading-relaxed">
              Registrate como vendedor, sube fotos y videos de tus mejores ejemplares
              y conecta directamente con compradores de toda Latinoamérica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/registro"
                className="btn-gold flex items-center justify-center gap-2 text-base"
              >
                Registrarme como vendedor
                <ArrowRight size={18} />
              </Link>
              <Link href="/nosotros" className="btn-outline-gold flex items-center justify-center gap-2 text-base">
                Conocer más
              </Link>
            </div>

            <p className="mt-8 text-dark-400 text-xs">
              Registro gratuito · Sin comisiones en el primer mes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
