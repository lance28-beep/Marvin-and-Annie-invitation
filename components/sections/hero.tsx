"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/content/site"
import { Heart } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#E8DCC8]/80">
      {/* Semi-transparent overlay for better text readability - same as countdown section */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
      
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center min-h-screen py-16 sm:py-20">
        <div className={`w-full max-w-3xl text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Monogram - Center */}
          <div className="flex justify-center mb-2 sm:mb-4">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56">
              <Image
                src="/monogram/image.png"
                alt="Marvin & Annie Monogram"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Opening Text */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] tracking-wide px-4">
            Together with our families, we,
          </p>

          {/* Groom Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] uppercase tracking-[0.12em] sm:tracking-[0.15em] leading-tight px-2 mb-2 sm:mb-3 md:mb-4">
            MARVIN ROY
          </h1>

          {/* And - Script Style */}
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ephesis)] text-[#3C3C3C] -my-2 sm:-my-3 pb-2 sm:pb-3 md:pb-4">
            and
          </p>

          {/* Bride Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] uppercase tracking-[0.12em] sm:tracking-[0.15em] leading-tight px-2 mb-2 sm:mb-3 md:mb-4">
            ANNIE JOY
          </h1>

          {/* Request Text */}
          <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] tracking-wide max-w-xl mx-auto px-6 sm:px-8 leading-relaxed">
            request the honor of your presence as we are unified in marriage before our Lord God.
          </p>

          {/* Date Display */}
          <div className="space-y-2 pt-2 sm:pt-4 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <div className="h-px w-8 sm:w-12 md:w-16 bg-[#3C3C3C]/30" />
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C]">
                March
              </p>
              <div className="h-px w-8 sm:w-12 md:w-16 bg-[#3C3C3C]/30" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 text-[#3C3C3C]">
              <span className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] uppercase tracking-wider">SATURDAY</span>
              <span className="text-5xl sm:text-5xl md:text-6xl font-[family-name:var(--font-crimson)] font-light my-1 sm:my-0">14</span>
              <span className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] uppercase tracking-wider">2:00 PM</span>
            </div>
            
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-light text-[#3C3C3C]">
              2026
            </p>
          </div>

          {/* Ceremony and Reception */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ephesis)] text-[#3C3C3C] pt-2 sm:pt-4 px-4">
            Ceremony and Reception
          </p>

          {/* Venue Details */}
          <div className="space-y-1 pb-4 sm:pb-6 px-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-semibold text-[#3C3C3C] uppercase tracking-wider">
              ILOILO CONVENTION CENTER
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] leading-relaxed">
              Megaworld Blvd, Iloilo Business Park, Mandurriao
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C]">
              Iloilo City, Philippines
            </p>
          </div>

          {/* Simple CTA Button */}
          <div className="pt-4 sm:pt-6">
            <a
              href="#guest-list"
              className="inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-[#E8DCC8] bg-[#3C3C3C] hover:bg-[#3C3C3C]/90 active:bg-[#3C3C3C]/95 transition-all duration-300 tracking-wider uppercase border border-[#3C3C3C] hover:scale-105 active:scale-100 shadow-md"
            >
              <Heart size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              RSVP
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
