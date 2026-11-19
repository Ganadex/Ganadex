// URL pública del sitio. Se puede cambiar con NEXT_PUBLIC_SITE_URL en Vercel.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ganadex.co"
).replace(/\/$/, "");

export const SITE_NAME = "Ganadex";
