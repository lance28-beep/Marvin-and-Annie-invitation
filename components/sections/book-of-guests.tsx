"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Mail,
  MessageSquare,
  Heart,
  Sparkles,
  User,
} from "lucide-react";

interface Guest {
  Name: string;
  Email: string;
  RSVP: string;
  Guest: string;
  Message: string;
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGuests, setTotalGuests] = useState(0);

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?";
  };

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/guests", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch guest list");
      }

      const data: Guest[] = await response.json();

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || "1", // Ensure Guest field exists
        }));

      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1;
        return sum + guestCount;
      }, 0);

      setGuests(attendingGuests);
      setTotalGuests(totalGuestCount);
    } catch (error: any) {
      console.error("Failed to load guests:", error);
      setError(error?.message || "Failed to load guest list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchGuests();

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests();
      }, 2000);
    };

    window.addEventListener("rsvpUpdated", handleRsvpUpdate);

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate);
    };
  }, []);

  return (
    <div
      id="guests"
      className="relative z-[55] isolate bg-[#E8DCC8]/80 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Semi-transparent overlay for better text readability - same as countdown section */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-white mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em]"
          style={{
            textShadow:
              "0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Book of Guests
        </h2>

        <p
          className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4"
          style={{
            textShadow:
              "0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          See who's celebrating with us on our special day
        </p>
      </div>

      {/* Guests content */}
      <div className="relative z-10">
        {/* Stats card */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm border-2 border-[#1A1A1A]/40 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 overflow-hidden">
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-[#1A1A1A] p-2 sm:p-3 rounded-full shadow-lg">
                    <Heart className="text-[#E8DCC8] h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A]">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}{" "}
                      Celebrating With Us
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#1A1A1A]/70 font-[family-name:var(--font-crimson)] mt-1">
                      {guests.length}{" "}
                      {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/80 font-[family-name:var(--font-crimson)] leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the
                  world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm border-2 border-[#1A1A1A]/40 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-[#1A1A1A]" />
                    <span className="text-[#1A1A1A] font-[family-name:var(--font-crimson)] text-lg">
                      Loading guests...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-500 font-[family-name:var(--font-crimson)] text-lg mb-2">
                      {error}
                    </p>
                  </div>
                </div>
              ) : guests.length === 0 ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <div className="bg-[#1A1A1A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-[#E8DCC8]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-2">
                      No guests have RSVP'd yet
                    </h3>
                    <p className="text-sm sm:text-base text-[#1A1A1A]/70 font-[family-name:var(--font-crimson)] max-w-md mx-auto leading-relaxed">
                      Be the first to RSVP and kick off the celebration!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 relative z-10">
                  {guests.map((guest, index) => (
                    <div
                      key={index}
                      className="group relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/40 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {/* Avatar */}
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0">
                          <div className="h-full w-full rounded-full bg-[#1A1A1A] text-[#E8DCC8] flex items-center justify-center font-[family-name:var(--font-crimson)] font-semibold shadow-md ring-2 ring-white text-sm sm:text-base">
                            {getInitials(guest.Name)}
                          </div>
                        </div>

                        {/* Guest Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 pr-14 sm:pr-0">
                              <h4 className="font-[family-name:var(--font-crimson)] text-base sm:text-lg md:text-xl font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#3C3C3C] transition-colors duration-200">
                                {guest.Name}
                              </h4>
                              {guest.Email && guest.Email !== "Pending" && (
                                <div className="flex items-center text-xs sm:text-sm text-[#1A1A1A]/70">
                                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 text-[#1A1A1A] flex-shrink-0" />
                                  <span className="font-[family-name:var(--font-crimson)] break-all">
                                    {guest.Email}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* Guest count badge */}
                            <div className="absolute right-3 top-3 sm:static sm:right-auto sm:top-auto flex items-center gap-1.5 sm:gap-2">
                              <User className="h-4 w-4 text-[#1A1A1A] flex-shrink-0" />
                              <span className="inline-flex items-center justify-center px-3 py-1 bg-[#E8DCC8]/20 text-[#1A1A1A] rounded-full text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold border border-[#1A1A1A]/20">
                                {guest.Guest
                                  ? parseInt(String(guest.Guest)) || 1
                                  : 1}{" "}
                                {parseInt(String(guest.Guest || "1")) === 1
                                  ? "guest"
                                  : "guests"}
                              </span>
                            </div>
                          </div>

                          {/* Message */}
                          {guest.Message && (
                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#1A1A1A]/20">
                              <div className="flex items-start gap-2 sm:gap-3">
                                <MessageSquare className="h-4 w-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                                <p className="text-xs sm:text-sm md:text-base text-[#1A1A1A]/80 font-[family-name:var(--font-crimson)] leading-relaxed italic flex-1">
                                  "{guest.Message}"
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
