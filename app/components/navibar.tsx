"use client";

import { useState } from "react";
import Link from "next/link";
import AuthButton from "./AuthButton";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* TITLE */}
          <Link href="/" className="text-xl font-bold uppercase">
            FPCT Yeriko Temple <span className="text-amber-500">Ikuti</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber-500 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* AUTH BUTTON */}
          <div className="hidden md:flex items-center">
            <AuthButton />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 border-t pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-amber-500 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="px-3 pt-2">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}