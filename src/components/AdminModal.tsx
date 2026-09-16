import React, { useState, useEffect } from 'react';
import { X, Lock, Download, Trash2, Shield, Calendar, Phone, User, MessageSquare } from 'lucide-react';
import { EnquiryRecord } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (sessionStorage.getItem('spg_admin_auth') === 'true') {
        setIsAuthenticated(true);
        loadData();
      }
    } else {
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const loadData = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('spg_enquiries') || '[]');
      setEnquiries(stored);
    } catch {
      setEnquiries([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'spgarment2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('spg_admin_auth', 'true');
      setError('');
      loadData();
    } else {
      setError('Invalid password. Default is "spgarment2024"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spg_admin_auth');
  };

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

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sp_garment_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all recorded customer enquiries?')) {
      localStorage.removeItem('spg_enquiries');
      setEnquiries([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#FFFFFF] rounded-2xl border border-[#E6DDCF] shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#181614] text-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#C28E46]" />
            <h3 className="font-serif text-xl font-bold tracking-wide">
              Admin <em className="font-normal italic text-[#C28E46]">Portal</em>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E0D5C5] text-[#181614] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#C28E46]" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#181614] mb-2">
              Owner Sign-In
            </h4>
            <p className="text-xs text-[#70665A] mb-6">
              Enter password to access stored client enquiries and analytics.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (spgarment2024)"
                className="w-full px-4 py-3 rounded-xl border border-[#D9D0C3] focus:border-[#181614] text-sm outline-none"
              />

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF]">
                <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                  Total Enquiries
                </span>
                <span className="font-serif text-3xl font-bold text-[#181614]">
                  {enquiries.length}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF]">
                <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                  Location
                </span>
                <span className="text-sm font-semibold text-[#181614] block mt-1">
                  Minuwangoda
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6DDCF] col-span-2 sm:col-span-1 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8C8275] block">
                    Session
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">Authenticated</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-[#70665A] hover:text-[#181614] underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <h4 className="font-serif text-lg font-bold text-[#181614]">
                Recent Inquiries Log ({enquiries.length})
              </h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={enquiries.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9D0C3] hover:border-[#181614] text-xs font-medium text-[#181614] transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={enquiries.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Table or Empty State */}
            {enquiries.length === 0 ? (
              <div className="py-12 text-center text-[#8C8275] text-xs border border-dashed border-[#D9D0C3] rounded-xl">
                No customer inquiries logged in this browser yet. When clients submit the WhatsApp form, a record appears here.
              </div>
            ) : (
              <div className="border border-[#E6DDCF] rounded-xl overflow-hidden max-h-[420px] overflow-y-auto">
                <div className="divide-y divide-[#EAE3D7]">
                  {enquiries.map((enq) => (
                    <div key={enq.id} className="p-4 hover:bg-[#FAF8F5] transition-colors text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-[#181614]">
                          <User className="w-3.5 h-3.5 text-[#C28E46]" />
                          <span>{enq.name}</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#8C8275] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(enq.createdAt).toLocaleDateString()} {new Date(enq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[#524B43]">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#70665A]" />
                          <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#F2ECE2] font-mono text-[10px] text-[#70665A]">
                          {enq.service}
                        </span>
                      </div>

                      {enq.message && (
                        <p className="text-[11px] text-[#70665A] bg-white p-2 rounded border border-[#EFE8DC] flex items-start gap-1.5 mt-1">
                          <MessageSquare className="w-3 h-3 text-[#C28E46] shrink-0 mt-0.5" />
                          <span>{enq.message}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
