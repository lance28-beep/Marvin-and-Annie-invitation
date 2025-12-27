"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: March 14, 2026 at 2:00 PM GMT+8
      // Compute using UTC to avoid timezone parsing inconsistencies across browsers
      // 2:00 PM GMT+8 == 06:00 AM UTC
      const targetDate = Date.UTC(2026, 2, 14, 6, 0, 0) // March is month 2 (0-indexed)
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Simple, elegant card */}
      <div className="relative group">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        
        {/* Main card */}
        <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 min-w-[65px] sm:min-w-[75px] md:min-w-[90px] lg:min-w-[100px]">
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={6}
              gap={3}
              textColor="#1A1A1A"
              fontWeight={700}
              borderRadius={8}
              horizontalPadding={4}
              gradientHeight={10}
              gradientFrom="rgba(26,26,26,0.08)"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Simple label */}
      <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] uppercase tracking-wider drop-shadow-sm">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-[#E8DCC8]/50"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em] drop-shadow-sm">
          Countdown to Our Special Day
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A] font-light max-w-xl mx-auto leading-relaxed tracking-wide drop-shadow-sm px-4">
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-7 mb-12 sm:mb-16 md:mb-20 flex-wrap px-4 sm:px-6">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Wedding date presentation - Save The Date Card Style */}
        <div className="flex justify-center px-4 sm:px-6">
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
              </div>
              
              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-5">
                Save The Date
              </p>
              
              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              {/* Month - Script style like "and" in hero */}
              <div className="mb-5 sm:mb-6 md:mb-8">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ephesis)] text-[#1A1A1A] leading-none drop-shadow-sm">
                  March
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-7 mb-8 sm:mb-10">
                {/* Day - Large and bold focal point */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] leading-none drop-shadow-md">
                  14
                </p>
                
                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-0.5 bg-[#1A1A1A]/50" />
                
                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] leading-none drop-shadow-sm">
                  2026
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
              </div>
              
              {/* Time */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] tracking-wide mb-4 sm:mb-5 drop-shadow-sm">
                2:00 PM
              </p>
              
              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-10 sm:w-14 md:w-20 bg-[#1A1A1A]/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
