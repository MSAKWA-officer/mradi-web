"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

type Announcement = {
  id: string;
  title: string;
  message: string;
  image_url?: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔐 CHECK ADMIN
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError || profile?.role !== "admin") {
          router.push("/");
          return;
        }

        setRole("admin");
        setCheckingAuth(false);
        fetchData();
      } catch (err) {
        router.push("/login");
      }
    };

    checkAdmin();
  }, [router]);

  // 📥 FETCH DATA
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setAnnouncements(data || []);
    }
  };

  // 📤 UPLOAD FILE
  const uploadFile = async () => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("announcements")
      .upload(fileName, file);

    if (error) {
      alert("Imeshindwa kupakia picha: " + error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("announcements")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ➕ ADD ANNOUNCEMENT
  const addAnnouncement = async () => {
    if (!title || !message) {
      alert("Tafadhali jaza kichwa cha habari na ujumbe.");
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadFile();
      const { error } = await supabase.from("announcements").insert([
        { title, message, image_url: imageUrl }
      ]);

      if (error) throw error;

      alert("Tangazo limeongezwa!");
      setTitle("");
      setMessage("");
      setFile(null);
      fetchData();
    } catch (error: any) {
      alert("Imeshindwa kuhifadhi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE ANNOUNCEMENT
  const deleteAnnouncement = async (id: string) => {
    if (!confirm("Je, una uhakika unataka kufuta tangazo hili?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (!error) fetchData();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold animate-pulse text-gray-600">
          Inathibitisha ruhusa ya Admin...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6 text-black">
      {/* HEADER (Kitufe cha Logout kimeondolewa hapa) */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-green-700">👑 Admin Dashboard</h1>
        <span className="text-sm text-gray-500 font-medium">Umeingia kama Admin</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORM */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md space-y-4 h-fit">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Ongeza Tangazo</h2>
          <div className="space-y-3">
            <input
              className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Kichwa cha Habari"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border p-2 rounded-lg h-32 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Andika ujumbe hapa..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button
              onClick={addAnnouncement}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg w-full font-bold transition disabled:bg-gray-400"
            >
              {loading ? "Inahifadhi..." : "TUMA TANGAZO"}
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Matangazo Yaliyopo</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase">
                  <th className="p-3">Picha</th>
                  <th className="p-3">Habari</th>
                  <th className="p-3 text-center">Kitendo</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img src={a.image_url || "/no-image.png"} className="h-12 w-12 object-cover rounded-md" />
                    </td>
                    <td className="p-3">
                      <p className="font-bold">{a.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{a.message}</p>
                    </td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => deleteAnnouncement(a.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Futa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
