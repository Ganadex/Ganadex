import { requireSection } from "@/lib/permissions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Landings — Ganadex" };

export default async function Page() {
  await requireSection("landings");

  return (
    <div className="card-dark p-10 text-center">
      <h1 className="text-white font-black text-2xl mb-2">Landings</h1>
      <p className="text-dark-400 text-sm">Sección en construcción.</p>
    </div>
  );
}
