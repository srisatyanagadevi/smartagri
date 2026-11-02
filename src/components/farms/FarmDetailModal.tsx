import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Modal } from '../common/Modal.tsx';
import { Farm } from '../../types/index.ts';

export const FarmDetailModal: React.FC = () => {
  const { viewingFarm, setViewingFarm, editingFarm, setEditingFarm, updateFarm, deleteFarm } =
    useApp();

  const [formData, setFormData] = useState<Partial<Farm>>({});

  useEffect(() => {
    if (editingFarm) {
      setFormData(editingFarm);
    }
  }, [editingFarm]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFarm) return;
    updateFarm(editingFarm.id, formData);
    setEditingFarm(null);
  };

  const handleDelete = () => {
    if (editingFarm && window.confirm(`Are you sure you want to delete ${editingFarm.name}?`)) {
      deleteFarm(editingFarm.id);
      setEditingFarm(null);
    }
  };

  if (viewingFarm) {
    return (
      <Modal
        isOpen={Boolean(viewingFarm)}
        onClose={() => setViewingFarm(null)}
        title={viewingFarm.name}
        subtitle={`Location: ${viewingFarm.location} · ${viewingFarm.area} ${viewingFarm.areaUnit}`}
      >
        <div className="space-y-4 text-[13px]">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F6FAF4] border border-[#DEEADE]">
            <div>
              <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Primary Crop</p>
              <p className="font-medium text-[#172B24] mt-0.5">{viewingFarm.primaryCrop}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Soil Type</p>
              <p className="font-medium text-[#172B24] mt-0.5">{viewingFarm.soilType}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Total Area</p>
              <p className="font-medium text-[#172B24] mt-0.5">
                {viewingFarm.area} {viewingFarm.areaUnit}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6C8074] uppercase">Status</p>
              <span className="inline-flex items-center px-2 py-0.5 mt-0.5 rounded-full text-[11px] font-medium bg-[#EAF4E6] text-[#245B37]">
                ● {viewingFarm.status}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#172B24] mb-1">Description &amp; Soil Profile</h4>
            <p className="text-[#55695E] leading-relaxed">
              {viewingFarm.description || 'No specific notes recorded for this plot.'}
            </p>
          </div>

          {viewingFarm.coordinates && (
            <div>
              <h4 className="font-semibold text-[#172B24] mb-1">GPS Coordinates</h4>
              <p className="font-mono text-[12px] text-[#697E72]">{viewingFarm.coordinates}</p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-[#EAEFE9]">
            <button
              onClick={() => setViewingFarm(null)}
              className="px-4 py-2 rounded-lg bg-[#165A36] text-white hover:bg-[#124D2E] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  if (editingFarm) {
    return (
      <Modal
        isOpen={Boolean(editingFarm)}
        onClose={() => setEditingFarm(null)}
        title={`Edit ${editingFarm.name}`}
        subtitle="Update farm details, acreage and soil attributes."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Farm Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={formData.area || ''}
                onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Primary Crop</label>
              <select
                value={formData.primaryCrop || 'Rice'}
                onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
              >
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Tomato">Tomato</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Soil Type</label>
              <select
                value={formData.soilType || 'Alluvial'}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
              >
                <option value="Alluvial">Alluvial</option>
                <option value="Black soil">Black soil</option>
                <option value="Loamy">Loamy</option>
                <option value="Red sandy">Red sandy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Status</label>
            <select
              value={formData.status || 'Active'}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })
              }
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EAEFE9]">
            <button
              type="button"
              onClick={handleDelete}
              className="text-[12px] font-medium text-red-600 hover:text-red-700 hover:underline"
            >
              Delete Farm
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingFarm(null)}
                className="px-4 py-2 rounded-lg text-[13px] text-[#607468] hover:bg-[#F2F7F1]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#165A36] text-white hover:bg-[#124D2E] text-[13px] font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }

  return null;
};
