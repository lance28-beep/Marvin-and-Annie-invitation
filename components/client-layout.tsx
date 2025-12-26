"use client"

import { useEffect, useState, useRef } from "react"
import { AudioProvider } from "@/contexts/audio-context"
import BackgroundMusic from "@/components/background-music"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [shouldStartMusic, setShouldStartMusic] = useState(false)
  const musicInitialized = useRef(false)
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  useEffect(() => {
    // Check if user has already interacted (opened invitation)
    const hasInteracted = sessionStorage.getItem('musicStarted')
    if (hasInteracted === 'true') {
      setShouldStartMusic(true)
      musicInitialized.current = true
    }

    // Listen for custom event when user opens invitation
    const handleMusicStart = () => {
      if (musicInitialized.current) return // Prevent multiple initializations
      
      setShouldStartMusic(true)
      sessionStorage.setItem('musicStarted', 'true')
      musicInitialized.current = true
    }

    window.addEventListener('startMusic', handleMusicStart)
    return () => window.removeEventListener('startMusic', handleMusicStart)
  }, [])

  return (
    <AudioProvider>
      {/* Render music component only once after initialization */}
      {enableDecor && shouldStartMusic && <BackgroundMusic autoStart={true} />}
      {children}
    </AudioProvider>
  )
}
