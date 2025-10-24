'use client';

import { useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#130101] via-[#210000] to-[#1a0205] text-white">
      {/* === Background Layers === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,85,34,0.12),_transparent_60%)]" />
      <Image
        src="/images/image_background.png"
        alt="Decorative background lines"
        fill
        className="object-cover opacity-70 pointer-events-none select-none"
      />
      
      {/* === Top Section === */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-16 pt-10 md:pt-14 gap-6">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-fraunces">
          <span className="text-[#FF6825]">Your Events,</span>{" "}
          <span className="text-white">Olivia</span>
        </h1>

        {/* Search + Tabs */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex items-center justify-end w-full md:w-auto">
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 bg-[#1f0c0b]/70 border border-white/10 rounded-md hover:bg-[#2b0d0d]/80 transition"
              >
                <Search size={18} className="text-white/80" />
              </button>
            ) : (
              <div className="relative flex items-center bg-[#1f0c0b]/70 border border-white/20 rounded-md pl-3 pr-2 py-2 transition w-[240px]">
                <Search size={18} className="text-white/60 mr-2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="bg-transparent outline-none text-sm text-white/80 placeholder:text-white/40 flex-1"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-white/70 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex bg-[#1f0c0b]/80 rounded-md border border-white/15 overflow-hidden shadow-md">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 text-sm font-urbanist transition ${
                activeTab === "upcoming"
                  ? "bg-[#ffffff] text-[#1D2939]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2 text-sm font-urbanist transition ${
                activeTab === "past"
                  ? "bg-[#FF6825] text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-28 px-6">
        {activeTab === "upcoming" ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/empty_calendar.svg"
              alt="No events icon"
              width={180}
              height={180}
              className="opacity-90 mb-6"
            />
            <h2 className="text-xl font-fraunces mb-2">No Events Created</h2>
            <p className="text-gray-300 text-sm font-urbanist mb-2 max-w-lg">
              You have no upcoming events on your event list.
            </p>
            <p className="text-gray-300 text-sm font-urbanist mb-8 max-w-lg">
             Try creating one.
            </p>
            <button className="flex items-center bg-[#c9402f] hover:bg-[#e74a3b] transition text-white px-12 py-3 rounded-md text-sm font-urbanist font-medium">
              <span className="text-lg mr-2">+</span> Create New Event
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/empty_calendar.svg"
              alt="No past events icon"
              width={180}
              height={180}
              className="opacity-90 mb-6"
            />
            <h2 className="text-xl font-merriweather mb-2">No Past Events</h2>
            <p className="text-gray-300 font-urbanist mb-8 max-w-md">
              You haven’t hosted or attended any past events yet.
            </p>
            <button className="flex items-center bg-[#c9402f] hover:bg-[#e74a3b] transition text-white px-12 py-3 rounded-md text-sm font-urbanist font-medium">
              <span className="text-lg mr-2">+</span> Create New Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
