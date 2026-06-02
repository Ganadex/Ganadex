import { AnimalCard } from "./AnimalCard";
import type { Animal } from "@/types";
import { Search } from "lucide-react";

interface Props {
  animals: Animal[];
  total: number;
}

export function AnimalGrid({ animals, total }: Props) {
  if (animals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mb-4">
          <Search size={24} className="text-dark-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">No encontramos resultados</h3>
        <p className="text-dark-400 text-sm max-w-xs">
          Intenta ajustar los filtros para encontrar el ganado que buscas.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <p className="text-dark-400 text-sm mb-6">
        <span className="text-white font-semibold">{total.toLocaleString("es-CO")}</span>{" "}
        ejemplares encontrados
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}
