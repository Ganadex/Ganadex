import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto con el equipo de Ganadex. Estamos aquí para ayudarte.",
};

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+57 300 000 0000" },
  { icon: Mail, label: "Email", value: "info@ganadex.co" },
  { icon: MapPin, label: "Ubicación", value: "Colombia, Latinoamérica" },
  { icon: Clock, label: "Horario", value: "Lun–Vie, 8am–6pm COT" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Contacto
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-dark-300 max-w-lg mx-auto">
            Escríbenos con cualquier pregunta, sugerencia o solicitud. Respondemos
            en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold-500" />
                </div>
                <div>
                  <p className="text-dark-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}

            <div className="card-dark p-6 mt-8">
              <p className="text-white font-bold mb-2">¿Eres vendedor?</p>
              <p className="text-dark-300 text-sm leading-relaxed">
                Para soporte relacionado con tu cuenta o publicaciones, también puedes
                escribirnos directamente desde tu dashboard.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
