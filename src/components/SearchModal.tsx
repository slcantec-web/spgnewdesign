import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Scissors } from 'lucide-react';
import { SERVICES, STUDIO_INFO } from '../data/tailoringData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectService(''); // trigger open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectService]);

  if (!isOpen) return null;

  const quickKeywords = [
    'Saree Blouse',
    'Kids Frock',
    'Maxi Dress',
    'Alterations',
    'Zip Replacement',
    'Lining & Lace',
    'Pattern Drafting',
    'School Uniform',
  ];

  const results = query.trim()
    ? SERVICES.filter((s) => {
        const q = query.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q) ||
          s.popularItems.some((item) => item.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#FFFFFF] rounded-2xl border border-[#E6DDCF] shadow-2xl overflow-hidden mb-12"
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-[#F0EAE1] flex items-center px-4 py-3.5 gap-3">
          <Search className="w-5 h-5 text-[#8C8275] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search custom dresses, saree blouses, alterations, kids frocks..."
            className="w-full bg-transparent text-sm sm:text-base text-[#181614] placeholder:text-[#A89E92] outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#8C8275] hover:text-[#181614] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="font-mono text-[10px] text-[#A89E92] uppercase px-1.5 py-0.5 rounded border border-[#E8E2D6]">
              ESC to exit
            </span>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-3 bg-[#FAF8F5] border-b border-[#F0EAE1] flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C8275] mr-1">
            Quick Suggestions:
          </span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => setQuery(kw)}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#FFFFFF] border border-[#E4DCCE] text-[#524B43] hover:border-[#181614] hover:text-[#181614] transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() ? (
            results.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#8C8275] uppercase block px-1">
                  Found {results.length} tailoring service{results.length > 1 ? 's' : ''}:
                </span>
                {results.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      onSelectService(service.id);
                      onClose();
                    }}
                    className="p-4 rounded-xl border border-[#E6DDCF] hover:border-[#181614] bg-[#FFFFFF] hover:bg-[#FAF8F5] transition-all cursor-pointer group flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F2ECE2] text-[#70665A] uppercase">
                          {service.categoryLabel}
                        </span>
                        <span className="text-xs text-[#C28E46] font-mono">
                          Est. {service.leadTime}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#181614] group-hover:text-[#C28E46] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-[#524B43] line-clamp-2 mt-1">
                        {service.shortDesc}
                      </p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-[#8C8275] group-hover:text-[#181614] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[#70665A]">
                <Scissors className="w-8 h-8 text-[#C28E46] mx-auto mb-2 opacity-60" />
                <h4 className="font-serif text-lg font-bold text-[#181614]">No exact service found</h4>
                <p className="text-xs text-[#8C8275] max-w-sm mx-auto mt-1 mb-4">
                  We customize anything from scratch. Contact us on WhatsApp to discuss your unique design.
                </p>
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                    `Hello S.P. Garment, I searched for "${query}" on your website. Do you offer this custom tailoring service?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181614] text-[#FAF8F5] text-xs font-semibold"
                >
                  Ask Tailor on WhatsApp
                </a>
              </div>
            )
          ) : (
            <div className="py-8 px-4 text-center text-[#8C8275] text-xs">
              Type keywords above or pick a suggestion chip to view custom designs, measurements, and alterations.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
