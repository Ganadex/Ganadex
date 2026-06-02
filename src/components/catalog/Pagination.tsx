"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
}

export function Pagination({ page, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 rounded-lg bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-300 hover:border-gold-500 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis && (
              <span className="text-dark-500 text-sm px-1">…</span>
            )}
            <button
              onClick={() => goTo(p)}
              className={cn(
                "w-9 h-9 rounded-lg text-sm font-medium transition-all",
                p === page
                  ? "gradient-gold text-dark-900 font-bold"
                  : "bg-dark-700 border border-dark-600 text-dark-300 hover:border-gold-500 hover:text-white"
              )}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-lg bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-300 hover:border-gold-500 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
