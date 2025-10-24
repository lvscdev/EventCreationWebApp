'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-[#0B0000] overflow-hidden">
      {/* ===== Background Image ===== */}
      <Image
        src="/images/image_background.png"
        alt="Background Pattern"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        quality={100}
        priority
      />

      {/* ===== Gradient Overlay ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,119,43,0.2)_0%,rgba(0,0,0,0.95)_40%)]" />

      {/* ===== Left Section ===== */}
      <div className="relative z-10 flex flex-col justify-center px-8 lg:px-[88px] min-h-screen w-full lg:w-1/2">
        {/* Logo */}
        <Image
          src="/images/logo.svg"
          alt="Lively Events Logo"
          width={110}
          height={50}
          className="mb-10"
          priority
        />

        {/* Text + Form */}
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="font-fraunces text-[28px] leading-[36px] font-semibold">
              <span className="text-[#FF772B]">Sign in </span>
              <span className="text-white">to Create Your Event</span>
            </h1>
            <p className="text-[#A1A1A1] font-urbanist text-sm mt-2">
              Start creating your events for any occasion
            </p>
          </div>

          {/* ===== Form ===== */}
          <form className="flex flex-col gap-5 w-full">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 text-sm font-medium font-urbanist">
                Email Address
              </label>
              <div className="flex items-center px-4 py-3 rounded-lg border border-white/25 bg-white/10 focus-within:border-[#FF772B] transition">
                <input
                  type="email"
                  placeholder="Your Email address"
                  className="bg-transparent outline-none w-full text-white placeholder:text-white/50 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 text-sm font-medium font-urbanist">
                Password
              </label>
              <div className="flex items-center px-4 py-3 rounded-lg border border-white/25 bg-white/10 focus-within:border-[#FF772B] transition">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/70 hover:text-white transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div>
              <a
                href="#"
                className="text-[#FF772B] text-xs font-urbanist underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[56px] bg-[#C82127] hover:bg-[#a8181d] text-white font-fraunces text-base font-bold rounded-[3px] mt-2 transition"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>

      {/* ===== Right Section (Image) ===== */}
      <div className="relative w-full lg:flex items-center justify-center overflow-hidden hidden">
        <div className="relative w-[1160px] h-[900px] rounded-tl-[72px] rounded-br-[72px] overflow-hidden shadow-lg">
          <Image
            src="/images/hero_image.png"
            alt="3D Sphere Hero"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}
