import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Modal } from '../common/Modal.tsx';

export const AddCropModal: React.FC = () => {
  const { isAddCropOpen, setIsAddCropOpen, addCrop, farms } = useApp();

  const [name, setName] = useState('Rice');
  const [farmId, setFarmId] = useState(farms[0]?.id || '');
  const [status, setStatus] = useState<'Growing' | 'Ready' | 'Completed'>('Growing');
  const [plantedDate, setPlantedDate] = useState('15 Sep 2026');
  const [harvestDate, setHarvestDate] = useState('15 Dec 2026');
  const [cultivatedArea, setCultivatedArea] = useState('4 Acres');
  const [healthStatus, setHealthStatus] = useState<'Excellent' | 'Good' | 'Needs Attention'>('Excellent');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedFarm = farms.find((f) => f.id === farmId) || farms[0];
    const farmName = selectedFarm ? selectedFarm.name : 'Green Valley Farm';

    addCrop({
      name,
      farmId: selectedFarm?.id || 'farm-1',
      farmName,
      status,
      plantedDate,
      harvestDate,
      cultivatedArea,
      healthStatus,
      notes,
    });

    setIsAddCropOpen(false);
  };

  return (
    <Modal
      isOpen={isAddCropOpen}
      onClose={() => setIsAddCropOpen(false)}
      title="Add Crop Record"
      subtitle="Register a new crop batch for seasonal management and yield forecasting."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Crop Type</label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            >
              <option value="Rice">Rice</option>
              <option value="Maize">Maize</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Cotton">Cotton</option>
              <option value="Chilli">Chilli</option>
              <option value="Wheat">Wheat</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Target Farm</label>
            <select
              value={farmId}
              onChange={(e) => setFarmId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            >
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Growth Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            >
              <option value="Growing">Growing</option>
              <option value="Ready">Ready for harvest</option>
              <option value="Completed">Completed / Harvested</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Cultivated Area</label>
            <input
              type="text"
              value={cultivatedArea}
              onChange={(e) => setCultivatedArea(e.target.value)}
              placeholder="e.g. 4 Acres"
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Planted Date</label>
            <input
              type="text"
              value={plantedDate}
              onChange={(e) => setPlantedDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Expected Harvest</label>
            <input
              type="text"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Crop Health Condition</label>
          <select
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value as any)}
            className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Needs Attention">Needs Attention</option>
          </select>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#172B24] mb-1">Field Notes</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Seed cultivar, pest management, expected yield..."
            className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAEFE9]">
          <button
            type="button"
            onClick={() => setIsAddCropOpen(false)}
            className="px-4 py-2 rounded-lg text-[13px] text-[#5E7266] hover:bg-[#F2F7F1]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg text-[13px] font-medium bg-[#165A36] text-white hover:bg-[#124D2E]"
          >
            Save Crop
          </button>
        </div>
      </form>
    </Modal>
  );
};
