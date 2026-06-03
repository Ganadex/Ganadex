import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { AnimalGallery } from "@/components/animal/AnimalGallery";
import { GanadexContactCard } from "@/components/animal/GanadexContactCard";
import {
  formatAge,
  formatPrice,
  formatWeight,
  getCategoryLabel,
  getSexLabel,
} from "@/lib/utils";
import { MapPin, Weight, Calendar, Tag, Dna, FileText, Eye } from "lucide-react";
import type { Animal } from "@/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("ganado")
    .select("nombre, descripcion, razas(nombre)")
    .eq("id", id)
    .single();

  if (!data) return { title: "Ejemplar no encontrado" };

  return {
    title: data.nombre,
    description: data.descripcion.slice(0, 160),
  };
}

export default async function AnimalPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: animal } = await supabase
    .from("ganado")
    .select(
      `*, breed:razas(*),
      images:imagenes_ganado(*),
      videos:videos_ganado(*)`
    )
    .eq("id", id)
    .single();

  if (!animal) notFound();

  // Incrementar vistas
  await supabase.rpc("increment_vistas", { ganado_id: id });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = animal as any;
  const images = (a.images ?? []).sort((x: any, y: any) => (x.orden ?? 0) - (y.orden ?? 0));

  const details = [
    { icon: Tag, label: "Categoría", value: getCategoryLabel(a.categoria) },
    { icon: Tag, label: "Sexo", value: getSexLabel(a.sexo) },
    { icon: Calendar, label: "Edad", value: formatAge(a.edad_meses) },
    { icon: Weight, label: "Peso", value: formatWeight(a.peso_kg) },
    { icon: MapPin, label: "Ubicación", value: `${a.ubicacion}, ${a.estado}, ${a.pais}` },
    { icon: Eye, label: "Vistas", value: (a.vistas ?? 0).toLocaleString("es-CO") },
  ];

  if (a.numero_registro) {
    details.push({ icon: FileText, label: "No. Registro", value: a.numero_registro });
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-dark-400 mb-8">
          <a href="/" className="hover:text-gold-400 transition-colors">Inicio</a>
          <span>/</span>
          <a href="/ganado" className="hover:text-gold-400 transition-colors">Ganado</a>
          <span>/</span>
          <span className="text-dark-200">{a.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <AnimalGallery images={images} animalName={a.nombre} />

            {/* Heading */}
            <div>
              {a.breed && (
                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider mb-1">
                  {a.breed.nombre}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{a.nombre}</h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-black text-gradient-gold">
                  {formatPrice(a.precio, a.moneda)}
                </p>
                <span
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                    a.status === "disponible"
                      ? "bg-green-900/40 text-green-300 border border-green-700/30"
                      : a.status === "reservado"
                      ? "bg-yellow-900/40 text-yellow-300 border border-yellow-700/30"
                      : "bg-red-900/40 text-red-300 border border-red-700/30"
                  }`}
                >
                  {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div className="card-dark p-6">
              <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
                Ficha del Ejemplar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 mb-0.5">{label}</p>
                      <p className="text-sm text-white font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card-dark p-6">
              <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Descripción
              </h2>
              <p className="text-dark-200 leading-relaxed text-sm whitespace-pre-line">
                {a.descripcion}
              </p>
            </div>

            {/* Genetic info */}
            {a.informacion_genetica && (
              <div className="card-dark p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Dna size={16} className="text-gold-500" />
                  <h2 className="text-white font-bold text-sm uppercase tracking-wider">
                    Información Genética
                  </h2>
                </div>
                <p className="text-dark-200 leading-relaxed text-sm whitespace-pre-line">
                  {a.informacion_genetica}
                </p>
              </div>
            )}

            {/* Pedigree */}
            {a.pedigree && (
              <div className="card-dark p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} className="text-gold-500" />
                  <h2 className="text-white font-bold text-sm uppercase tracking-wider">
                    Pedigrí
                  </h2>
                </div>
                <p className="text-dark-200 leading-relaxed text-sm whitespace-pre-line">
                  {a.pedigree}
                </p>
              </div>
            )}

            {/* Videos */}
            {a.videos && a.videos.length > 0 && (
              <div className="card-dark p-6">
                <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
                  Videos
                </h2>
                <div className="space-y-4">
                  {a.videos.map((v) => (
                    <div key={v.id}>
                      {v.title && <p className="text-dark-300 text-sm mb-2">{v.title}</p>}
                      <video
                        controls
                        className="w-full rounded-xl bg-dark-700"
                        poster={v.thumbnail_url ?? undefined}
                      >
                        <source src={v.url} type="video/mp4" />
                        Tu navegador no soporta video.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Ganadex contact */}
          <div className="space-y-4">
            <GanadexContactCard animalName={a.nombre} />

            {/* Share */}
            <div className="card-dark p-5">
              <p className="text-dark-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Compartir
              </p>
              <p className="text-dark-300 text-xs break-all select-all">
                {typeof window !== "undefined" ? window.location.href : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
