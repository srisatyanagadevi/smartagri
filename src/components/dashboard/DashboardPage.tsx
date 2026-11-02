import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  WelcomeBannerIllustration,
  FarmLandscapeThumbnail,
} from './AgriculturalIllustration.tsx';
import { CropIcon } from '../common/CropIcon.tsx';
import {
  Home,
  Sprout,
  TrendingUp,
  FileText,
  ArrowRight,
  Plus,
  CloudSun,
  MapPin,
  TrendingDown,
  Droplets,
  Wind,
  Umbrella,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    farms,
    crops,
    marketItems,
    reports,
    setActivePage,
    setIsAddFarmOpen,
    setIsAddCropOpen,
    downloadReportCSV,
    setViewingFarm,
  } = useApp();

  const primaryFarm = farms[0] || {
    id: 'farm-1',
    name: 'Green Valley Farm',
    location: 'East Godavari',
    area: 12,
    areaUnit: 'Acres',
    primaryCrop: 'Rice',
    soilType: 'Alluvial',
    status: 'Active' as const,
  };

  const dashboardCrops = crops.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <div className="bg-[#EBF3E6] border border-[#DEEADE] rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        {/* Left Welcome Copy */}
        <div className="max-w-xl z-10">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#1E5E36] uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5E36]" />
            <span>Let's grow something great</span>
          </div>

          <h2 className="text-[24px] sm:text-[27px] font-bold text-[#172B24] tracking-tight leading-tight">
            Welcome back, Farmer! <span className="inline-block">👋</span>
          </h2>

          <p className="text-[13px] text-[#4A5D52] mt-1.5 leading-relaxed">
            Manage your farms, crops and agricultural activities from one place.
          </p>

          <button
            onClick={() => setActivePage('farms')}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1E5E36] hover:text-[#144728] mt-4 transition-colors group cursor-pointer"
          >
            <span>Your farm, in focus</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Right Landscape Illustration */}
        <div className="w-full sm:w-[220px] h-[130px] sm:h-[140px] shrink-0 self-end md:self-auto flex justify-end">
          <WelcomeBannerIllustration className="w-full h-full max-w-[220px]" />
        </div>
      </div>

      {/* 2. Four Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {/* Total Farms */}
        <div
          onClick={() => setActivePage('farms')}
          className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-[13px] text-[#7C8E82] font-medium">
              Total Farms
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EDF5EA] text-[#175A36] border border-[#DCEAD7] flex items-center justify-center">
              <Home size={18} />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[28px] font-bold text-[#172B24] tracking-tight tabular-nums">
              {farms.length < 10 ? `0${farms.length}` : farms.length}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#829187] mt-1">
              <span>Registered farms</span>
              <ArrowRight
                size={14}
                className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Active Crops */}
        <div
          onClick={() => setActivePage('crops')}
          className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-[13px] text-[#7C8E82] font-medium">
              Active Crops
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FBF4E4] text-[#B88728] border border-[#F4E9CD] flex items-center justify-center">
              <Sprout size={18} />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[28px] font-bold text-[#172B24] tracking-tight tabular-nums">
              {crops.length < 10 ? `0${crops.length}` : crops.length}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#829187] mt-1">
              <span>Currently managed</span>
              <ArrowRight
                size={14}
                className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Market Updates */}
        <div
          onClick={() => setActivePage('market')}
          className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-[13px] text-[#7C8E82] font-medium">
              Market Updates
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EAF5ED] text-[#1D7449] border border-[#D7EBDD] flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[28px] font-bold text-[#172B24] tracking-tight tabular-nums">
              12
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#829187] mt-1">
              <span>Latest updates</span>
              <ArrowRight
                size={14}
                className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Reports */}
        <div
          onClick={() => setActivePage('reports')}
          className="bg-white rounded-2xl border border-[#E3EAE1] p-5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <span className="text-[13px] text-[#7C8E82] font-medium">
              Reports
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#345D7E] border border-[#D9E5F0] flex items-center justify-center">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[28px] font-bold text-[#172B24] tracking-tight tabular-nums">
              06
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#829187] mt-1">
              <span>Available reports</span>
              <ArrowRight
                size={14}
                className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: (Quick Actions & Farm Overview) + (Recent Activity & Weather) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                Quick Actions
              </h3>
              <span className="text-[11px] text-[#829187]">Get things done</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Add Farm */}
              <button
                onClick={() => setIsAddFarmOpen(true)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E3EBE0] bg-[#FAFDF9] hover:bg-[#F2F8F0] hover:border-[#CDE0C8] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center">
                    <Home size={17} />
                  </div>
                  <span className="text-[13px] font-medium text-[#172B24]">
                    Add Farm
                  </span>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
                />
              </button>

              {/* Add Crop */}
              <button
                onClick={() => setIsAddCropOpen(true)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E3EBE0] bg-[#FAFDF9] hover:bg-[#F2F8F0] hover:border-[#CDE0C8] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center">
                    <Sprout size={17} />
                  </div>
                  <span className="text-[13px] font-medium text-[#172B24]">
                    Add Crop
                  </span>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
                />
              </button>

              {/* View Market */}
              <button
                onClick={() => setActivePage('market')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E3EBE0] bg-[#FAFDF9] hover:bg-[#F2F8F0] hover:border-[#CDE0C8] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center">
                    <TrendingUp size={17} />
                  </div>
                  <span className="text-[13px] font-medium text-[#172B24]">
                    View Market
                  </span>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
                />
              </button>

              {/* Generate Report */}
              <button
                onClick={() => setActivePage('reports')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E3EBE0] bg-[#FAFDF9] hover:bg-[#F2F8F0] hover:border-[#CDE0C8] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center">
                    <FileText size={17} />
                  </div>
                  <span className="text-[13px] font-medium text-[#172B24]">
                    Generate Report
                  </span>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#96A89E] group-hover:text-[#175A36] group-hover:translate-x-0.5 transition-all"
                />
              </button>
            </div>
          </div>

          {/* My Farm Overview */}
          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                My Farm Overview
              </h3>
              <button
                onClick={() => setActivePage('farms')}
                className="text-[12px] font-medium text-[#1E5E36] hover:underline flex items-center gap-1"
              >
                <span>All farms</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4.5 p-3.5 rounded-xl border border-[#E9EFE7] bg-[#FAFCF9]">
              {/* Illustration Thumbnail */}
              <div className="w-full sm:w-36 h-24 shrink-0 rounded-xl overflow-hidden">
                <FarmLandscapeThumbnail className="w-full h-full" />
              </div>

              {/* Info Details */}
              <div className="flex-1 space-y-1.5 w-full">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-semibold text-[#172B24]">
                    {primaryFarm.name}
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EAF4E6] text-[#245B37]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#245B37] mr-1" />
                    {primaryFarm.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[12px] text-[#7C8E82]">
                  <MapPin size={13} className="text-[#8FA095]" />
                  <span>{primaryFarm.location}</span>
                </div>

                <div className="flex items-center gap-5 text-[12px] pt-1">
                  <div>
                    <span className="text-[#829187] text-[11px] block">Farm Area</span>
                    <span className="font-medium text-[#172B24] flex items-center gap-1">
                      <span className="text-[10px] text-[#7C8E82]">▤</span>
                      {primaryFarm.area} {primaryFarm.areaUnit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#829187] text-[11px] block">Primary Crop</span>
                    <span className="font-medium text-[#172B24] flex items-center gap-1">
                      <span className="text-[10px] text-[#245B37]">🌱</span>
                      {primaryFarm.primaryCrop}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setViewingFarm(primaryFarm)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-[#DEE7DC] text-[11px] font-medium text-[#1E5E36] bg-white hover:bg-[#F2F7F1] transition-colors"
                  >
                    <span>View Farm</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                Recent Activity
              </h3>
              <span className="text-[11px] text-[#829187]">Sample activity</span>
            </div>

            <div className="space-y-3.5">
              {/* Activity 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center shrink-0 mt-0.5">
                  <Sprout size={15} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[#172B24] leading-snug">
                    Tomato crop marked ready
                  </p>
                  <p className="text-[11px] text-[#829187]">
                    Meadow Brook Farm · 10 min ago
                  </p>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center shrink-0 mt-0.5">
                  <Home size={15} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[#172B24] leading-snug">
                    Green Valley Farm reviewed
                  </p>
                  <p className="text-[11px] text-[#829187]">
                    Farm records · 1 hour ago
                  </p>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF4E6] text-[#175A36] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={15} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[#172B24] leading-snug">
                    September report generated
                  </p>
                  <p className="text-[11px] text-[#829187]">
                    Farm Overview · Yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Information */}
          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                Weather Information
              </h3>
              <span className="text-[11px] text-[#829187]">Sample forecast</span>
            </div>

            <div className="flex items-center gap-1 text-[12px] text-[#7C8E82] mb-1">
              <MapPin size={13} className="text-[#8FA095]" />
              <span>East Godavari</span>
            </div>

            {/* Current Temp and Condition */}
            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-[32px] font-bold text-[#172B24] leading-none tracking-tight">
                  28°C
                </div>
                <div className="text-[12px] text-[#7C8E82] mt-1">
                  Partly cloudy
                </div>
              </div>

              {/* Weather icon */}
              <div className="w-12 h-12 text-[#E2B743] flex items-center justify-center">
                <CloudSun size={38} strokeWidth={1.7} />
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#FAFDF9] border border-[#E9EFE7] mt-3 text-center">
              <div>
                <p className="text-[13px] font-bold text-[#172B24] tabular-nums">74%</p>
                <p className="text-[10px] text-[#829187]">Humidity</p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#172B24] tabular-nums">12 km/h</p>
                <p className="text-[10px] text-[#829187]">Wind</p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#172B24] tabular-nums">35%</p>
                <p className="text-[10px] text-[#829187]">Rain forecast</p>
              </div>
            </div>

            {/* 3-day forecast */}
            <div className="flex items-center justify-between text-[11px] text-[#697D71] pt-3 mt-1 border-t border-[#F0F4EE]">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-[#172B24]">Today</span>
                <span className="text-[#829187]">☁️</span>
                <span>28° 23°</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-[#172B24]">Sat</span>
                <span className="text-[#E2B743]">☀️</span>
                <span>30° 24°</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-[#172B24]">Sun</span>
                <span className="text-[#5B8FB9]">🌧️</span>
                <span>27° 22°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Crop Overview (4 cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#172B24]">
            Crop Overview
          </h3>
          <button
            onClick={() => setActivePage('crops')}
            className="text-[12px] font-medium text-[#1E5E36] hover:underline flex items-center gap-1"
          >
            <span>View all crops</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {dashboardCrops.map((crop) => {
            let statusBadge = (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EAF4E6] text-[#2C6B37]">
                Growing
              </span>
            );
            if (crop.status === 'Ready') {
              statusBadge = (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFF5E5] text-[#9A6218]">
                  Ready
                </span>
              );
            } else if (crop.status === 'Completed') {
              statusBadge = (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F0F2F1] text-[#5F6E66]">
                  Completed
                </span>
              );
            }

            return (
              <div
                key={crop.id}
                onClick={() => setActivePage('crops')}
                className="bg-white rounded-2xl border border-[#E3EAE1] p-4.5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-start justify-between mb-3">
                  <CropIcon name={crop.name} size="md" />
                  {statusBadge}
                </div>

                <h4 className="text-[15px] font-semibold text-[#172B24]">
                  {crop.name}
                </h4>

                <div className="space-y-1 mt-2.5 text-[11px] text-[#7C8E82]">
                  <div className="flex items-center justify-between">
                    <span>Planted</span>
                    <span className="font-medium text-[#3E5246]">{crop.plantedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Harvest</span>
                    <span className="font-medium text-[#3E5246]">{crop.harvestDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Latest Market Information Table */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#172B24]">
            Latest Market Information
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] text-[#7C8E82]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5E36]" />
            <span>Sample market prices</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#EAEFE8] text-[11px] font-semibold text-[#829187] uppercase tracking-wider">
                <th className="py-2.5 px-3">Crop</th>
                <th className="py-2.5 px-3">Market</th>
                <th className="py-2.5 px-3">Price / quintal</th>
                <th className="py-2.5 px-3">Change</th>
                <th className="py-2.5 px-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F6F0]">
              {marketItems.slice(0, 3).map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAFDF9] transition-colors"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <CropIcon name={item.crop} size="sm" />
                      <span className="font-semibold text-[#172B24]">
                        {item.crop}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#55695E]">{item.market}</td>
                  <td className="py-3 px-3 font-semibold text-[#172B24] tabular-nums">
                    ₹{item.pricePerQuintal.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    {item.changeType === 'up' ? (
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#247A46]">
                        <TrendingUp size={14} />
                        +{item.change}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#C4463A]">
                        <TrendingDown size={14} />
                        {item.change}%
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-[12px] text-[#829187]">
                    {item.updated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-[#EAEFE8] text-[12px]">
          <p className="text-[#829187]">
            Make informed decisions for your next harvest.
          </p>
          <button
            onClick={() => setActivePage('market')}
            className="text-[#1E5E36] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View Market Information</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
