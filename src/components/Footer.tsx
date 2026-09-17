import React from 'react';
import { Scissors, Phone, Smartphone, MessageCircle, MapPin, ExternalLink, Lock } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#121110] text-[#FAF8F5] pt-16 pb-24 md:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#24211D] text-[#C28E46] flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                S.P. <em className="font-normal italic text-[#C28E46]">Garment</em>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#BDB5AB] leading-relaxed max-w-sm font-light">
              A Ladies and Kids tailor shop in Horampalla, Minuwangoda. Any style you like, tailored precisely to your measurements and finished cleanly.
            </p>

            <div className="font-mono text-xs text-[#C28E46]">
              Your Fabric · Your Measurements · Your Design
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#A89E92] mb-3">
              Main Services
            </h4>
            <ul className="space-y-2 text-xs text-[#DBD3C8]">
              <li><a href="#services" className="hover:text-[#C28E46] transition-colors">Ladies Wear</a></li>
              <li><a href="#services" className="hover:text-[#C28E46] transition-colors">Kids Frocks & Sets</a></li>
              <li><a href="#services" className="hover:text-[#C28E46] transition-colors">Custom Patterns & Design</a></li>
              <li><a href="#services" className="hover:text-[#C28E46] transition-colors">Alterations & Fitting</a></li>
              <li><a href="#calculator" className="hover:text-[#C28E46] transition-colors">Fabric Requirement Guide</a></li>
            </ul>
          </div>

          {/* Shop hours */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#A89E92] mb-3">
              Opening Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#DBD3C8]">
              <div>
                <span className="block text-[#8C8275]">Monday – Saturday:</span>
                <span className="font-mono font-medium text-white">08:30 — 17:30</span>
              </div>
              <div>
                <span className="block text-[#8C8275]">Sunday:</span>
                <span className="font-mono font-medium text-white">09:30 — 17:30</span>
              </div>
              <p className="text-[11px] text-[#A89E92] pt-1">
                Walk in during opening hours to have your measurements taken.
              </p>
            </div>
          </div>

          {/* Contact & Map */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#A89E92] mb-3">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-[#DBD3C8]">
              <div>
                <a
                  href={`tel:${STUDIO_INFO.mobileClean}`}
                  className="flex items-center gap-2 hover:text-[#C28E46] transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>077-8778317 (Mobile)</span>
                </a>
              </div>

              <div>
                <a
                  href={`tel:${STUDIO_INFO.phoneClean}`}
                  className="flex items-center gap-2 hover:text-[#C28E46] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>011-2283254 (Landline)</span>
                </a>
              </div>

              <div>
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{STUDIO_INFO.whatsapp}</span>
                </a>
              </div>

              <div className="pt-1">
                <a
                  href={STUDIO_INFO.mapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#C28E46] hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>S.P Garment # 28, Horampalla</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8275]">
          <p>© {new Date().getFullYear()} S.P. Garment · Horampalla, Minuwangoda, Sri Lanka. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-[#70665A] hover:text-[#C28E46] transition-colors text-[11px] cursor-pointer"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
            <span>·</span>
            <a
              href="https://cloudebase.top"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C28E46] transition-colors"
            >
              Website by Cloudebase
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
