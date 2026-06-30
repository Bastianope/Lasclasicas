"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("¡Cuenta creada! Revisá tu email para confirmar.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/anuncios");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <main className="px-4 py-20 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-8 text-center">
        {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Contraseña</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-background font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Cargando..."
            : mode === "login"
            ? "Iniciar Sesión"
            : "Crear Cuenta"}
        </button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-6">
        {mode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setMessage(null);
          }}
          className="text-accent hover:underline"
        >
          {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </p>
    </main>
  );
}
