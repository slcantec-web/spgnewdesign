import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Search, Menu, X, Scissors, ChevronDown, Smartphone } from 'lucide-react';
import { STUDIO_INFO, SERVICES } from '../data/tailoringData';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAdmin, onSelectService }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/*
        Note: no backdrop-blur here. A fixed, blurred header sitting above a
        scrolling image grid forces the GPU to re-sample every pixel behind
        it on every frame, which is the main cause of janky mobile scroll.
        A solid near-opaque background gives nearly the same look for a
        fraction of the cost. Padding stays constant (no py toggle) so the
        header never triggers a layout recompute when the scroll state flips.
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-shadow duration-300 gpu-layer py-3 bg-white ${
          scrolled
            ? 'shadow-sm border-b border-[#E4DCCC]'
            : 'shadow-[0_1px_0_0_rgba(24,22,20,0.06)] border-b border-[#ECE6DB]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#181614] text-[#FAF8F5] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shrink-0">
                <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#C28E46]" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#181614] leading-tight truncate">
                  S.P. <em className="font-normal italic text-[#C28E46]">Garment</em>
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#70665A] -mt-0.5 font-medium truncate">
                  Horampalla, Minuwangoda
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <a
                href="#hero"
                className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Home
              </a>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <a
                  href="#services"
                  className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors inline-flex items-center gap-1"
                >
                  Services
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </a>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2 z-50">
                    <div className="bg-[#FFFFFF] border border-[#E8E2D6] rounded-xl shadow-xl p-2 space-y-1">
                      {SERVICES.map((svc) => (
                        <a
                          key={svc.id}
                          href="#services"
                          onClick={() => {
                            onSelectService(svc.id);
                            setServicesDropdownOpen(false);
                          }}
                          className="block px-3 py-2 text-xs font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#FAF8F5] rounded-lg transition-colors"
                        >
                          <div className="font-semibold text-[#181614]">{svc.categoryLabel}</div>
                          <div className="text-[11px] text-[#8C8275] truncate">{svc.shortDesc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#gallery"
                className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Gallery
              </a>

              <a
                href="#calculator"
                className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Fabric Guide
              </a>

              <a
                href="#hours"
                className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Location & Hours
              </a>
            </nav>

            {/* Actions: Both Phone Numbers & WhatsApp */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search garments"
                className="p-2 text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-lg transition-colors flex items-center gap-1.5"
                title="Search garments (Ctrl+K)"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span className="hidden xl:inline text-xs font-mono text-[#8C8275] bg-[#EFE9DE] px-1.5 py-0.5 rounded border border-[#E0D7C9]">
                  ⌘K
                </span>
              </button>

              {/* Direct Phone Links for larger screens */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium">
                <a
                  href={`tel:${STUDIO_INFO.mobileClean}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#D9D0C3] hover:border-[#181614] text-[#181614] hover:bg-[#FAF8F5] transition-all"
                  title="Call Mobile"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>077-8778317</span>
                </a>
                <a
                  href={`tel:${STUDIO_INFO.phoneClean}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#D9D0C3] hover:border-[#181614] text-[#181614] hover:bg-[#FAF8F5] transition-all"
                  title="Call Landline"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>011-2283254</span>
                </a>
              </div>

              {/* WhatsApp Enquiry Button */}
              <a
                href="#enquiry"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#181614] text-[#FAF8F5] hover:bg-[#C28E46] transition-colors shadow-sm shrink-0 whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366] shrink-0" />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">Chat</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-2 text-[#181614] hover:bg-[#F0EBE1] active:bg-[#EAE2D5] rounded-lg transition-colors flex items-center justify-center border border-[#D9D0C3]/60 bg-white/60 shadow-2xs"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#C28E46]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop — modal-only blur is fine since it doesn't run during scroll */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative z-10 w-full max-h-[85vh] bg-[#FAF8F5] border-b border-[#E6DDCF] shadow-2xl overflow-y-auto px-5 py-5 flex flex-col">
            <div className="pb-3 border-b border-[#E8E2D6] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#181614] text-[#C28E46] flex items-center justify-center">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <span className="font-serif text-lg font-bold text-[#181614]">
                  S.P. Garment Menu
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#70665A] hover:text-[#181614] hover:bg-[#EAE2D5]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="py-4 divide-y divide-[#EDE6DA] text-sm">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 font-medium text-[#181614] hover:text-[#C28E46] flex items-center justify-between transition-colors"
              >
                <span>Home</span>
                <span className="text-[11px] font-mono text-[#8C8275]">01</span>
              </a>

              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 font-medium text-[#181614] hover:text-[#C28E46] flex items-center justify-between transition-colors"
              >
                <span>Services</span>
                <span className="text-[11px] font-mono text-[#8C8275]">02</span>
              </a>

              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 font-medium text-[#181614] hover:text-[#C28E46] flex items-center justify-between transition-colors"
              >
                <span>Gallery</span>
                <span className="text-[11px] font-mono text-[#8C8275]">03</span>
              </a>

              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 font-medium text-[#181614] hover:text-[#C28E46] flex items-center justify-between transition-colors"
              >
                <span>Fabric Guide</span>
                <span className="text-[11px] font-mono text-[#8C8275]">04</span>
              </a>

              <a
                href="#hours"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 font-medium text-[#181614] hover:text-[#C28E46] flex items-center justify-between transition-colors"
              >
                <span>Hours & Map</span>
                <span className="text-[11px] font-mono text-[#8C8275]">05</span>
              </a>

              <a
                href="#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 font-medium text-[#181614] hover:text-[#C28E46] flex items-center justify-between transition-colors"
              >
                <span>WhatsApp Enquiry</span>
                <span className="text-[11px] font-mono text-[#8C8275]">06</span>
              </a>
            </div>

            {/* Direct Contact Buttons */}
            <div className="pt-4 border-t border-[#E8E2D6] space-y-2 shrink-0">
              <span className="text-[11px] text-[#70665A] block font-mono uppercase font-semibold">
                Direct Contact Lines
              </span>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${STUDIO_INFO.mobileClean}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-[#181614] text-[#181614] font-semibold text-xs bg-white shadow-2xs"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>077-8778317</span>
                </a>

                <a
                  href={`tel:${STUDIO_INFO.phoneClean}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-[#D9D0C3] text-[#181614] font-semibold text-xs bg-white shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>011-2283254</span>
                </a>
              </div>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {STUDIO_INFO.whatsapp}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#EFE9DE] text-[#181614] font-medium text-xs border border-[#DFD5C5]"
              >
                <Search className="w-3.5 h-3.5 text-[#70665A]" />
                <span>Search Garments & Services</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
