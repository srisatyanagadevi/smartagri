import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Users,
  User,
  Sprout,
  FileCheck,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { setAdminActiveTab, addToast } = useApp();
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'];

  // User growth datapoints for SVG curve
  // Normalized for 500x200 viewBox (Y-inverted: y = 200 - (val / 1000) * 160)
  const growthData = [
    { week: 'Week 1', users: 280, x: 50, y: 145 },
    { week: 'Week 2', users: 580, x: 175, y: 95 },
    { week: 'Week 3', users: 520, x: 300, y: 106 },
    { week: 'Week 4', users: 780, x: 425, y: 64 },
    { week: 'Current', users: 800, x: 480, y: 60 },
  ];

  // SVG path definition for smooth bezier curve
  const curvePath = 'M 50 145 C 110 135, 130 98, 175 95 C 220 92, 260 108, 300 106 C 350 104, 380 66, 425 64 L 480 60';
  const areaPath = `${curvePath} L 480 180 L 50 180 Z`;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto relative">
      {/* Decorative foliage watermark in top-right header matching screenshot */}
      <div className="absolute top-0 right-0 w-80 h-64 pointer-events-none opacity-25 select-none overflow-hidden hidden sm:block">
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full text-[#15B064]">
          <path
            d="M320 20 C260 60, 240 140, 270 210 C240 160, 250 80, 340 30 Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M370 70 C310 100, 300 180, 340 240 C310 190, 315 120, 390 80 Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M260 90 C210 130, 200 200, 230 260 C205 210, 210 150, 280 100 Z"
            fill="currentColor"
            opacity="0.25"
          />
        </svg>
      </div>

      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-[24px] sm:text-[26px] font-bold text-[#172B24] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#65786D] mt-0.5">
            Welcome back, Admin! Here's what's happening with SmartAgri.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E3EAE1] rounded-xl text-[12.5px] font-medium text-[#405247] shadow-2xs hover:bg-[#F9FBF8] transition-colors cursor-pointer"
          >
            <Calendar size={14} className="text-[#65786D]" />
            <span>{timeRange}</span>
            <ChevronDown size={14} className="text-[#8495A5]" />
          </button>

          {timeDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E3EAE1] py-1.5 z-30 animate-in fade-in slide-in-from-top-1">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setTimeDropdownOpen(false);
                    addToast(`Filter updated to ${range}`);
                  }}
                  className={`w-full px-3.5 py-1.5 text-left text-[12.5px] transition-colors ${
                    timeRange === range
                      ? 'bg-[#EAF4E6] text-[#165A36] font-semibold'
                      : 'text-[#405247] hover:bg-[#F4F9F2]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ROW 1: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {/* Card 1: Total Users */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs hover:border-[#CADAC5] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#15B064] text-white flex items-center justify-center shadow-xs shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#7C8E82]">Total Users</p>
              <h3 className="text-[26px] font-bold text-[#172B24] tracking-tight leading-tight mt-0.5">
                1,248
              </h3>
            </div>
          </div>
          <div className="self-end pb-1">
            <span className="text-[12px] font-bold text-[#15B064] flex items-center">
              ↑ 12%
            </span>
          </div>
        </div>

        {/* Card 2: Total Farmers */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs hover:border-[#CADAC5] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs shrink-0">
              <User size={22} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#7C8E82]">Total Farmers</p>
              <h3 className="text-[26px] font-bold text-[#172B24] tracking-tight leading-tight mt-0.5">
                892
              </h3>
            </div>
          </div>
          <div className="self-end pb-1">
            <span className="text-[12px] font-bold text-[#15B064] flex items-center">
              ↑ 8%
            </span>
          </div>
        </div>

        {/* Card 3: Total Crops */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs hover:border-[#CADAC5] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xs shrink-0">
              <Sprout size={22} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#7C8E82]">Total Crops</p>
              <h3 className="text-[26px] font-bold text-[#172B24] tracking-tight leading-tight mt-0.5">
                156
              </h3>
            </div>
          </div>
          <div className="self-end pb-1">
            <span className="text-[12px] font-bold text-[#15B064] flex items-center">
              ↑ 6%
            </span>
          </div>
        </div>

        {/* Card 4: Soil Reports */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs hover:border-[#CADAC5] transition-all flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs shrink-0">
              <FileCheck size={22} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#7C8E82]">Soil Reports</p>
              <h3 className="text-[26px] font-bold text-[#172B24] tracking-tight leading-tight mt-0.5">
                3,428
              </h3>
            </div>
          </div>
          <div className="self-end pb-1">
            <span className="text-[12px] font-bold text-[#15B064] flex items-center">
              ↑ 14%
            </span>
          </div>
        </div>
      </div>

      {/* ROW 2: User Growth Overview (Chart) & Crop Distribution (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: User Growth Overview */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-bold text-[#172B24]">
              User Growth Overview
            </h2>
            <div className="flex items-center gap-2 text-[12px] text-[#55695E] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15B064]" />
              <span>Users</span>
            </div>
          </div>

          {/* SVG Line & Area Chart matching screenshot */}
          <div className="relative w-full h-[230px] pt-2">
            <svg
              viewBox="0 0 500 200"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="userGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15B064" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#15B064" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Y-axis Grid lines & labels */}
              {[
                { label: '1,000', y: 30 },
                { label: '750', y: 68 },
                { label: '500', y: 105 },
                { label: '250', y: 142 },
                { label: '0', y: 180 },
              ].map((grid) => (
                <g key={grid.label}>
                  <line
                    x1="45"
                    y1={grid.y}
                    x2="490"
                    y2={grid.y}
                    stroke="#EFF4EE"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x="35"
                    y={grid.y + 3.5}
                    textAnchor="end"
                    fill="#94A399"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {grid.label}
                  </text>
                </g>
              ))}

              {/* Filled Area under Curve */}
              <path d={areaPath} fill="url(#userGrowthGrad)" />

              {/* Green Smooth Curve Line */}
              <path
                d={curvePath}
                fill="none"
                stroke="#15B064"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {growthData.map((d, index) => (
                <g
                  key={d.week}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredWeek(index)}
                  onMouseLeave={() => setHoveredWeek(null)}
                >
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={hoveredWeek === index ? 6 : 4}
                    fill="#15B064"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                  {hoveredWeek === index && (
                    <g>
                      <rect
                        x={d.x - 28}
                        y={d.y - 28}
                        width="56"
                        height="20"
                        rx="6"
                        fill="#172B24"
                      />
                      <text
                        x={d.x}
                        y={d.y - 14}
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {d.users} users
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* X-axis labels */}
              {[
                { label: 'Week 1', x: 50 },
                { label: 'Week 2', x: 175 },
                { label: 'Week 3', x: 300 },
                { label: 'Week 4', x: 425 },
              ].map((xLab) => (
                <text
                  key={xLab.label}
                  x={xLab.x}
                  y="198"
                  textAnchor="middle"
                  fill="#7C8E82"
                  fontSize="11"
                  fontWeight="500"
                >
                  {xLab.label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Right: Crop Distribution (Donut Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="text-[16px] font-bold text-[#172B24] mb-3">
            Crop Distribution
          </h2>

          <div className="flex items-center justify-center gap-6 my-auto py-2">
            {/* SVG Donut Ring */}
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                {/* Rice: 35% -> strokeDasharray="35 65" -> offset 0 */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#15B064"
                  strokeWidth="22"
                  strokeDasharray="77 143"
                  strokeDashoffset="0"
                />
                {/* Wheat: 30% -> offset -77 */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="22"
                  strokeDasharray="66 154"
                  strokeDashoffset="-77"
                />
                {/* Maize: 20% -> offset -143 */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="22"
                  strokeDasharray="44 176"
                  strokeDashoffset="-143"
                />
                {/* Others: 15% -> offset -187 */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#8B5CF6"
                  strokeWidth="22"
                  strokeDasharray="33 187"
                  strokeDashoffset="-187"
                />
              </svg>
            </div>

            {/* Legend & Percentages */}
            <div className="space-y-3 min-w-[110px]">
              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15B064]" />
                  <span className="text-[#36493F] font-medium">Rice</span>
                </div>
                <span className="font-bold text-[#172B24]">35%</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-[#36493F] font-medium">Wheat</span>
                </div>
                <span className="font-bold text-[#172B24]">30%</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-[#36493F] font-medium">Maize</span>
                </div>
                <span className="font-bold text-[#172B24]">20%</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                  <span className="text-[#36493F] font-medium">Others</span>
                </div>
                <span className="font-bold text-[#172B24]">15%</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#7C8E82] text-center mt-2 border-t border-[#F2F6F1] pt-2">
            Aggregated crop varieties across 892 registered farms
          </p>
        </div>
      </div>

      {/* ROW 3: Recent Activities & Weather Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Recent Activities */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-bold text-[#172B24]">
              Recent Activities
            </h2>
            <button
              onClick={() => setAdminActiveTab('users')}
              className="text-[12.5px] font-semibold text-[#15B064] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <span className="text-[13px]">→</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Activity 1: New user registered */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F9FBF8] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <User size={18} />
                </div>
                <p className="text-[13px] font-medium text-[#172B24]">
                  New user registered: <span className="font-normal text-[#405247]">ramu@gmail.com</span>
                </p>
              </div>
              <span className="text-[12px] text-[#829187] whitespace-nowrap ml-2">
                2 mins ago
              </span>
            </div>

            {/* Activity 2: New crop added */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F9FBF8] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                  <Sprout size={18} />
                </div>
                <p className="text-[13px] font-medium text-[#172B24]">
                  New crop added: <span className="font-normal text-[#405247]">Paddy</span>
                </p>
              </div>
              <span className="text-[12px] text-[#829187] whitespace-nowrap ml-2">
                5 mins ago
              </span>
            </div>

            {/* Activity 3: Soil report submitted */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F9FBF8] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <FileCheck size={18} />
                </div>
                <p className="text-[13px] font-medium text-[#172B24]">
                  Soil report submitted by <span className="font-normal text-[#405247]">Farmer123</span>
                </p>
              </div>
              <span className="text-[12px] text-[#829187] whitespace-nowrap ml-2">
                10 mins ago
              </span>
            </div>
          </div>
        </div>

        {/* Right: Weather Overview */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="text-[16px] font-bold text-[#172B24] mb-3">
            Weather Overview
          </h2>

          <div className="flex items-center justify-between gap-6 my-auto pt-1">
            {/* Left weather temperature and illustration */}
            <div className="flex items-center gap-4">
              {/* Sun & Cloud Graphic */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                {/* Glowing Sun */}
                <div className="absolute top-1 left-1 w-9 h-9 rounded-full bg-[#F59E0B] shadow-md flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#FBBF24]" />
                </div>
                {/* Cloud overlapping sun */}
                <div className="absolute bottom-1 right-0 w-12 h-8 rounded-full bg-[#E0EBF7] border border-[#CDE0F3] shadow-xs flex items-center justify-center">
                  <div className="absolute -top-3 left-2.5 w-6 h-6 rounded-full bg-[#E0EBF7]" />
                  <div className="absolute -top-1 right-1.5 w-5 h-5 rounded-full bg-[#E0EBF7]" />
                </div>
              </div>

              <div>
                <h3 className="text-[32px] font-extrabold text-[#172B24] leading-none tracking-tight">
                  28°C
                </h3>
                <p className="text-[13px] text-[#65786D] font-medium mt-1">
                  Partly Cloudy
                </p>
              </div>
            </div>

            {/* Right weather metrics specs */}
            <div className="space-y-2 border-l border-[#EFF4EE] pl-5 min-w-[130px]">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-[#7C8E82]">Humidity</span>
                <span className="font-bold text-[#172B24]">72%</span>
              </div>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-[#7C8E82]">Wind Speed</span>
                <span className="font-bold text-[#172B24]">12 km/h</span>
              </div>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-[#7C8E82]">Location</span>
                <span className="font-bold text-[#172B24]">Guntur</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F2F6F1] pt-3 mt-4 flex items-center justify-between text-[11px] text-[#7C8E82]">
            <span>Station: Andhra Central Agro-Met</span>
            <button
              onClick={() => setAdminActiveTab('weather')}
              className="text-[#15B064] hover:underline font-semibold"
            >
              Full Forecast →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
