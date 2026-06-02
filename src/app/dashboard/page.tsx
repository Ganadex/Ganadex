import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PlusCircle, Eye, TrendingUp, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: seller } = await supabase
    .from("vendedores")
    .select("id, nombre_completo, verificado")
    .eq("user_id", user!.id)
    .single();

  if (!seller) {
    return (
      <div className="card-dark p-10 text-center">
        <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-6">
          <Package size={28} className="text-dark-900" />
        </div>
        <h2 className="text-white font-black text-2xl mb-3">
          Conviértete en vendedor
        </h2>
        <p className="text-dark-300 mb-8 max-w-sm mx-auto">
          Completa tu perfil de vendedor para comenzar a publicar ganado en Ganadex.
        </p>
        <Link href="/dashboard/vendedor/nuevo" className="btn-gold inline-block">
          Crear perfil de vendedor
        </Link>
      </div>
    );
  }

  const { data: animals, count } = await supabase
    .from("ganado")
    .select("id, nombre, precio, status, vistas, created_at", { count: "exact" })
    .eq("vendedor_id", seller.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const totalViews = animals?.reduce((acc, a) => acc + (a.vistas ?? 0), 0) ?? 0;

  const stats = [
    { icon: Package, label: "Publicaciones", value: count ?? 0, color: "text-blue-400" },
    { icon: Eye, label: "Vistas totales", value: totalViews.toLocaleString("es-CO"), color: "text-green-400" },
    { icon: TrendingUp, label: "Disponibles", value: animals?.filter((a) => a.status === "disponible").length ?? 0, color: "text-gold-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">
            Hola, {seller.nombre_completo.split(" ")[0]} 👋
          </h1>
          <p className="text-dark-400 text-sm mt-1">
            Resumen de tu actividad en Ganadex
          </p>
        </div>
        <Link href="/dashboard/ganado/nuevo" className="btn-gold flex items-center gap-2 text-sm py-2.5 px-4">
          <PlusCircle size={16} />
          Nueva publicación
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card-dark p-6">
            <Icon size={20} className={`${color} mb-3`} />
            <p className="text-2xl font-black text-white mb-1">{value}</p>
            <p className="text-dark-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent listings */}
      <div className="card-dark p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold">Publicaciones recientes</h2>
          <Link href="/dashboard/ganado" className="text-gold-500 text-sm hover:text-gold-400 transition-colors">
            Ver todas →
          </Link>
        </div>

        {!animals || animals.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-dark-400 text-sm mb-4">Aún no has publicado ganado.</p>
            <Link href="/dashboard/ganado/nuevo" className="btn-outline-gold text-sm inline-block">
              Publicar primer ejemplar
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {animals.map((a) => (
              <div key={a.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{a.nombre}</p>
                  <p className="text-dark-400 text-xs">{a.vistas} vistas</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gold-500 font-bold text-sm">
                    ${a.precio.toLocaleString("es-CO")}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      a.status === "disponible"
                        ? "bg-green-900/40 text-green-400"
                        : a.status === "reservado"
                        ? "bg-yellow-900/40 text-yellow-400"
                        : "bg-red-900/40 text-red-400"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
                <Link
                  href={`/dashboard/ganado/${a.id}/editar`}
                  className="text-dark-400 hover:text-gold-400 text-xs transition-colors shrink-0"
                >
                  Editar
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
