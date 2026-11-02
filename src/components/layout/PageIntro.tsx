import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Calendar } from 'lucide-react';
import { PageId } from '../../types/index.ts';

interface PageIntroConfig {
  tagline: string;
  description: string;
}

const introConfigs: Record<PageId, PageIntroConfig> = {
  landing: {
    tagline: 'WELCOME TO SMARTAGRI',
    description: 'Smart Agriculture Management System.',
  },
  dashboard: {
    tagline: 'YOUR FARM AT A GLANCE',
    description: 'A little clarity for a better growing day.',
  },
  farms: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your my farm organized, all in one place.',
  },
  crops: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your crop management organized, all in one place.',
  },
  market: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your market information organized, all in one place.',
  },
  weather: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your weather information organized, all in one place.',
  },
  reports: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your reports organized, all in one place.',
  },
  notifications: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your notifications organized, all in one place.',
  },
  profile: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your profile organized, all in one place.',
  },
  settings: {
    tagline: 'YOUR SMARTAGRI WORKSPACE',
    description: 'Keep your settings organized, all in one place.',
  },
};

export const PageIntro: React.FC = () => {
  const { activePage } = useApp();
  const config = introConfigs[activePage] || introConfigs.dashboard;

  // Format date or provide standard reference date
  const formattedDate = '18 September 2026';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {/* Left text */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#7C8E82] uppercase mb-0.5">
          {config.tagline}
        </p>
        <p className="text-[13px] text-[#55695E]">
          {config.description}
        </p>
      </div>

      {/* Right date & demo badge */}
      <div className="flex items-center gap-2 self-start sm:self-auto bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg border border-[#E3EAE1] sm:border-0">
        <Calendar size={14} className="text-[#7C8E82]" />
        <span className="text-[12px] text-[#55695E] font-medium">
          {formattedDate}
        </span>
        <span className="text-[10px] font-medium bg-[#EEF4EC] text-[#6A7F73] px-1.5 py-0.5 rounded border border-[#DEE7DC]">
          Demo
        </span>
      </div>
    </div>
  );
};
