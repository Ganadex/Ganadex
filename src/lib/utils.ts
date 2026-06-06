import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatAge(months: number): string {
  if (months < 12) return `${months} meses`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} ${years === 1 ? "año" : "años"}`;
  return `${years} ${years === 1 ? "año" : "años"} ${rem} meses`;
}

export function formatWeight(kg: number): string {
  return `${kg.toLocaleString("es-CO")} kg`;
}

export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    leche: "Ganado de Leche",
    carne: "Ganado de Carne",
    doble_proposito: "Doble Propósito",
    criolla: "Raza Criolla",
  };
  return map[category] ?? category;
}

export function getSexLabel(sex: string): string {
  const map: Record<string, string> = {
    macho: "Macho",
    hembra: "Hembra",
  };
  return map[sex] ?? sex;
}

export function buildWhatsAppUrl(phone: string, animalName: string): string {
  const message = encodeURIComponent(
    `Hola, estoy interesado en el ejemplar "${animalName}" que vi en Ganadex. ¿Podría darme más información?`
  );
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${message}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
