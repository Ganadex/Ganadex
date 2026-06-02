import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ganadex — Marketplace de Ganado de Elite",
    template: "%s | Ganadex",
  },
  description:
    "El marketplace premium para compraventa de ganado de alta genética en Latinoamérica. Encuentra los mejores ejemplares de ganado de leche, carne y doble propósito.",
  keywords: [
    "ganado elite",
    "compraventa ganado",
    "ganado lechero",
    "ganado de carne",
    "ganadería Colombia",
    "ganado pedigrí",
    "bovinos elite",
  ],
  authors: [{ name: "Ganadex" }],
  openGraph: {
    title: "Ganadex — Marketplace de Ganado de Elite",
    description: "El marketplace premium para compraventa de ganado de alta genética en Latinoamérica.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
