"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// ✅ TYPE
type Sermon = {
  id: string;
  title: string;
  preacher: string;
  videourl: string;
};

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [role, setRole] = useState<string | null>(null);
  const isAdmin = role === "admin";

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Sermon | null>(null);

  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("");
  const [videourl, setVideourl] = useState("");

  // ✅ Convert YouTube URL → Embed URL
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("embed")) return url;

      const videoId =
        url.includes("youtu.be/")
          ? url.split("youtu.be/")[1]?.split("?")[0]
          : url.split("v=")[1]?.split("&")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return "";
    }
  };

  // 📥 FETCH (FIXED 🔥)
  const fetchData = async () => {
    try {
      const res = await fetch("/api/sermons");
      const data = await res.json();

      console.log("FETCHED:", data);

      // ✅ muhimu sana (fix ya error yako)
      setSermons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("FETCH ERROR:", error);
      setSermons([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 GET ROLE
  const getUserRole = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setRole(data?.role);
  };

  // 📥 INIT
  useEffect(() => {
    fetchData();
    getUserRole();
  }, []);

  // 🔍 FILTER (SAFE 🔥)
  const filteredSermons = Array.isArray(sermons)
    ? sermons.filter(
        (s) =>
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.preacher?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // ➕ CREATE / UPDATE
  const handleSubmit = async () => {
    if (!title.trim() || !preacher.trim() || !videourl.trim()) {
      return alert("Jaza taarifa zote");
    }

    const embedUrl = getEmbedUrl(videourl);

    if (!embedUrl) {
      return alert("Weka link sahihi ya YouTube");
    }

    if (editItem) {
      await fetch(`/api/sermons/${editItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          preacher,
          videourl: embedUrl,
        }),
      });
    } else {
      await fetch("/api/sermons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          preacher,
          videourl: embedUrl,
        }),
      });
    }

    resetForm();
    fetchData();
  };

  // ✏️ EDIT
  const handleEdit = (item: Sermon) => {
    setEditItem(item);
    setTitle(item.title);
    setPreacher(item.preacher);
    setVideourl(item.videourl);
    setShowForm(true);
  };

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Una uhakika unataka kufuta?")) return;

    await fetch(`/api/sermons/${id}`, {
      method: "DELETE",
    });

    setSermons((prev) => prev.filter((s) => s.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setPreacher("");
    setVideourl("");
    setEditItem(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="relative text-white py-24 text-center bg-black">
        <h1 className="text-4xl font-bold">Mahubiri ya Neno</h1>
        <p className="opacity-80">Sikiliza na ujifunze</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Tafuta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border rounded-lg w-64"
          />

          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              + Ongeza
            </button>
          )}
        </div>

        {/* LIST */}
        {loading ? (
          <p>Inapakia...</p>
        ) : filteredSermons.length === 0 ? (
          <p>Hakuna data</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSermons.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <iframe
                  src={s.videourl}
                  className="w-full h-52 rounded-t-xl"
                  allowFullScreen
                />

                <div className="p-4">
                  <h3 className="font-bold text-blue-600">{s.title}</h3>
                  <p className="text-gray-600">{s.preacher}</p>

                  {isAdmin && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleEdit(s)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-xl font-bold">
              {editItem ? "Edit" : "Ongeza"}
            </h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Preacher"
              value={preacher}
              onChange={(e) => setPreacher(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Bandika YouTube link"
              value={videourl}
              onChange={(e) => setVideourl(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Save
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}