import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Users,
  UserCheck,
  Sprout,
  FileCheck,
  CloudSun,
  BarChart3,
  FileText,
  Settings,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Droplets,
  Wind,
  Layers,
  Thermometer,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  Eye,
  Check,
} from 'lucide-react';

export const AdminSubpages: React.FC = () => {
  const { adminActiveTab, setAdminActiveTab, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Farmer' | 'Admin'>('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [inspectUser, setInspectUser] = useState<any | null>(null);
  const [selectedCropAnalytics, setSelectedCropAnalytics] = useState<'All' | 'Rice' | 'Cotton' | 'Wheat' | 'Maize'>('All');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredHarvestMonth, setHoveredHarvestMonth] = useState<number | null>(null);

  // =================== MOCK DATA: USERS ===================
  const mockUsersList = [
    { id: 'usr-1', name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Farmer', mobile: '+91 98765 43210', district: 'East Godavari', registered: '18 Sep 2026', status: 'Active', farmsCount: 2, acreage: '18.4 acres' },
    { id: 'usr-2', name: 'Ramu K.', email: 'ramu@gmail.com', role: 'Farmer', mobile: '+91 98451 12340', district: 'Guntur', registered: '18 Sep 2026', status: 'Active', farmsCount: 1, acreage: '12.0 acres' },
    { id: 'usr-3', name: 'Sita Devi', email: 'sita.devi@farmhub.in', role: 'Farmer', mobile: '+91 98112 76543', district: 'Krishna', registered: '15 Sep 2026', status: 'Active', farmsCount: 3, acreage: '24.5 acres' },
    { id: 'usr-4', name: 'Nagaraju V.', email: 'nagaraju@agro.com', role: 'Farmer', mobile: '+91 97234 88990', district: 'West Godavari', registered: '12 Sep 2026', status: 'Active', farmsCount: 1, acreage: '9.2 acres' },
    { id: 'usr-5', name: 'Venkatesh M.', email: 'venkat.m@kurnoolfarms.org', role: 'Farmer', mobile: '+91 94401 55678', district: 'Kurnool', registered: '10 Sep 2026', status: 'Active', farmsCount: 2, acreage: '16.0 acres' },
    { id: 'usr-6', name: 'Anjali Rao', email: 'anjali.rao@agrizen.in', role: 'Farmer', mobile: '+91 93902 44321', district: 'Visakhapatnam', registered: '08 Sep 2026', status: 'Active', farmsCount: 1, acreage: '8.5 acres' },
    { id: 'usr-7', name: 'Balakrishna P.', email: 'balu.prakasam@krishi.org', role: 'Farmer', mobile: '+91 98854 33221', district: 'Prakasam', registered: '05 Sep 2026', status: 'Active', farmsCount: 4, acreage: '32.0 acres' },
    { id: 'usr-8', name: 'Lakshmi Narayana', email: 'lakshmi.n@coopagri.com', role: 'Farmer', mobile: '+91 97011 22987', district: 'Nellore', registered: '02 Sep 2026', status: 'Active', farmsCount: 2, acreage: '14.8 acres' },
    { id: 'usr-9', name: 'Admin Staff', email: 'admin@smartagri.com', role: 'Admin', mobile: '+91 98765 00000', district: 'Central Office', registered: '01 Jan 2026', status: 'Active', farmsCount: 0, acreage: 'System-wide' },
  ];

  // =================== MOCK DATA: CROPS OVERSIGHT ===================
  const mockCropsList = [
    { id: 'crp-1', name: 'Rice / Paddy', variety: 'Swarna Sub1 & Samba', region: 'East Godavari & Krishna', totalAcreage: 480, farmsCount: 210, stage: 'Vegetative', harvestMonth: 'Nov 2026', yieldPerAcre: '34 Quintals', healthRate: '96% Healthy' },
    { id: 'crp-2', name: 'Wheat', variety: 'Sharbati & HD-2967', region: 'West Godavari & Guntur', totalAcreage: 320, farmsCount: 140, stage: 'Tillering', harvestMonth: 'Dec 2026', yieldPerAcre: '22 Quintals', healthRate: '94% Healthy' },
    { id: 'crp-3', name: 'Maize', variety: 'Sweet Corn & DHM-117', region: 'Krishna & Kurnool', totalAcreage: 260, farmsCount: 115, stage: 'Flowering', harvestMonth: 'Oct 2026', yieldPerAcre: '28 Quintals', healthRate: '91% Healthy' },
    { id: 'crp-4', name: 'Cotton', variety: 'Bt Cotton Rasi-II', region: 'Guntur & Prakasam', totalAcreage: 390, farmsCount: 160, stage: 'Boll Formation', harvestMonth: 'Jan 2027', yieldPerAcre: '16 Quintals', healthRate: '89% Healthy' },
    { id: 'crp-5', name: 'Tomato', variety: 'Hybrid Red Firm', region: 'Visakhapatnam & Nellore', totalAcreage: 180, farmsCount: 95, stage: 'Fruit Setting', harvestMonth: 'Oct 2026', yieldPerAcre: '110 Quintals', healthRate: '95% Healthy' },
    { id: 'crp-6', name: 'Groundnut', variety: 'K6 Kadiri', region: 'Kurnool & Anantapur', totalAcreage: 210, farmsCount: 88, stage: 'Pod Development', harvestMonth: 'Nov 2026', yieldPerAcre: '18 Quintals', healthRate: '92% Healthy' },
    { id: 'crp-7', name: 'Chilli', variety: 'Guntur Teja S17', region: 'Guntur Rural', totalAcreage: 140, farmsCount: 72, stage: 'Ripening', harvestMonth: 'Nov 2026', yieldPerAcre: '24 Quintals', healthRate: '90% Healthy' },
    { id: 'crp-8', name: 'Sugarcane', variety: 'Co 86032 High Yield', region: 'East Godavari', totalAcreage: 290, farmsCount: 65, stage: 'Cane Elongation', harvestMonth: 'Feb 2027', yieldPerAcre: '380 Quintals', healthRate: '97% Healthy' },
  ];

  // =================== MOCK DATA: SOIL HEALTH REGISTRY ===================
  const mockSoilReports = [
    { id: 'SR-2026-091', farmer: 'Ramu K.', farm: 'Delta Farm #2', district: 'Guntur', npk: 'N: 240 (Medium), P: 42 (High), K: 280 (High)', ph: '6.8 (Optimal)', oc: '0.74% (Good)', moisture: '32%', date: '10 mins ago', status: 'Verified' },
    { id: 'SR-2026-088', farmer: 'Ravi Kumar', farm: 'Green Valley Farm', district: 'East Godavari', npk: 'N: 280 (Balanced), P: 38 (High), K: 260 (Medium)', ph: '6.5 (Optimal)', oc: '0.82% (High)', moisture: '35%', date: 'Yesterday', status: 'Verified' },
    { id: 'SR-2026-085', farmer: 'Sita Devi', farm: 'Riverbed Acres', district: 'Krishna', npk: 'N: 190 (Low), P: 28 (Medium), K: 210 (Balanced)', ph: '7.1 (Neutral)', oc: '0.58% (Moderate)', moisture: '28%', date: '3 days ago', status: 'Action Needed' },
    { id: 'SR-2026-082', farmer: 'Nagaraju V.', farm: 'Sunrise Fields', district: 'West Godavari', npk: 'N: 310 (High), P: 48 (High), K: 320 (High)', ph: '6.6 (Optimal)', oc: '0.90% (High)', moisture: '34%', date: '5 days ago', status: 'Verified' },
    { id: 'SR-2026-079', farmer: 'Venkatesh M.', farm: 'Tungabhadra Basin', district: 'Kurnool', npk: 'N: 180 (Low), P: 22 (Low), K: 190 (Low)', ph: '7.8 (Alkaline)', oc: '0.45% (Deficient)', moisture: '22%', date: '1 week ago', status: 'Action Needed' },
    { id: 'SR-2026-074', farmer: 'Balakrishna P.', farm: 'Coastal Palm Groves', district: 'Prakasam', npk: 'N: 260 (Balanced), P: 35 (Balanced), K: 250 (Balanced)', ph: '6.7 (Optimal)', oc: '0.78% (Good)', moisture: '30%', date: '10 days ago', status: 'Verified' },
  ];

  // =================== MOCK DATA: DISTRICT WEATHER DATA ===================
  const mockWeatherData = [
    { district: 'East Godavari', temp: '29°C', condition: 'Partly Cloudy', humidity: '76%', wind: '14 km/h', rainfallForecast: '5 mm (Light)', soilMoisture: '34%', advisory: 'Favorable for paddy transplanting and weed inspection.' },
    { district: 'Guntur', temp: '28°C', condition: 'Partly Cloudy', humidity: '72%', wind: '12 km/h', rainfallForecast: '2 mm (Negligible)', soilMoisture: '28%', advisory: 'Ideal for chilli harvesting and open sun drying.' },
    { district: 'Krishna', temp: '30°C', condition: 'Sunny / Warm', humidity: '68%', wind: '11 km/h', rainfallForecast: '0 mm (Dry)', soilMoisture: '26%', advisory: 'Irrigation cycle scheduled for maize blocks.' },
    { district: 'Kurnool', temp: '32°C', condition: 'Dry & Clear', humidity: '48%', wind: '16 km/h', rainfallForecast: '0 mm (Dry)', soilMoisture: '19%', advisory: 'Drip irrigation recommended for groundnut pods.' },
    { district: 'Visakhapatnam', temp: '27°C', condition: 'Scattered Showers', humidity: '82%', wind: '18 km/h', rainfallForecast: '18 mm (Moderate)', soilMoisture: '38%', advisory: 'Check horticultural orchard drainage channels.' },
    { district: 'Prakasam', temp: '31°C', condition: 'Clear Sky', humidity: '55%', wind: '13 km/h', rainfallForecast: '0 mm (Dry)', soilMoisture: '24%', advisory: 'Optimal conditions for cotton foliar nutrient spray.' },
  ];

  // =================== 1. TAB: USERS ===================
  if (adminActiveTab === 'users') {
    const filteredUsers = mockUsersList.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = roleFilter === 'All' || u.role === roleFilter;
      return matchSearch && matchRole;
    });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Platform Users Directory</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">
              Manage and audit all registered farmers, farm managers, and administrative accounts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-[#8495A5]" />
              <input
                type="text"
                placeholder="Search user, email, district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3.5 py-2 bg-white border border-[#E3EAE1] rounded-xl text-[13px] text-[#172B24] placeholder-[#8E9F94] focus:outline-none focus:border-[#165A36] w-64 shadow-2xs"
              />
            </div>

            {/* Role Filter Buttons */}
            <div className="flex items-center bg-white border border-[#E3EAE1] rounded-xl p-1 shadow-2xs text-[12px]">
              {(['All', 'Farmer', 'Admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    roleFilter === r
                      ? 'bg-[#165A36] text-white shadow-xs font-semibold'
                      : 'text-[#65786D] hover:text-[#172B24]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => addToast('Exporting complete user directory as CSV...')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#165A36] hover:bg-[#124D2E] text-white text-[12.5px] font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFDF9] border-b border-[#E3EAE1] text-[11px] font-semibold uppercase tracking-wider text-[#65786D]">
                <tr>
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-5">Role</th>
                  <th className="py-3.5 px-5">District</th>
                  <th className="py-3.5 px-5">Contact</th>
                  <th className="py-3.5 px-5">Farms / Acreage</th>
                  <th className="py-3.5 px-5">Registered</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F6F1]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F9FBF8] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#DFEADA] text-[#1E5E36] font-semibold text-[12px] flex items-center justify-center shrink-0 border border-[#CEE0C7]">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-[#172B24] leading-tight">{user.name}</p>
                          <p className="text-[11px] text-[#7C8E82] mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                          user.role === 'Admin'
                            ? 'bg-[#E8F5EC] text-[#13884D] border border-[#C5E5D0]'
                            : 'bg-[#EAF4E6] text-[#165A36]'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-[#405247]">{user.district}</td>
                    <td className="py-3.5 px-5 text-[#65786D] text-[12px]">{user.mobile}</td>
                    <td className="py-3.5 px-5 text-[#405247]">
                      {user.farmsCount > 0 ? (
                        <span>
                          <b>{user.farmsCount}</b> farms ({user.acreage})
                        </span>
                      ) : (
                        <span className="text-[#829187] italic">Platform Admin</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-[#7C8E82] text-[12px]">{user.registered}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#15B064]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15B064]" /> Active
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => {
                          setInspectUser(user);
                          addToast(`Viewing profile details for ${user.name}`);
                        }}
                        className="px-2.5 py-1 text-[12px] font-semibold text-[#165A36] hover:bg-[#EAF4E6] rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Detail Inspection Modal */}
        {inspectUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#DEE7DC] animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F5EE]">
                <h3 className="text-[17px] font-bold text-[#172B24]">User Audit Dossier</h3>
                <button
                  onClick={() => setInspectUser(null)}
                  className="text-[#829187] hover:text-[#172B24] text-[14px]"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-3 py-1">
                <div className="w-12 h-12 rounded-full bg-[#DFEADA] text-[#1E5E36] font-bold text-[18px] flex items-center justify-center border border-[#CEE0C7]">
                  {inspectUser.name[0]}
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#172B24]">{inspectUser.name}</h4>
                  <p className="text-[12px] text-[#65786D]">{inspectUser.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-[12.5px] bg-[#FAFDF9] p-4 rounded-xl border border-[#E3EAE1]">
                <div className="flex justify-between">
                  <span className="text-[#65786D]">User ID:</span>
                  <span className="font-mono text-[#172B24] font-medium">{inspectUser.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65786D]">Account Role:</span>
                  <span className="font-semibold text-[#165A36]">{inspectUser.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65786D]">Phone:</span>
                  <span className="text-[#172B24]">{inspectUser.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65786D]">District / Region:</span>
                  <span className="text-[#172B24]">{inspectUser.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65786D]">Acreage Managed:</span>
                  <span className="text-[#172B24] font-medium">{inspectUser.acreage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#65786D]">Registration Date:</span>
                  <span className="text-[#172B24]">{inspectUser.registered}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setInspectUser(null)}
                  className="px-4 py-2 bg-[#165A36] text-white rounded-xl text-[12.5px] font-semibold hover:bg-[#124D2E] transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =================== 2. TAB: FARMERS DIRECTORY ===================
  if (adminActiveTab === 'farmers') {
    const farmersOnly = mockUsersList.filter((u) => u.role === 'Farmer');

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Registered Farmers Directory</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">
              Comprehensive registry of active agricultural producers, parcel allocations, and contact verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12.5px] text-[#4A5D52] bg-white px-3 py-1.5 rounded-xl border border-[#E3EAE1] shadow-2xs font-medium">
              Active Farmers: <b className="text-[#165A36]">{farmersOnly.length}</b> verified
            </span>
          </div>
        </div>

        {/* Farmer Grid Cards matching green identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmersOnly.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs hover:border-[#C5D8C3] hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#DFEADA] text-[#1E5E36] font-bold text-[14px] flex items-center justify-center border border-[#CEE0C7]">
                  {f.name[0]}
                </div>
                <span className="text-[11px] font-semibold bg-[#EAF4E6] text-[#165A36] px-2.5 py-0.5 rounded-full border border-[#D5E8D0]">
                  {f.acreage}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-[#172B24] text-[15.5px] leading-snug">{f.name}</h3>
                <p className="text-[12px] text-[#7C8E82] flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-[#165A36]" /> {f.district}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F2F6F1] space-y-1 text-[12px]">
                <div className="flex items-center justify-between text-[#55695E]">
                  <span>Farms registered:</span>
                  <span className="font-bold text-[#172B24]">{f.farmsCount}</span>
                </div>
                <div className="flex items-center justify-between text-[#55695E]">
                  <span>Contact:</span>
                  <span className="text-[#172B24]">{f.mobile}</span>
                </div>
              </div>

              <button
                onClick={() => addToast(`Opening farm dossier for ${f.name}`)}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FAFDF9] hover:bg-[#EAF4E6] border border-[#DEE7DC] text-[#165A36] text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Parcels & Crops</span>
                <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =================== 3. TAB: CROPS OVERSIGHT ===================
  if (adminActiveTab === 'crops') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Crop Oversight & Cultivation Metrics</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">
              Statewide monitored acreage, stage distribution, and harvest yield projections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EAE1] text-[12px] text-[#55695E] shadow-2xs font-medium">
              Total Cultivated: <b className="text-[#165A36]">2,270 Acres</b>
            </span>
          </div>
        </div>

        {/* Crops Oversight Table */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFDF9] border-b border-[#E3EAE1] text-[11px] font-semibold uppercase tracking-wider text-[#65786D]">
                <tr>
                  <th className="py-3.5 px-5">Crop & Primary Variety</th>
                  <th className="py-3.5 px-5">Region</th>
                  <th className="py-3.5 px-5">Monitored Area</th>
                  <th className="py-3.5 px-5">Plots Count</th>
                  <th className="py-3.5 px-5">Current Growth Stage</th>
                  <th className="py-3.5 px-5">Harvest Horizon</th>
                  <th className="py-3.5 px-5">Expected Yield</th>
                  <th className="py-3.5 px-5">Health Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F6F1]">
                {mockCropsList.map((crop) => (
                  <tr key={crop.id} className="hover:bg-[#F9FBF8] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#172B24]">{crop.name}</div>
                      <div className="text-[11px] text-[#7C8E82]">{crop.variety}</div>
                    </td>
                    <td className="py-3.5 px-5 text-[#405247]">{crop.region}</td>
                    <td className="py-3.5 px-5 font-bold text-[#165A36]">{crop.totalAcreage} Acres</td>
                    <td className="py-3.5 px-5 text-[#405247]">{crop.farmsCount} plots</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#EAF4E6] text-[#165A36]">
                        {crop.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-[#65786D] text-[12px]">{crop.harvestMonth}</td>
                    <td className="py-3.5 px-5 text-[#172B24] font-medium">{crop.yieldPerAcre}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#15B064]">
                        <Check size={13} /> {crop.healthRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // =================== 4. TAB: SOIL HEALTH REGISTRY ===================
  if (adminActiveTab === 'soil') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Soil Reports Master Registry</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">
              Laboratory soil health cards, NPK balances, pH levels, and organic carbon certifications.
            </p>
          </div>
          <button
            onClick={() => addToast('Exporting Soil Database Ledger as CSV...')}
            className="flex items-center gap-2 px-4 py-2 bg-[#165A36] text-white rounded-xl text-[13px] font-semibold hover:bg-[#124D2E] shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={15} />
            <span>Export Soil Database</span>
          </button>
        </div>

        {/* Soil Reports List */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] shadow-2xs divide-y divide-[#F2F6F1]">
          {mockSoilReports.map((sr) => (
            <div key={sr.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAFDF9] transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#172B24] text-[14.5px] font-mono">{sr.id}</span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                      sr.status === 'Verified'
                        ? 'bg-[#EAF4E6] text-[#165A36] border border-[#D5E8D0]'
                        : 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]'
                    }`}
                  >
                    {sr.status}
                  </span>
                  <span className="text-[11.5px] text-[#829187] flex items-center gap-1">
                    <MapPin size={11} /> {sr.district}
                  </span>
                </div>
                <p className="text-[13.5px] text-[#2C4035]">
                  Farm: <span className="font-semibold text-[#172B24]">{sr.farm}</span> · Submitted by{' '}
                  <span className="font-semibold text-[#165A36]">{sr.farmer}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#55695E]">
                  <span><b>NPK:</b> {sr.npk}</span>
                  <span>•</span>
                  <span><b>pH:</b> {sr.ph}</span>
                  <span>•</span>
                  <span><b>Org. Carbon:</b> {sr.oc}</span>
                  <span>•</span>
                  <span><b>Moisture:</b> {sr.moisture}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[12px] text-[#829187]">{sr.date}</span>
                <button
                  onClick={() => addToast(`Downloaded Soil Health Card for ${sr.id}`)}
                  className="px-3.5 py-1.5 rounded-xl border border-[#DEE7DC] text-[#165A36] text-[12.5px] font-semibold hover:bg-[#EAF4E6] transition-colors cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =================== 5. TAB: WEATHER DATA ===================
  if (adminActiveTab === 'weather') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Agricultural Weather Telemetry</h1>
          <p className="text-[13px] text-[#65786D] mt-0.5">
            Micro-climate agricultural stations, precipitation forecasts, and regional agronomic advisories.
          </p>
        </div>

        {/* Weather Advisory Banner */}
        <div className="bg-[#EBF4EC] border border-[#D3E8D5] rounded-2xl p-5 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-[#165A36] text-white shrink-0 mt-0.5">
            <CloudSun size={20} />
          </div>
          <div>
            <h4 className="font-bold text-[#172B24] text-[14px]">State Agrometeorological Advisory</h4>
            <p className="text-[12.5px] text-[#405247] mt-1 leading-relaxed">
              Coastal Andhra districts are forecasted to experience moderate convective showers over the next 48 hours. Farmers are advised to postpone synthetic fertilizer top-dressing and ensure field drainage channels are clear of debris.
            </p>
          </div>
        </div>

        {/* District Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockWeatherData.map((w) => (
            <div key={w.district} className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#172B24] text-[16px]">{w.district}</h3>
                  <p className="text-[12px] text-[#7C8E82]">{w.condition}</p>
                </div>
                <div className="text-[24px] font-bold text-[#165A36] font-mono">{w.temp}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F2F6F1] text-[12px]">
                <div className="bg-[#FAFDF9] p-2 rounded-lg border border-[#EAEFE9]">
                  <span className="text-[#829187] block text-[10.5px]">Humidity</span>
                  <span className="font-semibold text-[#172B24]">{w.humidity}</span>
                </div>
                <div className="bg-[#FAFDF9] p-2 rounded-lg border border-[#EAEFE9]">
                  <span className="text-[#829187] block text-[10.5px]">Wind</span>
                  <span className="font-semibold text-[#172B24]">{w.wind}</span>
                </div>
                <div className="bg-[#FAFDF9] p-2 rounded-lg border border-[#EAEFE9]">
                  <span className="text-[#829187] block text-[10.5px]">Rainfall</span>
                  <span className="font-semibold text-[#172B24]">{w.rainfallForecast.split(' ')[0]}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F6F9F6] text-[11.5px] text-[#4A5D52] border border-[#E3EAE1]">
                <b>Advisory:</b> {w.advisory}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =================== 6. TAB: ANALYTICS ===================
  if (adminActiveTab === 'analytics') {
    // Multi-Crop Yield Trend datasets (Quintals / Acre across 7 cultivation months)
    const yieldDatasets: Record<
      'All' | 'Rice' | 'Cotton' | 'Wheat' | 'Maize',
      {
        title: string;
        current: number[];
        benchmark: number[];
        growth: string;
        unit: string;
        peakMonth: string;
      }
    > = {
      All: {
        title: 'Composite Agronomic Yield',
        current: [22, 25, 29, 34, 38, 41, 44],
        benchmark: [20, 22, 26, 30, 34, 37, 39],
        growth: '+12.8% YoY',
        unit: 'Quintals/Acre',
        peakMonth: 'Nov (Kharif Peak)',
      },
      Rice: {
        title: 'Paddy / Rice (Swarna Sub1 & Samba)',
        current: [24, 28, 33, 37, 40, 43, 46],
        benchmark: [21, 24, 29, 33, 36, 38, 40],
        growth: '+15.0% YoY',
        unit: 'Quintals/Acre',
        peakMonth: 'Nov (Harvest Phase)',
      },
      Cotton: {
        title: 'Bt Cotton (Rasi-II & Hybrid)',
        current: [10, 12, 14, 16, 18, 20, 21],
        benchmark: [9, 10, 12, 14, 16, 17, 18],
        growth: '+16.6% YoY',
        unit: 'Quintals/Acre',
        peakMonth: 'Jan (Boll Burst)',
      },
      Wheat: {
        title: 'Wheat (Sharbati & HD-2967)',
        current: [16, 19, 21, 24, 26, 28, 29],
        benchmark: [15, 17, 19, 21, 23, 25, 26],
        growth: '+11.5% YoY',
        unit: 'Quintals/Acre',
        peakMonth: 'Dec (Grain Fill)',
      },
      Maize: {
        title: 'Hybrid Sweet Corn & Feed Maize',
        current: [18, 21, 25, 29, 33, 35, 36],
        benchmark: [16, 19, 22, 26, 29, 31, 32],
        growth: '+12.5% YoY',
        unit: 'Quintals/Acre',
        peakMonth: 'Oct (Tassel & Ear)',
      },
    };

    const currentData = yieldDatasets[selectedCropAnalytics];
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

    // Coordinate calculation for 540x200 SVG ViewBox
    // y range 20 to 180 (min val 5, max val 50)
    const getY = (val: number) => 185 - ((val - 5) / 45) * 155;
    const getX = (idx: number) => 50 + idx * 78;

    const currentPoints = currentData.current.map((v, i) => ({ x: getX(i), y: getY(v), val: v, month: months[i] }));
    const benchmarkPoints = currentData.benchmark.map((v, i) => ({ x: getX(i), y: getY(v), val: v, month: months[i] }));

    // Generate smooth SVG paths
    const buildPath = (pts: { x: number; y: number }[]) => {
      return pts.reduce((acc, pt, i) => {
        if (i === 0) return `M ${pt.x} ${pt.y}`;
        const prev = pts[i - 1];
        const cpX1 = prev.x + (pt.x - prev.x) / 2;
        const cpX2 = prev.x + (pt.x - prev.x) / 2;
        return `${acc} C ${cpX1} ${prev.y}, ${cpX2} ${pt.y}, ${pt.x} ${pt.y}`;
      }, '');
    };

    const currentCurve = buildPath(currentPoints);
    const benchmarkCurve = buildPath(benchmarkPoints);
    const currentArea = `${currentCurve} L ${getX(months.length - 1)} 190 L ${getX(0)} 190 Z`;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Platform Agronomic Analytics</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">
              Multi-season yield benchmarking, harvest logistics modeling, water conservation, and mandi price realization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E3EAE1] text-[12px] text-[#55695E] shadow-2xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#165A36]" />
              Season: <b className="text-[#172B24]">Kharif 2026-27</b>
            </span>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-1">
            <span className="text-[11.5px] font-semibold text-[#7C8E82] uppercase tracking-wider">Average Yield Index</span>
            <div className="text-[26px] font-bold text-[#165A36]">+12.8%</div>
            <p className="text-[11.5px] text-[#15B064] font-medium flex items-center gap-1">
              <TrendingUp size={13} /> Exceeding regional APMC target
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-1">
            <span className="text-[11.5px] font-semibold text-[#7C8E82] uppercase tracking-wider">Water Conserved</span>
            <div className="text-[26px] font-bold text-[#2563EB]">42.5%</div>
            <p className="text-[11.5px] text-[#2563EB] font-medium">
              3,180 Megaliters saved via smart drip
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-1">
            <span className="text-[11.5px] font-semibold text-[#7C8E82] uppercase tracking-wider">Soil Nutrient Index</span>
            <div className="text-[26px] font-bold text-[#D97706]">92 / 100</div>
            <p className="text-[11.5px] text-[#D97706] font-medium">
              Optimal pH & NPK balance in 78% parcels
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-1">
            <span className="text-[11.5px] font-semibold text-[#7C8E82] uppercase tracking-wider">Price Realization Premium</span>
            <div className="text-[26px] font-bold text-[#7C3AED]">+15.4%</div>
            <p className="text-[11.5px] text-[#7C3AED] font-medium">
              Average realization above Govt. MSP
            </p>
          </div>
        </div>

        {/* GRAPH 1: Interactive Multi-Crop Yield Trends Graph (SVG Line/Area) */}
        <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#172B24] text-[17px]">
                  Crop Yield & Productivity Trajectory
                </h3>
                <span className="text-[11px] font-semibold bg-[#EAF4E6] text-[#165A36] px-2.5 py-0.5 rounded-full border border-[#D5E8D0]">
                  {currentData.growth}
                </span>
              </div>
              <p className="text-[12.5px] text-[#65786D] mt-0.5">
                Comparing 2026 Season Yield Curve vs 2025 Historical Benchmark ({currentData.unit})
              </p>
            </div>

            {/* Crop Selector Tabs */}
            <div className="flex flex-wrap items-center bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl p-1 gap-1 text-[12px]">
              {(['All', 'Rice', 'Cotton', 'Wheat', 'Maize'] as const).map((cropKey) => (
                <button
                  key={cropKey}
                  onClick={() => setSelectedCropAnalytics(cropKey)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    selectedCropAnalytics === cropKey
                      ? 'bg-[#165A36] text-white shadow-xs font-semibold'
                      : 'text-[#55695E] hover:text-[#172B24] hover:bg-[#EAF4E6]'
                  }`}
                >
                  {cropKey === 'All' ? 'Composite' : cropKey}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Graph Container */}
          <div className="relative w-full h-[240px] pt-2">
            <svg viewBox="0 0 540 210" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="analyticsYieldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#165A36" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="#165A36" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#165A36" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Y-axis Horizontal Grid lines */}
              {[
                { label: '45 Q/A', y: getY(45) },
                { label: '35 Q/A', y: getY(35) },
                { label: '25 Q/A', y: getY(25) },
                { label: '15 Q/A', y: getY(15) },
                { label: '5 Q/A', y: getY(5) },
              ].map((grid) => (
                <g key={grid.label}>
                  <line
                    x1="45"
                    y1={grid.y}
                    x2="530"
                    y2={grid.y}
                    stroke="#EDF3EC"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text x="38" y={grid.y + 3.5} textAnchor="end" fill="#94A399" fontSize="9.5" fontWeight="500">
                    {grid.label}
                  </text>
                </g>
              ))}

              {/* Shaded Area under 2026 curve */}
              <path d={currentArea} fill="url(#analyticsYieldGrad)" />

              {/* 2025 Benchmark Dashed Line */}
              <path
                d={benchmarkCurve}
                fill="none"
                stroke="#D97706"
                strokeWidth="2.2"
                strokeDasharray="5 5"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* 2026 Current Season Solid Curve */}
              <path
                d={currentCurve}
                fill="none"
                stroke="#165A36"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Benchmark Data Points */}
              {benchmarkPoints.map((pt, idx) => (
                <circle
                  key={`bm-${idx}`}
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#FFFFFF"
                  stroke="#D97706"
                  strokeWidth="2"
                />
              ))}

              {/* Current Season Interactive Data Points */}
              {currentPoints.map((pt, idx) => (
                <g
                  key={`curr-${idx}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === idx ? 7 : 4.5}
                    fill="#165A36"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="transition-all duration-150"
                  />

                  {/* Tooltip Card on Hover */}
                  {hoveredPoint === idx && (
                    <g className="animate-in fade-in duration-100">
                      <rect
                        x={pt.x - 52}
                        y={pt.y - 48}
                        width="104"
                        height="40"
                        rx="8"
                        fill="#172B24"
                        className="shadow-lg"
                      />
                      <text x={pt.x} y={pt.y - 32} fill="#9EE2B7" fontSize="9.5" fontWeight="700" textAnchor="middle">
                        {pt.month} 2026: {pt.val} Q/A
                      </text>
                      <text x={pt.x} y={pt.y - 18} fill="#CBD5E1" fontSize="8.5" fontWeight="500" textAnchor="middle">
                        2025: {currentData.benchmark[idx]} Q/A (+{((pt.val - currentData.benchmark[idx]) / currentData.benchmark[idx] * 100).toFixed(1)}%)
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* X-axis Month Labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={getX(i)}
                  y="204"
                  fill={hoveredPoint === i ? '#165A36' : '#65786D'}
                  fontSize="10"
                  fontWeight={hoveredPoint === i ? '700' : '500'}
                  textAnchor="middle"
                >
                  {m}
                </text>
              ))}
            </svg>
          </div>

          {/* Graph Legend & Status */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#F2F6F1] text-[12px]">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#165A36]" />
                <span className="font-semibold text-[#172B24]">2026 Season (Current / Projected)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#D97706] border-t-2 border-dashed border-[#D97706]" />
                <span className="text-[#65786D]">2025 Historical Baseline</span>
              </div>
            </div>

            <div className="text-[#165A36] font-medium text-[12px]">
              Peak Production Horizon: <b>{currentData.peakMonth}</b>
            </div>
          </div>
        </div>

        {/* ROW 2: Harvest Volume & Mandi Valuation + Soil Nutrient Spectrum */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Monthly Harvest Volume & Revenue Forecast */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#172B24] text-[16px]">Monthly Harvest Volume & Mandi Valuation</h3>
                <p className="text-[12px] text-[#65786D] mt-0.5">Estimated output in Metric Tons & projected revenue in ₹ Lakhs</p>
              </div>
              <span className="text-[11.5px] bg-[#EAF4E6] text-[#165A36] px-2.5 py-0.5 rounded-full font-semibold border border-[#D5E8D0]">
                Total: 5,030 T
              </span>
            </div>

            {/* Custom Dual Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-3 border-b border-[#E3EAE1]">
              {[
                { month: 'Sep', tons: 450, rev: '₹112L', height: '36%', highlight: false },
                { month: 'Oct', tons: 820, rev: '₹218L', height: '58%', highlight: false },
                { month: 'Nov', tons: 1450, rev: '₹395L', height: '96%', highlight: true },
                { month: 'Dec', tons: 1120, rev: '₹305L', height: '78%', highlight: false },
                { month: 'Jan', tons: 680, rev: '₹185L', height: '50%', highlight: false },
                { month: 'Feb', tons: 510, rev: '₹142L', height: '42%', highlight: false },
              ].map((col, idx) => (
                <div
                  key={col.month}
                  className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                  onMouseEnter={() => setHoveredHarvestMonth(idx)}
                  onMouseLeave={() => setHoveredHarvestMonth(null)}
                >
                  {/* Tooltip on hover */}
                  <div
                    className={`transition-all duration-150 flex flex-col items-center ${
                      hoveredHarvestMonth === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <span className="text-[10px] font-bold bg-[#172B24] text-white px-2 py-0.5 rounded-md whitespace-nowrap shadow-xs">
                      {col.tons} T · {col.rev}
                    </span>
                  </div>

                  {/* Revenue badge indicator */}
                  <span className={`text-[10.5px] font-semibold ${col.highlight ? 'text-[#165A36]' : 'text-[#7C8E82]'}`}>
                    {col.rev}
                  </span>

                  {/* Bar */}
                  <div
                    style={{ height: col.height }}
                    className={`w-full max-w-[46px] rounded-t-xl transition-all ${
                      col.highlight
                        ? 'bg-[#165A36] group-hover:bg-[#124D2E] shadow-sm'
                        : 'bg-[#48A169] group-hover:bg-[#3B8A58]'
                    }`}
                  />
                  <span className="text-[12px] font-semibold text-[#405247] pt-1">{col.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11.5px] text-[#7C8E82] pt-1">
              <span>*November represents major Kharif paddy harvest peak in Delta districts.</span>
              <span className="font-semibold text-[#165A36]">Est. Cumulative Value: ₹1,357 Lakhs</span>
            </div>
          </div>

          {/* Right: Soil Nutrient Compliance Spectrum */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#172B24] text-[16px]">Soil Nutrient Compliance</h3>
                <span className="text-[11.5px] text-[#2563EB] font-semibold bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                  3,428 Tests
                </span>
              </div>
              <p className="text-[12px] text-[#65786D] mt-0.5">Optimal nutrient saturation across monitored farms</p>
            </div>

            <div className="space-y-3.5 my-auto py-2">
              {[
                { label: 'Available Nitrogen (N)', percent: 74, status: 'Optimal', color: 'bg-[#165A36]' },
                { label: 'Available Phosphorus (P)', percent: 68, status: 'Moderate-High', color: 'bg-[#2563EB]' },
                { label: 'Soluble Potassium (K)', percent: 82, status: 'Optimal', color: 'bg-[#15B064]' },
                { label: 'Organic Carbon (> 0.75%)', percent: 65, status: 'Good', color: 'bg-[#D97706]' },
                { label: 'pH Balance (6.0 - 7.5)', percent: 88, status: 'Neutral Range', color: 'bg-[#165A36]' },
                { label: 'Micronutrients (Zinc & Boron)', percent: 76, status: 'Adequate', color: 'bg-[#7C3AED]' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-medium text-[#2C4035]">{item.label}</span>
                    <span className="font-bold text-[#172B24]">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#EEF4ED] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#FAFDF9] rounded-xl border border-[#E3EAE1] text-[11.5px] text-[#4A5D52] flex items-center justify-between">
              <span>Overall Agronomic Soil Health Index:</span>
              <span className="font-bold text-[#165A36] text-[13px]">92 / 100 (A+)</span>
            </div>
          </div>
        </div>

        {/* ROW 3: Water Conservation by District & Mandi Price Realization vs MSP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Water Conservation by District */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#172B24] text-[16px]">Water Conservation by District</h3>
                <p className="text-[12px] text-[#65786D] mt-0.5">Water saved through precision drip & micro-irrigation vs flood method</p>
              </div>
              <span className="text-[11.5px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
                -42.5% Water Usage
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { district: 'Kurnool (Semi-Arid Basin)', saved: '52% Saved', liters: '920 Megaliters', progress: 52 },
                { district: 'Krishna (Delta Plains)', saved: '45% Saved', liters: '810 Megaliters', progress: 45 },
                { district: 'East Godavari (Canal Zone)', saved: '42% Saved', liters: '690 Megaliters', progress: 42 },
                { district: 'Guntur (Black Cotton Soil)', saved: '38% Saved', liters: '480 Megaliters', progress: 38 },
                { district: 'West Godavari (Paddy Belt)', saved: '35% Saved', liters: '280 Megaliters', progress: 35 },
              ].map((d) => (
                <div key={d.district} className="p-3 rounded-xl bg-[#FAFDF9] border border-[#EAEFE9] space-y-1.5">
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-semibold text-[#172B24]">{d.district}</span>
                    <span className="font-bold text-[#2563EB]">{d.saved}</span>
                  </div>
                  <div className="w-full h-2 bg-[#E1EDFC] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${d.progress * 1.8}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#7C8E82]">
                    <span>Precision Sensor Deployed</span>
                    <span>Conserved: {d.liters}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandi Price Realization vs Minimum Support Price (MSP) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#172B24] text-[16px]">Mandi Price Realization vs Govt. MSP</h3>
                <p className="text-[12px] text-[#65786D] mt-0.5">SmartAgri farmers direct trade prices vs statutory support prices</p>
              </div>
              <span className="text-[11.5px] font-semibold text-[#165A36] bg-[#EAF4E6] px-2.5 py-0.5 rounded-full border border-[#D5E8D0]">
                Avg +₹285 / Quintal
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { crop: 'Paddy / Rice (Grade A)', msp: '₹2,203', realized: '₹2,580', premium: '+17.1%', trend: 'up' },
                { crop: 'Bt Cotton (Medium Staple)', msp: '₹6,620', realized: '₹7,420', premium: '+12.1%', trend: 'up' },
                { crop: 'Maize (Kharif)', msp: '₹2,090', realized: '₹2,420', premium: '+15.8%', trend: 'up' },
                { crop: 'Chilli (Guntur Teja)', msp: '₹14,500', realized: '₹17,800', premium: '+22.7%', trend: 'up' },
                { crop: 'Groundnut (Pod)', msp: '₹5,850', realized: '₹6,480', premium: '+10.8%', trend: 'up' },
              ].map((c) => (
                <div key={c.crop} className="p-3 rounded-xl bg-[#FAFDF9] border border-[#EAEFE9] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#172B24] text-[13px]">{c.crop}</h4>
                    <p className="text-[11px] text-[#7C8E82] mt-0.5">Govt. MSP: {c.msp} / Quintal</p>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-[#165A36] text-[14.5px]">{c.realized}</div>
                    <span className="text-[11px] font-bold text-[#15B064] bg-[#EAF4E6] px-2 py-0.5 rounded-full">
                      {c.premium} Premium
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =================== 7. TAB: REPORTS ===================
  if (adminActiveTab === 'reports') {
    const adminReports = [
      { id: 'REP-SYS-01', title: 'Statewide Kharif Season Agronomic Audit', period: 'September 2026', size: '2.4 MB', type: 'Full System Audit' },
      { id: 'REP-SYS-02', title: 'State Soil Micronutrient & Organic Carbon Ledger', period: 'September 2026', size: '1.8 MB', type: 'Laboratory Registry' },
      { id: 'REP-SYS-03', title: 'Regional Mandi Commodity Price Trends & Volatility Index', period: 'September 2026', size: '940 KB', type: 'Market Intelligence' },
      { id: 'REP-SYS-04', title: 'Micro-Irrigation & Water Allocation Benchmark', period: 'September 2026', size: '1.2 MB', type: 'Resource Planning' },
      { id: 'REP-SYS-05', title: 'Farmer Subsidy & Government Compliance Manifest', period: 'September 2026', size: '3.1 MB', type: 'Regulatory Compliance' },
      { id: 'REP-SYS-06', title: 'Biosecurity & Pest Outbreak Surveillance Log', period: 'September 2026', size: '820 KB', type: 'Pest Surveillance' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">System & Agronomic Reports</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">
              Generate and download state audits, commodity price logs, and laboratory compliance manifests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminReports.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold bg-[#EAF4E6] text-[#165A36] px-2.5 py-0.5 rounded-full">
                  {r.id}
                </span>
                <span className="text-[11.5px] text-[#7C8E82]">{r.period}</span>
              </div>
              <div>
                <h4 className="font-bold text-[#172B24] text-[15px]">{r.title}</h4>
                <p className="text-[12px] text-[#7C8E82] mt-0.5">{r.type} · {r.size}</p>
              </div>
              <div className="pt-2 border-t border-[#F2F6F1] flex items-center justify-between">
                <button
                  onClick={() => addToast(`Exported CSV for: ${r.title}`)}
                  className="text-[12px] font-semibold text-[#165A36] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={() => addToast(`Generated PDF for: ${r.title}`)}
                  className="text-[12px] font-semibold text-[#4A5D52] hover:text-[#172B24] cursor-pointer"
                >
                  View Summary
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =================== 8. TAB: SETTINGS ===================
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold text-[#172B24] tracking-tight">Platform & Administrative Settings</h1>
        <p className="text-[13px] text-[#65786D] mt-0.5">
          Configure real-time sync thresholds, automated weather notifications, and role permissions.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 shadow-2xs space-y-6">
        <h3 className="text-[16px] font-bold text-[#172B24]">Platform Governance & Automations</h3>

        <div className="space-y-4 divide-y divide-[#F2F6F1]">
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-[#172B24] text-[13.5px]">Automated Micro-Climate Weather Alerts</p>
              <p className="text-[12px] text-[#65786D]">Dispatch SMS and in-app emergency warnings when wind &gt; 25 km/h or heavy rain is forecast.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#165A36] focus:ring-[#165A36] cursor-pointer" />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-[#172B24] text-[13.5px]">Live Mandi Price Sync (Every 15 mins)</p>
              <p className="text-[12px] text-[#65786D]">Automatically poll regional APMC market feeds for real-time quintal valuations.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#165A36] focus:ring-[#165A36] cursor-pointer" />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-[#172B24] text-[13.5px]">Automatic Soil Health Verification Threshold</p>
              <p className="text-[12px] text-[#65786D]">Flag soil laboratory reports with pH &lt; 5.5 or &gt; 8.0 for manual agronomic review.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#165A36] focus:ring-[#165A36] cursor-pointer" />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-[#172B24] text-[13.5px]">Daily Audit Ledger Digest</p>
              <p className="text-[12px] text-[#65786D]">Email consolidated admin summary of daily crop plantings and farmer registrations.</p>
            </div>
            <input type="checkbox" className="w-4 h-4 rounded text-[#165A36] focus:ring-[#165A36] cursor-pointer" />
          </div>
        </div>

        <div className="pt-4 border-t border-[#F2F6F1] flex justify-end">
          <button
            onClick={() => addToast('Administrative platform preferences saved successfully.', 'success')}
            className="px-5 py-2.5 bg-[#165A36] hover:bg-[#124D2E] text-white text-[13px] font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Save Admin Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
