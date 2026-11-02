import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { AerialCropFieldVisual } from './AerialCropFieldVisual.tsx';
import {
  Sprout,
  Home,
  TrendingUp,
  FileText,
  Sun,
  ArrowRight,
  Check,
  Layers,
  Leaf,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { PageId } from '../../types/index.ts';

export const LandingPage: React.FC = () => {
  const { setActivePage, addToast } = useApp();

  const handleNavigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContact = () => {
    addToast('Contact SmartAgri Support: support@smartagri.in / Toll-free: 1800-AGRI-CARE', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F6F9F6] text-[#172B24] font-['Inter'] selection:bg-[#DCEBD1] selection:text-[#165A36]">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#F6F9F6]/90 backdrop-blur-md border-b border-[#E3EAE1]">
        <div className="max-w-[1360px] mx-auto px-6 h-[76px] flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavigateTo('landing')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#165A36]">
              <svg
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <path
                  d="M6 21C6 14 11 7 21 6C21 16 14 21 6 21Z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 17C14 14 18 10 21 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[22px] font-semibold tracking-tight text-[#172B24]">
              Smart<span className="text-[#165A36]">Agri.</span>
            </span>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#4B5E53]">
            <button
              onClick={() => handleNavigateTo('landing')}
              className="relative py-1 text-[#172B24] font-semibold transition-colors flex flex-col items-center"
            >
              <span>Home</span>
              <span className="w-1 h-1 rounded-full bg-[#165A36] mt-0.5" />
            </button>
            <a
              href="#about"
              className="hover:text-[#165A36] transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="hover:text-[#165A36] transition-colors"
            >
              Features
            </a>
            <button
              onClick={handleContact}
              className="hover:text-[#165A36] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigateTo('dashboard')}
              className="text-[13px] font-medium text-[#172B24] hover:text-[#165A36] transition-colors px-2 py-1"
            >
              Log in
            </button>

            <button
              onClick={() => handleNavigateTo('dashboard')}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-lg bg-[#165A36] text-white hover:bg-[#124D2E] text-[13px] font-medium transition-colors shadow-2xs cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-6 lg:gap-14 items-center">
          {/* Left Hero Copy */}
          <div className="sm:col-span-7">
            {/* Kicker Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF4E6] text-[#1E5E36] text-[11px] font-semibold tracking-wider uppercase mb-4 sm:mb-5 border border-[#D7EBD0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5E36]" />
              <span>A smarter way to grow</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[34px] sm:text-[40px] md:text-[48px] lg:text-[58px] font-bold text-[#172B24] tracking-tight leading-[1.08]">
              Smart Agriculture
              <br />
              <span className="text-[#2D7A46]">Management</span>
              <br />
              <span className="text-[#2D7A46]">System</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[13px] sm:text-[15px] lg:text-[16px] text-[#55695E] mt-4 sm:mt-5 mb-6 sm:mb-7 max-w-xl leading-relaxed">
              Manage your farms, crops and agricultural activities in one simple digital platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6 sm:mb-7">
              <button
                onClick={() => handleNavigateTo('dashboard')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#165A36] text-white hover:bg-[#124D2E] text-[13px] sm:text-[14px] font-semibold transition-all shadow-xs group cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white border border-[#DEE7DC] text-[#172B24] hover:bg-[#F2F7F1] text-[13px] sm:text-[14px] font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <span>Explore Features</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform text-[#7C8E82]"
                />
              </a>
            </div>

            {/* Checklist */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] text-[#7C8E82] pt-1">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-[#247A46]" /> Simple to use
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-[#247A46]" /> Built for farmers
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-[#247A46]" /> All in one place
              </span>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="sm:col-span-5 flex justify-center sm:justify-end mt-4 sm:mt-0">
            <AerialCropFieldVisual />
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP / PROOF BAR */}
      <section className="border-y border-[#EAEFE8] bg-white py-6">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center text-[13px]">
            {/* Item 1 */}
            <div className="col-span-2 sm:col-span-1 border-r-0 lg:border-r border-[#EAEFE8] pr-4">
              <p className="font-semibold text-[#172B24]">Rooted in agriculture.</p>
              <p className="text-[11px] text-[#829187]">Designed for you.</p>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-2.5 text-[#374B3F] font-medium">
              <Sprout size={18} className="text-[#165A36] shrink-0" />
              <span>Farmers &amp; growers</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-2.5 text-[#374B3F] font-medium">
              <Home size={18} className="text-[#165A36] shrink-0" />
              <span>Farms of every size</span>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-2.5 text-[#374B3F] font-medium">
              <TrendingUp size={18} className="text-[#165A36] shrink-0" />
              <span>Data-driven decisions</span>
            </div>

            {/* Item 5 */}
            <div className="flex items-center gap-2.5 text-[#374B3F] font-medium">
              <Leaf size={18} className="text-[#165A36] shrink-0" />
              <span>Sustainable growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="max-w-[1360px] mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#7C8E82] uppercase mb-1">
              One platform. Endless possibilities.
            </p>
            <h2 className="text-[30px] sm:text-[36px] font-bold text-[#172B24] tracking-tight leading-tight">
              Everything your farm needs.
              <br />
              Nothing it doesn't.
            </h2>
          </div>

          <div className="text-[13px] text-[#7C8E82] max-w-xs md:text-right">
            <p>Less paperwork. More growing.</p>
            <p>Simple tools that put you in control.</p>
          </div>
        </div>

        {/* 5 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5">
          {/* Card 1: Farm Management */}
          <div
            onClick={() => handleNavigateTo('farms')}
            className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF5E7] text-[#1E5E36] border border-[#DEEADE] flex items-center justify-center mb-4">
                <Sprout size={18} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#172B24] mb-2">
                Farm Management
              </h3>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Your farm, organized. Manage land, resources, and daily activities in one place.
              </p>
            </div>
            <div className="pt-4 mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#165A36] group-hover:underline">
              <span>Explore feature</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Crop Management */}
          <div
            onClick={() => handleNavigateTo('crops')}
            className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FBF4E4] text-[#B88728] border border-[#F4E9CD] flex items-center justify-center mb-4">
                <Layers size={18} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#172B24] mb-2">
                Crop Management
              </h3>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                From seed to harvest. Track your crops and make every growing season count.
              </p>
            </div>
            <div className="pt-4 mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#165A36] group-hover:underline">
              <span>Explore feature</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Market Information */}
          <div
            onClick={() => handleNavigateTo('market')}
            className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAF5ED] text-[#1D7449] border border-[#D7EBDD] flex items-center justify-center mb-4">
                <TrendingUp size={18} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#172B24] mb-2">
                Market Information
              </h3>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Stay a step ahead with the latest market insights and crop price information.
              </p>
            </div>
            <div className="pt-4 mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#165A36] group-hover:underline">
              <span>Explore feature</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Reports & Insights */}
          <div
            onClick={() => handleNavigateTo('reports')}
            className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#345D7E] border border-[#D9E5F0] flex items-center justify-center mb-4">
                <FileText size={18} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#172B24] mb-2">
                Reports &amp; Insights
              </h3>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Turn your farm data into clear, actionable insights for better decisions.
              </p>
            </div>
            <div className="pt-4 mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#165A36] group-hover:underline">
              <span>Explore feature</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Weather Information */}
          <div
            onClick={() => handleNavigateTo('weather')}
            className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDF8E7] text-[#C99120] border border-[#F5ECCB] flex items-center justify-center mb-4">
                <Sun size={18} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#172B24] mb-2">
                Weather Information
              </h3>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Review clearly labelled forecast information when planning your agricultural activities.
              </p>
            </div>
            <div className="pt-4 mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#165A36] group-hover:underline">
              <span>Explore feature</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#7C8E82] uppercase mb-1">
              Simple from the start
            </p>
            <h2 className="text-[30px] sm:text-[36px] font-bold text-[#172B24] tracking-tight leading-tight">
              From sign-up to smarter
              <br />
              farm management.
            </h2>
          </div>

          <div className="text-[13px] text-[#7C8E82]">
            Five clear steps. One connected workspace.
          </div>
        </div>

        {/* 5 Connected Steps */}
        <div className="relative">
          {/* Subtle horizontal connecting line */}
          <div className="hidden lg:block absolute top-2.5 left-0 right-0 h-[1.5px] bg-[#E3EAE1] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="w-5 h-5 rounded-full bg-[#165A36] text-white flex items-center justify-center text-[10px] font-bold">
                ●
              </div>
              <div className="text-[11px] font-mono text-[#829187]">01</div>
              <h4 className="text-[14px] font-semibold text-[#172B24]">
                Create an account
              </h4>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Choose Farmer or User and create your prototype account.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="w-5 h-5 rounded-full bg-[#165A36] text-white flex items-center justify-center text-[10px] font-bold">
                ●
              </div>
              <div className="text-[11px] font-mono text-[#829187]">02</div>
              <h4 className="text-[14px] font-semibold text-[#172B24]">
                Log in securely
              </h4>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Use the dedicated sign-in experience to enter your workspace.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="w-5 h-5 rounded-full bg-[#165A36] text-white flex items-center justify-center text-[10px] font-bold">
                ●
              </div>
              <div className="text-[11px] font-mono text-[#829187]">03</div>
              <h4 className="text-[14px] font-semibold text-[#172B24]">
                Manage farms &amp; crops
              </h4>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Organize farm details, crop schedules, and agricultural activities.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="w-5 h-5 rounded-full bg-[#165A36] text-white flex items-center justify-center text-[10px] font-bold">
                ●
              </div>
              <div className="text-[11px] font-mono text-[#829187]">04</div>
              <h4 className="text-[14px] font-semibold text-[#172B24]">
                Review useful information
              </h4>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Explore clearly labelled sample market and weather information.
              </p>
            </div>

            {/* Step 5 */}
            <div className="space-y-3">
              <div className="w-5 h-5 rounded-full bg-[#165A36] text-white flex items-center justify-center text-[10px] font-bold">
                ●
              </div>
              <div className="text-[11px] font-mono text-[#829187]">05</div>
              <h4 className="text-[14px] font-semibold text-[#172B24]">
                Generate reports
              </h4>
              <p className="text-[12px] text-[#55695E] leading-relaxed">
                Turn organized records into downloadable planning summaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION ("Made for the people who feed the world.") */}
      <section id="about" className="max-w-[1360px] mx-auto px-6 py-12">
        <div className="rounded-3xl bg-[#F6F9F4] border border-[#DEE7DB] p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 lg:gap-16 shadow-2xs">
          {/* Left Medallion */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#E2ECD9] border border-[#CFDFC3] flex flex-col items-center justify-center shrink-0 text-center p-6 shadow-inner">
            <div className="text-[#245B37] mb-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <p className="text-[9px] font-bold tracking-[0.18em] text-[#245B37] uppercase leading-tight mt-1">
              Grow with confidence
            </p>
          </div>

          {/* Right Copy */}
          <div className="flex-1">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#7C8E82] uppercase mb-2">
              About SmartAgri
            </p>
            <h3 className="text-[28px] sm:text-[34px] font-bold text-[#172B24] tracking-tight leading-tight">
              Made for the people
              <br />
              who feed the world.
            </h3>
            <p className="text-[14px] text-[#55695E] mt-4 leading-relaxed max-w-2xl">
              Farming is complex. Managing it shouldn't be. SmartAgri brings your farm, crop, market, and report information together, so you can spend less time managing and more time doing what you love.
            </p>

            <button
              onClick={() => handleNavigateTo('dashboard')}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#165A36] hover:text-[#11492B] group hover:underline cursor-pointer"
            >
              <span>Let's grow together</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section className="max-w-[1360px] mx-auto px-6 py-8">
        <div className="rounded-2xl bg-[#165A36] p-8 sm:p-12 relative overflow-hidden text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          {/* Background Watermark Leaf */}
          <div className="absolute -bottom-10 right-40 w-80 h-80 text-white/10 pointer-events-none select-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>

          <div className="z-10">
            <p className="text-[11px] font-semibold tracking-wider text-[#9AD6AF] uppercase mb-1">
              Your next season starts here
            </p>
            <h3 className="text-[28px] sm:text-[34px] font-bold leading-tight">
              A little smarter.
              <br />
              A whole lot greener.
            </h3>
            <p className="text-[13px] text-[#C1DBC7] mt-2">
              Take the next step toward better farm management.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <button
              onClick={() => handleNavigateTo('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#165A36] hover:bg-[#F2F7F1] text-[14px] font-semibold transition-all shadow-sm group cursor-pointer"
            >
              <span>Get started with SmartAgri</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="max-w-[1360px] mx-auto px-6 py-10 mt-8 border-t border-[#E3EAE1] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#829187]">
        {/* Logo */}
        <div
          onClick={() => handleNavigateTo('landing')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="text-[#165A36]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <span className="font-semibold text-[#172B24]">
            Smart<span className="text-[#165A36]">Agri.</span>
          </span>
        </div>

        {/* Copyright */}
        <p>© 2026 SmartAgri. Growing a better tomorrow.</p>

        {/* Get in touch */}
        <button
          onClick={handleContact}
          className="inline-flex items-center gap-1.5 text-[#172B24] hover:text-[#165A36] font-medium transition-colors cursor-pointer"
        >
          <span>Get in touch</span>
          <ArrowRight size={13} />
        </button>
      </footer>
    </div>
  );
};
