"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { label: "My Events", href: "/events" },
    { label: "Invitations", href: "/invitations" },
    { label: "Analytics", href: "/analytics" },
  ];

  return (
    <header className="w-full bg-[#180507] border-b border-white/10 px-6 lg:px-16 py-4 flex items-center justify-between relative z-50">
      {/* ===== Left Section: Logo ===== */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.svg"
          alt="Lively Events Logo"
          width={110}
          height={40}
          priority
        />
      </div>

      {/* ===== Center Section: Navigation Tabs ===== */}
      <nav className="hidden md:flex gap-10 mt-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative text-sm font-urbanist transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
                isActive
                  ? "text-[#F47B20] after:w-full after:bg-[#F47B20]"
                  : "text-white/70 hover:text-[#F47B20] after:w-0 hover:after:w-full hover:after:bg-[#F47B20]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* ===== Right Section: Icons + Button ===== */}
      <div className="flex items-center gap-5">
        {/* Create Event Button */}
        <Link
          href="/events/create"
          className="hidden lg:flex items-center gap-2 bg-[#2B0A0C] hover:bg-[#C13927]/90 hover:shadow-[0_0_12px_rgba(193,57,39,0.5)] text-[#F47B20] hover:text-white font-urbanist text-sm font-medium rounded-[6px] px-4 py-2 transition-all duration-300"
        >
          <Plus size={16} />
          Create New Event
        </Link>

        {/* Icons */}
        <Image
          src="/icons/bell.svg"
          alt="Notifications"
          width={40}
          height={40}
          className="cursor-pointer opacity-80 hover:opacity-100 transition"
        />
        <Image
          src="/icons/settings.svg"
          alt="Settings"
          width={22}
          height={22}
          className="cursor-pointer opacity-80 hover:opacity-100 transition"
        />

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== Mobile Menu (Dropdown) ===== */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1A1A1A] border-t border-white/10 flex flex-col items-start px-6 py-5 md:hidden transition-all">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-base font-urbanist transition ${
                  isActive ? "text-[#F47B20]" : "text-white/70 hover:text-[#F47B20]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}

          {/* Create Event Button in Mobile */}
          <Link
            href="/events/create"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center gap-2 bg-[#C13927] hover:bg-[#a8181d] text-white font-urbanist text-sm font-medium rounded-[6px] px-4 py-2 transition-all duration-300"
          >
            <Plus size={16} />
            Create Event
          </Link>
        </div>
      )}
    </header>
  );
}
