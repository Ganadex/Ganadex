"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2 } from "lucide-react";

const COLOMBIA_STATES = [
  "Amazonas","Antioquia","Arauca","Atlántico","Bolívar","Boyacá","Caldas",
  "Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca",
  "Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño",
  "Norte de Santander","Putumayo","Quindío","Risaralda","San Andrés","Santander",
  "Sucre","Tolima","Valle del Cauca","Vaupés","Vichada",
];

interface SellerData {
  id?: string;
  nombre_completo: string;
  nombre_empresa: string;
  telefono: string;
  whatsapp: string;
  email: string;
  ubicacion: string;
  estado: string;
  pais: string;
  bio: string;
  documento_identidad: string;
}

interface Props {
  userId: string;
  initialData?: SellerData | null;
}

const empty: SellerData = {
  nombre_completo: "",
  nombre_empresa: "",
  telefono: "",
  whatsapp: "",
  email: "",
  ubicacion: "",
  estado: "",
  pais: "Colombia",
  bio: "",
  documento_identidad: "",
};

export function SellerProfileForm({ userId, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<SellerData>(initialData ?? empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof SellerData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const payload = { ...form, user_id: userId, updated_at: new Date().toISOString() };

    const { error: err } = initialData?.id
      ? await supabase.from("vendedores").update(payload).eq("id", initialData.id)
      : await supabase.from("vendedores").insert(payload);

    setLoading(false);
    if (err) { setError(err.message); return; }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info personal */}
      <div className="card-dark p-6 space-y-4">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider border-b border-dark-700 pb-3">
          Información personal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nombre completo *" required>
            <input
              type="text"
              value={form.nombre_completo}
              onChange={set("nombre_completo")}
              required
              placeholder="Juan García"
              className="input-dark"
            />
          </Field>
          <Field label="Nombre de la ganadería / empresa">
            <input
              type="text"
              value={form.nombre_empresa}
              onChange={set("nombre_empresa")}
              placeholder="Ganadería San Fernando"
              className="input-dark"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Cédula / Documento de identidad *" required>
            <input
              type="text"
              value={form.documento_identidad}
              onChange={set("documento_identidad")}
              required
              placeholder="1234567890"
              className="input-dark"
            />
          </Field>
          <Field label="Email de contacto *" required>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              required
              placeholder="juan@example.com"
              className="input-dark"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Teléfono *" required>
            <input
              type="tel"
              value={form.telefono}
              onChange={set("telefono")}
              required
              placeholder="+57 300 000 0000"
              className="input-dark"
            />
          </Field>
          <Field label="WhatsApp *" required>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={set("whatsapp")}
              required
              placeholder="+57 300 000 0000"
              className="input-dark"
            />
          </Field>
        </div>
      </div>

      {/* Ubicación */}
      <div className="card-dark p-6 space-y-4">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider border-b border-dark-700 pb-3">
          Ubicación
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Municipio / Ciudad *" required>
            <input
              type="text"
              value={form.ubicacion}
              onChange={set("ubicacion")}
              required
              placeholder="Montería"
              className="input-dark"
            />
          </Field>
          <Field label="Departamento *" required>
            <select value={form.estado} onChange={set("estado")} required className="input-dark">
              <option value="">Seleccionar...</option>
              {COLOMBIA_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {/* Bio */}
      <div className="card-dark p-6 space-y-4">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider border-b border-dark-700 pb-3">
          Descripción de la ganadería
        </h2>
        <Field label="Cuéntanos sobre tu ganadería (años de experiencia, especialidad, etc.)">
          <textarea
            value={form.bio}
            onChange={set("bio")}
            rows={4}
            placeholder="Ganadería con 20 años de experiencia en bovinos de alta genética..."
            className="input-dark resize-none"
          />
        </Field>
      </div>

      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4 text-sm text-dark-400">
        🔒 Esta información es <strong className="text-dark-300">confidencial</strong> — los compradores nunca verán tu teléfono, WhatsApp ni datos personales. Solo Ganadex tiene acceso.
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {loading ? "Guardando..." : initialData ? "Guardar cambios" : "Crear perfil"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-dark-300 text-xs font-medium">{label}</label>
      {children}
    </div>
  );
}
