import React from 'react';
import { Scissors, Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { STUDIO_INFO, SERVICES } from '../data/tailoringData';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onSelectService }) => {
  return (
    <footer className="bg-[#181614] text-[#FAF8F5] pt-16 pb-24 md:pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#2E2A25] text-[#C28E46] flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                S.P. <em className="italic text-[#C28E46] font-normal">Garment</em>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#C4B9AC] leading-relaxed max-w-sm font-light">
              Custom tailoring for ladies and kids. Bring your own fabric, share your design ideas, and our Minuwangoda studio will handcraft your garments to exact measurements.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <a
                href={`tel:${STUDIO_INFO.phoneClean}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C28E46]" />
                <span>011-2283254</span>
              </a>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Services list */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#C28E46] font-semibold">
              Tailoring Services
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B9AC]">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={() => onSelectService(s.id)}
                    className="hover:text-[#C28E46] transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#calculator" className="hover:text-[#C28E46] transition-colors">
                  Fabric Yardage Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Studio hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#C28E46] font-semibold">
              Studio & Visits
            </h4>
            
            <div className="flex items-start gap-2 text-xs text-[#C4B9AC]">
              <MapPin className="w-4 h-4 text-[#C28E46] shrink-0 mt-0.5" />
              <span>{STUDIO_INFO.address}</span>
            </div>

            <div className="pt-2 text-xs text-[#A89E92] leading-relaxed">
              <span className="text-white block font-medium">Opening Hours:</span>
              <span>Mon – Sat: 08:30 — 17:30</span><br />
              <span>Sunday: 09:30 — 17:30</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[11px] font-mono text-[#8C8275] hover:text-[#C28E46] transition-colors underline cursor-pointer"
              >
                Studio Admin Dashboard Access
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8C8275]">
          <div>
            © {new Date().getFullYear()} S.P. Garment. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Handcrafted with precision for Minuwangoda & Western Province, LK</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
