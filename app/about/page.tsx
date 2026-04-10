"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { 
  PlayCircle, ShieldCheck, Sparkles, 
  Music, Radio, CheckCircle2, History, Target, Eye 
} from "lucide-react";

export default function AboutPage() {

  const kwaya = [
    { name: "Ufunuo", img: "/images/churchimage.jpg", desc: "Sauti Bora" },
    { name: "Goshen", img: "/images/goshen.jpg", desc: "Ibada Nzito" },
    { name: "Kanani", img: "/images/praise.png", desc: "Asili" },
    { name: "Harvest", img: "/images/harvest.jpg", desc: "Kisasa" }
  ];

  return (
    <div className="bg-[#F9FAFB] font-sans selection:bg-amber-200">

      {/* HERO SECTION - Optimized for speed */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/images/churchimagee.jpg"
          alt="FPCT Yeriko Temple"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Kuhusu <span className="text-amber-400 italic font-serif">Kanisa</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-200">
            Jifunze juu ya huduma yetu na safari yetu ya kiroho.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/sermons" 
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 font-bold rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              Mahubiri <PlayCircle size={20}/>
            </Link>
            <button className="border-2 border-white/50 hover:bg-white hover:text-black px-8 py-4 font-bold rounded-full flex items-center justify-center gap-2 transition-all active:scale-95">
              <Radio size={18} className="text-red-500 animate-pulse" /> Live
            </button>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[400px]">
            <Image
              src="/images/churchimage.jpg"
              alt="Historia ya Kanisa"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-slate-900">
              <History className="text-amber-500" /> Historia Yetu
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              FPCT Yeriko Temple lilianzishwa kwa wito maalum wa Mungu kuleta mabadiliko ya kweli 
              kupitia Injili ya Yesu Kristo. Kwa miaka mingi, tumekuwa kitovu cha matumaini 
              na marejesho kwa watu wa Mbeya na kote nchini.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
            <Target className="text-amber-500 mb-4" size={32}/>
            <h3 className="font-black text-2xl mb-3 text-slate-900 uppercase tracking-tight">Dhamira</h3>
            <p className="text-slate-600 leading-relaxed">Kuwafikia wasiofikiwa kwa Injili ya Yesu Kristo na kuwawezesha waamini kutembea katika kusudi la Kimungu.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
            <Eye className="text-amber-500 mb-4" size={32}/>
            <h3 className="font-black text-2xl mb-3 text-slate-900 uppercase tracking-tight">Maono</h3>
            <p className="text-slate-600 leading-relaxed">Kuwa nuru ya matumaini na kitovu cha mabadiliko ya kiroho na kijamii katika taifa letu.</p>
          </div>
        </div>
      </section>

      {/* VIONGOZI */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-black mb-12 text-slate-900 tracking-tight">Viongozi wa Kanisa</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Mch. Kiongozi", role: "Kiongozi Mkuu", img: "/images/clear.jpg" },
            { name: "Wazee wa Kanisa", role: "Uongozi", img: "/images/blue.jpg" },
            { name: "Katibu", role: "Utawala", img: "/images/fresh.jpg" },
            { name: "Mwnk. Vijana", role: "Idara ya Vijana", img: "/images/golden.jpg" }
          ].map((l, i) => (
            <div key={i} className="group">
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                <Image
                  src={l.img}
                  alt={l.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-xl text-slate-900">{l.name}</h3>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest">{l.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THAMANI / MAADILI */}
      <section className="py-20 px-6 bg-slate-950 text-white text-center">
        <h2 className="text-3xl font-black mb-12">Maadili Yetu ya Msingi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { t: "Imani", i: <Sparkles size={28}/> },
            { t: "Uaminifu", i: <ShieldCheck size={28}/> },
            { t: "Ibada", i: <Music size={28}/> },
            { t: "Huduma", i: <CheckCircle2 size={28}/> }
          ].map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-amber-400 mb-4 p-4 bg-white/5 rounded-full">{v.i}</div>
              <p className="font-bold text-lg uppercase tracking-wider">{v.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KWAYA SECTION */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-black mb-4">Huduma za Kwaya</h2>
        <p className="text-slate-500 mb-12">Sifu Bwana kwa nyimbo na mapambio</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {kwaya.map((c, i) => (
            <div key={i} className="relative h-64 group rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={c.img}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-75 group-hover:brightness-50 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                <h3 className="font-black text-3xl uppercase">{c.name}</h3>
                <div className="w-12 h-1 bg-amber-500 my-3 group-hover:w-24 transition-all" />
                <p className="font-medium tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IDARA */}
      <section className="py-24 px-6 bg-slate-50 text-center">
        <h2 className="text-4xl font-black mb-12">Idara Zetu</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Vijana", img: "/images/golden.jpg" },
            { name: "Watoto", img: "/images/harvest.jpg" },
            { name: "IT & Media", img: "/images/vintage.jpg" },
            { name: "Wanawake", img: "/images/blue.jpg" },
            { name: "Wanaume", img: "/images/clear.jpg" }
          ].map((d, i) => (
            <div 
              key={i} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="relative w-full h-56">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="font-black text-xl text-slate-800 uppercase tracking-tight">{d.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
