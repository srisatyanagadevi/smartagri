import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Modal } from '../common/Modal.tsx';
import { Farm } from '../../types/index.ts';

export const AddFarmModal: React.FC = () => {
  const { isAddFarmOpen, setIsAddFarmOpen, addFarm } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: '',
    state: 'Andhra Pradesh',
    area: '',
    areaUnit: 'Acres',
    primaryCrop: 'Rice',
    soilType: 'Alluvial',
    status: 'Active' as 'Active' | 'Inactive',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Farm name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.area || isNaN(Number(formData.area)) || Number(formData.area) <= 0) {
      newErrors.area = 'Enter a valid area in acres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addFarm({
      name: formData.name.trim(),
      location: formData.location.trim(),
      district: formData.district.trim() || formData.location.trim(),
      state: formData.state,
      area: Number(formData.area),
      areaUnit: formData.areaUnit,
      primaryCrop: formData.primaryCrop,
      soilType: formData.soilType,
      status: formData.status,
      description: formData.description.trim(),
    });

    setIsAddFarmOpen(false);
    // Reset form
    setFormData({
      name: '',
      location: '',
      district: '',
      state: 'Andhra Pradesh',
      area: '',
      areaUnit: 'Acres',
      primaryCrop: 'Rice',
      soilType: 'Alluvial',
      status: 'Active',
      description: '',
    });
    setErrors({});
  };

  return (
    <Modal
      isOpen={isAddFarmOpen}
      onClose={() => setIsAddFarmOpen(false)}
      title="Add New Farm"
      subtitle="Register a new agricultural plot to your SmartAgri workspace."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Farm Name */}
        <div>
          <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
            Farm Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Green Valley Farm"
            className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
          />
          {errors.name && (
            <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Location & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
              Location / Village <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. East Godavari"
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
            />
            {errors.location && (
              <p className="text-[11px] text-red-600 mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
            />
          </div>
        </div>

        {/* Area & Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
              Farm Area (Acres) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.5"
              min="0.1"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="e.g. 12"
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
            />
            {errors.area && (
              <p className="text-[11px] text-red-600 mt-1">{errors.area}</p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
              Soil Type
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
            >
              <option value="Alluvial">Alluvial</option>
              <option value="Black soil">Black soil</option>
              <option value="Loamy">Loamy</option>
              <option value="Red sandy">Red sandy</option>
              <option value="Clay">Clay loam</option>
            </select>
          </div>
        </div>

        {/* Primary Crop & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
              Primary Crop
            </label>
            <select
              value={formData.primaryCrop}
              onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
            >
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Cotton">Cotton</option>
              <option value="Chilli">Chilli</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })
              }
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
            Description &amp; Soil Notes
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Field orientation, irrigation facilities, boundaries..."
            className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAEFE9]">
          <button
            type="button"
            onClick={() => setIsAddFarmOpen(false)}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#5E7266] hover:bg-[#F2F7F1] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg text-[13px] font-medium bg-[#165A36] text-white hover:bg-[#124D2E] transition-colors shadow-2xs"
          >
            Save Farm
          </button>
        </div>
      </form>
    </Modal>
  );
};
