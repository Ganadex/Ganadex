"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Resumen" },
  { href: "/dashboard/ganado", icon: List, label: "Mis publicaciones" },
  { href: "/dashboard/ganado/nuevo", icon: PlusCircle, label: "Nueva publicación" },
  { href: "/dashboard/perfil", icon: User, label: "Mi perfil" },
];

interface Props {
  user: User;
}

export function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="card-dark p-4 sticky top-24">
        {/* User info */}
        <div className="flex items-center gap-3 px-2 py-3 mb-3 border-b border-dark-700">
          <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center shrink-0">
            <span className="text-dark-900 font-black text-sm">
              {(user.user_metadata?.full_name ?? user.email ?? "U").charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">
              {user.user_metadata?.full_name ?? "Mi cuenta"}
            </p>
            <p className="text-dark-500 text-xs truncate">{user.email}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-gold-600/20 text-gold-400 border border-gold-600/30"
                  : "text-dark-300 hover:text-white hover:bg-dark-700"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-dark-700">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-dark-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
