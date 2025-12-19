"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { Countdown } from "@/components/sections/countdown"
import { CoupleVideo } from "@/components/sections/couple-video"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { Entourage } from "@/components/sections/entourage"
import { PrincipalSponsors } from "@/components/sections/principal-sponsors"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { Registry } from "@/components/sections/registry"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"
import { Gallery } from "@/components/sections/gallery"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })
const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })

export default function Home() {
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  return (
    <main className="relative">
      {enableDecor && <BackgroundMusic />}
      {/* Silk Background Animation */}
      {enableDecor && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={<div className="w-full h-full bg-[#E8DCC8]" />}>
            <Silk speed={3} scale={1.2} color="#E8DCC8" noiseIntensity={0.5} rotation={0.2} />
          </Suspense>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Countdown />
        <CoupleVideo />
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
    </main>
  )
}
