// Secciones del dashboard que se pueden asignar a miembros del equipo.
// Para agregar una nueva: añádela aquí y protege su página con requireSection(key).
export const TEAM_SECTIONS = [
  {
    key: "landings",
    label: "Landings",
    href: "/dashboard/landings",
    description: "Gestión de landing pages",
  },
  {
    key: "ads-pro",
    label: "Ads Pro",
    href: "/dashboard/ads-pro",
    description: "Campañas y anuncios",
  },
] as const;

export type TeamSectionKey = (typeof TEAM_SECTIONS)[number]["key"];

export const TEAM_SECTION_KEYS: string[] = TEAM_SECTIONS.map((s) => s.key);
