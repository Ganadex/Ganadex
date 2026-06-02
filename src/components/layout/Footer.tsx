import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const links = {
  ganado: [
    { href: "/ganado", label: "Todo el Ganado" },
    { href: "/ganado-leche", label: "Ganado de Leche" },
    { href: "/ganado-carne", label: "Ganado de Carne" },
    { href: "/doble-proposito", label: "Doble Propósito" },
  ],
  plataforma: [
    { href: "/vendedores", label: "Vendedores" },
    { href: "/auth/registro", label: "Publicar Ganado" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-dark-900 font-black text-lg">G</span>
              </div>
              <span className="text-xl font-black">
                <span className="text-white">GANA</span>
                <span className="text-gradient-gold">DEX</span>
              </span>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              El marketplace premium para compraventa de ganado de alta genética en Latinoamérica.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/ganadex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center text-dark-300 hover:text-gold-500 hover:bg-dark-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/ganadex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center text-dark-300 hover:text-gold-500 hover:bg-dark-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Ganado links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categorías
            </h4>
            <ul className="space-y-2.5">
              {links.ganado.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-dark-300 hover:text-gold-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Plataforma
            </h4>
            <ul className="space-y-2.5">
              {links.plataforma.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-dark-300 hover:text-gold-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-500 mt-0.5 shrink-0" />
                <span className="text-dark-300 text-sm">Colombia, Latinoamérica</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-500 shrink-0" />
                <a
                  href="tel:+573000000000"
                  className="text-dark-300 hover:text-gold-400 text-sm transition-colors"
                >
                  +57 300 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-500 shrink-0" />
                <a
                  href="mailto:info@ganadex.co"
                  className="text-dark-300 hover:text-gold-400 text-sm transition-colors"
                >
                  info@ganadex.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="divider-gold my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-dark-400">
          <p>© {new Date().getFullYear()} Ganadex. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-gold-400 transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-gold-400 transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
