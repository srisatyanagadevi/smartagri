import React from 'react';
import { useApp } from '../../context/AppContext.tsx';

export const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences } = useApp();

  const handleToggle = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  return (
    <div className="space-y-6">
      {/* Main Settings Card matching Reference 7 */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-8 shadow-2xs space-y-6">
        {/* Header Block */}
        <div>
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
            Notification preferences
          </h2>
          <p className="text-[13px] text-[#7C8E82] mt-1">
            Choose what you'd like to hear about in your workspace notifications.
          </p>
        </div>

        {/* 3 Preference Rows */}
        <div className="space-y-6 pt-2">
          {/* Row 1: Market updates */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                Market updates
              </h3>
              <p className="text-[13px] text-[#7C8E82] mt-0.5">
                Price changes and market information for your crops.
              </p>
            </div>

            {/* Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={preferences.marketUpdates}
              onClick={() => handleToggle('marketUpdates')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#165A36]/30 ${
                preferences.marketUpdates ? 'bg-[#165A36]' : 'bg-[#E3EBE1]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  preferences.marketUpdates ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="border-t border-[#F0F5EE]" />

          {/* Row 2: Harvest reminders */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                Harvest reminders
              </h3>
              <p className="text-[13px] text-[#7C8E82] mt-0.5">
                Helpful reminders as your expected harvest date approaches.
              </p>
            </div>

            {/* Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={preferences.harvestReminders}
              onClick={() => handleToggle('harvestReminders')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#165A36]/30 ${
                preferences.harvestReminders ? 'bg-[#165A36]' : 'bg-[#E3EBE1]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  preferences.harvestReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="border-t border-[#F0F5EE]" />

          {/* Row 3: Report updates */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[#172B24]">
                Report updates
              </h3>
              <p className="text-[13px] text-[#7C8E82] mt-0.5">
                Let me know when a new farm summary is available.
              </p>
            </div>

            {/* Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={preferences.reportUpdates}
              onClick={() => handleToggle('reportUpdates')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#165A36]/30 ${
                preferences.reportUpdates ? 'bg-[#165A36]' : 'bg-[#E3EBE1]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  preferences.reportUpdates ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
