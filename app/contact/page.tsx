"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";


type Message = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  // 🔐 ROLE
  const [role, setRole] = useState<string | null>(null);
  const isAdmin = role === "admin";

  // 📥 INIT
  useEffect(() => {
    getUserRole();
  }, []);

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

  // 📥 FETCH MESSAGES (ADMIN ONLY)
  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  // 📤 SEND MESSAGE
  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      return alert("Jaza taarifa zote");
    }

    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ name, message }),
    });

    setName("");
    setMessage("");
    setShowPreview(false);
  };

  // 👉 LOAD MESSAGES ONLY IF ADMIN
  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🎨 HERO */}
      <section
        className="relative text-white text-center py-20 px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Wasiliana Nasi</h1>
          <p className="opacity-90">
            Tuko hapa kukusikiliza – usisite kuwasiliana nasi
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* CONTACT INFO */}
        <div className="space-y-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">📞 Simu</h2>
            <a href="tel:+255712345678" className="bg-green-600 text-white px-4 py-2 rounded">
              Piga Simu
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">💬 WhatsApp</h2>
            <a
              href="https://wa.me/255712345678"
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Fungua WhatsApp
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
            <a href="mailto:info@kanisa.com" className="bg-blue-600 text-white px-4 py-2 rounded">
              Tuma Email
            </a>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-xl shadow space-y-4">

          <h2 className="text-2xl font-semibold">Tuma Ujumbe</h2>

          <input
            type="text"
            placeholder="Jina lako"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            placeholder="Ujumbe..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full p-3 border rounded-lg"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="w-full bg-gray-700 text-white py-2 rounded-lg"
            >
              👁 View
            </button>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Tuma
            </button>
          </div>
        </div>
      </section>

      {/* 🔐 ADMIN ONLY MESSAGE LIST */}
      {isAdmin && (
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-6">
            📩 Inbox ya Messages (Admin)
          </h2>

          {messages.length === 0 ? (
            <p className="text-gray-500">Hakuna ujumbe bado</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <p className="font-bold text-blue-600">{msg.name}</p>

                  <p className="text-gray-700 mt-2">
                    {msg.message}
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 👁 PREVIEW */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-xl font-bold">Preview Ujumbe</h2>

            <p><b>Jina:</b> {name}</p>
            <p><b>Ujumbe:</b></p>
            <p className="bg-gray-100 p-3 rounded">{message}</p>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Tuma
              </button>

              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded w-full"
              >
                Funga
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}