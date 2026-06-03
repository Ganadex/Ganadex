import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PlusCircle, Edit, Eye, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mis publicaciones" };

export default async function MyAnimalsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: seller } = await supabase
    .from("vendedores")
    .select("id")
    .eq("user_id", user!.id)
    .single();

  if (!seller) {
    return (
      <div className="card-dark p-10 text-center">
        <p className="text-dark-400 mb-4">Primero debes crear tu perfil de vendedor.</p>
        <Link href="/dashboard/vendedor/nuevo" className="btn-gold inline-block">
          Crear perfil
        </Link>
      </div>
    );
  }

  const { data: animals } = await supabase
    .from("ganado")
    .select(`id, nombre, precio, moneda, status, vistas, categoria, created_at,
      raza:razas(nombre),
      images:imagenes_ganado(url, es_portada)`)
    .eq("vendedor_id", seller.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white">Mis publicaciones</h1>
        <Link href="/dashboard/ganado/nuevo" className="btn-gold flex items-center gap-2 text-sm py-2.5 px-4">
          <PlusCircle size={16} />
          Nueva
        </Link>
      </div>

      {!animals || animals.length === 0 ? (
        <div className="card-dark p-16 text-center">
          <p className="text-dark-400 mb-4">Aún no tienes publicaciones.</p>
          <Link href="/dashboard/ganado/nuevo" className="btn-gold inline-block">
            Publicar primer ejemplar
          </Link>
        </div>
      ) : (
        <div className="card-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                    Ejemplar
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider hidden sm:table-cell">
                    Precio
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider hidden md:table-cell">
                    Estado
                  </th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider hidden lg:table-cell">
                    Vistas
                  </th>
                  <th className="text-right px-5 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {animals.map((a) => {
                  const cover = a.images?.find((i: { es_portada: boolean }) => i.es_portada) ?? a.images?.[0];
                  return (
                    <tr key={a.id} className="hover:bg-dark-700/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-dark-700 overflow-hidden shrink-0">
                            {cover && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={cover.url}
                                alt={a.nombre}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{a.nombre}</p>
                            <p className="text-dark-500 text-xs">
                              {(a.raza as unknown as { nombre: string } | null)?.nombre ?? a.categoria}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-gold-500 font-semibold text-sm">
                          {formatPrice(a.precio, a.moneda)}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full ${
                            a.status === "disponible"
                              ? "bg-green-900/40 text-green-300"
                              : a.status === "reservado"
                              ? "bg-yellow-900/40 text-yellow-300"
                              : "bg-red-900/40 text-red-300"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-dark-300 text-sm">{a.vistas}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/ganado/${a.id}`}
                            target="_blank"
                            className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-600 transition-colors"
                            title="Ver"
                          >
                            <Eye size={14} />
                          </Link>
                          <Link
                            href={`/dashboard/ganado/${a.id}/editar`}
                            className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-dark-400 hover:text-gold-400 hover:bg-dark-600 transition-colors"
                            title="Editar"
                          >
                            <Edit size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
