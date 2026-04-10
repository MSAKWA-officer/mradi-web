"use client"; // Muhimu kwa Next.js App Router

import React from 'react';
import Image from 'next/image';
import { 
  PlayCircle, 
  Radio, 
  MapPin, 
  Heart, 
  Users, 
  Church, 
  Music, 
  Mic2, 
  Music4, 
  CalendarCheck 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#FAFAFA] font-sans selection:bg-amber-200 selection:text-slate-900">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/churchimage.jpg" 
            alt="Church Background" 
            fill
            priority
            sizes="100vw" // Inachukua upana wote wa kioo
            className="object-cover brightness-[0.4]"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="text-amber-400 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold block mb-4">
            FPCT Yeriko Temple • Mbeya
          </span>

          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
            Wito wa <br />
            <span className="text-amber-400 italic font-serif">Mbinguni</span>
          </h1>

          <div className="mt-10 flex justify-center gap-5 flex-wrap">
           

           <a 
              href="https://www.youtube.com/@Yeriko_Temple_Ikuti_TV/streams" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <button className="flex items-center gap-3 text-white border-2 border-white/50 backdrop-blur-sm px-8 py-4 text-xs uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-full active:scale-95">
                <Radio size={16}/> Mubashara
              </button>
            </a>

          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-50 shadow-md">
                <Image 
                  src="/images/churchimagee.jpg" 
                  alt="Jamii ya Kanisa"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw" // Kwenye simu 100%, kwenye PC nusu kioo
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Dhamira</span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter mb-3 leading-tight uppercase">
                   Kuwafikia wengi kwa Injili
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                  Kuwafikia wasiofikiwa kwa Injili ya Yesu Kristo na kuwawezesha waamini kutembea katika kusudi la Kimungu.
                </p>
              </div>
              <div className="h-[2px] w-16 bg-slate-900" />
              <div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Maono</span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter mb-3 leading-tight uppercase">
                  Kuwa taa ya Matumaini
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                  Kuwa kitovu cha mabadiliko ya kiroho na kijamii, tukileta nuru ya tumaini kwa kila mmoja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* RATIBA SECTION */}
<section className="relative z-10 pt-25 pb-15 px-4"> 
  {/* pt-32 inaongeza nafasi kubwa juu kuitenganisha na sehemu iliyopita */}
  
  <div className="max-w-7xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]  overflow-hidden border border-amber-100">
    
    {/* Header ya Ratiba - Rangi Nyeusi Imeondolewa hapa */}
    <div className="bg-amber-500 py-8 text-center border-b border-amber-600/10">
      <h2 className="text-white font-black uppercase tracking-[0.3em] text-base md:text-lg">
        Ratiba ya Huduma za Wiki
      </h2>
      <div className="w-20 h-1 bg-white/40 mx-auto mt-2 rounded-full"></div>
    </div>

    {/* Grid ya Siku */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      {[
        { day: 'Jumatatu', activity: 'Vijana', icon: Users },
        { day: 'Jumanne', activity: 'Wamama', icon: Heart },
        { day: 'Jumatano', activity: 'Kanisa Zima', icon: Church },
        { day: 'Alhamisi', activity: 'Kwaya', icon: Music },
        { day: 'Ijumaa', activity: 'Maombi', icon: Mic2 },
        { day: 'Jumamosi', activity: 'Praise Team', icon: Music4 },
      ].map((item) => (
        <div 
          key={item.day} 
          className="p-10 text-center border-r border-b border-slate-50 hover:bg-amber-50/50 transition-all duration-300 group"
        >
          <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-100 transition-colors">
            <item.icon className="text-amber-600 group-hover:scale-110 transition-transform" size={32} />
          </div>
          
          <h3 className="text-[13px] font-bold text-amber-600/70 uppercase tracking-widest">{item.day}</h3>
          <p className="text-lg font-black text-slate-800 mt-2">{item.activity}</p>
          
          <div className="mt-4">
             <p className="text-[13px] font-bold text-slate-500 bg-slate-100 inline-block px-4 py-1 rounded-full">
              16:00 - 18:00
             </p>
          </div>
        </div>
      ))}

      {/* Sehemu ya Jumapili - Muonekano wa Kipekee (Amber Deep) */}
      <div className="p-10 text-center bg-amber-600 text-white flex flex-col justify-center items-center col-span-1 sm:col-span-2 md:col-span-1 shadow-inner">
        <div className="bg-white/20 p-3 rounded-full mb-4">
          <CalendarCheck size={36} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em]">Jumapili</h3>
        
        <div className="mt-6 space-y-4 w-full text-center">
          <div className="bg-white/10 py-2 rounded-xl border border-white/10">
            <p className="text-[11px] opacity-90 font-bold uppercase">Ibada ya Kwanza</p>
            <p className="text-base font-black">08:00 - 10:00</p>
          </div>
          
          <div className="bg-white/10 py-2 rounded-xl border border-white/10">
            <p className="text-[11px] opacity-90 font-bold uppercase">Ibada Kuu</p>
            <p className="text-base font-black">10:00 - 14:00</p>
          </div>
          
          <div className="bg-white/10 py-2 rounded-xl border border-white/10">
            <p className="text-[11px] opacity-90 font-bold uppercase">Ibada ya Jioni</p>
            <p className="text-base font-black">16:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}
