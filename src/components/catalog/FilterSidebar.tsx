"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Breed } from "@/types";

interface Props {
  breeds: Breed[];
  states: string[];
}

const categories = [
  { value: "leche", label: "Ganado de Leche" },
  { value: "carne", label: "Ganado de Carne" },
  { value: "doble_proposito", label: "Doble Propósito" },
];

const sexOptions = [
  { value: "macho", label: "Macho" },
  { value: "hembra", label: "Hembra" },
];

export function FilterSidebar({ breeds, states }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const updateFilter = (name: string, value: string | null) => {
    const qs = createQueryString(name, value);
    router.push(`${pathname}?${qs}`);
  };

  const clearAll = () => router.push(pathname);

  const hasFilters = searchParams.size > 0;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="card-dark p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gold-500" />
            <h3 className="text-white font-semibold">Filtros</h3>
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-dark-400 hover:text-gold-400 transition-colors"
            >
              <X size={12} />
              Limpiar
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Categoría */}
          <FilterGroup label="Categoría">
            {categories.map(({ value, label }) => (
              <FilterChip
                key={value}
                label={label}
                active={searchParams.get("categoria") === value}
                onClick={() =>
                  updateFilter(
                    "categoria",
                    searchParams.get("categoria") === value ? null : value
                  )
                }
              />
            ))}
          </FilterGroup>

          {/* Sexo */}
          <FilterGroup label="Sexo">
            {sexOptions.map(({ value, label }) => (
              <FilterChip
                key={value}
                label={label}
                active={searchParams.get("sexo") === value}
                onClick={() =>
                  updateFilter(
                    "sexo",
                    searchParams.get("sexo") === value ? null : value
                  )
                }
              />
            ))}
          </FilterGroup>

          {/* Raza */}
          <FilterGroup label="Raza">
            <select
              value={searchParams.get("raza") ?? ""}
              onChange={(e) => updateFilter("raza", e.target.value || null)}
              className="w-full bg-dark-700 border border-dark-600 text-dark-200 text-sm rounded-lg px-3 py-2.5 focus:border-gold-500 focus:outline-none"
            >
              <option value="">Todas las razas</option>
              {breeds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </FilterGroup>

          {/* Precio */}
          <FilterGroup label="Precio (COP)">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Mínimo"
                defaultValue={searchParams.get("precio_min") ?? ""}
                onBlur={(e) => updateFilter("precio_min", e.target.value || null)}
                className="bg-dark-700 border border-dark-600 text-dark-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500 focus:outline-none w-full"
              />
              <input
                type="number"
                placeholder="Máximo"
                defaultValue={searchParams.get("precio_max") ?? ""}
                onBlur={(e) => updateFilter("precio_max", e.target.value || null)}
                className="bg-dark-700 border border-dark-600 text-dark-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500 focus:outline-none w-full"
              />
            </div>
          </FilterGroup>

          {/* Edad */}
          <FilterGroup label="Edad (meses)">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Mín"
                defaultValue={searchParams.get("edad_min") ?? ""}
                onBlur={(e) => updateFilter("edad_min", e.target.value || null)}
                className="bg-dark-700 border border-dark-600 text-dark-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500 focus:outline-none w-full"
              />
              <input
                type="number"
                placeholder="Máx"
                defaultValue={searchParams.get("edad_max") ?? ""}
                onBlur={(e) => updateFilter("edad_max", e.target.value || null)}
                className="bg-dark-700 border border-dark-600 text-dark-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500 focus:outline-none w-full"
              />
            </div>
          </FilterGroup>

          {/* Departamento/Estado */}
          <FilterGroup label="Departamento">
            <select
              value={searchParams.get("estado") ?? ""}
              onChange={(e) => updateFilter("estado", e.target.value || null)}
              className="w-full bg-dark-700 border border-dark-600 text-dark-200 text-sm rounded-lg px-3 py-2.5 focus:border-gold-500 focus:outline-none"
            >
              <option value="">Todos</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FilterGroup>
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs px-3 py-1.5 rounded-lg border transition-all font-medium",
        active
          ? "bg-gold-600 border-gold-500 text-dark-900"
          : "bg-dark-700 border-dark-600 text-dark-300 hover:border-gold-600 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
