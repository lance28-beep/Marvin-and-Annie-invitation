import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Wait for minimum loading time and progress completion
    const minLoadingTime = 2000;
    const startTime = Date.now();

    const checkComplete = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (progress >= 100 && elapsed >= minLoadingTime) {
        clearInterval(checkComplete);
        setFadeOut(true);
        // Use shorter delay for smoother transition
        setTimeout(onComplete, 800);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkComplete);
    };
  }, [onComplete, progress]);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center overflow-hidden transition-all duration-800 ${
        fadeOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background - Elegant white wedding theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFEF9] via-[#FFF9F0] to-[#FFFEF5]" />
      
      {/* Animated background pattern - subtle shimmer */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,130,0.3),transparent_60%)] animate-pulse" />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-8">
        <div className="relative flex items-center justify-center">
          {/* Elegant glow halos - champagne/gold tones */}
          <div className="absolute w-40 h-40 rounded-full bg-[#D4AF82]/15 blur-3xl animate-[pulse_2s_ease-in-out_infinite]" />
          <div className="absolute w-28 h-28 rounded-full bg-[#C9A882]/10 blur-2xl animate-[ping_2s_ease-in-out_infinite]" />

          {/* Outer decorative rings - elegant gold accents */}
          <div className="absolute w-32 h-32 rounded-full border-2 border-[#D4AF82]/40 animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute w-28 h-28 rounded-full border border-[#C9A882]/35 animate-[spin_8s_linear_infinite]" />
          <div className="absolute w-24 h-24 rounded-full border-t-2 border-b-2 border-[#B8966E]/30 animate-[spin_10s_linear_infinite_reverse]" />

          {/* Monogram with scale animation */}
          <div className="flex flex-col items-center justify-center z-10 animate-[fade-in-scale_1s_ease-out]">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
              <Image
                src="/monogram/image.png"
                alt="Marvin & Annie Monogram"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading text - elegant gray */}
        <div className="flex flex-col items-center gap-4 animate-[fade-in_0.8s_ease-out_0.3s_both]">
          <p
            className="text-xs uppercase tracking-[0.3em] text-[#6B6B6B] drop-shadow-sm animate-[pulse_2s_ease-in-out_infinite]"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 700 }}
          >
            Loading Invitation
          </p>
          
          {/* Progress bar - champagne gold gradient */}
          <div className="w-48 h-1 bg-[#D4AF82]/20 rounded-full overflow-hidden shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF82] via-[#C9A882] to-[#D4AF82] rounded-full transition-all duration-300 ease-out shadow-md"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
