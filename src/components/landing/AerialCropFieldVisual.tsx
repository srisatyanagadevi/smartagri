import React from 'react';
import { Sun, ArrowUpRight } from 'lucide-react';

export const AerialCropFieldVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      {/* Arched Top Hero Frame */}
      <div className="relative w-full h-[480px] sm:h-[520px] rounded-t-[140px] rounded-b-3xl overflow-hidden shadow-2xl border-2 border-[#DCEAD7] bg-[#143D1F]">
        {/* Vector Aerial Drone Texture of Parallel Crop Furrows */}
        <svg
          viewBox="0 0 460 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Base Dark Rich Soil */}
          <rect width="460" height="520" fill="#14301B" />

          {/* Symmetrical Parallel Crop Furrow Rows */}
          {Array.from({ length: 42 }).map((_, i) => {
            const y = i * 13;
            const isAlternate = i % 2 === 0;
            const greenTone = isAlternate ? '#2A6635' : '#397D47';
            const highlightTone = isAlternate ? '#4E985D' : '#5EAA6E';

            return (
              <g key={i}>
                {/* Furrow Trough */}
                <rect x="0" y={y} width="460" height="9" fill={greenTone} />
                {/* Crop Ridge Highlight */}
                <rect x="0" y={y + 1} width="460" height="4" fill={highlightTone} opacity="0.85" />
                {/* Textured Crop Bush Clumps */}
                {Array.from({ length: 18 }).map((_, j) => {
                  const x = j * 26 + ((i * 7) % 19);
                  return (
                    <circle
                      key={j}
                      cx={x}
                      cy={y + 3}
                      r={3.2}
                      fill="#68B879"
                      opacity="0.75"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Soft vignette and sunlight gradient overlay */}
          <radialGradient id="sunGlow" cx="65%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#2A6635" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0B2011" stopOpacity="0.45" />
          </radialGradient>
          <rect width="460" height="520" fill="url(#sunGlow)" />
        </svg>

        {/* Floating Card 1: Top Right "A good day to grow" */}
        <div className="absolute top-6 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#E3EAE1] flex items-center gap-2.5 z-10 animate-in fade-in duration-300">
          <div className="w-8 h-8 rounded-lg bg-[#FFF6E3] text-[#D49826] flex items-center justify-center shrink-0">
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

        {/* Floating Card 2: Center-Left "Healthy crops" with Bar Chart */}
        <div className="absolute bottom-16 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-[#E3EAE1] w-[205px] z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between text-[9px] font-bold text-[#7C8E82] uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1">
              <span className="text-[#245B37]">📈</span> GROWTH AT A GLANCE
            </span>
            <span className="bg-[#EEF4EC] text-[#607468] px-1 py-0.2 rounded text-[8px] font-medium">
              Preview
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <h4 className="text-[13px] font-bold text-[#172B24]">Healthy crops</h4>
            <span className="text-[9px] font-semibold bg-[#EAF4E6] text-[#245B37] px-1.5 py-0.5 rounded-full">
              ✓ On track
            </span>
          </div>

          {/* 8-bar ascending green chart */}
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

        {/* Floating Pill: Bottom Center "Good things are growing." */}
        <div className="absolute bottom-5 right-6 bg-[#124B27]/95 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2 shadow-lg z-10 border border-[#276F41]">
          <span className="w-2 h-2 rounded-full bg-[#75E298] animate-pulse" />
          <span>Good things are growing.</span>
        </div>

        {/* Clean leaf watermark emblem at bottom right */}
        <div className="absolute -bottom-4 -right-4 w-28 h-28 text-white/20 pointer-events-none select-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
      </div>
    </div>
  );
};
