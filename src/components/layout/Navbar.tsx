"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  {
    label: "Ganado",
    children: [
      { href: "/ganado", label: "Todo el Ganado" },
      { href: "/ganado-leche", label: "Ganado de Leche" },
      { href: "/ganado-carne", label: "Ganado de Carne" },
      { href: "/doble-proposito", label: "Doble Propósito" },
    ],
  },
  { href: "/vendedores", label: "Vendedores" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark-900/95 backdrop-blur-md border-b border-dark-700 shadow-lg shadow-black/50"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Ganadex"
            width={140}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label} className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    dropdown
                      ? "text-gold-500 bg-dark-700"
                      : "text-dark-200 hover:text-white hover:bg-dark-700"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform", dropdown && "rotate-180")}
                  />
                </button>
                {dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-dark-800 border border-dark-600 rounded-xl shadow-2xl py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2.5 text-sm transition-colors",
                          pathname === child.href
                            ? "text-gold-500 bg-dark-700"
                            : "text-dark-200 hover:text-white hover:bg-dark-700"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href!}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-gold-500 bg-dark-700"
                      : "text-dark-200 hover:text-white hover:bg-dark-700"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link href="/auth/registro" className="btn-gold text-sm py-2 px-5">
            Publicar Ganado
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg text-dark-200 hover:text-white hover:bg-dark-700 transition-colors"
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-dark-900 border-t border-dark-700 px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p className="px-3 py-2 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-6 py-2.5 rounded-lg text-sm transition-colors",
                      pathname === child.href
                        ? "text-gold-500 bg-dark-700"
                        : "text-dark-200 hover:text-white hover:bg-dark-700"
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-gold-500 bg-dark-700"
                    : "text-dark-200 hover:text-white hover:bg-dark-700"
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <hr className="divider-gold my-3" />
          <Link
            href="/auth/login"
            className="block px-3 py-2.5 rounded-lg text-sm text-dark-200 hover:text-white hover:bg-dark-700 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link href="/auth/registro" className="btn-gold block text-center text-sm mt-2">
            Publicar Ganado
          </Link>
        </div>
      )}
    </header>
  );
}
