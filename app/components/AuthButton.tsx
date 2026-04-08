"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js navigation ni bora zaidi

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Kagua mtumiaji aliyepo sasa hivi
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    // 2. SIKILIZA mabadiliko (Login/Logout) bila kuhitaji kurefresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Clean up subscription pale component inapofungwa
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Inatuma mtumiaji home bila kurefresh browser nzima
  };

  // Kuzuia kitufe kuonekana kikiwa bado kinajisechi (loading)
  if (loading) return <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>;

  return (
    <>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium transition"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/auth"
          className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-white font-bold transition"
        >
          Login
        </Link>
      )}
    </>
  );
}
