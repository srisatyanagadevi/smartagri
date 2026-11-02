import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Plus,
  Search,
  ChevronDown,
  Home,
  ExternalLink,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Farm } from '../../types/index.ts';

export const MyFarmPage: React.FC = () => {
  const { farms, setIsAddFarmOpen, setViewingFarm, setEditingFarm, deleteFarm } =
    useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('All');

  // Filter farms by search and crop
  const filteredFarms = farms.filter((farm) => {
    const matchesSearch =
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (farm.soilType && farm.soilType.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCrop =
      selectedCropFilter === 'All' ||
      farm.primaryCrop.toLowerCase() === selectedCropFilter.toLowerCase();

    return matchesSearch && matchesCrop;
  });

  const availableCrops = ['All', 'Rice', 'Maize', 'Tomato', 'Groundnut', 'Cotton'];

  const handleDelete = (farm: Farm) => {
    if (window.confirm(`Are you sure you want to remove "${farm.name}" from your farms?`)) {
      deleteFarm(farm.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Farm Management Card */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-7 shadow-2xs space-y-6">
        {/* Top Header Row with Title and Add Farm Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
            Farm Management
          </h2>

          <button
            onClick={() => setIsAddFarmOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#165A36] text-white hover:bg-[#124D2E] text-[13px] font-medium transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Farm</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8E9F94]">
              <Search size={15} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by farm or location..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] placeholder-[#8E9F94] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* Crop Filter Dropdown */}
          <div className="relative self-start sm:self-auto">
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] font-medium focus:outline-none focus:border-[#165A36] cursor-pointer shadow-2xs"
            >
              <option value="All">All crops</option>
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Cotton">Cotton</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#7C8E82]">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* Farm Records Table */}
        <div className="overflow-x-auto border-t border-[#F0F5EE] -mx-6 lg:-mx-7 px-6 lg:px-7 pt-2">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#EAEFE8] text-[11px] font-semibold text-[#829187] uppercase tracking-wider">
                <th className="py-3 px-3">Farm</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Area</th>
                <th className="py-3 px-3">Primary Crop</th>
                <th className="py-3 px-3">Soil Type</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F1]">
              {filteredFarms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#829187]">
                    No farms match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredFarms.map((farm) => (
                  <tr
                    key={farm.id}
                    className="hover:bg-[#FAFDF9] transition-colors group"
                  >
                    {/* Farm Name with Icon */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#EDF5EA] text-[#175A36] border border-[#DCEAD7] flex items-center justify-center shrink-0">
                          <Home size={16} />
                        </div>
                        <span className="font-semibold text-[#172B24]">
                          {farm.name}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-3 text-[#55695E]">
                      {farm.location}
                    </td>

                    {/* Area */}
                    <td className="py-3.5 px-3 text-[#55695E] tabular-nums">
                      {farm.area} {farm.areaUnit}
                    </td>

                    {/* Primary Crop */}
                    <td className="py-3.5 px-3 font-medium text-[#172B24]">
                      {farm.primaryCrop}
                    </td>

                    {/* Soil Type */}
                    <td className="py-3.5 px-3 text-[#55695E]">
                      {farm.soilType}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EAF4E6] text-[#245B37]">
                        {farm.status}
                      </span>
                    </td>

                    {/* Action Buttons: View, Edit, Delete */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-2 text-[#829187]">
                        <button
                          onClick={() => setViewingFarm(farm)}
                          className="p-1 rounded hover:text-[#165A36] hover:bg-[#F2F7F1] transition-colors"
                          title="View Details"
                        >
                          <ExternalLink size={15} />
                        </button>
                        <button
                          onClick={() => setEditingFarm(farm)}
                          className="p-1 rounded hover:text-[#165A36] hover:bg-[#F2F7F1] transition-colors"
                          title="Edit Farm"
                        >
                          <Settings size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(farm)}
                          className="p-1 rounded hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Farm"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#F0F5EE] text-[12px] text-[#829187]">
          <span>
            Showing {filteredFarms.length} of {farms.length} farms
          </span>

          <div className="flex items-center gap-1">
            <button
              disabled
              className="p-1.5 rounded-md border border-[#E3EAE1] text-[#A2B1A7] disabled:opacity-50 cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 rounded-md bg-[#165A36] text-white text-[12px] font-medium flex items-center justify-center shadow-2xs">
              1
            </button>
            <button
              disabled
              className="p-1.5 rounded-md border border-[#E3EAE1] text-[#A2B1A7] disabled:opacity-50 cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
