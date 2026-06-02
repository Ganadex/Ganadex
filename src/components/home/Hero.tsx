"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";

const stats = [
  { label: "Ejemplares activos", value: "2,400+" },
  { label: "Vendedores verificados", value: "180+" },
  { label: "Razas disponibles", value: "22" },
  { label: "Países", value: "8" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-cattle.mp4" type="video/mp4" />
        </video>
        {/* Gradientes de overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/70 via-transparent to-dark-900/70" />
      </div>

      {/* Decoración dorada */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-dark-800/60 backdrop-blur-sm border border-dark-600 rounded-xl p-5"
            >
              <div className="text-2xl md:text-3xl font-black text-gradient-gold mb-1">
                {value}
              </div>
              <div className="text-xs text-dark-300">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-gold-500/0 to-gold-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
      </div>
    </section>
  );
}
