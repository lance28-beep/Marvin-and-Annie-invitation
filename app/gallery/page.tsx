import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-[#E8DCC8]/50 relative overflow-hidden">
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-[#1A1A1A] mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em] drop-shadow-sm">
            Gallery
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A] font-light tracking-wide leading-relaxed px-4">A collection from our favorite moments</p>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#1A1A1A]/40 to-transparent" />
        </div>

        {images.length === 0 ? (
          <div className="text-center">
            <p className="text-[#1A1A1A]/80 font-[family-name:var(--font-crimson)]">No images found. Add files to <code className="px-2 py-1 bg-[#1A1A1A]/10 rounded border border-[#1A1A1A]/30 text-[#1A1A1A]/90">public/desktop-background</code> or <code className="px-2 py-1 bg-[#1A1A1A]/10 rounded border border-[#1A1A1A]/30 text-[#1A1A1A]/90">public/mobile-background</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section */}
        
      </section>
    </main>
  )
}


