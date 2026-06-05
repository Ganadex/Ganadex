import Link from "next/link";
import Image from "next/image";
import { MapPin, Weight, Calendar, BadgeCheck } from "lucide-react";
import { cn, formatPrice, formatAge, formatWeight, getCategoryLabel, getSexLabel } from "@/lib/utils";
import type { Animal } from "@/types";

interface Props {
  animal: Animal;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  leche: "bg-blue-900/40 text-blue-300 border-blue-700/30",
  carne: "bg-red-900/40 text-red-300 border-red-700/30",
  doble_proposito: "bg-green-900/40 text-green-300 border-green-700/30",
};

export function AnimalCard({ animal, compact = false }: Props) {
  const coverImage = animal.images?.find((i) => i.es_portada) ?? animal.images?.[0];
  const imageUrl = coverImage?.url ?? "/images/placeholder-animal.jpg";

  return (
    <Link
      href={`/ganado/${animal.id}`}
      className={cn(
        "group card-dark flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden bg-dark-700", compact ? "h-44" : "h-56")}>
        <Image
          src={imageUrl}
          alt={animal.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-full border font-medium backdrop-blur-sm",
              categoryColors[animal.categoria]
            )}
          >
            {getCategoryLabel(animal.categoria)}
          </span>
          {animal.destacado && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-gold-600/80 text-dark-900 font-bold backdrop-blur-sm">
              Destacado
            </span>
          )}
        </div>

        {/* Sex badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-dark-900/70 text-dark-200 backdrop-blur-sm border border-dark-600">
            {getSexLabel(animal.sexo)}
          </span>
        </div>

        {/* Image count */}
        {animal.images && animal.images.length > 1 && (
          <div className="absolute bottom-3 right-3 text-xs bg-dark-900/70 text-dark-300 px-2 py-0.5 rounded-full backdrop-blur-sm">
            +{animal.images.length - 1} fotos
          </div>
        )}
      </div>

      {/* Body */}
      <div className={cn("flex flex-col flex-1 p-5", compact && "p-4")}>
        {/* Breed & name */}
        <div className="mb-3">
          {animal.breed && (
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-1">
              {animal.breed.nombre}
            </p>
          )}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-1 group-hover:text-gold-400 transition-colors">
            {animal.nombre}
          </h3>
          {animal.numero_registro && (
            <p className="text-dark-400 text-xs mt-0.5">Reg. {animal.numero_registro}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-dark-300 text-xs">
            <Calendar size={12} className="text-gold-600 shrink-0" />
            <span>{formatAge(animal.edad_meses)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-dark-300 text-xs">
            <Weight size={12} className="text-gold-600 shrink-0" />
            <span>{formatWeight(animal.peso_kg)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-dark-300 text-xs col-span-2">
            <MapPin size={12} className="text-gold-600 shrink-0" />
            <span className="truncate">{animal.ubicacion}, {animal.estado}</span>
          </div>
        </div>

        {/* Footer: price + seller */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-dark-400 mb-0.5">Precio</p>
            <p className="text-xl font-black text-gradient-gold">
              {formatPrice(animal.precio, animal.moneda)}
            </p>
          </div>

          {animal.seller && (
            <div className="flex items-center gap-1.5 text-right">
              {animal.seller.verificado && (
                <BadgeCheck size={13} className="text-gold-500 shrink-0" />
              )}
              <p className="text-dark-400 text-xs max-w-[90px] truncate">
                {animal.seller.nombre_completo}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
