"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/content/site";

export function Footer() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <footer className="relative z-20 mt-16 overflow-hidden bg-[#E8DCC8]">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Wedding date presentation */}
        <motion.div
          className="flex justify-center px-4 mb-16"
          variants={fadeInUp}
        >
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
              </div>

              {/* Save The Date text */}
              <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-medium text-[#1A1A1A] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">
                Save The Date
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ephesis)] text-[#1A1A1A] leading-none">
                  March
                </p>
              </div>

              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-[family-name:var(--font-crimson)] font-bold text-[#3C3C3C] leading-none drop-shadow-lg">
                  14
                </p>

                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-[#1A1A1A]/50" />

                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-crimson)] font-light text-[#1A1A1A] leading-none">
                  2026
                </p>
              </div>

              {/* Day of Week */}
              <p className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-light text-[#1A1A1A]/80 mb-6 sm:mb-8">
                Saturday
              </p>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
              </div>

              {/* Time */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-medium text-[#1A1A1A] tracking-wide mb-4 sm:mb-5">
                2 O'CLOCK
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elegant Couple Names & Date Section */}
        <motion.div
          className="flex justify-center px-4 my-16 sm:my-20 md:my-24"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 lg:p-20 border border-[#1A1A1A]/10">
            {/* Couple Names - Bold Serif Style */}
            <div className="text-center mb-8 sm:mb-10 space-y-2 sm:space-y-3">
              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-bold uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#E5A857] via-[#EAB561] to-[#D4A450] tracking-wider">
                {siteConfig.couple.groomNickname}
              </h3>
              <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-bold uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#E5A857] via-[#EAB561] to-[#D4A450] tracking-wider">
                {siteConfig.couple.brideNickname}
              </h3>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 my-6 sm:my-8">
              <div className="h-px w-16 sm:w-20 md:w-24 bg-[#1A1A1A]/30" />
              <div className="w-2 h-2 bg-[#C3A161] rounded-full" />
              <div className="h-px w-16 sm:w-20 md:w-24 bg-[#1A1A1A]/30" />
            </div>

            {/* Wedding Date */}
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-bold text-[#1A1A1A] uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                {siteConfig.wedding.date}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
