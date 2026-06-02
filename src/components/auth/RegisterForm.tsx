"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

export function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    asSeller: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const update = (k: keyof typeof form, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="card-dark p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-white font-bold text-xl">¡Cuenta creada!</h3>
        <p className="text-dark-300 text-sm">
          Revisa tu correo electrónico <strong className="text-white">{form.email}</strong> para
          confirmar tu cuenta y comenzar a usar Ganadex.
        </p>
        <Link href="/auth/login" className="btn-gold block text-center mt-4">
          Ir al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-dark p-8 space-y-5">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-700/40 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">Nombre completo</label>
        <input
          type="text"
          required
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Juan García"
          className="w-full bg-dark-700 border border-dark-600 text-white placeholder-dark-500 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">Correo electrónico</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="tu@correo.com"
          className="w-full bg-dark-700 border border-dark-600 text-white placeholder-dark-500 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">Contraseña</label>
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            required
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="w-full bg-dark-700 border border-dark-600 text-white placeholder-dark-500 rounded-xl px-4 py-3 pr-11 text-sm focus:border-gold-500 focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">Confirmar contraseña</label>
        <input
          type="password"
          required
          value={form.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          placeholder="••••••••"
          className="w-full bg-dark-700 border border-dark-600 text-white placeholder-dark-500 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            checked={form.asSeller}
            onChange={(e) => update("asSeller", e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              form.asSeller ? "bg-gold-600 border-gold-500" : "border-dark-500 bg-dark-700"
            }`}
          >
            {form.asSeller && <span className="text-dark-900 text-xs font-bold">✓</span>}
          </div>
        </div>
        <span className="text-dark-300 text-sm">
          Quiero registrarme como{" "}
          <span className="text-gold-400 font-medium">vendedor de ganado</span>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creando cuenta...
          </>
        ) : (
          "Crear cuenta gratuita"
        )}
      </button>

      <p className="text-center text-dark-400 text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="text-gold-500 hover:text-gold-400 font-medium transition-colors">
          Iniciar sesión
        </Link>
      </p>

      <p className="text-center text-dark-500 text-xs">
        Al registrarte aceptas nuestros{" "}
        <Link href="/terminos" className="underline hover:text-dark-300">Términos de servicio</Link>{" "}
        y{" "}
        <Link href="/privacidad" className="underline hover:text-dark-300">Política de privacidad</Link>.
      </p>
    </form>
  );
}
