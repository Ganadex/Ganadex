import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BadgeCheck, MapPin, Star, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendedores",
  description: "Conoce a los vendedores verificados de Ganadex. Ganaderos de confianza en toda Latinoamérica.",
};

export default async function SellersPage() {
  const supabase = await createClient();

  const { data: sellers } = await supabase
    .from("vendedores")
    .select("*")
    .eq("activo", true)
    .eq("verificado", true)
    .order("total_ventas", { ascending: false })
    .limit(24);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Vendedores
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Ganaderos verificados
          </h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Compra con confianza. Todos nuestros vendedores pasan por un proceso
            de verificación de identidad y legalidad.
          </p>
        </div>

        {!sellers || sellers.length === 0 ? (
          <p className="text-center text-dark-400 py-16">
            No hay vendedores disponibles aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <Link
                key={seller.id}
                href={`/vendedores/${seller.id}`}
                className="card-dark p-6 flex flex-col items-center text-center group hover:border-gold-600/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-dark-700 mb-4">
                  {seller.avatar_url ? (
                    <Image
                      src={seller.avatar_url}
                      alt={seller.nombre_completo}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full gradient-gold flex items-center justify-center">
                      <span className="text-dark-900 font-black text-2xl">
                        {seller.nombre_completo.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-white font-bold group-hover:text-gold-400 transition-colors">
                    {seller.nombre_completo}
                  </h3>
                  <BadgeCheck size={16} className="text-gold-500 shrink-0" />
                </div>

                {seller.nombre_empresa && (
                  <p className="text-dark-400 text-xs mb-2">{seller.nombre_empresa}</p>
                )}

                <div className="flex items-center gap-1.5 text-dark-400 text-xs mb-4">
                  <MapPin size={11} className="text-gold-600" />
                  <span>{seller.ubicacion}, {seller.estado}</span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-gold-500 fill-gold-500" />
                    <span className="text-white font-semibold">{seller.calificacion.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package size={12} className="text-dark-400" />
                    <span className="text-dark-400">{seller.total_ventas} ventas</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
