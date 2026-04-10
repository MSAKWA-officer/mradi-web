"use client";

import React from 'react';
import Image from 'next/image';
import { CreditCard, Smartphone, Heart, Copy, MessageCircle } from "lucide-react";

const GivePage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Alert nzuri zaidi unaweza kutumia toast baadaye
    alert("Namba imekiliwa: " + text);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans selection:bg-amber-100">

      {/* 🔥 HERO SECTION - Optimized for Performance */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/churchimage.jpg"
          alt="Giving at FPCT Yeriko"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover brightness-[0.4]"
        />

        <div className="relative z-10 px-6 max-w-3xl">
          <span className="text-amber-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block">
            Giving & Support
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Sadaka na <span className="text-amber-400 italic font-serif">Michango</span>
          </h1>

          <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
            <p className="text-gray-100 text-sm md:text-lg italic font-medium leading-relaxed">
              "Kila mmoja na atoe kama alivyokusudia moyoni mwake, si kwa huzuni wala kwa lazima; maana Mungu humpenda yeye atoaye kwa moyo wa ukunjufu."
            </p>
            <span className="text-amber-400 text-xs font-black block mt-4 uppercase tracking-widest">
              2 Korintho 9:7
            </span>
          </div>

          <div className="mt-10">
            <a
              href="#methods"
              className="bg-amber-500 text-black px-10 py-4 text-xs font-black uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 shadow-2xl"
            >
              Toa Sadaka Sasa
            </a>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section id="methods" className="max-w-6xl mx-auto py-24 px-6">
        <div className="grid md:grid-cols-2 gap-10">

          {/* MOBILE MONEY */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 transition-transform hover:-translate-y-1 duration-500">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8">
              <Smartphone className="text-amber-600" size={32} />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Mitandao ya Simu</h2>
            <p className="text-slate-500 text-sm mb-8 font-medium">
              Tuma mchango wako kwa haraka na usalama kupitia namba hizi.
            </p>

            <div className="space-y-4">
              {/* Vodacom */}
              <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">M-Pesa (Vodacom)</p>
                  <p className="text-lg font-black text-slate-800 tracking-tight">0754 000 000</p>
                </div>
                <button
                  onClick={() => copyToClipboard("0754000000")}
                  className="p-3 bg-white text-slate-400 rounded-xl shadow-sm hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Copy size={18} />
                </button>
              </div>

              {/* Tigo */}
              <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Tigo Pesa</p>
                  <p className="text-lg font-black text-slate-800 tracking-tight">0655 000 000</p>
                </div>
                <button
                  onClick={() => copyToClipboard("0655000000")}
                  className="p-3 bg-white text-slate-400 rounded-xl shadow-sm hover:bg-amber-500 hover:text-black transition-all"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Jina la Akaunti</p>
              <p className="text-lg font-black text-slate-900">FPCT Yeriko Temple</p>
            </div>
          </div>

          {/* BANK */}
          <div className="bg-slate-950 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
             {/* Mapambo ya background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 relative z-10">
              <CreditCard className="text-amber-400" size={32} />
            </div>

            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight relative z-10">Akaunti ya Benki</h2>
            <p className="text-slate-400 text-sm mb-8 font-medium relative z-10">
              Kwa michango mikubwa na ya kudumu, unaweza kutumia benki.
            </p>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-6 group-hover:bg-white/10 transition-colors">
              <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.2em] mb-2">Benki (NMB / CRDB)</p>
              <p className="text-2xl font-black tracking-widest mb-4">0152 4444 3332</p>

              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Jina la Akaunti</p>
                <p className="text-lg font-black text-white">FPCT Yeriko Temple</p>
              </div>
            </div>

            <div className="flex gap-3 bg-amber-500/20 p-4 rounded-2xl border border-amber-500/20">
              <Heart className="text-amber-400 shrink-0" size={20} />
              <p className="text-xs text-amber-100 font-medium leading-relaxed">
                Mchango wako unasaidia ujenzi wa kanisa na kusaidia wenye uhitaji. Barikiwa sana!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* WHATSAPP SUPPORT */}
      <section className="pb-24 text-center px-6">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Unahitaji msaada?</h3>
          <p className="text-slate-500 text-sm mb-8">
            Kama una changamoto yoyote katika utoaji, wasiliana na idara ya fedha.
          </p>

          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-500/20"
          >
            <MessageCircle size={20} />
            Tuma Ujumbe WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
};

export default GivePage;
