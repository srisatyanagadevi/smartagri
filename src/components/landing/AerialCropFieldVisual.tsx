import React from 'react';
import { Sun } from 'lucide-react';

export const AerialCropFieldVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[460px] sm:max-w-[450px] md:max-w-[490px] lg:max-w-[530px] mx-auto select-none">
      {/* Outer rectangular frame with curved edges */}
      <div className="relative w-full h-[420px] sm:h-[470px] md:h-[510px] lg:h-[550px] rounded-3xl sm:rounded-[28px] overflow-hidden shadow-2xl border-2 border-[#DCEAD7] bg-[#143D1F] group">
        {/* Exact User-Uploaded Aerial Drone Crop Rows Photo */}
        <img
          src="/assets/hero-drone-crop-field.png"
          alt="SmartAgri Aerial Crop Management Rows"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />

        {/* Subtle Sunlight & Atmospheric Angle Grading */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F2616]/40 via-transparent to-[#FFF9E6]/20 pointer-events-none" />

        {/* Floating Card 1: Top Right "A good day to grow" */}
        <div className="absolute top-5 sm:top-7 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-[#E3EAE1] flex items-center gap-2.5 z-10 max-w-[210px] transition-transform duration-300 hover:-translate-y-0.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF6E3] text-[#D49826] flex items-center justify-center shrink-0 border border-[#F6E8C6]">
            <Sun size={18} className="text-[#D49826]" />
          </div>
          <div>
            <p className="text-[12px] sm:text-[13px] font-semibold text-[#172B24] leading-tight">
              A good day to grow
            </p>
            <p className="text-[10px] text-[#829187] leading-tight mt-0.5">
              Smarter planning, every season
            </p>
          </div>
        </div>

        {/* Floating Card 2: Center-Left "Healthy crops" with Bar Chart */}
        <div className="absolute bottom-16 sm:bottom-20 left-3 sm:left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-[#E3EAE1] w-[200px] sm:w-[220px] z-10 transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex items-center justify-between text-[9px] font-bold text-[#7C8E82] uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1">
              <span className="text-[#245B37]">📈</span> GROWTH AT A GLANCE
            </span>
            <span className="bg-[#EEF4EC] text-[#607468] px-1.5 py-0.5 rounded text-[8px] font-semibold border border-[#DCE8D8]">
              Preview
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <h4 className="text-[13px] sm:text-[14px] font-bold text-[#172B24]">
              Healthy crops
            </h4>
            <span className="text-[9px] font-semibold bg-[#EAF4E6] text-[#245B37] px-2 py-0.5 rounded-full border border-[#D4E8CE]">
              ✓ On track
            </span>
          </div>

          {/* 8-bar ascending green chart */}
          <div className="flex items-end gap-1.5 h-11 mt-2.5 pt-1 border-b border-[#F0F5EE]">
            <div className="w-3.5 h-3 bg-[#A3D9B2] rounded-t-xs" />
            <div className="w-3.5 h-4.5 bg-[#8ECFA0] rounded-t-xs" />
            <div className="w-3.5 h-6 bg-[#76C28B] rounded-t-xs" />
            <div className="w-3.5 h-5.5 bg-[#8ECFA0] rounded-t-xs" />
            <div className="w-3.5 h-8 bg-[#4CA365] rounded-t-xs" />
            <div className="w-3.5 h-9 bg-[#369352] rounded-t-xs" />
            <div className="w-3.5 h-10 bg-[#288143] rounded-t-xs" />
            <div className="w-3.5 h-11 bg-[#1A6C34] rounded-t-xs" />
          </div>

          <p className="text-[9px] text-[#829187] mt-1.5">
            Small insights. Better harvests.
          </p>
        </div>

        {/* Floating Pill: Bottom Center "Good things are growing." */}
        <div className="absolute bottom-5 sm:bottom-6 right-4 sm:right-7 bg-[#124B27]/95 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2 shadow-lg z-10 border border-[#276F41]">
          <span className="w-2 h-2 rounded-full bg-[#75E298] animate-pulse" />
          <span>Good things are growing.</span>
        </div>

        {/* Outline Leaf Watermark Emblem inside bottom-right */}
        <div className="absolute -bottom-5 -right-5 w-28 h-28 text-white/20 pointer-events-none select-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
      </div>

      {/* Decorative leaf mark sitting outside bottom-right corner as shown in Figma */}
      <div className="absolute -bottom-3 -right-3 text-[#A8C4A0] pointer-events-none select-none hidden sm:block">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-9 h-9">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
    </div>
  );
};
