"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2, CheckCircle } from "lucide-react";
import type { Breed } from "@/types";

interface Props {
  sellerId: string;
  breeds: Breed[];
  initialData?: Record<string, unknown>;
}

const categories = [
  { value: "leche", label: "Ganado de Leche" },
  { value: "carne", label: "Ganado de Carne" },
  { value: "doble_proposito", label: "Doble Propósito" },
];

const currencies = ["COP", "USD", "MXN", "PEN", "ARS", "BRL"];

export function PublishAnimalForm({ sellerId, breeds, initialData }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    nombre: (initialData?.nombre as string) ?? "",
    raza_id: (initialData?.raza_id as string) ?? "",
    categoria: (initialData?.categoria as string) ?? "carne",
    sexo: (initialData?.sexo as string) ?? "macho",
    edad_meses: (initialData?.edad_meses as number) ?? 12,
    peso_kg: (initialData?.peso_kg as number) ?? 400,
    precio: (initialData?.precio as number) ?? 0,
    moneda: (initialData?.moneda as string) ?? "COP",
    ubicacion: (initialData?.ubicacion as string) ?? "",
    estado: (initialData?.estado as string) ?? "",
    pais: (initialData?.pais as string) ?? "Colombia",
    descripcion: (initialData?.descripcion as string) ?? "",
    informacion_genetica: (initialData?.informacion_genetica as string) ?? "",
    pedigree: (initialData?.pedigree as string) ?? "",
    numero_registro: (initialData?.numero_registro as string) ?? "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const valid = files.filter((f) => f.type.startsWith("image/")).slice(0, 8 - images.length);

    setImages((prev) => [...prev, ...valid]);
    valid.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setImagePreviews((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Insertar ganado
      const { data: animal, error: insertError } = await supabase
        .from("ganado")
        .insert({
          vendedor_id: sellerId,
          ...form,
          edad_meses: Number(form.edad_meses),
          peso_kg: Number(form.peso_kg),
          precio: Number(form.precio),
        })
        .select("id")
        .single();

      if (insertError || !animal) throw insertError ?? new Error("Error al publicar");

      // Subir imágenes
      if (images.length > 0) {
        await Promise.all(
          images.map(async (file, idx) => {
            const ext = file.name.split(".").pop();
            const path = `ganado/${animal.id}/${idx}.${ext}`;
            const { error: uploadError } = await supabase.storage
              .from("ganadex-media")
              .upload(path, file, { upsert: true });

            if (uploadError) return;

            const { data: { publicUrl } } = supabase.storage
              .from("ganadex-media")
              .getPublicUrl(path);

            await supabase.from("imagenes_ganado").insert({
              ganado_id: animal.id,
              url: publicUrl,
              es_portada: idx === 0,
              orden: idx,
            });
          })
        );
      }

      setSuccess(true);
      setTimeout(() => router.push(`/ganado/${animal.id}`), 2000);
    } catch {
      setError("Ocurrió un error al publicar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card-dark p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-white font-black text-xl mb-2">¡Publicado con éxito!</h3>
        <p className="text-dark-300 text-sm">Redirigiendo al perfil del ejemplar...</p>
      </div>
    );
  }

  const inputClass = "w-full bg-dark-700 border border-dark-600 text-white placeholder-dark-500 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors";
  const labelClass = "block text-sm font-medium text-dark-200 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-700/40 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Basic info */}
      <div className="card-dark p-6">
        <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
          Información básica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nombre del ejemplar *</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              placeholder="Ej: Estrella del Norte 342"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Raza *</label>
            <select
              required
              value={form.raza_id}
              onChange={(e) => update("raza_id", e.target.value)}
              className={inputClass}
            >
              <option value="">Seleccionar raza</option>
              {breeds.map((b) => (
                <option key={b.id} value={b.id}>{b.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Categoría *</label>
            <select
              required
              value={form.categoria}
              onChange={(e) => update("categoria", e.target.value)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Sexo *</label>
            <select
              required
              value={form.sexo}
              onChange={(e) => update("sexo", e.target.value)}
              className={inputClass}
            >
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>No. Registro</label>
            <input
              type="text"
              value={form.numero_registro}
              onChange={(e) => update("numero_registro", e.target.value)}
              placeholder="Opcional"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Physical data */}
      <div className="card-dark p-6">
        <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
          Datos físicos y precio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Edad (meses) *</label>
            <input
              type="number"
              required
              min={1}
              max={360}
              value={form.edad_meses}
              onChange={(e) => update("edad_meses", Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Peso (kg) *</label>
            <input
              type="number"
              required
              min={1}
              value={form.peso_kg}
              onChange={(e) => update("peso_kg", Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Precio *</label>
            <input
              type="number"
              required
              min={0}
              value={form.precio}
              onChange={(e) => update("precio", Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Moneda</label>
            <select
              value={form.moneda}
              onChange={(e) => update("moneda", e.target.value)}
              className={inputClass}
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="card-dark p-6">
        <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
          Ubicación
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Ciudad / Municipio *</label>
            <input
              type="text"
              required
              value={form.ubicacion}
              onChange={(e) => update("ubicacion", e.target.value)}
              placeholder="Bogotá"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Departamento *</label>
            <input
              type="text"
              required
              value={form.estado}
              onChange={(e) => update("estado", e.target.value)}
              placeholder="Cundinamarca"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>País</label>
            <input
              type="text"
              value={form.pais}
              onChange={(e) => update("pais", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card-dark p-6">
        <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
          Descripción e información genética
        </h2>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Descripción general *</label>
            <textarea
              required
              rows={4}
              value={form.descripcion}
              onChange={(e) => update("descripcion", e.target.value)}
              placeholder="Describe las características del ejemplar..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>Información genética</label>
            <textarea
              rows={3}
              value={form.informacion_genetica}
              onChange={(e) => update("informacion_genetica", e.target.value)}
              placeholder="DEP, EPD, % razas, pruebas genéticas..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>Pedigrí</label>
            <textarea
              rows={3}
              value={form.pedigree}
              onChange={(e) => update("pedigree", e.target.value)}
              placeholder="Padre, madre, abuelos..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="card-dark p-6">
        <h2 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
          Fotos del ejemplar
        </h2>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-dark-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 text-xs bg-gold-600 text-dark-900 px-1.5 py-0.5 rounded font-bold">
                    Portada
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-dark-900/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length < 8 && (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-dark-600 rounded-xl p-8 cursor-pointer hover:border-gold-600 transition-colors">
            <Upload size={24} className="text-dark-400 mb-2" />
            <p className="text-dark-300 text-sm font-medium">Subir fotos</p>
            <p className="text-dark-500 text-xs mt-1">
              {images.length}/8 · JPG, PNG, WEBP
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="sr-only"
            />
          </label>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold flex items-center justify-center gap-2 text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Publicando...
          </>
        ) : (
          "Publicar ejemplar"
        )}
      </button>
    </form>
  );
}
