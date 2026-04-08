"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Inazuia page kurefresh
    setLoading(true);

    try {
      // 1. Ingia kwenye Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        throw new Error(authError?.message || "Imefeli kuingia.");
      }

      // 2. Vuta profile (Tumeongeza "*" ili kuepuka kosa la 406 la column moja)
      // Pia tunatumia .maybeSingle() badala ya .single() ili kuzuia kosa likiwa tupu
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*") 
        .eq("id", authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile Error:", profileError);
        throw new Error("Tatizo la kiufundi kwenye database.");
      }

      if (!profile) {
        throw new Error("Akaunti yako haijatengenezwa kwenye profiles table.");
      }

      // 3. Hakikisha ni admin (Tunatumia herufi ndogo kwenye 'admin')
      if (profile.role?.toLowerCase() !== "admin") {
        await supabase.auth.signOut(); // Logout kama sio admin
        throw new Error("Hauna ruhusa. Sehemu hii ni ya Admin pekee.");
      }

      // 4. Kama kila kitu kipo sawa, nenda admin dashboard
      router.push("/admin");
      router.refresh(); // Inalazimisha Next.js kusoma upya server state

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {loading ? "Inahakiki..." : "Ingia"}
          </button>
        </form>
      </div>
    </div>
  );
}
