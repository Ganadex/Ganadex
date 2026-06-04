"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";


export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt="Ganado de alta genética"
          className="w-full h-full object-cover"
        />
        {/* Overlays para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/30 to-dark-900/20" />
      </div>

      {/* Decoración dorada */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-dark-800/80 border border-gold-600/40 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <Star size={13} className="text-gold-500 fill-gold-500" />
          <span className="text-xs font-semibold text-gold-400 tracking-wider uppercase">
            Marketplace #1 de Ganado Elite
          </span>
          <Star size={13} className="text-gold-500 fill-gold-500" />
        </div>

        {/* Heading */}
        <h1 className="section-heading text-white mb-6 max-w-4xl mx-auto leading-tight">
          Compra y vende{" "}
          <span className="text-gradient-gold">ganado de alta genética</span>{" "}
          en Latinoamérica
        </h1>

        {/* Subtítulo */}
        <p className="text-dark-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          La plataforma premium que conecta ganaderos y compradores con los mejores
          ejemplares bovinos del continente. Pedigrí garantizado, información completa,
          trato directo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/ganado" className="btn-gold flex items-center justify-center gap-2 text-base">
            Explorar Ganado
            <ArrowRight size={18} />
          </Link>
          <Link href="/auth/registro" className="btn-outline-gold flex items-center justify-center gap-2 text-base">
            Publicar mi Ganado
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {[
            { icon: ShieldCheck, text: "Vendedores verificados" },
            { icon: Star, text: "Genética certificada" },
            { icon: TrendingUp, text: "Precios competitivos" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-dark-300 text-sm">
              <Icon size={16} className="text-gold-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
