"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar and mobile dock while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    const mobileDock = document.querySelector(".md\\:hidden.fixed.bottom-0") as HTMLElement | null
    
    if (navbar) navbar.style.display = "none"
    if (mobileDock) mobileDock.style.display = "none"
    
    return () => {
      if (navbar) navbar.style.display = ""
      if (mobileDock) mobileDock.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Simple top bar with only Back link */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#E8DCC8]/95 border-b border-[#1A1A1A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1A1A1A] font-[family-name:var(--font-crimson)] font-semibold px-4 py-2 rounded-full border border-[#1A1A1A]/30 hover:bg-[#1A1A1A]/5 hover:border-[#1A1A1A]/50 transition-all duration-200"
          >
            ← Back to main page
          </Link>
          <div className="text-xs text-[#1A1A1A]/60 font-[family-name:var(--font-crimson)]">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}






