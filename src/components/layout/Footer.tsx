import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-6 pb-8 border-t border-[#E3EAE1] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-[12px] text-[#829187]">
      <p>© 2026 SmartAgri. Growing a better tomorrow.</p>
      <div className="flex items-center gap-1.5 text-[#6D8075]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 text-[#165A36]"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
        <span>Software-powered. Farmer-focused.</span>
      </div>
    </footer>
  );
};
