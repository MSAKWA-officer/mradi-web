"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";


// ✅ TYPE
type Announcement = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  important?: boolean;
};

export default function AnnouncementsPage() {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔐 ROLE
  const [role, setRole] = useState<string | null>(null);
  const isAdmin = role === "admin";

  // ➕ FORM STATE
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Announcement | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // 📥 INIT
  useEffect(() => {
    fetchData();
    getUserRole();
  }, []);

  // 📥 FETCH ANNOUNCEMENTS
  const fetchData = async () => {
    const res = await fetch("/api/announcements");
    const resData = await res.json();
    setData(resData);
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
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.message.toLowerCase().includes(search.toLowerCase())
  );

  const important = filteredData.find((item) => item.important);

  // ➕ CREATE / UPDATE
  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      return alert("Jaza taarifa zote");
    }

    if (editItem) {
      await fetch(`/api/announcements/${editItem.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, message }),
      });
    } else {
      await fetch("/api/announcements", {
        method: "POST",
        body: JSON.stringify({ title, message }),
      });
    }

    resetForm();
    fetchData();
  };

  // ✏️ EDIT
  const handleEdit = (item: Announcement) => {
    setEditItem(item);
    setTitle(item.title);
    setMessage(item.message);
    setShowForm(true);
  };

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Una uhakika unataka kufuta?")) return;

    await fetch(`/api/announcements/${id}`, {
      method: "DELETE",
    });

    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setEditItem(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🎨 HERO */}
      <section
        className="relative text-white text-center py-24 px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507692049790-de58290a4334')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Matangazo ya Kanisa</h1>
          <p className="opacity-90">
            Pata taarifa muhimu na ujumbe mpya kila siku
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Tafuta tangazo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border rounded-lg w-64"
          />

          {/* 🔐 ADMIN ONLY */}
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              + Ongeza Tangazo
            </button>
          )}
        </div>

        {/* 📌 IMPORTANT */}
        {important && (
          <div className="mb-8 p-5 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <h2 className="font-bold text-yellow-800">📌 Tangazo Muhimu</h2>
            <p className="font-semibold">{important.title}</p>
            <p>{important.message}</p>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <p>Inapakia...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-gray-500">
            Hakuna matangazo yaliyopatikana
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-blue-600">
                  {item.title}
                </h3>

                <p className="text-gray-700 mt-2">
                  {item.message}
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                {/* 🔐 ADMIN ACTIONS */}
                {isAdmin && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
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

      {/* 🔐 ADMIN ONLY FORM */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-xl font-bold">
              {editItem ? "Edit Tangazo" : "Ongeza Tangazo"}
            </h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 rounded"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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