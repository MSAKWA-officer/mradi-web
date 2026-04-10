"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { supabase } from "../lib/supabaseClient";
import { Search, Plus, Edit3, Trash2, Megaphone, Clock } from "lucide-react";

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

  useEffect(() => {
    fetchData();
    getUserRole();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/announcements");
    const resData = await res.json();
    setData(resData);
    setLoading(false);
  };

  const getUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setRole(data?.role);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.message.toLowerCase().includes(search.toLowerCase())
  );

  const important = filteredData.find((item) => item.important);

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) return alert("Jaza taarifa zote");

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

  const handleEdit = (item: Announcement) => {
    setEditItem(item);
    setTitle(item.title);
    setMessage(item.message);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Una uhakika unataka kufuta?")) return;
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setEditItem(null);
    setShowForm(false);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans selection:bg-amber-100">

      {/* 🎨 HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334"
          alt="Church Announcements"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover brightness-[0.35]"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-amber-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block">
            Habari na Matukio
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Matangazo ya <br />
            <span className="text-amber-400 italic font-serif">Kanisa</span>
          </h1>
          <p className="mt-6 text-slate-200 text-lg font-medium opacity-90 max-w-xl mx-auto italic">
            "Pata taarifa muhimu na ujumbe mpya kutoka madhabahuni kila siku."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* SEARCH & ADMIN ACTIONS */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tafuta tangazo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            />
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all shadow-lg"
            >
              <Plus size={18} /> Ongeza Tangazo
            </button>
          )}
        </div>

        {/* 📌 IMPORTANT ANNOUNCEMENT */}
        {important && (
          <div className="mb-12 p-8 bg-amber-50 border-l-8 border-amber-500 rounded-3xl relative overflow-hidden group">
            <Megaphone className="absolute right-[-20px] bottom-[-20px] text-amber-200/50 rotate-[-15deg]" size={150} />
            <div className="relative z-10">
                <h2 className="font-black text-amber-800 uppercase tracking-widest text-xs mb-2">📌 Tangazo Muhimu</h2>
                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{important.title}</h3>
                <p className="text-slate-700 leading-relaxed font-medium">{important.message}</p>
            </div>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest">Hakuna matangazo yaliyopatikana</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-[2rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} className="text-amber-500" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <h3 className="font-black text-xl text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-relaxed text-sm">
                  {item.message}
                </p>

                {/* 🔐 ADMIN ACTIONS */}
                {isAdmin && (
                  <div className="flex gap-3 mt-8 pt-6 border-t border-slate-50">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <Edit3 size={14} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔐 ADMIN FORM MODAL */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              {editItem ? "Edit Tangazo" : "Ongeza Tangazo"}
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Kichwa cha Habari</label>
                    <input
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Ujumbe</label>
                    <textarea
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-none h-32"
                    placeholder="Andika tangazo hapa..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <button
                onClick={handleSubmit}
                className="bg-amber-500 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs w-full hover:bg-slate-900 hover:text-white transition-all shadow-lg shadow-amber-500/20"
              >
                {editItem ? "Hifadhi Marekebisho" : "Chapisha Tangazo"}
              </button>

              <button
                onClick={resetForm}
                className="bg-slate-100 text-slate-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs w-full hover:bg-slate-200 transition-all"
              >
                Ghairi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
