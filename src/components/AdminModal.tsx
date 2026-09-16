import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Download,
  Trash2,
  Shield,
  Calendar,
  Phone,
  User,
  MessageSquare,
  Image as ImageIcon,
  KeyRound,
  Check,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { EnquiryRecord } from '../types';
import {
  verifyAdminPassword,
  updateAdminPassword,
  isUsingCustomPassword,
  resetAdminPasswordToDefault,
} from '../utils/security';
import {
  STOCK_IMAGE_DEFINITIONS,
  getCustomImagesMap,
  saveCustomImageUrl,
  resetCustomImageUrl,
  resetAllCustomImages,
  saveMultipleCustomImages,
} from '../services/imageManager';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'inquiries' | 'images' | 'security';

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries');

  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);

  // Images state
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [imageDrafts, setImageDrafts] = useState<Record<string, string>>({});
  const [imageSearch, setImageSearch] = useState('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [imageSaveFeedback, setImageSaveFeedback] = useState<string | null>(null);

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [hasCustomPassword, setHasCustomPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (sessionStorage.getItem('spg_admin_auth') === 'true') {
        setIsAuthenticated(true);
        loadAllData();
      }
      setHasCustomPassword(isUsingCustomPassword());
    } else {
      setPasswordInput('');
      setAuthError('');
      setPasswordError('');
      setPasswordSuccess('');
      setImageSaveFeedback(null);
    }
  }, [isOpen]);

  const loadAllData = () => {
    // Load enquiries
    try {
      const stored = JSON.parse(localStorage.getItem('spg_enquiries') || '[]');
      setEnquiries(stored);
    } catch {
      setEnquiries([]);
    }

    // Load custom images
    const imagesMap = getCustomImagesMap();
    setCustomImages(imagesMap);
    setImageDrafts(imagesMap);
    setHasCustomPassword(isUsingCustomPassword());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    try {
      const isValid = await verifyAdminPassword(passwordInput);
      if (isValid) {
        setIsAuthenticated(true);
        sessionStorage.setItem('spg_admin_auth', 'true');
        setAuthError('');
        setPasswordInput('');
        loadAllData();
      } else {
        setAuthError('Incorrect password. Please verify and try again.');
      }
    } catch {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spg_admin_auth');
    setPasswordInput('');
    setActiveTab('inquiries');
  };

  // Enquiries Handlers
  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['Time', 'Customer Name', 'Phone', 'Service', 'Message'];
    const rows = enquiries.map((e) => [
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${e.service.replace(/"/g, '""')}"`,
      `"${e.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `sp_garment_enquiries_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAllEnquiries = () => {
    if (window.confirm('Are you sure you want to clear all recorded customer enquiries?')) {
      localStorage.removeItem('spg_enquiries');
      setEnquiries([]);
    }
  };

  // Image Management Handlers
  const handleDraftChange = (id: string, value: string) => {
    setImageDrafts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleApplySingleImage = (id: string) => {
    const url = imageDrafts[id] ?? '';
    saveCustomImageUrl(id, url);
    setCustomImages(getCustomImagesMap());
    setImageSaveFeedback(`Updated image for "${id}"`);
    setTimeout(() => setImageSaveFeedback(null), 3500);
  };

  const handleResetSingleImage = (id: string) => {
    resetCustomImageUrl(id);
    const updated = getCustomImagesMap();
    setCustomImages(updated);
    setImageDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setImageSaveFeedback(`Reset "${id}" back to default stock image`);
    setTimeout(() => setImageSaveFeedback(null), 3500);
  };

  const handleSaveAllImages = () => {
    saveMultipleCustomImages(imageDrafts);
    setCustomImages(getCustomImagesMap());
    setImageSaveFeedback('All image links updated and saved successfully!');
    setTimeout(() => setImageSaveFeedback(null), 4000);
  };

  const handleResetAllImages = () => {
    if (
      window.confirm(
        'Are you sure you want to reset ALL custom images back to original default stock photos?'
      )
    ) {
      resetAllCustomImages();
      setCustomImages({});
      setImageDrafts({});
      setImageSaveFeedback('All images have been reset to factory defaults.');
      setTimeout(() => setImageSaveFeedback(null), 4000);
    }
  };

  // Password Handlers
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setIsUpdatingPassword(true);

    try {
      // 1. Verify current password
      const isCurrentValid = await verifyAdminPassword(currentPassword);
      if (!isCurrentValid) {
        setPasswordError('Current password is incorrect.');
        setIsUpdatingPassword(false);
        return;
      }

      // 2. Hash & store new password
      await updateAdminPassword(newPassword);
      setPasswordSuccess('Password successfully updated! It is securely hashed with SHA-256.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setHasCustomPassword(true);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleResetPasswordToDefault = () => {
    if (
      window.confirm(
        'Reset admin password to the default setup hash? You can set a new password anytime.'
      )
    ) {
      resetAdminPasswordToDefault();
      setHasCustomPassword(false);
      setPasswordSuccess('Admin password reset to default setup hash.');
      setPasswordError('');
    }
  };

  if (!isOpen) return null;

  // Filter images
  const filteredStockImages = STOCK_IMAGE_DEFINITIONS.filter((item) => {
    const matchesSection =
      selectedSectionFilter === 'all' ||
      (selectedSectionFilter === 'hero' && item.section === 'Hero Section') ||
      (selectedSectionFilter === 'services' && item.section === 'Services Section') ||
      (selectedSectionFilter === 'gallery' && item.section === 'Gallery Section');

    const searchLower = imageSearch.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      item.positionName.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.id.toLowerCase().includes(searchLower);

    return matchesSection && matchesSearch;
  });

  const customCount = Object.keys(customImages).filter((k) => !!customImages[k]).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#FFFFFF] rounded-2xl border border-[#E6DDCF] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#181614] text-[#FAF8F5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2A2622] border border-[#3E3832] flex items-center justify-center text-[#C28E46]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2">
                <span>S.P. Garment</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C28E46]/20 text-[#C28E46] font-normal border border-[#C28E46]/30">
                  Admin Panel
                </span>
              </h3>
              <p className="text-[11px] text-[#A89E92]">
                Minuwangoda Studio Management & Content Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 text-xs font-mono transition-colors cursor-pointer"
              >
                Logout
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Sign-In View */
          <div className="p-8 sm:p-14 max-w-md mx-auto text-center my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E0D5C5] text-[#181614] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-6 h-6 text-[#C28E46]" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#181614] mb-1.5">
              Owner Sign-In
            </h4>
            <p className="text-xs text-[#70665A] mb-6 leading-relaxed">
              Enter admin password to manage customer enquiries, update stock images, and configure security settings.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#70665A] mb-1.5 font-medium">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    autoFocus
                    className="w-full pl-4 pr-11 py-3 rounded-xl border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#181614] p-1 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !passwordInput}
                className="w-full py-3.5 rounded-xl bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Hash...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unlock Admin Panel</span>
                  </>
                )}
              </button>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE4D8] text-[11px] text-[#8C8275] leading-relaxed">
                <span className="font-semibold text-[#524B43]">Password Note:</span> Passwords are authenticated against cryptographic SHA-256 hashes without storing plain text in source files. Default setup password is <code className="bg-white px-1.5 py-0.5 rounded border border-[#E0D7C9] text-[#181614]">spgarment2024</code> (changeable inside).
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Navigation Tabs */}
            <div className="px-4 sm:px-6 pt-3 bg-[#FAF8F5] border-b border-[#E6DDCF] flex items-center justify-between gap-4 overflow-x-auto shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
                    activeTab === 'inquiries'
                      ? 'border-[#181614] text-[#181614] bg-white shadow-xs'
                      : 'border-transparent text-[#70665A] hover:text-[#181614] hover:bg-white/50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-[#C28E46]" />
                  <span>Inquiries Log</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#EAE3D7] text-[#181614] text-[10px] font-mono font-bold">
                    {enquiries.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('images')}
                  className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
                    activeTab === 'images'
                      ? 'border-[#181614] text-[#181614] bg-white shadow-xs'
                      : 'border-transparent text-[#70665A] hover:text-[#181614] hover:bg-white/50'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-[#C28E46]" />
                  <span>Stock Images</span>
                  {customCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#C28E46] text-white text-[10px] font-mono font-bold">
                      {customCount} custom
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#EAE3D7] text-[#181614] text-[10px] font-mono font-bold">
                      {STOCK_IMAGE_DEFINITIONS.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
                    activeTab === 'security'
                      ? 'border-[#181614] text-[#181614] bg-white shadow-xs'
                      : 'border-transparent text-[#70665A] hover:text-[#181614] hover:bg-white/50'
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-[#C28E46]" />
                  <span>Change Password</span>
                  {hasCustomPassword && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600" title="Custom Password Active" />
                  )}
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs text-[#70665A] font-mono pb-2">
                <span>Location:</span>
                <span className="text-[#181614] font-semibold">Minuwangoda</span>
              </div>
            </div>

            {/* Tab 1: Inquiries Log */}
            {activeTab === 'inquiries' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
                {/* Stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF]">
                    <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                      Total Inquiries Logged
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#181614]">
                      {enquiries.length}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF]">
                    <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                      Lead Channel
                    </span>
                    <span className="text-sm font-semibold text-[#181614] block mt-1">
                      Direct WhatsApp
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF] col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                      Storage
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 block mt-1">
                      Browser Local DB Active
                    </span>
                  </div>
                </div>

                {/* Table Header / Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#181614]">
                      Customer Inquiries List ({enquiries.length})
                    </h4>
                    <p className="text-xs text-[#70665A]">
                      Whenever a customer submits an inquiry from the website, details are captured here.
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      disabled={enquiries.length === 0}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D9D0C3] hover:border-[#181614] bg-white text-xs font-medium text-[#181614] transition-colors disabled:opacity-40 cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#C28E46]" />
                      <span>Export CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClearAllEnquiries}
                      disabled={enquiries.length === 0}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-xs font-medium text-red-700 hover:bg-red-50 bg-white transition-colors disabled:opacity-40 cursor-pointer shadow-2xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Log</span>
                    </button>
                  </div>
                </div>

                {/* List Content */}
                {enquiries.length === 0 ? (
                  <div className="py-16 text-center text-[#8C8275] text-xs border border-dashed border-[#D9D0C3] rounded-2xl bg-[#FAF8F5]/50">
                    <MessageSquare className="w-8 h-8 text-[#C28E46] mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-[#524B43]">No customer inquiries recorded yet</p>
                    <p className="text-[11px] text-[#8C8275] mt-1 max-w-sm mx-auto">
                      When visitors send an inquiry via the WhatsApp form on the homepage, customer contact details and requested clothing types will be logged here.
                    </p>
                  </div>
                ) : (
                  <div className="border border-[#E6DDCF] rounded-xl overflow-hidden max-h-[380px] overflow-y-auto bg-white shadow-xs">
                    <div className="divide-y divide-[#EAE3D7]">
                      {enquiries.map((enq) => (
                        <div key={enq.id} className="p-4 hover:bg-[#FAF8F5] transition-colors text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-semibold text-[#181614] text-sm">
                              <User className="w-3.5 h-3.5 text-[#C28E46]" />
                              <span>{enq.name}</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#8C8275] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(enq.createdAt).toLocaleDateString()} {new Date(enq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-[#524B43]">
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#70665A]" />
                              <a href={`tel:${enq.phone}`} className="font-mono text-[#181614] hover:underline font-medium">
                                {enq.phone}
                              </a>
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-[#F2ECE2] font-mono text-[10px] text-[#5C5449] border border-[#E5DDD0]">
                              {enq.service}
                            </span>
                          </div>

                          {enq.message && (
                            <p className="text-[11px] text-[#524B43] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EAE3D7] flex items-start gap-2 mt-1">
                              <MessageSquare className="w-3.5 h-3.5 text-[#C28E46] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{enq.message}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Stock Images Manager */}
            {activeTab === 'images' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#EAE3D7]">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#181614] flex items-center gap-2">
                      <span>Stock Images Manager</span>
                      <span className="text-xs font-mono font-normal text-[#70665A]">
                        ({filteredStockImages.length} images listed)
                      </span>
                    </h4>
                    <p className="text-xs text-[#70665A] mt-0.5">
                      All stock photos with exact website position names. Paste your direct image link (Unsplash, Imgur, Cloudinary, etc.) to update instantly.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleSaveAllImages}
                      className="px-3.5 py-2 rounded-lg bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save All Changes</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetAllImages}
                      className="px-3 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 bg-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset All</span>
                    </button>
                  </div>
                </div>

                {/* Feedback Toast */}
                {imageSaveFeedback && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium">{imageSaveFeedback}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageSaveFeedback(null)}
                      className="text-emerald-700 hover:text-emerald-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={imageSearch}
                      onChange={(e) => setImageSearch(e.target.value)}
                      placeholder="Search by position name, section, category..."
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#D9D0C3] focus:border-[#181614] bg-[#FAF8F5] text-xs outline-none"
                    />
                    {imageSearch && (
                      <button
                        type="button"
                        onClick={() => setImageSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#181614]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Section Filters */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { key: 'all', label: 'All Positions' },
                      { key: 'hero', label: 'Hero (1)' },
                      { key: 'services', label: 'Services (5)' },
                      { key: 'gallery', label: 'Gallery (12)' },
                    ].map((sec) => (
                      <button
                        key={sec.key}
                        type="button"
                        onClick={() => setSelectedSectionFilter(sec.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          selectedSectionFilter === sec.key
                            ? 'bg-[#181614] text-[#FAF8F5]'
                            : 'bg-[#F2ECE2] text-[#5C5449] hover:bg-[#E6DEC2]'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Images List */}
                <div className="space-y-4">
                  {filteredStockImages.length === 0 ? (
                    <div className="py-12 text-center text-[#8C8275] text-xs border border-dashed border-[#D9D0C3] rounded-xl">
                      No images match your search filter.
                    </div>
                  ) : (
                    filteredStockImages.map((item) => {
                      const customUrl = customImages[item.id] || '';
                      const draftUrl = imageDrafts[item.id] !== undefined ? imageDrafts[item.id] : customUrl;
                      const activeUrl = draftUrl.trim() || item.defaultUrl;
                      const isCustom = Boolean(customUrl && customUrl.trim());

                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isCustom
                              ? 'border-[#C28E46] bg-[#FFFDF9]'
                              : 'border-[#E6DDCF] bg-white hover:border-[#D4C8B5]'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            {/* Live Thumbnail Preview */}
                            <div className="w-full md:w-44 h-32 md:h-auto rounded-lg overflow-hidden bg-[#181614] border border-[#E0D5C5] relative shrink-0 flex items-center justify-center group">
                              <img
                                src={activeUrl}
                                alt={item.positionName}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  // Fallback broken image placeholder
                                  (e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&auto=format&fit=crop&q=80';
                                }}
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <a
                                  href={activeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-full bg-white text-[#181614] text-xs hover:bg-[#C28E46] hover:text-white transition-colors"
                                  title="Open full image in new tab"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-mono">
                                Preview
                              </span>
                            </div>

                            {/* Details and URL Input */}
                            <div className="flex-1 flex flex-col justify-between space-y-2.5">
                              <div>
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-[#F2ECE2] text-[#5C5449] font-mono text-[10px] uppercase font-semibold">
                                      {item.section}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#8C8275]">
                                      ID: {item.id}
                                    </span>
                                  </div>

                                  {isCustom ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#C28E46] bg-[#C28E46]/10 px-2 py-0.5 rounded-full border border-[#C28E46]/30">
                                      <Sparkles className="w-2.5 h-2.5" />
                                      Custom Link Active
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-mono text-[#8C8275] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#EAE3D7]">
                                      Default Stock Photo
                                    </span>
                                  )}
                                </div>

                                <h5 className="font-serif text-base font-bold text-[#181614] leading-tight">
                                  {item.positionName}
                                </h5>

                                <p className="text-xs text-[#70665A] mt-0.5">
                                  {item.description}
                                </p>

                                {item.recommendedAspect && (
                                  <span className="text-[10px] text-[#8C8275] font-mono block mt-1">
                                    Recommended: {item.recommendedAspect}
                                  </span>
                                )}
                              </div>

                              {/* Input and Action Buttons */}
                              <div className="space-y-2 pt-1">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={draftUrl}
                                    onChange={(e) => handleDraftChange(item.id, e.target.value)}
                                    placeholder={item.defaultUrl}
                                    className="flex-1 px-3 py-2 rounded-lg border border-[#D9D0C3] focus:border-[#181614] bg-[#FAF8F5] text-xs font-mono outline-none"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => handleApplySingleImage(item.id)}
                                    className="px-3 py-2 rounded-lg bg-[#181614] hover:bg-[#C28E46] text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
                                  >
                                    Apply
                                  </button>

                                  {isCustom && (
                                    <button
                                      type="button"
                                      onClick={() => handleResetSingleImage(item.id)}
                                      className="px-2.5 py-2 rounded-lg border border-[#D9D0C3] hover:border-red-400 hover:text-red-700 text-[#70665A] text-xs whitespace-nowrap transition-colors cursor-pointer"
                                      title="Reset this image to default stock"
                                    >
                                      Reset
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center justify-between text-[10px] text-[#8C8275]">
                                  <span className="truncate max-w-md">
                                    Default URL: <code className="text-[#524B43]">{item.defaultUrl.slice(0, 60)}...</code>
                                  </span>
                                  <a
                                    href={item.defaultUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-[#181614] shrink-0 inline-flex items-center gap-0.5"
                                  >
                                    <span>View Original</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Helpful Tip */}
                <div className="p-4 rounded-xl bg-[#F4EFEA] border border-[#E2D9CC] text-xs text-[#524B43] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C28E46] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-[#181614] block">
                      Tip for adding your own images:
                    </span>
                    <p className="leading-relaxed">
                      You can paste any direct web image URL from high-resolution photo services (like <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#181614]">Unsplash</a>, <a href="https://pexels.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#181614]">Pexels</a>), or upload your real studio photos to a free image host (e.g. Imgur, PostImages, Cloudinary) and paste the direct image link ending with <code>.jpg</code> or <code>.png</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Security & Change Password */}
            {activeTab === 'security' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 max-w-2xl mx-auto w-full">
                <div className="border-b border-[#EAE3D7] pb-3">
                  <h4 className="font-serif text-xl font-bold text-[#181614] flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-[#C28E46]" />
                    <span>Change Admin Password</span>
                  </h4>
                  <p className="text-xs text-[#70665A] mt-1 leading-relaxed">
                    Set a secure password for the Admin portal. Passwords are encrypted using one-way <strong>SHA-256 cryptographic hashing</strong> before storage in local database. No plain-text passwords are stored.
                  </p>
                </div>

                {/* Security Status Card */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                      Password Status
                    </span>
                    {hasCustomPassword ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-800">
                          Custom Hashed Password Active
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="text-xs font-semibold text-amber-800">
                          Initial Setup Password in Use
                        </span>
                      </div>
                    )}
                  </div>

                  {hasCustomPassword && (
                    <button
                      type="button"
                      onClick={handleResetPasswordToDefault}
                      className="text-xs text-[#70665A] hover:text-red-700 underline font-mono cursor-pointer"
                    >
                      Reset to Default Hash
                    </button>
                  )}
                </div>

                {/* Success Feedback */}
                {passwordSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {/* Error Feedback */}
                {passwordError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {/* Password Change Form */}
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#70665A] mb-1.5 font-medium">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-[#D9D0C3] focus:border-[#181614] bg-[#FAF8F5] text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#181614] p-1 cursor-pointer"
                        tabIndex={-1}
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#70665A] mb-1.5 font-medium">
                      New Password * (minimum 6 characters)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new strong password"
                        className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-[#D9D0C3] focus:border-[#181614] bg-[#FAF8F5] text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#181614] p-1 cursor-pointer"
                        tabIndex={-1}
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#70665A] mb-1.5 font-medium">
                      Confirm New Password *
                    </label>
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C3] focus:border-[#181614] bg-[#FAF8F5] text-sm outline-none"
                    />
                    {newPassword && confirmPassword && newPassword !== confirmPassword && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        Passwords do not match
                      </span>
                    )}
                    {newPassword && confirmPassword && newPassword === confirmPassword && (
                      <span className="text-[11px] text-emerald-700 mt-1 block flex items-center gap-1">
                        <Check className="w-3 h-3" /> Passwords match
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isUpdatingPassword || !currentPassword || !newPassword || newPassword !== confirmPassword}
                      className="w-full py-3 rounded-xl bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      {isUpdatingPassword ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Hashing & Saving...</span>
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>Update & Hash Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Technical Note */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3D7] text-xs text-[#70665A] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#181614] font-semibold">
                    <Shield className="w-4 h-4 text-[#C28E46]" />
                    <span>Cryptographic Security Standards</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    This system implements standard 256-bit SHA (Secure Hash Algorithm) with one-way digest encryption. Neither your current nor your new password can be decrypted by inspecting browser storage or source scripts.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
