"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Message = {
  id: string;
  sender_email: string;
  message: string;
  created_at: string;
};

export default function ContactPage() {
  const [sender_email, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const isAdmin = role === "admin";

  useEffect(() => {
    getUserRole();
  }, []);

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

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const handleSubmit = async () => {
    if (!sender_email.trim() || !message.trim()) return alert("Jaza taarifa zote");

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_email, message }),
    });

    if (res.ok) {
      setSenderEmail("");
      setMessage("");
      setShowPreview(false);
      if (isAdmin) fetchMessages();
    } else {
      alert("Imeshindikana kutuma ujumbe");
    }
  };

  // 🔥 MPYA: Function ya kufuta ujumbe
  const handleDelete = async (id: string) => {
    if (!confirm("Je, una uhakika unataka kufuta ujumbe huu?")) return;

    const res = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessages(messages.filter((msg) => msg.id !== id)); // Ondoa kwenye screen
    } else {
      alert("Imeshindikana kufuta ujumbe");
    }
  };

  useEffect(() => {
    if (isAdmin) fetchMessages();
  }, [isAdmin]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative text-white text-center py-20 px-6 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Wasiliana Nasi</h1>
          <p className="opacity-90">Tuko hapa kukusikiliza – usisite kuwasiliana nasi</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* CONTACT INFO */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">📞 Simu</h2>
            <a href="tel:+255712345678" className="bg-green-600 text-white px-4 py-2 rounded inline-block">Piga Simu</a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">💬 WhatsApp</h2>
            <a href="https://wa.me/255712345678" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded inline-block">Fungua WhatsApp</a>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-semibold">Tuma Ujumbe</h2>
          <input type="email" placeholder="Email yako" value={sender_email} onChange={(e) => setSenderEmail(e.target.value)} className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Ujumbe..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full p-3 border rounded-lg" />
          <div className="flex gap-3">
            <button onClick={() => setShowPreview(true)} className="w-full bg-gray-700 text-white py-2 rounded-lg">👁 View</button>
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg">Tuma</button>
          </div>
        </div>
      </section>

      {/* 🔐 ADMIN ONLY MESSAGE LIST */}
      {isAdmin && (
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-6">📩 Inbox ya Messages (Admin)</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500">Hakuna ujumbe bado</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white p-5 rounded-xl shadow flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-blue-600">{msg.sender_email}</p>
                    <p className="text-gray-700 mt-2 italic">"{msg.message}"</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                    
                    {/* 🔥 KITUFE CHA KUFUTA */}
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1"
                    >
                      <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      Futa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Preview Ujumbe</h2>
            <p><b>Email:</b> {sender_email}</p>
            <p><b>Ujumbe:</b></p>
            <p className="bg-gray-100 p-3 rounded text-gray-700">{message}</p>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Tuma</button>
              <button onClick={() => setShowPreview(false)} className="bg-gray-400 text-white px-4 py-2 rounded w-full">Funga</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
