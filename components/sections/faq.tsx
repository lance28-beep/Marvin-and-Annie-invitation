"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When and where is the wedding?",
    answer:
      "The wedding ceremony and reception will be held on Saturday, March 14, 2026, at 2 O'CLOCK at the Iloilo Convention Center, Megaworld Blvd, Iloilo Business Park, Mandurriao, Iloilo City, Philippines.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Principal Sponsors (Ninong): Black suit\nPrincipal Sponsors (Ninang): Long gown in Black or Emerald Green\n\nGuests (Gentlemen): Long-sleeved shirt or suit (optional)\nGuests (Ladies): Long gown or long dress in Beige, Chocolate brown, or Taupe\n\nPlease note: T-shirts, denim, and sports shoes are not permitted.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm by January 14, 2026. We have reserved seats for you, and we look forward to celebrating with you! Your response helps us finalize our guest list and seating arrangements.\n\nFor any questions or concerns, contact us at: 09088993835 / 09453324669\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence at our wedding is the most precious gift. Should you wish to share a blessing, red envelopes will be provided for your convenience.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! The Iloilo Convention Center has ample parking facilities. We recommend arriving 15-20 minutes early to secure a spot and get settled comfortably.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We have a professional photographer and videographer to capture our special moments. However, you're more than welcome to take photos! We'll also have a dedicated time for group photos after the ceremony.",
  },
  {
    question: "How do I get to the venue?",
    answer:
      "The Iloilo Convention Center is located at Megaworld Blvd, Iloilo Business Park. You can use the 'Get Directions' button in the Event Details section to open Google Maps for easy navigation.",
  },

  {
    question: "When is the appropriate time to leave?",
    answer:
      "It took us a full year to plan this wedding, and we truly hope it's an evening everyone enjoys.\n\nWe kindly ask our guests to stay with us until the end of the program, as we've planned something special and meaningful to conclude the celebration. If you do need to leave earlier, we would absolutely love the chance to personally thank you and say goodbye before you go—perhaps after the same-day video is played.\n\nYour presence means so much to us, and we're incredibly grateful to be celebrating this moment together.\n\nDon't eat and run",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="relative bg-[#E8DCC8]/80 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Semi-transparent overlay for better text readability - same as countdown section */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em] drop-shadow-sm">
          Frequently Asked Questions
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A] font-light max-w-xl mx-auto leading-relaxed tracking-wide drop-shadow-sm px-4">
          Everything you need to know
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative bg-white backdrop-blur-sm border-2 border-[#1A1A1A]/40 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 overflow-hidden">
            {/* FAQ items */}
            <div className="space-y-3 sm:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const contentId = `faq-item-${index}`;
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#1A1A1A]/20 bg-white hover:bg-[#E8DCC8]/10 transition-all duration-300 hover:shadow-md hover:border-[#1A1A1A]/30 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] pr-4 text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-[#3C3C3C] transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-[#1A1A1A] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 bg-[#E8DCC8]/20 border-t border-[#1A1A1A]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#1A1A1A]/80 leading-relaxed text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="text-[#1A1A1A] underline font-semibold hover:text-[#3C3C3C] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  document
                                    .getElementById("guest-list")
                                    ?.scrollIntoView({ behavior: "smooth" });
                                }}
                              >
                                {
                                  item.answer.match(
                                    /\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/,
                                  )?.[1]
                                }
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#1A1A1A]/80 leading-relaxed text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
