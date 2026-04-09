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

type Message = {
  id: string;
  sender_email: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔐 CHECK ADMIN
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.role !== "admin") {
        router.push("/");
        return;
      }

      setCheckingAuth(false);
      fetchAnnouncements();
      fetchMessages();
    };

    checkAdmin();
  }, [router]);

  // 📥 FETCH ANNOUNCEMENTS
  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    setAnnouncements(data || []);
  };

  // 📥 FETCH MESSAGES (API)
  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data || []);
  };

  // 📤 UPLOAD FILE
  const uploadFile = async () => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;

    await supabase.storage.from("announcements").upload(fileName, file);

    const { data } = supabase.storage
      .from("announcements")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ➕ ADD ANNOUNCEMENT
  const addAnnouncement = async () => {
    if (!title || !message) {
      alert("Jaza taarifa zote");
      return;
    }

    setLoading(true);

    const imageUrl = await uploadFile();

    await supabase.from("announcements").insert([
      { title, message, image_url: imageUrl },
    ]);

    setTitle("");
    setMessage("");
    setFile(null);

    fetchAnnouncements();
    setLoading(false);
  };

  // 🗑 DELETE ANNOUNCEMENT
  const deleteAnnouncement = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    fetchAnnouncements();
  };

  // 🗑 DELETE MESSAGE
  const deleteMessage = async (id: string) => {
    await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });
    fetchMessages();
  };

  if (checkingAuth) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-8 text-black">

      <h1 className="text-2xl font-bold text-green-700">
        👑 Admin Dashboard
      </h1>

      {/* ================= ANNOUNCEMENTS ================= */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-3">Ongeza Tangazo</h2>

          <input
            className="w-full border p-2 mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-2 mb-2"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

          <button
            onClick={addAnnouncement}
            className="bg-green-600 text-white px-3 py-2 mt-2 w-full"
          >
            {loading ? "Saving..." : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-3">Matangazo</h2>

          {announcements.map((a) => (
            <div key={a.id} className="border p-3 mb-2">
              <p className="font-bold">{a.title}</p>
              <p>{a.message}</p>

              <button
                onClick={() => deleteAnnouncement(a.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MESSAGES ================= */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          📩 Messages kutoka Users
        </h2>

        {messages.length === 0 ? (
          <p>Hakuna messages bado</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="border p-4 mb-3 rounded">
              <p className="font-semibold">{m.sender_email}</p>
              <p className="text-gray-700">{m.message}</p>

              <button
                onClick={() => deleteMessage(m.id)}
                className="mt-2 text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}