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
    <div className="bg-[#F9FAFB] font-sans">

      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center">

        {/* Background Image */}
        <Image
          src="/images/churchimagee.jpg"
          alt="Church"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center text-white px-6">
          <h1 className="text-6xl font-black">
            Kuhusu <span className="text-amber-400 italic">Kanisa</span>
          </h1>

          <p className="mt-4">
            Jifunze juu ya huduma yetu.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link href="/sermons" className="bg-amber-500 px-6 py-3 font-bold flex gap-2">
              Mahubiri <PlayCircle size={18}/>
            </Link>

            <button className="border px-6 py-3 flex gap-2">
              <Radio size={16}/> Live
            </button>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="relative w-full h-[300px]">
            <Image
              src="/images/churchimage.jpg"
              alt="Historia"
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <div>
            <h2 className="text-3xl font-black mb-4 flex items-center gap-2">
              <History/> Historia
            </h2>

            <p>
              Kanisa lilianzishwa kwa wito wa Mungu kuleta mabadiliko kupitia Injili.
            </p>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl">
            <Target className="text-amber-500 mb-3"/>
            <h3 className="font-bold text-xl">Dhamira</h3>
            <p>Kufikia wasiofikiwa.</p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <Eye className="text-amber-500 mb-3"/>
            <h3 className="font-bold text-xl">Maono</h3>
            <p>Kuwa nuru ya matumaini.</p>
          </div>

        </div>
      </section>

     {/* VIONGOZI */}
<section className="py-20 px-6 bg-white text-center">
  <h2 className="text-3xl font-black mb-10">Viongozi</h2>

  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    {[
      { name: "Mchungaji", role: "Kiongozi Mkuu", img: "/images/clear.jpg" },
      { name: "Wazee", role: "Uongozi", img: "/images/blue.jpg" },
      { name: "Katibu", role: "Ofisi", img: "/images/fresh.jpg" },
      { name: "Vijana", role: "Mwenyekiti", img: "/images/golden.jpg" }
    ].map((l, i) => (
      <div key={i} className="bg-slate-50 rounded-xl overflow-hidden shadow">

        {/* IMAGE */}
        <div className="relative w-full h-56">
          <Image
            src={l.img}
            alt={l.name}
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <h3 className="font-bold text-lg">{l.name}</h3>
          <p className="text-sm text-slate-600">{l.role}</p>
        </div>

      </div>
    ))}
  </div>
</section>

      {/* THAMANI */}
      <section className="py-20 px-6 bg-slate-100 text-center">
        <h2 className="text-3xl font-black mb-10">Maadili</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { t: "Imani", i: <Sparkles/> },
            { t: "Uaminifu", i: <ShieldCheck/> },
            { t: "Ibada", i: <Music/> },
            { t: "Huduma", i: <CheckCircle2/> }
          ].map((v, i) => (
            <div key={i} className="bg-white p-6 rounded-xl">
              <div className="text-amber-500 mb-2">{v.i}</div>
              <p className="font-bold">{v.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KWAYA */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-black mb-10">Kwaya</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {kwaya.map((c, i) => (
            <div key={i} className="bg-slate-50 rounded-xl overflow-hidden">

              <div className="relative w-full h-48">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-sm">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IDARA */}
<section className="py-20 px-6 bg-slate-50 text-center">
  <h2 className="text-3xl font-black mb-10">Idara</h2>

  <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {[
      { name: "Vijana", img: "/images/golden.jpg" },
      { name: "Watoto", img: "/images/harvest.jpg" },
      { name: "IT", img: "/images/vintage.jpg" },
      { name: "Wanawake", img: "/images/blue.jpg" },
      { name: "Wanaume", img: "/images/clear.jpg" }
    ].map((d, i) => (
      <div 
        key={i} 
        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
      >

        {/* IMAGE */}
        <div className="relative w-full h-48">
          <Image
            src={d.img}
            alt={d.name}
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <p className="font-bold text-lg">{d.name}</p>
        </div>

      </div>
    ))}
  </div>
</section>

    </div>
  );
}