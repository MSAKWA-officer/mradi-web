"use client";

import { CreditCard, Smartphone, Heart, Quote, Copy, MessageCircle } from "lucide-react";

const GivePage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Namba imekiliwa: " + text);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* 🔥 HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/churchimage.jpg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 px-4 max-w-2xl">

          <span className="text-amber-400 text-xs uppercase tracking-widest">
            Giving & Support
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
            Sadaka na Michango
          </h1>

          <p className="text-gray-200 text-sm italic mb-4">
            "Kila mmoja na atoe kama alivyokusudia moyoni mwake..."
          </p>

          <span className="text-amber-400 text-xs font-semibold block mb-5">
            2 Korintho 9:7
          </span>

          <a
            href="#methods"
            className="bg-amber-500 text-white px-5 py-2 text-xs rounded-full hover:bg-amber-600"
          >
            Toa Sadaka
          </a>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section id="methods" className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-8">

          {/* MOBILE MONEY */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="text-amber-500" size={24} />
            </div>

            <h2 className="text-lg font-semibold mb-2">Mitandao ya Simu</h2>
            <p className="text-gray-500 text-xs mb-5">
              Tuma mchango wako kwa urahisi.
            </p>

            <div className="space-y-3">

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-red-500">Vodacom</p>
                  <p className="text-sm font-semibold">0754 000 000</p>
                </div>
                <button
                  onClick={() => copyToClipboard("0754000000")}
                  className="p-2 bg-white rounded-lg shadow hover:bg-amber-500 hover:text-white"
                >
                  <Copy size={14} />
                </button>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-blue-500">Tigo</p>
                  <p className="text-sm font-semibold">0655 000 000</p>
                </div>
                <button
                  onClick={() => copyToClipboard("0655000000")}
                  className="p-2 bg-white rounded-lg shadow hover:bg-amber-500 hover:text-white"
                >
                  <Copy size={14} />
                </button>
              </div>

            </div>

            <div className="mt-5">
              <p className="text-[10px] text-gray-400">Jina la Akaunti</p>
              <p className="text-sm font-semibold">FPCT Yeriko Temple</p>
            </div>
          </div>

          {/* BANK */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="text-amber-500" size={24} />
            </div>

            <h2 className="text-lg font-semibold mb-2">Akaunti ya Benki</h2>
            <p className="text-gray-500 text-xs mb-5">
              Tumia akaunti yetu ya benki.
            </p>

            <div className="p-3 bg-gray-50 rounded-xl mb-4">
              <p className="text-xs text-amber-500 font-bold">NMB / CRDB</p>
              <p className="text-sm font-semibold">0152 4444 3332</p>

              <div className="mt-2">
                <p className="text-[10px] text-gray-400">Jina la Akaunti</p>
                <p className="text-sm font-semibold">FPCT Yeriko Temple</p>
              </div>
            </div>

            <div className="flex gap-2 bg-amber-50 p-3 rounded-xl">
              <Heart className="text-amber-500" size={16} />
              <p className="text-xs text-gray-600">
                Sadaka yako ni baraka 🙏
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* WHATSAPP */}
      <section className="py-14 text-center px-6">
        <h3 className="text-lg font-semibold mb-2">Unahitaji msaada?</h3>
        <p className="text-gray-500 text-xs mb-5">
          Wasiliana nasi kwa urahisi
        </p>

        <a
          href="https://wa.me"
          className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-amber-600"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </section>

    </div>
  );
};

export default GivePage;