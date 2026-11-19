import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/site";

// Se regenera como máximo cada hora
export const revalidate = 3600;

const staticPages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/ganado", priority: 0.9, changeFrequency: "daily" },
  { path: "/ganado-leche", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ganado-carne", priority: 0.8, changeFrequency: "weekly" },
  { path: "/doble-proposito", priority: 0.8, changeFrequency: "weekly" },
  { path: "/vendedores", priority: 0.5, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.4, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Ejemplares disponibles (la base de datos solo deja leer los "disponible" al público).
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("ganado")
      .select("id, updated_at")
      .eq("status", "disponible")
      .order("updated_at", { ascending: false })
      .limit(5000);

    for (const a of data ?? []) {
      entries.push({
        url: `${SITE_URL}/ganado/${a.id}`,
        lastModified: a.updated_at ? new Date(a.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch {
    // Si Supabase no responde, el sitemap sigue incluyendo las páginas fijas.
  }

  return entries;
}
