import Link from "next/link";
import { 
  PlayCircle, ArrowUpRight, 
  Radio, MapPin, Calendar, Heart
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#FAFAFA] font-sans selection:bg-amber-200 selection:text-slate-900">

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">

        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('/images/churchimage.jpg')` }}
        />

        <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

          <span className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold">
            FPCT Yeriko Temple • Mbeya
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Wito wa <br />
            <span className="text-amber-400 italic font-serif">
              Mbinguni
            </span>
          </h1>

          <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed">
            Kuwafikia wasiofikiwa kwa Injili ya Yesu Kristo,
            na kuwawezesha waamini kutembea katika kusudi lao la Mungu.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link 
              href="/sermons"
              className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-amber-400 transition rounded-full"
            >
              Sikiliza Mahubiri <PlayCircle size={16}/>
            </Link>

            <button className="flex items-center gap-2 text-white border border-white px-6 py-3 text-xs uppercase font-semibold hover:bg-white hover:text-black transition rounded-full">
              <Radio size={14}/> Mubashara
            </button>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden shadow-lg">
              <img 
                src="/images/churchimagee.jpg" 
                alt="Jamii ya Kanisa"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-amber-500 p-6 shadow-lg hidden md:block">
              <Heart size={24} className="text-black mb-2" />
              <p className="text-black font-bold text-sm">
                Tumeanzishwa kwa Imani
              </p>
            </div>
          </div>

          <div className="space-y-12">

            <div>
              <span className="text-amber-600 text-[10px] font-semibold uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                <div className="h-[2px] w-6 bg-amber-600" />
                Dhamira
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
                <span className="italic text-amber-600">Dhamira</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Kuwafikia wasiofikiwa kwa Injili ya Yesu Kristo,
                na kuwawezesha waamini kutembea katika kusudi lao la Mungu.
              </p>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                <div className="h-[2px] w-6 bg-slate-400" />
                Maono
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
                <span className="italic text-slate-500">Maono</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Kuwa taa ya matumaini na mabadiliko kwa jamii.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE TIMES */}
      <section className="relative z-10 -mt-16 pb-20 px-4 bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid md:grid-cols-3">

          <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">
            <Calendar className="text-amber-500 mx-auto mb-3" size={24} />
            <h3 className="text-xs font-semibold text-slate-700 uppercase mb-2">
              Jumapili
            </h3>
            <p className="text-lg font-bold text-slate-900">
              08:00 — 11:30
            </p>
          </div>

          <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">
            <Radio className="text-amber-500 mx-auto mb-3" size={24} />
            <h3 className="text-xs font-semibold text-slate-700 uppercase mb-2">
              Maombi
            </h3>
            <p className="text-lg font-bold text-slate-900">
              05:00 — 06:30
            </p>
          </div>

          <div className="p-6 text-center flex flex-col">
            <MapPin className="text-amber-500 mx-auto mb-3" size={24} />
            <h3 className="text-xs font-semibold text-slate-700 uppercase mb-2">
              Mahali
            </h3>

            <p className="text-sm font-bold text-slate-900 mb-3">
              Yeriko Temple, Mbeya
            </p>

            <div className="w-full h-32 rounded overflow-hidden mb-3 border">
              <iframe
                title="Ramani"
                src="https://www.google.com/maps?q=Yeriko+Temple+Mbeya&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Yeriko+Temple+Mbeya"
              target="_blank"
              className="text-amber-600 text-xs font-semibold"
            >
              Mwelekeo →
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}