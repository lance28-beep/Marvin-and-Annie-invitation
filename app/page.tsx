"use client"

import { Suspense, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Hero as MainHero } from "@/components/sections/hero"
import { Countdown } from "@/components/sections/countdown"
import { Gallery } from "@/components/sections/gallery"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { Entourage } from "@/components/sections/entourage"
import { PrincipalSponsors } from "@/components/sections/principal-sponsors"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { Registry } from "@/components/sections/registry"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import { Hero as InvitationHero } from "@/components/loader/Hero"
import { LoadingScreen } from "@/components/loader/LoadingScreen"
import { Navbar } from "@/components/navbar"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })
const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })

// App state enum for managing UI transitions
enum AppState {
  LOADING = "LOADING",
  LANDING = "LANDING",
  DETAILS = "DETAILS",
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING)
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  const handleLoadingComplete = useCallback(() => {
    setAppState(AppState.LANDING)
  }, [])

  const handleOpenInvitation = useCallback(() => {
    setAppState(AppState.DETAILS)
    
    // Trigger music to start (will be picked up by ClientLayout)
    window.dispatchEvent(new Event('startMusic'))
    
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="relative min-h-screen bg-cloud text-charcoal selection:bg-birch selection:text-nut overflow-hidden font-sans">
        {/* Loading Screen - appears first */}
        {appState === AppState.LOADING && <LoadingScreen onComplete={handleLoadingComplete} />}

        <main className="relative w-full h-full">
          {/* Invitation Hero - appears after loading */}
          <InvitationHero onOpen={handleOpenInvitation} visible={appState === AppState.LANDING} />

        {/* Main Content - appears after opening invitation */}
        <div className={`transition-opacity duration-1000 ${appState === AppState.DETAILS ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {enableDecor && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-primary/10 to-secondary/5" />}>
                <Silk speed={5} scale={1.1} color="#FFFFFF" noiseIntensity={0.8} rotation={0.3} />
              </Suspense>
            </div>
          )}

            <div className="relative z-10">
              {appState === AppState.DETAILS && <Navbar />}
              <MainHero />
        <Countdown />
        {/* <CoupleVideo /> */}
        <Messages />
      <Gallery />
        <Details />
        <Entourage />
        <PrincipalSponsors />
        <GuestList />
        <BookOfGuests />
        <Registry />
        <FAQ />
        <SnapShare />
        <Footer />
      </div>
        </div>
      </main>
    </div>
  )
}
