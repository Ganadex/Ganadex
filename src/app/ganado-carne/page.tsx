import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ganado de Carne",
  description: "Encuentra los mejores ejemplares de ganado cárnico: Angus, Brahman, Nelore, Hereford y más.",
};

export default function GanadoCarnesPage() {
  redirect("/ganado?categoria=carne");
}
