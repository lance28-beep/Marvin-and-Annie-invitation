"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfcKAlO0Cw52hNuZQOLV_gQE8rU7DrElCQfa_gIoWv90rxBRQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto px-4 sm:px-0">
      {/* Clean decorative background elements */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#3C3C3C]/10 rounded-full blur-sm sm:w-8 sm:h-8 sm:-top-4 sm:-left-4"></div>
      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#3C3C3C]/8 rounded-full blur-md sm:w-10 sm:h-10 sm:-bottom-4 sm:-right-4"></div>
      
      <Card className={`relative w-full border-2 border-[#3C3C3C]/25 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 overflow-hidden rounded-xl ${
        isFocused ? 'border-[#3C3C3C]/40 bg-white/95' : 'hover:border-[#3C3C3C]/35'
      } ${isSubmitted ? 'animate-bounce' : ''}`}>
        {/* Simple elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8DCC8]/5 to-transparent"></div>
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/10 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="text-green-600 font-semibold text-lg">Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-5 sm:p-8 md:p-10">
          {/* Header with icon */}
          <div className="text-center mb-5 sm:mb-8">
            <div className="relative inline-block mb-3 sm:mb-4">
              <div className="absolute inset-0 bg-[#3C3C3C]/20 rounded-full blur-lg scale-150"></div>
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-[#3C3C3C] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="h-5 w-5 sm:h-7 sm:w-7 text-[#E8DCC8]" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] mb-2 sm:mb-3 uppercase tracking-[0.12em]">
              Share Your Love
            </h3>
            <p className="text-sm sm:text-base text-[#3C3C3C]/80 font-[family-name:var(--font-crimson)] font-light tracking-wide leading-relaxed px-1">
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="block text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#3C3C3C] uppercase tracking-wider">
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`w-full border border-[#3C3C3C]/30 rounded py-2 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#3C3C3C] placeholder:text-[#3C3C3C]/40 transition-all duration-200 bg-white focus:outline-none ${
                    focusedField === 'name' 
                      ? 'border-[#3C3C3C] shadow-sm' 
                      : 'hover:border-[#3C3C3C]/50'
                  }`}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#3C3C3C] uppercase tracking-wider">
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-xs font-[family-name:var(--font-crimson)] transition-colors ${
                    messageValue.length > 500 ? 'text-red-500' : 'text-[#3C3C3C]/50'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love, memories, or well wishes..."
                  className={`w-full border border-[#3C3C3C]/30 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#3C3C3C] placeholder:text-[#3C3C3C]/40 transition-all duration-200 resize-none bg-white py-2 sm:py-2.5 px-3 sm:px-4 focus:outline-none ${
                    focusedField === 'message' 
                      ? 'border-[#3C3C3C] shadow-sm' 
                      : 'hover:border-[#3C3C3C]/50'
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full bg-[#3C3C3C] hover:bg-[#3C3C3C]/90 active:bg-[#3C3C3C]/95 text-[#E8DCC8] py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none border border-[#3C3C3C] tracking-wider uppercase"
            >
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbwzapCtnowMfVEpqtBVKpOKf1E3QtiMAEu4JhF0wLUJcgeuNSNam3_NgFe7Xn3F0oxLeQ/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" className="bg-[#E8DCC8]/80 py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Semi-transparent overlay for better text readability - same as countdown section */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Floating soft glows */}
          <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 bg-[#3C3C3C]/5 rounded-full blur-2xl animate-pulse" />
          <div className="hidden sm:block absolute top-10 right-0 w-20 h-20 bg-[#3C3C3C]/8 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="hidden sm:block absolute bottom-10 left-10 w-28 h-28 bg-[#3C3C3C]/5 rounded-full blur-2xl animate-pulse delay-2000" />
          <div className="sm:hidden absolute top-4 left-0 w-14 h-14 bg-[#3C3C3C]/5 rounded-full blur-lg" />
          <div className="sm:hidden absolute bottom-6 right-2 w-10 h-10 bg-[#3C3C3C]/8 rounded-full blur-md" />

          {/* Gradient lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3C3C3C]/20 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3C3C3C]/15 to-transparent" />
        </div>
        {/* Header Section */}
         <div className="text-center mb-12 sm:mb-16 md:mb-20">
           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-[#3C3C3C] mb-8 sm:mb-10 text-balance uppercase tracking-[0.12em] sm:tracking-[0.15em]">
             Love Messages
           </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative inline-block mb-5 sm:mb-7">
              <div className="absolute inset-0 bg-[#3C3C3C]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
            </div>
            
            <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-ephesis)] text-[#3C3C3C] mb-4 sm:mb-5">
              Share Your Heartfelt Wishes
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-[#3C3C3C]/80 font-[family-name:var(--font-crimson)] font-light leading-relaxed max-w-2xl mx-auto px-4 sm:px-6 tracking-wide">
              Your messages of love and joy will be treasured forever. 
              Share your memories, well wishes, and congratulations for the happy couple.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center mb-16 sm:mb-20 md:mb-24">
          <div className="relative max-w-2xl w-full">
            {/* Card halo */}
            <div className="absolute -inset-3 bg-gradient-to-br from-[#3C3C3C]/15 via-[#3C3C3C]/10 to-transparent rounded-3xl blur-2xl opacity-70" />
            <div className="absolute -inset-1 bg-gradient-to-br from-[#3C3C3C]/8 via-transparent to-transparent rounded-3xl blur-md opacity-80" />
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Messages Display Section */}
        {/* <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
         
          <div className="absolute -top-3 -left-3 w-4 h-4 bg-[#3C3C3C]/40 rounded-full blur-sm opacity-70" />
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-[#3C3C3C]/40 rounded-full blur-sm opacity-70" />
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <div className="relative inline-block mb-5 sm:mb-7">
              <div className="absolute inset-0 bg-[#3C3C3C]/15 rounded-full blur-xl scale-150"></div>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-[#3C3C3C] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-[#E8DCC8]" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] text-[#3C3C3C] mb-3 sm:mb-4">
              Messages from Loved Ones
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-[#3C3C3C]/70 font-[family-name:var(--font-crimson)] font-light max-w-2xl mx-auto px-4 tracking-wide">
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div> */}

      </div>
    </Section>
  )
}
