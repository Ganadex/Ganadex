import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ganado de Leche",
  description: "Encuentra los mejores ejemplares de ganado lechero: Holstein, Jersey, Girolando, Pardo Suizo y más.",
};

export default function GanadoLechePage() {
  redirect("/ganado?categoria=leche");
}
