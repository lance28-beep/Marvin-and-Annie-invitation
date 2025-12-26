"use client"

import { useEffect, useRef } from "react"
import { useAudio } from "@/contexts/audio-context"

interface BackgroundMusicProps {
  autoStart?: boolean;
}

const BackgroundMusic = ({ autoStart = false }: BackgroundMusicProps) => {
  const { audioRef } = useAudio()
  const hasInitialized = useRef(false)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl || hasInitialized.current) return

    // Mark as initialized to prevent re-initialization
    hasInitialized.current = true

    // Only set volume on first initialization if not already playing
    if (audioEl.paused) {
      audioEl.volume = 0
    }

    const fadeIn = () => {
      let volume = audioEl.volume
      const fadeInterval = setInterval(() => {
        if (volume < 0.7) {
          volume += 0.05
          if (audioEl) audioEl.volume = Math.min(volume, 0.7)
        } else {
          clearInterval(fadeInterval)
        }
      }, 100)
      return fadeInterval
    }

    const attemptAutoPlay = async () => {
      if (!audioEl || !audioEl.paused) return // Don't play if already playing
      
      try {
        await audioEl.play()
        fadeIn()
      } catch (error) {
        console.log("Autoplay blocked, waiting for user interaction:", error)
      }
    }

    const handleUserInteraction = async () => {
      if (!audioEl || !audioEl.paused) return // Don't play if already playing
      
      try {
        await audioEl.play()
        fadeIn()
        
        // Clean up event listeners after successful play
        document.removeEventListener("click", handleUserInteraction)
        document.removeEventListener("touchstart", handleUserInteraction)
        document.removeEventListener("keydown", handleUserInteraction)
      } catch (error) {
        console.log("Playback blocked:", error)
      }
    }

    // Try autoplay if enabled and not already playing
    if (autoStart && audioEl.paused) {
      attemptAutoPlay()
    }

    // Add multiple event listeners for better coverage
    document.addEventListener("click", handleUserInteraction, { once: false })
    document.addEventListener("touchstart", handleUserInteraction, { once: false })
    document.addEventListener("keydown", handleUserInteraction, { once: false })

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [audioRef, autoStart])

  return (
    <audio
      ref={audioRef}
      src={encodeURI(
        "/background_music/Kina Grannis ft. Imaginary Future - I Will Spend My Whole Life Loving You (lyrics).mp3",
      )}
      loop
      preload="auto"
      playsInline
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic
