import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Mail, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mensajes de contacto" };

async function isAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  return data?.role === "admin";
}

async function markAsRead(formData: FormData) {
  "use server";
  // La base de datos también lo exige (solo administradores pueden actualizar).
  if (!(await isAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("contactos").update({ leido: true }).eq("id", id);
  revalidatePath("/dashboard/mensajes");
}

export default async function MessagesPage() {
  // A quien no es administrador se le muestra un 404, como si la página no existiera.
  if (!(await isAdmin())) notFound();

  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contactos")
    .select("id, nombre, email, asunto, mensaje, leido, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const unread = (messages ?? []).filter((m) => !m.leido).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1">Mensajes de contacto</h1>
        <p className="text-dark-400 text-sm">
          {unread > 0
            ? `${unread} sin leer · ${messages?.length ?? 0} en total`
            : `${messages?.length ?? 0} en total`}
        </p>
      </div>

      {!messages || messages.length === 0 ? (
        <div className="card-dark p-16 text-center">
          <Mail size={32} className="text-dark-500 mx-auto mb-3" />
          <p className="text-dark-400">Aún no has recibido mensajes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <article
              key={m.id}
              className={`card-dark p-5 ${m.leido ? "opacity-70" : "border-gold-600/40"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h2 className="text-white font-bold text-base break-words">{m.asunto}</h2>
                  <p className="text-dark-400 text-xs mt-0.5">
                    {m.nombre} ·{" "}
                    <a
                      href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.asunto}`)}`}
                      className="text-gold-400 hover:underline break-all"
                    >
                      {m.email}
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <time className="text-dark-500 text-xs">
                    {new Date(m.created_at).toLocaleString("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                  {m.leido ? (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <CheckCircle size={13} /> Leído
                    </span>
                  ) : (
                    <form action={markAsRead}>
                      <input type="hidden" name="id" value={m.id} />
                      <button
                        type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg border border-dark-600 text-dark-200 hover:border-gold-500 hover:text-white transition-colors"
                      >
                        Marcar como leído
                      </button>
                    </form>
                  )}
                </div>
              </div>
              <p className="text-dark-200 text-sm whitespace-pre-wrap break-words">
                {m.mensaje}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
