import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mb-8">
        <span className="text-dark-900 font-black text-3xl">G</span>
      </div>
      <h1 className="text-6xl font-black text-gradient-gold mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-3">Página no encontrada</h2>
      <p className="text-dark-300 mb-8 max-w-sm">
        El ejemplar o la página que buscas no existe o fue removida.
      </p>
      <Link href="/" className="btn-gold">
        Volver al inicio
      </Link>
    </div>
  );
}
