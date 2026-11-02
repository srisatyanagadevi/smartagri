import React from 'react';

interface CropIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CropIcon: React.FC<CropIconProps> = ({ name, size = 'md', className = '' }) => {
  const lower = name.toLowerCase();

  const getContainerStyle = () => {
    if (lower.includes('rice')) {
      return 'bg-[#EBF5E7] text-[#245B37]';
    }
    if (lower.includes('maize') || lower.includes('corn')) {
      return 'bg-[#FBF4E4] text-[#B88728]';
    }
    if (lower.includes('tomato')) {
      return 'bg-[#FCECE8] text-[#C4543E]';
    }
    if (lower.includes('groundnut') || lower.includes('peanut')) {
      return 'bg-[#F5EFE6] text-[#917657]';
    }
    return 'bg-[#EBF5E7] text-[#245B37]';
  };

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 rounded-lg';
      case 'lg':
        return 'w-14 h-14 rounded-xl';
      case 'md':
      default:
        return 'w-11 h-11 rounded-lg';
    }
  };

  const renderSvg = () => {
    if (lower.includes('rice')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V8" />
          <path d="M12 8C12 4 9 3 9 3s-1 4 3 5z" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 12c-3.5 0-5.5-2.5-5.5-2.5s.5 4 5.5 3.5" />
          <path d="M12 11c3.5 0 5.5-2.5 5.5-2.5s-.5 4-5.5 3.5" />
          <path d="M12 16c-3 0-4.5-2-4.5-2s.5 3.5 4.5 3" />
          <path d="M12 15c3 0 4.5-2 4.5-2s-.5 3.5-4.5 3" />
        </svg>
      );
    }
    if (lower.includes('maize') || lower.includes('corn')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V6" />
          <path d="M8 8c1.5-1 3-1.5 4-1.5s2.5.5 4 1.5" />
          <path d="M7 12c1.5-1 3.5-1.5 5-1.5s3.5.5 5 1.5" />
          <path d="M7.5 16c1.5-.8 3-1.2 4.5-1.2s3 .4 4.5 1.2" />
          <circle cx="10" cy="9.5" r="1" fill="currentColor" />
          <circle cx="14" cy="9.5" r="1" fill="currentColor" />
          <circle cx="9.5" cy="13.5" r="1" fill="currentColor" />
          <circle cx="14.5" cy="13.5" r="1" fill="currentColor" />
        </svg>
      );
    }
    if (lower.includes('tomato')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="13.5" r="7.5" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 6V3" stroke="#245B37" />
          <path d="M9 5c1 .5 2 1 3 1s2-.5 3-1" stroke="#245B37" />
          <path d="M10 4c-1 1-2 2-2 3" stroke="#245B37" />
          <path d="M14 4c1 1 2 2 2 3" stroke="#245B37" />
          <circle cx="12" cy="13.5" r="7.5" />
        </svg>
      );
    }
    if (lower.includes('groundnut') || lower.includes('peanut')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 7c-2 0-3 2-3 4 0 2.5 1.5 3.5 2 4.5.5 1 0 2 0 3 0 2 2 3.5 4 3.5s4-1.5 4-3.5c0-1-.5-2 0-3 .5-1 2-2 2-4.5 0-2-1-4-3-4-1 0-1.8.8-3 1.2C10.8 7.8 10 7 9 7z" fill="currentColor" fillOpacity="0.2" />
          <path d="M9 7c-2 0-3 2-3 4 0 2.5 1.5 3.5 2 4.5.5 1 0 2 0 3 0 2 2 3.5 4 3.5s4-1.5 4-3.5c0-1-.5-2 0-3 .5-1 2-2 2-4.5 0-2-1-4-3-4-1 0-1.8.8-3 1.2C10.8 7.8 10 7 9 7z" />
          <line x1="9" y1="11" x2="15" y2="11" strokeDasharray="1 2" />
          <line x1="9" y1="16" x2="15" y2="16" strokeDasharray="1 2" />
        </svg>
      );
    }
    // Generic sprout
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M12 20v-8" />
        <path d="M12 12a5 5 0 0 0-5-5c0 4 2 5 5 5z" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 12a5 5 0 0 1 5-5c0 4-2 5-5 5z" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  };

  return (
    <div
      className={`flex items-center justify-center shrink-0 ${getContainerStyle()} ${getDimensions()} ${className}`}
    >
      {renderSvg()}
    </div>
  );
};
