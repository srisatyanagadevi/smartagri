import React from 'react';

export const WelcomeBannerIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 220 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          <clipPath id="archClip">
            <path d="M20 90C20 40 65 0 115 0C165 0 210 40 210 90V180H20V90Z" />
          </clipPath>
          <linearGradient id="skyGrad" x1="115" y1="0" x2="115" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2EED9" />
            <stop offset="1" stopColor="#D2E4C7" />
          </linearGradient>
        </defs>

        <g clipPath="url(#archClip)">
          {/* Sky */}
          <rect width="220" height="180" fill="url(#skyGrad)" />

          {/* Warm Sun */}
          <circle cx="170" cy="72" r="22" fill="#E8CD78" />

          {/* Distant Hills */}
          <path
            d="M50 140C90 110 140 100 220 120V180H50V140Z"
            fill="#B1CEA2"
          />

          {/* Farmhouse on Hill */}
          <g transform="translate(78, 120)">
            <polygon points="12,0 0,9 24,9" fill="#1C4027" />
            <rect x="2" y="9" width="20" height="14" fill="#FFFFFF" />
            <rect x="7" y="14" width="5" height="9" fill="#1C4027" />
            <rect x="15" y="12" width="4" height="5" fill="#E8CD78" />
            {/* Silo/Tree */}
            <circle cx="-5" cy="8" r="7" fill="#4B7743" />
            <rect x="-6" y="10" width="2" height="12" fill="#2E4A28" />
          </g>

          {/* Middle Hill */}
          <path
            d="M0 180C40 140 110 120 190 150C210 158 220 165 220 170V180H0Z"
            fill="#75A267"
          />

          {/* Foreground Terraced Ridge */}
          <path
            d="M0 160C60 145 130 155 220 180H0V160Z"
            fill="#477C3D"
          />
          <path
            d="M20 180C70 165 140 170 200 180H20Z"
            fill="#2D5A27"
          />

          {/* Foreground Sprouting Seedlings */}
          <g transform="translate(18, 138)">
            <path
              d="M16 42V18C16 18 10 12 4 15C-2 18 2 26 16 26"
              fill="#204E26"
            />
            <path
              d="M16 24C16 24 22 18 28 21C34 24 30 32 16 32"
              fill="#275E2F"
            />
            <path
              d="M16 42V14C16 14 13 8 7 10C1 12 5 20 16 20"
              fill="#183D1E"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const FarmLandscapeThumbnail: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#DCEBD1] bg-[#EAF3E5] ${className}`}>
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        {/* Soft background sky */}
        <rect width="200" height="120" fill="#E6EFE0" />

        {/* Sun */}
        <circle cx="150" cy="40" r="14" fill="#E8CD78" />

        {/* Distant gentle hill */}
        <path d="M0 90C60 70 130 65 200 85V120H0V90Z" fill="#B3CEA4" />

        {/* Small Farm Cottage */}
        <g transform="translate(35, 62)">
          <polygon points="10,0 0,8 20,8" fill="#1C4027" />
          <rect x="2" y="8" width="16" height="12" fill="#FFFFFF" />
          <rect x="6" y="12" width="4" height="8" fill="#1C4027" />
          <circle cx="28" cy="8" r="8" fill="#5A884C" />
          <rect x="26" y="10" width="3" height="10" fill="#2E4A28" />
        </g>

        {/* Foreground rolling green field */}
        <path d="M0 100C50 82 120 85 200 110V120H0V100Z" fill="#6A9758" />
        <path d="M0 112C70 98 140 102 200 120H0V112Z" fill="#3E6E34" />
      </svg>
    </div>
  );
};
