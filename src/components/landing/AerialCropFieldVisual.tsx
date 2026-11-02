import React, { useState } from 'react';
import { Sun } from 'lucide-react';

export const AerialCropFieldVisual: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div className="relative w-full max-w-[460px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[530px] mx-auto select-none">
      {imageLoaded ? (
        <div className="relative group">
          <img
            src="/assets/landing-hero-aerial.png"
            alt="SmartAgri Aerial Crop Management Overview"
            className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.01]"
            onError={() => setImageLoaded(false)}
            loading="eager"
          />
        </div>
      ) : (
        /* Arched Top Hero Fallback matching Figma screenshot visual structure */
        <div className="relative w-full h-[400px] sm:h-[460px] md:h-[490px] lg:h-[530px] rounded-t-[120px] sm:rounded-t-[140px] rounded-b-3xl overflow-hidden shadow-2xl border-2 border-[#DCEAD7] bg-[#143D1F]">
          <svg
            viewBox="0 0 460 530"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover select-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sunlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.25" />
                <stop offset="30%" stopColor="#89C59A" stopOpacity="0.1" />
                <stop offset="70%" stopColor="#1E522B" stopOpacity="0" />
                <stop offset="100%" stopColor="#0B1C10" stopOpacity="0.4" />
              </linearGradient>
              <pattern id="cropFoliage" width="40" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="3.5" fill="#4C9C5E" />
                <circle cx="16" cy="6" r="4.2" fill="#5EAA6E" />
                <circle cx="26" cy="3.8" r="3.8" fill="#418C52" />
                <circle cx="36" cy="6" r="4.5" fill="#6CB97C" />
              </pattern>
            </defs>

            <rect width="460" height="530" fill="#152B1B" />

            {Array.from({ length: 46 }).map((_, i) => {
              const y = i * 11.5;
              const isAlternate = i % 2 === 0;
              const trenchColor = isAlternate ? '#122517' : '#182F1E';
              const baseFoliage = isAlternate ? '#275E33' : '#337542';
              const highlightFoliage = isAlternate ? '#49975A' : '#5CAE6E';

              return (
                <g key={i}>
                  <rect x="0" y={y} width="460" height="2.5" fill={trenchColor} />
                  <rect x="0" y={y + 2.5} width="460" height="9" fill={baseFoliage} />
                  <rect x="0" y={y + 3.2} width="460" height="5.5" fill={highlightFoliage} opacity="0.9" />
                  <rect x="0" y={y + 2.5} width="460" height="9" fill="url(#cropFoliage)" opacity="0.85" />
                </g>
              );
            })}

            <rect width="460" height="530" fill="url(#sunlightGradient)" />
          </svg>

          {/* Floating Card 1: Top Right */}
          <div className="absolute top-5 sm:top-6 right-4 sm:right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#E3EAE1] flex items-center gap-2.5 z-10 max-w-[190px]">
            <div className="w-8 h-8 rounded-lg bg-[#FFF6E3] text-[#D49826] flex items-center justify-center shrink-0 border border-[#F6E8C6]">
              <Sun size={17} className="text-[#D49826]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#172B24] leading-snug">
                A good day to grow
              </p>
              <p className="text-[10px] text-[#829187] leading-tight">
                Smarter planning, every season
              </p>
            </div>
          </div>

          {/* Floating Card 2: Center-Left */}
          <div className="absolute bottom-16 sm:bottom-18 left-3 sm:left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-[#E3EAE1] w-[195px] sm:w-[210px] z-10">
            <div className="flex items-center justify-between text-[9px] font-bold text-[#7C8E82] uppercase tracking-wider mb-1">
              <span>📈 GROWTH AT A GLANCE</span>
              <span className="bg-[#EEF4EC] text-[#607468] px-1 py-0.2 rounded text-[8px] font-medium border border-[#DCE8D8]">
                Preview
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <h4 className="text-[13px] font-bold text-[#172B24]">Healthy crops</h4>
              <span className="text-[9px] font-semibold bg-[#EAF4E6] text-[#245B37] px-1.5 py-0.5 rounded-full border border-[#D4E8CE]">
                ✓ On track
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-10 mt-2.5 pt-1 border-b border-[#F0F5EE]">
              <div className="w-3.5 h-3 bg-[#89C59A] rounded-t-xs" />
              <div className="w-3.5 h-4.5 bg-[#75B888] rounded-t-xs" />
              <div className="w-3.5 h-6 bg-[#61AB75] rounded-t-xs" />
              <div className="w-3.5 h-5 bg-[#75B888] rounded-t-xs" />
              <div className="w-3.5 h-7.5 bg-[#4B9C62] rounded-t-xs" />
              <div className="w-3.5 h-8 bg-[#388D50] rounded-t-xs" />
              <div className="w-3.5 h-9 bg-[#2A7D41] rounded-t-xs" />
              <div className="w-3.5 h-10 bg-[#1E6B34] rounded-t-xs" />
            </div>
            <p className="text-[9px] text-[#829187] mt-1.5">
              Small insights. Better harvests.
            </p>
          </div>

          {/* Floating Pill: Bottom Center */}
          <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-6 bg-[#124B27]/95 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2 shadow-lg z-10 border border-[#276F41]">
            <span className="w-2 h-2 rounded-full bg-[#75E298] animate-pulse" />
            <span>Good things are growing.</span>
          </div>
        </div>
      )}
    </div>
  );
};
