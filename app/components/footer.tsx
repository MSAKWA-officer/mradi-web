import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 border-b border-green-700">

        {/* DESCRIPTION */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold uppercase text-white">
            Kanisa Letu
          </span>
          <p className="text-green-200 mt-2 text-center md:text-left">
            Tunakusudia kukuunganisha na kusaidia jamii kupitia huduma na matukio ya kanisa.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col items-center md:items-start border-l border-green-700 border-r border-green-700 px-6">
          <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
          <Link href="/" className="hover:text-green-400 mb-1">Nyumbani</Link>
          <Link href="/about" className="hover:text-green-400 mb-1">Kuhusu</Link>
          <Link href="/services" className="hover:text-green-400 mb-1">Ibada</Link>
          <Link href="/announcements" className="hover:text-green-400 mb-1">Matangazo</Link>
          <Link href="/contact" className="hover:text-green-400">Mawasiliano</Link>
        </div>

        {/* SOCIAL MEDIA & CONTACT */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-3 text-white">Unganisha Nasi</h3>

          <div className="flex gap-4 mb-3">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-green-300"
            >
              📘 Facebook
            </a>

            <a
              href="https://wa.me/255712345678"
              target="_blank"
              className="hover:text-green-300"
            >
              💬 WhatsApp
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-green-300"
            >
              📸 Instagram
            </a>
          </div>

          <p className="text-green-200 text-sm">
            Email:{" "}
            <a
              href="mailto:info@kanisa.com"
              className="hover:text-green-300"
            >
              info@kanisa.com
            </a>
          </p>

          <p className="text-green-400 text-xs mt-4">
            &copy; 2026 Kanisa Letu. Haki zote zimehifadhiwa.
          </p>
        </div>
      </div>
    </footer>
  );
}