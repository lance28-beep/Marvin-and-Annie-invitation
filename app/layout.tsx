import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Crimson_Text, Ephesis } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { AudioProvider } from "@/contexts/audio-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const crimsonText = Crimson_Text({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson" 
})
const ephesis = Ephesis({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-ephesis" 
})

export const metadata: Metadata = {
  title: "Marvin & Annie - Wedding Invitation",
  description:
    "You're invited to the wedding of Marvin & Annie! Join us on March 14, 2026 in Iloilo Convention Center. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Marvin & Annie wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Iloilo Convention Center, #MarvinAndAnnieWedding",
  authors: [
    { name: "Marvin" },
    { name: "Annie" },
  ],
  creator: "Marvin & Annie",
  publisher: "Marvin & Annie",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Marvin-and-Annie-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Marvin-and-Annie-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Marvin & Annie Wedding | March 14, 2026",
    description:
      "Celebrate the union of Marvin & Annie on March 14, 2026 in Iloilo Convention Center. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Marvin-and-Annie-invitation.vercel.app/",
    siteName: "Marvin and Annie Wedding ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Marvin-and-Annie-invitation.vercel.app/Details/image.png",
        width: 1200,
        height: 630,
        alt: "Marvin & Annie Wedding Invitation - March 14, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvin & Annie Wedding Invitation",
    description:
      "You're invited to the wedding of Marvin & Annie! March 14, 2026. RSVP, view our gallery, and leave a message! #MarvinAndAnnieWedding",
    images: ["https://Marvin-and-Annie-invitation.vercel.app/Details/image.png"],
    creator: "@marvinandannie",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Marvin & Annie Wedding",
      startDate: "2026-02-14T14:00:00+08:00",
      endDate: "2026-02-14T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Iloilo Convention Center",
          address: {
            "@type": "PostalAddress",
            streetAddress: "M.J. Cuenco Avenue, Brgy. Mandurriao, Iloilo City",
            addressLocality: "Iloilo City",
            addressRegion: "Iloilo",
            postalCode: "5000",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Marvin-and-Annie-invitation.vercel.app/Details/image.png"],
      description:
        "You're invited to the wedding of Marvin & Annie! Join us on March 14, 2026 in Iloilo Convention Center. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Marvin & Annie",
      },
      offers: {
        "@type": "Offer",
        url: "https://Marvin-and-Annie-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
        eventHashtag: "#MarvinAndAnnieWedding",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A3428" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${crimsonText.variable} ${ephesis.variable} font-inter antialiased text-foreground`}>
        <AudioProvider>
          <Navbar />
          {children}
          <Analytics />
        </AudioProvider>
      </body>
    </html>
  )
}
