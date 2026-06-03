"use client";

import { MessageCircle, ShieldCheck, BadgeCheck, Phone } from "lucide-react";

const GANADEX_WHATSAPP = process.env.NEXT_PUBLIC_GANADEX_WHATSAPP ?? "573000000000";
const GANADEX_PHONE = process.env.NEXT_PUBLIC_GANADEX_PHONE ?? "+57 300 000 0000";

interface Props {
  animalName: string;
}

export function GanadexContactCard({ animalName }: Props) {
  const message = encodeURIComponent(
    `Hola Ganadex, estoy interesado en el ejemplar: *${animalName}*. ¿Pueden darme más información?`
  );
  const whatsappUrl = `https://wa.me/${GANADEX_WHATSAPP}?text=${message}`;

  return (
    <div className="card-dark p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-dark-700">
        <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0">
          <ShieldCheck size={22} className="text-dark-900" />
        </div>
        <div>
          <h3 className="text-white font-bold text-base">Ganadex</h3>
          <p className="text-dark-400 text-xs">Bróker ganadero certificado</p>
        </div>
      </div>

      {/* Garantías */}
      <div className="space-y-2.5">
        {[
          "Ganado verificado y certificado",
          "Acompañamiento en todo el proceso",
          "Garantía de genética documentada",
          "Transporte y logística incluidos",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <BadgeCheck size={14} className="text-gold-500 shrink-0" />
            <span className="text-dark-300 text-xs">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20c45e] transition-colors"
      >
        <MessageCircle size={18} />
        Consultar por WhatsApp
      </a>

      {/* Teléfono */}
      <a
        href={`tel:${GANADEX_PHONE.replace(/\s/g, "")}`}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-dark-700 border border-dark-600 text-dark-200 text-sm font-medium hover:border-gold-500 hover:text-white transition-colors"
      >
        <Phone size={15} />
        {GANADEX_PHONE}
      </a>

      <p className="text-center text-dark-500 text-xs">
        Nos encargamos de toda la negociación por ti
      </p>
    </div>
  );
}
