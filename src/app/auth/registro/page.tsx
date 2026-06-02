import { RegisterForm } from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center mx-auto mb-5">
            <span className="text-dark-900 font-black text-2xl">G</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Crear cuenta</h1>
          <p className="text-dark-400 text-sm">Únete a la plataforma de ganado elite</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
