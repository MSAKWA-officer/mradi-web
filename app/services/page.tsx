"use client";

import { Sun, Church, Users, Play } from "lucide-react";
import Link from "next/link";

export default function IbadaPage() {
  const huduma = [
    {
      title: "Ibada ya Asubuhi",
      time: "07:00 - 09:30",
      desc: "Sifa, kuabudu na neno la uzima.",
      icon: <Sun size={20} />,
    },
    {
      title: "Ibada Kuu",
      time: "10:00 - 13:00",
      desc: "Mafundisho na maombezi ya pamoja.",
      icon: <Church size={20} />,
    },
    {
      title: "Shule ya Jumapili",
      time: "09:00 - 11:00",
      desc: "Mafundisho maalum kwa watoto.",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO IMAGE */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/churchimage.jpg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 px-4 max-w-2xl">

          <p className="text-amber-400 text-xs uppercase tracking-widest mb-2">
            Karibu Kanisani
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ratiba ya Ibada
          </h1>

          <p className="text-gray-200 text-sm">
            "Njoni kwangu, nanyi nyote msumbukao nami nitawapumzisha"
          </p>

          <div className="mt-5">
            <Link
              href="#ratiba"
              className="bg-amber-500 text-white px-5 py-2 text-xs rounded-full hover:bg-amber-600"
            >
              Tazama Ratiba
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div id="ratiba" className="max-w-5xl mx-auto px-4 py-10">

       {/* RATIBA */}
<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">
  {huduma.map((item, index) => (
    <div
      key={index}
      className="bg-white/70 backdrop-blur-md p-5 rounded-lg shadow-lg shadow-teal-100/50 hover:shadow-xl hover:-translate-y-1 transition duration-300"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-3">
        {item.icon}
      </div>

      <h3 className="text-sm font-semibold mb-1 text-teal-700">
        {item.title}
      </h3>

      <p className="text-teal-500 text-xs font-medium mb-2">
        {item.time}
      </p>

      <p className="text-gray-600 text-xs leading-relaxed">
        {item.desc}
      </p>
    </div>
  ))}
</div>

{/* VIDEO */}
<section className="bg-white/70 backdrop-blur-md rounded-lg p-5 shadow-lg shadow-teal-100/50">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-base font-semibold text-teal-700">
        Mahubiri ya Karibuni
      </h2>
      <p className="text-gray-500 text-xs">
        Tazama ibada zilizopita
      </p>
    </div>

    <a
      href="https://www.youtube.com/@Yeriko_Temple_Ikuti_TV"
      target="_blank"
      className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-full hover:bg-red-600 transition"
    >
      YouTube
    </a>
  </div>

  <div className="aspect-video bg-gray-200/70 rounded-md flex items-center justify-center relative group overflow-hidden">
    <button className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
      <Play size={18} />
    </button>
  </div>

  <p className="mt-3 text-xs text-gray-600 font-medium">
    Nguvu ya Maombi (05/04/2026)
  </p>
</section>
</div>

      {/* CTA */}
<section className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 py-12 text-center px-4 rounded-t-3xl">

  <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
    Unahitaji Maombezi?
  </h2>

  <p className="text-teal-100 text-sm mb-5">
    Tuko tayari kukuombea na kukusimamia kiroho
  </p>

  <Link
    href="/contact"
    className="inline-block bg-white text-teal-600 px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
  >
    Wasiliana Nasi
  </Link>

</section>

    </div>
  );
}