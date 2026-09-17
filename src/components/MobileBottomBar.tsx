import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Search, Smartphone, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';

interface MobileBottomBarProps {
  onOpenSearch: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenSearch }) => {
  const [callSheetOpen, setCallSheetOpen] = useState(false);

  return (
    <>
      {/*
        No backdrop-blur here on purpose: this bar is fixed and visible
        during every scroll, right over the Gallery grid. A blurred fixed
        bar forces a re-sample of every image scrolling underneath it on
        every frame — a solid near-opaque background looks almost
        identical and costs a fraction of the GPU time.
      */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF8F5] border-t border-[#E6DDD0] pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-2 shadow-lg gpu-layer">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {/* Call button that opens both phone options */}
          <button
            type="button"
            onClick={() => setCallSheetOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 text-[#181614] hover:text-[#C28E46] active:bg-[#EAE2D5]/50 rounded-lg transition-colors cursor-pointer"
          >
            <Phone className="w-5 h-5 text-[#C28E46]" />
            <span className="text-[10px] font-medium mt-0.5 tracking-tight">Call Us</span>
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 text-[#181614] hover:text-[#25D366] active:bg-[#EAE2D5]/50 rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="text-[10px] font-medium mt-0.5 tracking-tight">WhatsApp</span>
          </a>

          {/* Google Maps direct link */}
          <a
            href={STUDIO_INFO.mapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 text-[#181614] hover:text-[#C28E46] active:bg-[#EAE2D5]/50 rounded-lg transition-colors"
          >
            <MapPin className="w-5 h-5 text-[#C28E46]" />
            <span className="text-[10px] font-medium mt-0.5 tracking-tight">Location</span>
          </a>

          {/* Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex flex-col items-center justify-center py-1.5 px-1 text-[#181614] hover:text-[#C28E46] active:bg-[#EAE2D5]/50 rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 text-[#70665A]" />
            <span className="text-[10px] font-medium mt-0.5 tracking-tight">Search</span>
          </button>
        </div>
      </div>

      {/* Call numbers selection sheet — modal only, so blur here doesn't run during scroll */}
      {callSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setCallSheetOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-4 md:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] rounded-2xl w-full max-w-sm p-5 border border-[#E6DDD0] shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E6DDD0]">
              <span className="font-serif text-lg font-bold text-[#181614]">
                Call Us
              </span>
              <button
                type="button"
                onClick={() => setCallSheetOpen(false)}
                className="p-1 text-[#8C8275] hover:text-[#181614]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#524B43]">
              Choose whichever number is easiest to reach us on:
            </p>

            <a
              href={`tel:${STUDIO_INFO.mobileClean}`}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] border border-[#181614] text-[#181614] font-medium text-sm shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#C28E46]" />
                <div className="text-left">
                  <div className="font-bold text-sm">077-8778317</div>
                  <div className="text-[11px] text-[#70665A]">Mobile Phone (Quick Calls)</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#C28E46]">Call Now →</span>
            </a>

            <a
              href={`tel:${STUDIO_INFO.phoneClean}`}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D9D0C3] text-[#181614] font-medium text-sm shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C28E46]" />
                <div className="text-left">
                  <div className="font-bold text-sm">011-2283254</div>
                  <div className="text-[11px] text-[#70665A]">Landline</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#181614]">Call Now →</span>
            </a>

            <button
              type="button"
              onClick={() => setCallSheetOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#EAE2D5] text-[#181614] text-xs font-semibold mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
