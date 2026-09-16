import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Check,
  AlertCircle,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';
import { R2FileItem } from '../types';
import {
  fetchR2FilesList,
  uploadImageToR2,
  getCloudflareConfig,
} from '../services/cloudflareService';

interface R2ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPositionName: string;
  targetId: string;
  onSelectImage: (imageUrl: string) => void;
  onOpenCloudflareSettings: () => void;
}

export const R2ImagePickerModal: React.FC<R2ImagePickerModalProps> = ({
  isOpen,
  onClose,
  targetPositionName,
  targetId,
  onSelectImage,
  onOpenCloudflareSettings,
}) => {
  const [files, setFiles] = useState<R2FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const config = getCloudflareConfig();
  const isConfigured = Boolean(config.workerUrl);

  useEffect(() => {
    if (isOpen && isConfigured) {
      loadFiles();
    }
  }, [isOpen, isConfigured]);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchR2FilesList();
      if (res.success && res.files) {
        // sort by newest
        const sorted = [...res.files].sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        setFiles(sorted);
      } else {
        setError(res.error || 'Failed to retrieve files from Cloudflare R2 bucket.');
      }
    } catch (e: any) {
      setError(e.message || 'Error communicating with Worker.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (JPEG, PNG, WEBP, etc.)');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const res = await uploadImageToR2(file);
      if (res.success && res.file) {
        setFiles((prev) => [res.file!, ...prev]);
        setSelectedUrl(res.file.url);
      } else {
        setError(res.error || 'Upload to R2 bucket failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  const filtered = files.filter((f) => {
    const s = search.toLowerCase().trim();
    return !s || f.key.toLowerCase().includes(s);
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-3xl bg-white sm:rounded-2xl border-0 sm:border border-[#E6DDCF] shadow-2xl overflow-hidden my-0 sm:my-auto flex flex-col h-full sm:h-auto max-h-full sm:max-h-[88vh] min-h-0"
      >
        {/* Header */}
        <div className="p-3 sm:p-5 bg-[#181614] text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#2A2622] border border-[#3E3832] flex items-center justify-center text-[#C28E46] shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="font-serif text-sm sm:text-lg font-bold tracking-wide flex items-center gap-2 truncate">
                <span className="truncate">Cloudflare R2 Image Library</span>
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#A89E92] truncate max-w-[220px] sm:max-w-sm md:max-w-md">
                Choosing image for: <strong className="text-white">{targetPositionName}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {!isConfigured ? (
          <div className="p-6 sm:p-12 text-center space-y-4 my-auto overflow-y-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E0D5C5] text-[#C28E46] flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto">
              <h5 className="font-serif text-xl font-bold text-[#181614] mb-1">
                Cloudflare Worker URL Needed
              </h5>
              <p className="text-xs text-[#70665A] leading-relaxed mb-5">
                To pick and upload photos directly to your Cloudflare R2 bucket, please enter your Cloudflare Worker URL in settings.
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCloudflareSettings();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#181614] hover:bg-[#C28E46] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Configure Cloudflare Worker
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden p-3 sm:p-6 space-y-4 min-h-0">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE3D7] shrink-0">
              {/* Search */}
              <div className="relative flex-1 max-w-full sm:max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search R2 files..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#D9D0C3] bg-[#FAF8F5] text-xs outline-none"
                />
              </div>

              {/* Upload & Refresh */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={loadFiles}
                  disabled={loading}
                  className="p-2 rounded-lg border border-[#D9D0C3] hover:bg-[#FAF8F5] text-[#524B43] text-xs transition-colors cursor-pointer shrink-0"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#181614] hover:bg-[#C28E46] text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs whitespace-nowrap">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? 'Uploading...' : 'Upload to R2'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 shrink-0">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="flex-1">{error}</span>
              </div>
            )}

            {/* Grid of Files */}
            <div className="flex-1 overflow-y-auto min-h-[220px]">
              {loading ? (
                <div className="py-16 text-center text-xs text-[#8C8275] flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-[#C28E46]" />
                  <span>Loading images from R2 Bucket...</span>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-14 text-center text-xs text-[#8C8275] border border-dashed border-[#D9D0C3] rounded-xl bg-[#FAF8F5]/60 flex flex-col items-center justify-center p-6">
                  <ImageIcon className="w-8 h-8 text-[#C28E46] mb-2 opacity-50" />
                  <p className="font-semibold text-[#524B43]">No images found in R2 bucket</p>
                  <p className="text-[11px] text-[#8C8275] mt-1 max-w-sm">
                    Click the <strong>Upload to R2</strong> button above to upload your dresses, fabric rolls or studio photos directly.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
                  {filtered.map((file) => {
                    const isSelected = selectedUrl === file.url;
                    return (
                      <div
                        key={file.key}
                        onClick={() => setSelectedUrl(file.url)}
                        className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all aspect-square flex flex-col justify-end ${
                          isSelected
                            ? 'ring-2 ring-[#C28E46] border-[#C28E46] shadow-md'
                            : 'border-[#E6DDCF] hover:border-[#181614]'
                        }`}
                      >
                        <img
                          src={file.url}
                          alt={file.key}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C28E46] text-white flex items-center justify-center shadow-sm">
                            <Check className="w-3 h-3" />
                          </div>
                        )}

                        <div className="relative p-2 text-white">
                          <p className="text-[10px] font-mono truncate">{file.key.split('/').pop()}</p>
                          <span className="text-[9px] text-white/70 block">
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-3 border-t border-[#EAE3D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="text-[11px] text-[#70665A] truncate max-w-full sm:max-w-md">
                {selectedUrl ? (
                  <span>
                    Selected: <code className="font-mono text-[#181614]">{selectedUrl}</code>
                  </span>
                ) : (
                  <span>Click on an image above to select it for <strong>{targetId}</strong></span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg border border-[#D9D0C3] text-xs font-medium text-[#70665A] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSelect}
                  disabled={!selectedUrl}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#181614] hover:bg-[#C28E46] text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Image</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
