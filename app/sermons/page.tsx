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

  // 🔐 ROLE
  const [role, setRole] = useState<string | null>(null);
  const isAdmin = role === "admin";

  // ➕ FORM STATE
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Sermon | null>(null);

  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("");
  const [videourl, setVideourl] = useState("");

  // 📥 INIT
  useEffect(() => {
    fetchData();
    getUserRole();
  }, []);

  // 📥 FETCH
  const fetchData = async () => {
    const res = await fetch("/api/sermons");
    const data = await res.json();
    setSermons(data);
    setLoading(false);
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

  // 🔍 FILTER
  const filteredSermons = sermons.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.preacher.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ CREATE / UPDATE
  const handleSubmit = async () => {
    if (!title.trim() || !preacher.trim() || !videourl.trim()) {
      return alert("Jaza taarifa zote");
    }

    if (editItem) {
      await fetch(`/api/sermons/${editItem.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, preacher, videourl }),
      });
    } else {
      await fetch("/api/sermons", {
        method: "POST",
        body: JSON.stringify({ title, preacher, videourl }),
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

      {/* 🎨 HERO */}
      <div
        className="relative text-white py-24 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Mahubiri ya Neno
          </h1>
          <p className="opacity-90">
            Sikiliza na jifunze kupitia mafundisho
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
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
              + Ongeza Mahubiri
            </button>
          )}
        </div>

        {/* LIST */}
        {loading ? (
          <p>Inapakia...</p>
        ) : filteredSermons.length === 0 ? (
          <p className="text-gray-500">
            Hakuna mahubiri yaliyopatikana
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSermons.map((s) => (
              <div
                key={s.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-blue-600">
                  {s.title}
                </h3>

                <p className="text-gray-600">{s.preacher}</p>

                <iframe
                  src={s.videourl}
                  className="w-full h-52 rounded mt-3"
                  allowFullScreen
                />

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
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-xl font-bold">
              {editItem ? "Edit Mahubiri" : "Ongeza Mahubiri"}
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
              placeholder="YouTube Embed URL"
              value={videourl}
              onChange={(e) => setVideourl(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                {editItem ? "Update" : "Save"}
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