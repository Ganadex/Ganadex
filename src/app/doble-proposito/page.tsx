import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doble Propósito",
  description: "Ganado de doble propósito: Simmental, Normando, Lucerna, Gyr y razas criollas colombianas.",
};

export default function DoblePropositoPage() {
  redirect("/ganado?categoria=doble_proposito");
}
