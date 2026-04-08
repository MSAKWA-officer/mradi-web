"use client";
import Link from "next/link";
import AuthButton from "./AuthButton";

const logoUrl = "/logo.jpg";

const navLinks = [
  { name: "Nyumbani", href: "/" },
  { name: "Kuhusu", href: "/about" },
  { name: "Ibada", href: "/services" },
  { name: "Matangazo", href: "/announcements" },
  { name: "Mahubiri", href: "/sermons" },
  { name: "Mawasiliano", href: "/contact" },
  { name: "Sadaka", href: "/give" },
];

export default function Navbar() {
  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={logoUrl}
              alt="Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="text-xl font-bold uppercase">
              fpct yeriko temple  <span className="text-amber-500">ikuti</span>
            </span>
          </Link>

          {/* MENU LINKS (Desktop) */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-amber-500 transition">
                {link.name}
              </Link>
            ))}
          </div>

          {/* AUTH BUTTON */}
          <div className="hidden md:flex items-center">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
