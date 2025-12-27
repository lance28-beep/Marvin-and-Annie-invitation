"use client"

import { Section } from "@/components/section"
import { Heart } from "lucide-react"
import Image from "next/image"

interface TimelineEvent {
  time: string
  event: string
  image: string
}

const timelineEvents: TimelineEvent[] = [
  { time: "2:00 PM", event: "Ceremony", image: "/TimelineImage/Ceremony.png" },
  { time: "4:00 PM", event: "Photo Taking", image: "/TimelineImage/PhotoTaking.png" },
  { time: "4:30 PM", event: "Cocktail Hour", image: "/TimelineImage/CocktailHour.png" },
  { time: "6:00 PM", event: "Start of the Program", image: "/TimelineImage/StartoftheProgram.png" },
  { time: "7:00 PM", event: "Dinner Time", image: "/TimelineImage/DinnerTime.png" },
  { time: "9:00 PM", event: "After Party", image: "/TimelineImage/AfterParty.png" },
]

export function WeddingTimeline() {
  return (
    <Section
      id="timeline"
      className="relative py-10 sm:py-16 md:py-20 lg:py-24 bg-[#E8DCC8]/80 overflow-hidden"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
      
      {/* Elegant background decorative elements - neutral tones */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#6B6B6B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3C3C3C]/5 rounded-full blur-3xl" />
      </div>
      
      {/* Section Header - Compact for mobile */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-3 sm:px-4 md:px-6">
        {/* Decorative top element */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-[#1A1A1A]/30" />
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#6B6B6B]" fill="currentColor" />
          <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-[#1A1A1A]/30" />
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] drop-shadow-sm">
          Wedding Timeline
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A]/80 font-light max-w-2xl mx-auto leading-relaxed tracking-wide drop-shadow-sm px-2 sm:px-4 italic">
          Join us throughout the day
        </p>
      </div>

      {/* Timeline Content - Compact padding for mobile */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          {/* Subtle glow on hover - neutral */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#6B6B6B]/10 via-[#3C3C3C]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
          
          <div className="relative bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#1A1A1A]/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden">
            {/* Elegant top border accent - neutral */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6B6B6B]/30 to-transparent" />
            
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              {/* Timeline Events - Compact spacing for mobile */}
              <div className="relative">
                {/* Central timeline line - neutral */}
                <div className="absolute left-8 sm:left-10 md:left-12 lg:left-16 xl:left-[4.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6B6B6B]/20 via-[#1A1A1A]/20 to-[#6B6B6B]/20 hidden sm:block" />
                
                <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
                  {timelineEvents.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                        {/* Timeline image */}
                        <div className="flex-shrink-0 relative z-10">
                          <Image
                            src={item.image}
                            alt={item.event}
                            width={96}
                            height={96}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain"
                          />
                        </div>
                        
                        {/* Event content - Compact typography for mobile */}
                        <div className="flex-1 pt-1 sm:pt-2 md:pt-3 lg:pt-4">
                          <div className="mb-2 sm:mb-3 md:mb-4">
                            <span className="inline-block text-[10px] sm:text-xs md:text-sm lg:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#6B6B6B] uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] bg-[#6B6B6B]/10 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full border border-[#6B6B6B]/20">
                              {item.time}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] leading-tight">
                            {item.event}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Elegant connecting line for mobile - neutral */}
                      {index < timelineEvents.length - 1 && (
                        <div className="absolute left-8 top-20 sm:hidden w-0.5 h-6 bg-gradient-to-b from-[#6B6B6B]/20 to-[#1A1A1A]/20" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Elegant decorative divider with heart - Compact spacing */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 my-8 sm:my-10 md:my-12 lg:my-16 xl:my-20">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6B6B6B]/30 to-[#6B6B6B]/30 max-w-[60px] sm:max-w-[100px] md:max-w-[150px]" />
                <div className="relative">
                  <div className="absolute inset-0 bg-[#6B6B6B]/15 rounded-full blur-lg" />
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#6B6B6B] relative z-10" fill="currentColor" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#6B6B6B]/30 to-[#6B6B6B]/30 max-w-[60px] sm:max-w-[100px] md:max-w-[150px]" />
              </div>

              {/* Reminder Message - Compact padding for mobile */}
              <div className="relative group/reminder">
                {/* Subtle background glow - neutral */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#6B6B6B]/8 via-[#3C3C3C]/5 to-transparent rounded-2xl opacity-0 group-hover/reminder:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-[#1A1A1A]/20 shadow-lg">
                  <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 relative z-10">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A]/90 leading-relaxed text-center">
                      It took us a full year to plan this wedding, and we truly hope it's an evening everyone enjoys.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A]/90 leading-relaxed text-center">
                      We kindly ask our guests to stay with us until the end of the program, as we've planned something special and meaningful to conclude the celebration. If you do need to leave earlier, we would absolutely love the chance to personally thank you and say goodbye before you go—perhaps after the same-day video is played.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A]/90 leading-relaxed text-center">
                      Your presence means so much to us, and we're incredibly grateful to be celebrating this moment together.
                    </p>
                    
                    {/* Elegant closing message */}
                    <div className="pt-3 sm:pt-4 md:pt-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                        <div className="h-px w-8 sm:w-12 md:w-16 bg-[#6B6B6B]/25" />
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#6B6B6B]" fill="currentColor" />
                        <div className="h-px w-8 sm:w-12 md:w-16 bg-[#6B6B6B]/25" />
                      </div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-ephesis)] text-[#1A1A1A] text-center italic">
                        Don't eat and run
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
