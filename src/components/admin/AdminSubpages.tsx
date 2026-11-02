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
} from 'lucide-react';

export const AdminSubpages: React.FC = () => {
  const { adminActiveTab, setAdminActiveTab, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Admin Directory Data
  const usersList = [
    { id: 'usr-1', name: 'Ramu K.', email: 'ramu@gmail.com', role: 'Farmer', registered: '2 mins ago', status: 'Active', district: 'Guntur' },
    { id: 'usr-2', name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Farmer', registered: '1 day ago', status: 'Active', district: 'East Godavari' },
    { id: 'usr-3', name: 'Sita Devi', email: 'sita.devi@farmhub.in', role: 'Farmer', registered: '3 days ago', status: 'Active', district: 'Krishna' },
    { id: 'usr-4', name: 'Nagaraju V.', email: 'nagaraju@agro.com', role: 'Farmer', registered: '5 days ago', status: 'Active', district: 'West Godavari' },
    { id: 'usr-5', name: 'Admin Staff', email: 'admin@smartagri.com', role: 'Admin', registered: '1 month ago', status: 'Active', district: 'System' },
  ];

  const farmersList = [
    { id: 'fmr-1', name: 'Ravi Kumar', farms: 2, crops: ['Rice', 'Tomatoes'], phone: '+91 98765 43210', district: 'East Godavari', acreage: '18.4 acres' },
    { id: 'fmr-2', name: 'Ramu K.', farms: 1, crops: ['Paddy'], phone: '+91 98451 12340', district: 'Guntur', acreage: '12.0 acres' },
    { id: 'fmr-3', name: 'Sita Devi', farms: 3, crops: ['Maize', 'Cotton'], phone: '+91 98112 76543', district: 'Krishna', acreage: '24.5 acres' },
    { id: 'fmr-4', name: 'Nagaraju V.', farms: 1, crops: ['Wheat'], phone: '+91 97234 88990', district: 'West Godavari', acreage: '9.2 acres' },
  ];

  const soilReportsList = [
    { id: 'SR-2026-091', farmer: 'Farmer123', farm: 'Delta Farm #2', npk: 'N: High, P: Medium, K: Balanced', ph: '6.8 (Optimal)', date: '10 mins ago', status: 'Verified' },
    { id: 'SR-2026-088', farmer: 'Ravi Kumar', farm: 'Green Valley Farm', npk: 'N: Balanced, P: High, K: Medium', ph: '6.5 (Optimal)', date: 'Yesterday', status: 'Verified' },
    { id: 'SR-2026-085', farmer: 'Sita Devi', farm: 'Riverbed Acres', npk: 'N: Low, P: Balanced, K: Balanced', ph: '7.1 (Neutral)', date: '3 days ago', status: 'Under Review' },
  ];

  if (adminActiveTab === 'users') {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24]">Platform Users Directory</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">Manage all registered farmers and platform administrative accounts.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-[#8495A5]" />
              <input
                type="text"
                placeholder="Search user or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3.5 py-2 bg-white border border-[#E3EAE1] rounded-xl text-[13px] focus:outline-none focus:border-[#15B064] w-64 shadow-2xs"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAE1] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFDF9] border-b border-[#E3EAE1] text-[11px] font-semibold uppercase tracking-wider text-[#65786D]">
                <tr>
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-5">Role</th>
                  <th className="py-3.5 px-5">District</th>
                  <th className="py-3.5 px-5">Registered</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F6F1]">
                {usersList
                  .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((user) => (
                    <tr key={user.id} className="hover:bg-[#F9FBF8] transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-[#172B24]">{user.name}</div>
                        <div className="text-[11px] text-[#7C8E82]">{user.email}</div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${user.role === 'Admin' ? 'bg-[#EDE9FE] text-[#7C3AED]' : 'bg-[#EAF4E6] text-[#165A36]'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-[#405247]">{user.district}</td>
                      <td className="py-3.5 px-5 text-[#7C8E82]">{user.registered}</td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#15B064]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#15B064]" /> Active
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => addToast(`User details viewed: ${user.name}`)}
                          className="text-[#15B064] hover:underline font-semibold text-[12px]"
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
      </div>
    );
  }

  if (adminActiveTab === 'farmers') {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-[24px] font-bold text-[#172B24]">Registered Farmers</h1>
          <p className="text-[13px] text-[#65786D] mt-0.5">Overview of active farmers, total acreage, and current crops under management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmersList.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl border border-[#E3EAE1] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-[13px]">
                  {f.name[0]}
                </span>
                <span className="text-[11px] bg-[#EAF4E6] text-[#165A36] px-2 py-0.5 rounded-full font-medium">
                  {f.acreage}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-[#172B24] text-[15px]">{f.name}</h3>
                <p className="text-[12px] text-[#7C8E82] flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {f.district}
                </p>
              </div>
              <div className="pt-2 border-t border-[#F2F6F1] flex items-center justify-between text-[12px]">
                <span className="text-[#55695E]">Farms: <b>{f.farms}</b></span>
                <span className="text-[#15B064] font-medium">{f.crops.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (adminActiveTab === 'soil') {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#172B24]">Soil Reports Master Registry</h1>
            <p className="text-[13px] text-[#65786D] mt-0.5">Laboratory soil health cards, NPK balances, and fertilizer recommendations.</p>
          </div>
          <button
            onClick={() => addToast('Exporting Soil Database as CSV...')}
            className="flex items-center gap-2 px-4 py-2 bg-[#13884D] text-white rounded-xl text-[13px] font-medium hover:bg-[#10703F] shadow-2xs cursor-pointer"
          >
            <Download size={15} />
            <span>Export Registry</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAE1] shadow-2xs divide-y divide-[#F2F6F1]">
          {soilReportsList.map((sr) => (
            <div key={sr.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#172B24] text-[14px]">{sr.id}</span>
                  <span className="text-[11px] bg-[#EAF4E6] text-[#165A36] px-2 py-0.5 rounded-full font-medium">
                    {sr.status}
                  </span>
                </div>
                <p className="text-[13px] text-[#405247]">{sr.farm} · Submitted by <span className="font-semibold">{sr.farmer}</span></p>
                <p className="text-[12px] text-[#7C8E82]">{sr.npk} · pH {sr.ph}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#829187]">{sr.date}</span>
                <button
                  onClick={() => addToast(`Downloading report ${sr.id}...`)}
                  className="px-3 py-1.5 rounded-lg border border-[#DEE7DC] text-[#165A36] text-[12px] font-semibold hover:bg-[#EAF4E6]"
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

  // Default Fallback Subpage
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-8 shadow-2xs text-center max-w-lg mx-auto my-12">
        <div className="w-14 h-14 rounded-2xl bg-[#EAF4E6] text-[#13884D] flex items-center justify-center mx-auto mb-4">
          <BarChart3 size={28} />
        </div>
        <h2 className="text-[20px] font-bold text-[#172B24] capitalize">
          Admin {adminActiveTab} Module
        </h2>
        <p className="text-[13px] text-[#65786D] mt-2 leading-relaxed">
          Platform administrative data for {adminActiveTab} is synchronizing with real-time farm records.
        </p>
        <button
          onClick={() => setAdminActiveTab('dashboard')}
          className="mt-5 px-5 py-2.5 rounded-xl bg-[#13884D] text-white font-medium text-[13px] hover:bg-[#10703F] transition-colors cursor-pointer"
        >
          Return to Admin Dashboard
        </button>
      </div>
    </div>
  );
};
