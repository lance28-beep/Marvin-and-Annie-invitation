import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/couple (1).webp',
  '/desktop-background/couple (2).webp',
  '/desktop-background/couple (4).webp',
  '/desktop-background/couple (5).webp',
  '/desktop-background/couple (12).webp',
  '/desktop-background/couple (17).webp',
  '/desktop-background/couple (18).webp',
  '/desktop-background/couple (19).webp',
  '/desktop-background/couple (20).webp',
  '/desktop-background/couple (21).webp',
];

const mobileImages: string[] = [
  '/mobile-background/couple (1).webp',
  '/mobile-background/couple (2).webp',
  '/mobile-background/couple (3).webp',
  '/mobile-background/couple (4).webp',
  '/mobile-background/couple (5).webp',
  '/mobile-background/couple (6).webp',
  '/mobile-background/couple (7).webp',
  '/mobile-background/couple (8).webp',
  '/mobile-background/couple (9).webp',
  '/mobile-background/couple (10).webp',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect mobile/desktop on mount and listen for changes
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!mounted || !visible) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => {
        const imageCount = isMobile ? mobileImages.length : desktopImages.length;
        return (prev + 1) % imageCount;
      });
    }, 5000); // 5 seconds
    
    return () => clearInterval(timer);
  }, [mounted, visible, isMobile]);

  // Select images based on screen size
  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        visible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'
      }`}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Marvin & Annie"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Elegant white overlay - wedding motif */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFEF9]/60 via-[#FFF9F0]/50 to-[#FFFEF5]/55 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(212,175,130,0.12)_100%)] pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram - elegant white with gold border */}
        <FadeIn show={visible} delay={400} className="mb-auto mt-8">
          <div className="w-20 h-24 border-2 border-[#D4AF82]/50 rounded-[2rem] flex items-center justify-center backdrop-blur-sm bg-white/95 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="relative w-14 h-14">
              <Image
                src="/monogram/image.png"
                alt="Marvin & Annie Monogram"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-4 pb-14 sm:pb-16 md:pb-20">
          <FadeIn show={visible} delay={700}>
            <h2
              className="text-6xl md:text-8xl transform -rotate-6 drop-shadow-lg opacity-95 text-[#6B6B6B] animate-[float_3s_ease-in-out_infinite]"
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontWeight: 400,
                textShadow: '0 4px 14px rgba(212,175,130,0.4), 0 2px 8px rgba(255,255,255,0.8)',
              }}
            >
              You are
            </h2>
          </FadeIn>
          
          <FadeIn show={visible} delay={1000}>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-wider uppercase text-[#6B6B6B]"
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                textShadow: '0 6px 16px rgba(212,175,130,0.4), 0 2px 10px rgba(255,255,255,0.9)',
              }}
            >
              Invited!
            </h1>
          </FadeIn>

          <FadeIn show={visible} delay={1600}>
            <button 
              onClick={onOpen}
              className="group relative px-10 py-4 bg-[#D4AF82] text-white font-serif text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#C9A882] active:bg-[#B8966E] shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100 rounded-sm overflow-hidden border border-[#D4AF82]"
              aria-label="Open Wedding Invitation"
            >
              <span
                className="relative z-10 text-white"
                style={{ fontFamily: '"Cinzel", serif', fontWeight: 600 }}
              >
                Open Invitation
              </span>
              {/* Button sheen effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
              
              {/* Button glow effect on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
            </button>
          </FadeIn>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-6deg);
          }
          50% {
            transform: translateY(-10px) rotate(-6deg);
          }
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
    </div>
  );
};
