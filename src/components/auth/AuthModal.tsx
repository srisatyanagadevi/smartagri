import React, { useState, useId } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  X,
  Check,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Copy,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser,
    showCenteredNotification,
    profile,
  } = useApp();

  // Registration Form State
  const [role, setRole] = useState<'Farmer' | 'Agricultural User'>('Farmer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState(profile?.email || '');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  if (!isAuthModalOpen) return null;

  // 5 Live Criteria evaluation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  const criteriaCount = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  // Password strength calculation
  const getStrengthInfo = () => {
    if (password.length === 0) {
      return {
        label: 'Enter password',
        color: 'bg-gray-200',
        textColor: 'text-gray-400',
        width: '0%',
        level: 'none',
      };
    }
    if (criteriaCount <= 2) {
      return {
        label: 'Weak',
        color: 'bg-red-500',
        textColor: 'text-red-600',
        width: '33%',
        level: 'weak',
      };
    }
    if (criteriaCount >= 3 && criteriaCount <= 4) {
      return {
        label: 'Moderate',
        color: 'bg-amber-500',
        textColor: 'text-amber-600',
        width: '66%',
        level: 'moderate',
      };
    }
    return {
      label: 'Strong & Verified',
      color: 'bg-[#165A36]',
      textColor: 'text-[#165A36]',
      width: '100%',
      level: 'strong',
    };
  };

  const strength = getStrengthInfo();
  const isPasswordStrong = criteriaCount === 5;
  const isMatch = password.length > 0 && password === confirmPassword;

  // Suggest Strong Password generator
  const handleSuggestPassword = () => {
    const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijkmnpqrstuvwxyz';
    const numberChars = '23456789';
    const specialChars = '!@#$%^&*';
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

    // Guarantee each requirement is present
    let generated = [
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
      numberChars[Math.floor(Math.random() * numberChars.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    ];

    // Pad to 14 characters
    while (generated.length < 14) {
      generated.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle characters
    generated = generated.sort(() => 0.5 - Math.random());
    const finalPassword = generated.join('');

    setPassword(finalPassword);
    setConfirmPassword(finalPassword);
    setShowPassword(true);
    setShowConfirmPassword(true);
    setCopiedPassword(false);
  };

  // Copy password to clipboard
  const handleCopyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2500);
  };

  // Handle Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please enter a valid email address';
    if (!mobile.trim() || mobile.length < 8) errors.mobile = 'Please enter a valid mobile number';
    if (!isPasswordStrong) errors.password = 'Password must satisfy all 5 security criteria';
    if (!isMatch) errors.confirmPassword = 'Passwords do not match';
    if (!agreedTerms) errors.terms = 'You must agree to the SmartAgri terms';

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    setRegErrors({});

    // Register user profile
    registerUser({
      fullName: fullName.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      role: role,
    });

    // Post-Registration Transition:
    // 1. Show centered notification popup
    // 2. Pre-fill login email
    // 3. Switch tab to Sign In
    setLoginEmail(email.trim());
    setLoginPassword(password);

    showCenteredNotification({
      title: 'Account Created Successfully!',
      message: `Welcome to SmartAgri, ${fullName.trim()}! Your account has been registered with verified high-entropy security credentials. You can now sign in to access your farmer workspace.`,
      type: 'success',
      actionLabel: 'Sign In to Workspace',
      onAction: () => {
        setAuthModalMode('signin');
      },
    });

    // Switch view to sign in
    setAuthModalMode('signin');
  };

  // Handle Sign In Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please provide both email and password');
      return;
    }

    setLoginError('');
    const success = loginUser(loginEmail.trim(), loginPassword);

    if (success) {
      closeAuthModal();
      showCenteredNotification({
        title: 'Welcome to SmartAgri!',
        message: `Glad to have you back, ${profile.fullName || 'Farmer'}! Your dashboard and crop management modules are ready.`,
        type: 'success',
        actionLabel: 'Go to Dashboard',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[520px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#DCE8D8] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 pt-6 pb-4 bg-[#F8FAF7] border-b border-[#E7EFE4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#165A36] text-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#172B24] tracking-tight">
                Smart<span className="text-[#165A36]">Agri.</span>
              </h2>
              <p className="text-[11px] text-[#788C80]">
                Smart Agriculture Management System
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#788C80] hover:text-[#172B24] hover:bg-[#EAEFE8] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-1 border-b border-[#EAEFE7] flex gap-4">
          <button
            onClick={() => setAuthModalMode('register')}
            className={`pb-2.5 text-[13px] font-semibold transition-colors relative cursor-pointer ${
              authModalMode === 'register'
                ? 'text-[#165A36]'
                : 'text-[#6B7E73] hover:text-[#172B24]'
            }`}
          >
            <span>Create Account</span>
            {authModalMode === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#165A36] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setAuthModalMode('signin')}
            className={`pb-2.5 text-[13px] font-semibold transition-colors relative cursor-pointer ${
              authModalMode === 'signin'
                ? 'text-[#165A36]'
                : 'text-[#6B7E73] hover:text-[#172B24]'
            }`}
          >
            <span>Sign In</span>
            {authModalMode === 'signin' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#165A36] rounded-full" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {authModalMode === 'register' ? (
            /* =================== CREATE ACCOUNT FORM =================== */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-[#172B24] uppercase tracking-wider mb-1.5">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRole('Farmer')}
                    className={`py-2 px-3 rounded-xl border text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      role === 'Farmer'
                        ? 'border-[#165A36] bg-[#EAF4E6] text-[#165A36] shadow-2xs font-semibold'
                        : 'border-[#E0E7DE] bg-white text-[#55695E] hover:border-[#CAD8C7]'
                    }`}
                  >
                    <span>🌾 Farmer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Agricultural User')}
                    className={`py-2 px-3 rounded-xl border text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      role === 'Agricultural User'
                        ? 'border-[#165A36] bg-[#EAF4E6] text-[#165A36] shadow-2xs font-semibold'
                        : 'border-[#E0E7DE] bg-white text-[#55695E] hover:border-[#CAD8C7]'
                    }`}
                  >
                    <span>🔬 Agri Professional</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ravi Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] text-[#172B24] placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
                  />
                </div>
                {regErrors.fullName && (
                  <p className="text-[11px] text-red-600 mt-1">{regErrors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. ravi.kumar@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] text-[#172B24] placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
                  />
                </div>
                {regErrors.email && (
                  <p className="text-[11px] text-red-600 mt-1">{regErrors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] text-[#172B24] placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
                  />
                </div>
                {regErrors.mobile && (
                  <p className="text-[11px] text-red-600 mt-1">{regErrors.mobile}</p>
                )}
              </div>

              {/* Password Section with Strong Verification & Generation */}
              <div className="space-y-2 pt-1 border-t border-[#EDF3EC]">
                <div className="flex items-center justify-between">
                  <label className="block text-[12px] font-semibold text-[#172B24]">
                    Password
                  </label>

                  {/* Suggest Strong Password Button */}
                  <button
                    type="button"
                    onClick={handleSuggestPassword}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#165A36] hover:text-[#11472A] bg-[#EAF4E6] hover:bg-[#DEEED7] px-2.5 py-1 rounded-lg border border-[#CFE4C7] transition-all cursor-pointer shadow-2xs"
                  >
                    <Sparkles size={13} className="text-[#1E7342]" />
                    <span>Suggest Strong Password</span>
                  </button>
                </div>

                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-18 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] font-mono text-[#172B24] placeholder:font-sans placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1">
                    {password && (
                      <button
                        type="button"
                        onClick={handleCopyPassword}
                        title="Copy password"
                        className="p-1 rounded text-[#788C80] hover:text-[#165A36] hover:bg-[#EAEFE8] transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 rounded text-[#788C80] hover:text-[#172B24] transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {copiedPassword && (
                  <p className="text-[11px] text-[#165A36] font-medium flex items-center gap-1">
                    <Check size={12} /> Copied suggested password to clipboard!
                  </p>
                )}

                {/* Password Strength Meter */}
                <div className="bg-[#F8FAF7] rounded-xl p-3 border border-[#E3EAE1] space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#55695E] font-medium">Password Strength:</span>
                    <span className={`font-semibold ${strength.textColor} flex items-center gap-1`}>
                      {strength.level === 'strong' && <ShieldCheck size={13} />}
                      {strength.label}
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-1.5 bg-[#E6ECE4] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>

                  {/* Live 5-Criteria Verification Checklist */}
                  <div className="pt-1.5 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#788C80]">
                      Live 5-Criteria Verification:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                      {/* Criterion 1 */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                            hasMinLength
                              ? 'bg-[#165A36] text-white font-bold'
                              : 'border border-[#B5C5BA] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className={hasMinLength ? 'text-[#165A36] font-medium' : 'text-[#788C80]'}>
                          At least 8 characters
                        </span>
                      </div>

                      {/* Criterion 2 */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                            hasUppercase
                              ? 'bg-[#165A36] text-white font-bold'
                              : 'border border-[#B5C5BA] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className={hasUppercase ? 'text-[#165A36] font-medium' : 'text-[#788C80]'}>
                          One uppercase letter (A-Z)
                        </span>
                      </div>

                      {/* Criterion 3 */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                            hasLowercase
                              ? 'bg-[#165A36] text-white font-bold'
                              : 'border border-[#B5C5BA] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className={hasLowercase ? 'text-[#165A36] font-medium' : 'text-[#788C80]'}>
                          One lowercase letter (a-z)
                        </span>
                      </div>

                      {/* Criterion 4 */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                            hasNumber
                              ? 'bg-[#165A36] text-white font-bold'
                              : 'border border-[#B5C5BA] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className={hasNumber ? 'text-[#165A36] font-medium' : 'text-[#788C80]'}>
                          At least one number (0-9)
                        </span>
                      </div>

                      {/* Criterion 5 */}
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                            hasSpecial
                              ? 'bg-[#165A36] text-white font-bold'
                              : 'border border-[#B5C5BA] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className={hasSpecial ? 'text-[#165A36] font-medium' : 'text-[#788C80]'}>
                          One special symbol (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] font-mono text-[#172B24] placeholder:font-sans placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-[#788C80] hover:text-[#172B24] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {confirmPassword && (
                  <p
                    className={`text-[11px] mt-1 flex items-center gap-1 ${
                      isMatch ? 'text-[#165A36] font-medium' : 'text-red-600'
                    }`}
                  >
                    {isMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
                  </p>
                )}
                {regErrors.confirmPassword && (
                  <p className="text-[11px] text-red-600 mt-1">{regErrors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="smartagri-terms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#165A36] focus:ring-[#165A36]"
                />
                <label htmlFor="smartagri-terms" className="text-[11.5px] text-[#55695E] leading-snug">
                  I agree to the SmartAgri Terms of Service, agricultural data privacy policies, and verified farmer agreements.
                </label>
              </div>
              {regErrors.terms && (
                <p className="text-[11px] text-red-600">{regErrors.terms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isPasswordStrong || !isMatch || !agreedTerms}
                className="w-full py-3 px-4 rounded-xl bg-[#165A36] hover:bg-[#124D2E] text-white text-[13.5px] font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Create SmartAgri Account</span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-2">
                <p className="text-[12px] text-[#788C80]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('signin')}
                    className="text-[#165A36] font-semibold hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* =================== SIGN IN FORM =================== */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F5C6C6] text-[12px] text-red-700 flex items-center gap-2">
                  <ShieldAlert size={16} className="shrink-0 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-[12px] font-semibold text-[#172B24] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. ravi.kumar@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] text-[#172B24] placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[12px] font-semibold text-[#172B24]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3 text-[#788C80]" />
                  <input
                    type={loginShowPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAFDF9] border border-[#DEE7DC] rounded-xl text-[13px] text-[#172B24] placeholder:text-[#A0B0A7] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setLoginShowPassword(!loginShowPassword)}
                    className="absolute right-3 top-2.5 text-[#788C80] hover:text-[#172B24] transition-colors"
                  >
                    {loginShowPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember & Options */}
              <div className="flex items-center justify-between text-[12px]">
                <label className="flex items-center gap-2 cursor-pointer text-[#55695E]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#165A36] focus:ring-[#165A36]"
                  />
                  <span>Remember my login</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#165A36] hover:bg-[#124D2E] text-white text-[13.5px] font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Workspace</span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-2">
                <p className="text-[12px] text-[#788C80]">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('register')}
                    className="text-[#165A36] font-semibold hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
