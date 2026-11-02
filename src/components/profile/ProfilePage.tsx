import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Check, ShieldAlert } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, addToast } = useApp();

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.mobile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Enter a valid email address';
    if (!mobile.trim() || mobile.length < 8) newErrors.mobile = 'Enter a valid contact number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
      });
      setIsSaving(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Card matching Reference 6 */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-8 shadow-2xs space-y-6">
        {/* Title */}
        <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
          My profile
        </h2>

        {/* Farmer Header Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#DFEADA] text-[#1E5E36] font-semibold text-[18px] flex items-center justify-center shrink-0 border border-[#CEE0C7]">
            {profile.initials || 'RK'}
          </div>

          <div>
            <h3 className="text-[17px] font-semibold text-[#172B24]">
              {profile.fullName}
            </h3>
            <p className="text-[12px] text-[#829187] mt-0.5">
              {profile.community}
            </p>
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="border-t border-[#F0F5EE]" />

        {/* Form Grid */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-[12px] font-semibold text-[#172B24] mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
              />
              {errors.mobile && (
                <p className="text-[11px] text-red-600 mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* User Role (Read Only) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#172B24]">
                  User Role
                </label>
                <span className="text-[10px] text-[#829187]">Managed by system</span>
              </div>
              <input
                type="text"
                disabled
                value={profile.role}
                className="w-full px-3.5 py-2.5 bg-[#F8FAF7] border border-[#E1E9DF] rounded-lg text-[13px] text-[#7C8E82] cursor-not-allowed shadow-2xs select-none"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#165A36] text-white hover:bg-[#124D2E] text-[13px] font-medium transition-colors shadow-2xs cursor-pointer disabled:opacity-70 self-start"
            >
              <span>{isSaving ? 'Saving...' : 'Save changes'}</span>
              <Check size={15} />
            </button>

            <span className="text-[12px] text-[#829187]">
              Changes saved to your account profile.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
