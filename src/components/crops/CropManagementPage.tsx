import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { CropIcon } from '../common/CropIcon.tsx';
import { ChevronDown, Home, Plus } from 'lucide-react';
import { Crop } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';

export const CropManagementPage: React.FC = () => {
  const { crops, setIsAddCropOpen, updateCrop, deleteCrop, setActivePage } = useApp();
  const [filterType, setFilterType] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const filteredCrops = crops.filter((crop) => {
    if (filterType === 'All') return true;
    return crop.name.toLowerCase() === filterType.toLowerCase();
  });

  const getStatusBadge = (status: Crop['status']) => {
    if (status === 'Ready') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFF5E5] text-[#9A6218]">
          Ready
        </span>
      );
    }
    if (status === 'Completed') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F0F2F1] text-[#5F6E66]">
          Completed
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#EAF4E6] text-[#2C6B37]">
        Growing
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Crops Card matching Reference 3 */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-7 shadow-2xs space-y-6">
        {/* Top Header Row with Title and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
              Your crops
            </h2>
            <button
              onClick={() => setIsAddCropOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DEE7DC] text-[12px] font-medium text-[#165A36] bg-[#FAFDF9] hover:bg-[#F2F7F1] transition-colors"
            >
              <Plus size={14} />
              <span>Add crop</span>
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative self-start sm:self-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] font-medium focus:outline-none focus:border-[#165A36] cursor-pointer shadow-2xs"
            >
              <option value="All">All crops</option>
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#7C8E82]">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* 4-column crop card grid matching Reference 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              className="bg-white rounded-2xl border border-[#E3EAE1] p-4.5 hover:border-[#CADAC5] transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Top icon and status badge */}
                <div className="flex items-start justify-between mb-3">
                  <CropIcon name={crop.name} size="md" />
                  {getStatusBadge(crop.status)}
                </div>

                {/* Crop Name */}
                <h3 className="text-[15px] font-semibold text-[#172B24]">
                  {crop.name}
                </h3>

                {/* Planted and Harvest Dates */}
                <div className="space-y-1.5 mt-3 text-[11px] text-[#7C8E82]">
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

              {/* Bottom Associated Farm Link */}
              <div className="pt-3.5 mt-3.5 border-t border-[#F0F5EE] flex items-center gap-1.5 text-[11px] text-[#7C8E82] group-hover:text-[#165A36] transition-colors">
                <Home size={13} className="shrink-0 text-[#8FA095]" />
                <span className="truncate">{crop.farmName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail / Action modal when clicking a crop */}
      {selectedCrop && (
        <Modal
          isOpen={Boolean(selectedCrop)}
          onClose={() => setSelectedCrop(null)}
          title={`${selectedCrop.name} Batch Details`}
          subtitle={`Planted on ${selectedCrop.farmName}`}
        >
          <div className="space-y-4 text-[13px]">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F6FAF4] border border-[#DEEADE]">
              <div>
                <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Status</p>
                <div className="mt-1">{getStatusBadge(selectedCrop.status)}</div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Cultivated Area</p>
                <p className="font-medium text-[#172B24] mt-1">{selectedCrop.cultivatedArea || '4 Acres'}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Sowing Date</p>
                <p className="font-medium text-[#172B24] mt-1">{selectedCrop.plantedDate}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Expected Harvest</p>
                <p className="font-medium text-[#172B24] mt-1">{selectedCrop.harvestDate}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#6C8074] uppercase mb-1">Growth Stage</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    updateCrop(selectedCrop.id, { status: 'Growing' });
                    setSelectedCrop({ ...selectedCrop, status: 'Growing' });
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    selectedCrop.status === 'Growing'
                      ? 'bg-[#165A36] text-white border-[#165A36]'
                      : 'border-[#DEE7DC] text-[#3E5246] hover:bg-[#F2F7F1]'
                  }`}
                >
                  Growing
                </button>
                <button
                  onClick={() => {
                    updateCrop(selectedCrop.id, { status: 'Ready' });
                    setSelectedCrop({ ...selectedCrop, status: 'Ready' });
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    selectedCrop.status === 'Ready'
                      ? 'bg-[#E08A1E] text-white border-[#E08A1E]'
                      : 'border-[#DEE7DC] text-[#3E5246] hover:bg-[#F2F7F1]'
                  }`}
                >
                  Ready for harvest
                </button>
                <button
                  onClick={() => {
                    updateCrop(selectedCrop.id, { status: 'Completed' });
                    setSelectedCrop({ ...selectedCrop, status: 'Completed' });
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    selectedCrop.status === 'Completed'
                      ? 'bg-[#5F6E66] text-white border-[#5F6E66]'
                      : 'border-[#DEE7DC] text-[#3E5246] hover:bg-[#F2F7F1]'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {selectedCrop.notes && (
              <div>
                <p className="text-[11px] font-semibold text-[#6C8074] uppercase mb-1">Crop Notes</p>
                <p className="text-[#55695E] leading-relaxed bg-[#FAFDF9] p-3 rounded-lg border border-[#E9EFE7]">
                  {selectedCrop.notes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#EAEFE9]">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Archive crop record for ${selectedCrop.name}?`)) {
                    deleteCrop(selectedCrop.id);
                    setSelectedCrop(null);
                  }
                }}
                className="text-[12px] font-medium text-red-600 hover:underline"
              >
                Archive Record
              </button>

              <button
                type="button"
                onClick={() => setSelectedCrop(null)}
                className="px-4 py-2 rounded-lg bg-[#165A36] text-white text-[13px] font-medium hover:bg-[#124D2E]"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
