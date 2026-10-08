"use client";

import { useState, useTransition } from "react";
import { Loader2, UserPlus, Save } from "lucide-react";
import { TEAM_SECTIONS } from "@/lib/team-sections";
import {
  createTeamMember,
  updateTeamMemberAccess,
} from "@/app/dashboard/equipo/actions";

export interface TeamMember {
  id: string;
  email: string;
  fullName: string;
  permisos: string[];
}

function SectionPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (key: string) =>
    onChange(value.includes(key) ? value.filter((k) => k !== key) : [...value, key]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {TEAM_SECTIONS.map((s) => (
        <label
          key={s.key}
          className="flex items-start gap-3 p-3 rounded-lg border border-dark-700 hover:border-gold-600/40 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={value.includes(s.key)}
            onChange={() => toggle(s.key)}
            className="mt-1 accent-yellow-500"
          />
          <span>
            <span className="block text-white text-sm font-medium">{s.label}</span>
            <span className="block text-dark-400 text-xs">{s.description}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

function MemberRow({ member }: { member: TeamMember }) {
  const [permisos, setPermisos] = useState(member.permisos);
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");

  const save = () =>
    startTransition(async () => {
      const res = await updateTeamMemberAccess({ userId: member.id, permisos });
      setMsg(res.ok ? (permisos.length ? "Guardado" : "Acceso retirado") : res.error);
    });

  return (
    <div className="py-5 space-y-3">
      <div>
        <p className="text-white text-sm font-semibold">{member.fullName || member.email}</p>
        {member.fullName && <p className="text-dark-400 text-xs">{member.email}</p>}
      </div>
      <SectionPicker value={permisos} onChange={setPermisos} />
      <div className="flex items-center gap-3">
        <button onClick={save} disabled={pending} className="btn-outline-gold text-sm flex items-center gap-2">
          {pending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Guardar
        </button>
        {msg && <span className="text-dark-300 text-xs">{msg}</span>}
      </div>
      {permisos.length === 0 && (
        <p className="text-yellow-500 text-xs">
          Sin secciones: al guardar, este usuario dejará de aparecer en la lista y perderá el acceso.
        </p>
      )}
    </div>
  );
}

export function TeamManager({ members }: { members: TeamMember[] }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [permisos, setPermisos] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [created, setCreated] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCreated("");
    startTransition(async () => {
      const res = await createTeamMember({ ...form, permisos });
      if (!res.ok) return setError(res.error);
      setCreated(form.email);
      setForm({ fullName: "", email: "", password: "" });
      setPermisos([]);
    });
  };

  return (
    <>
      <form onSubmit={submit} className="card-dark p-6 space-y-4">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider border-b border-dark-700 pb-3">
          Agregar usuario
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="input-dark"
            placeholder="Nombre"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            className="input-dark"
            type="email"
            required
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input-dark sm:col-span-2"
            type="text"
            required
            minLength={8}
            autoComplete="off"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div>
          <p className="text-dark-300 text-xs mb-2">Secciones con acceso</p>
          <SectionPicker value={permisos} onChange={setPermisos} />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {created && (
          <p className="text-green-400 text-sm">
            Usuario {created} creado. Compártele su correo y contraseña.
          </p>
        )}
        <button type="submit" disabled={pending} className="btn-gold flex items-center gap-2">
          {pending ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
          Crear usuario
        </button>
      </form>

      <div className="card-dark p-6">
        <h2 className="text-white font-bold text-sm uppercase tracking-wider border-b border-dark-700 pb-3">
          Miembros del equipo
        </h2>
        {members.length === 0 ? (
          <p className="text-dark-400 text-sm pt-4">Aún no has agregado a nadie.</p>
        ) : (
          <div className="divide-y divide-dark-700">
            {members.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
