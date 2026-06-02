import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, MapPin, Star, MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { Seller } from "@/types";

interface Props {
  seller: Seller;
  animalName: string;
}

export function SellerCard({ seller, animalName }: Props) {
  const whatsappUrl = buildWhatsAppUrl(seller.whatsapp, animalName);

  return (
    <div className="card-dark p-6">
      <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
        Información del Vendedor
      </h3>

      <div className="flex items-start gap-4 mb-5">
        {/* Avatar */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-dark-700 shrink-0">
          {seller.avatar_url ? (
            <Image
              src={seller.avatar_url}
              alt={seller.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="w-full h-full gradient-gold flex items-center justify-center">
              <span className="text-dark-900 font-black text-xl">
                {seller.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h4 className="text-white font-bold truncate">{seller.name}</h4>
            {seller.verified && (
              <BadgeCheck size={16} className="text-gold-500 shrink-0" />
            )}
          </div>
          {seller.company_name && (
            <p className="text-dark-400 text-xs mb-1">{seller.company_name}</p>
          )}
          <div className="flex items-center gap-1 text-xs text-dark-400">
            <MapPin size={11} className="text-gold-600" />
            <span>{seller.location}, {seller.state}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-dark-700 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star size={13} className="text-gold-500 fill-gold-500" />
            <span className="text-white font-bold">{seller.rating.toFixed(1)}</span>
          </div>
          <p className="text-dark-400 text-xs">Calificación</p>
        </div>
        <div className="bg-dark-700 rounded-xl p-3 text-center">
          <p className="text-white font-bold mb-1">{seller.total_sales}</p>
          <p className="text-dark-400 text-xs">Ventas</p>
        </div>
      </div>

      {/* CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20c45e] transition-colors mb-3"
      >
        <MessageCircle size={18} />
        Contactar por WhatsApp
      </a>

      <a
        href={`tel:${seller.phone}`}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-dark-700 border border-dark-600 text-dark-200 text-sm font-medium hover:border-gold-500 hover:text-white transition-colors"
      >
        <Phone size={16} />
        {seller.phone}
      </a>

      {seller.verified && (
        <div className="mt-4 flex items-center gap-2 p-3 bg-gold-900/20 border border-gold-700/30 rounded-xl">
          <BadgeCheck size={14} className="text-gold-500 shrink-0" />
          <p className="text-gold-400 text-xs">
            Vendedor verificado por Ganadex
          </p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          href={`/vendedores/${seller.id}`}
          className="text-gold-500 hover:text-gold-400 text-xs font-medium transition-colors"
        >
          Ver perfil completo →
        </Link>
      </div>
    </div>
  );
}
