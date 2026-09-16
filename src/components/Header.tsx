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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D6] py-2.5'
            : 'bg-[#FAF8F5] border-b border-[#ECE6DB] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-lg bg-[#181614] text-[#FAF8F5] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                <Scissors className="w-5 h-5 text-[#C28E46]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#181614] leading-tight">
                  S.P. <em className="font-normal italic text-[#C28E46]">Garment</em>
                </span>
                <span className="text-[11px] text-[#70665A] -mt-0.5 font-medium">
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
                  සේවාවන් (Services)
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
                විලාසිතා (Gallery)
              </a>

              <a
                href="#calculator"
                className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                රෙදි මඟපෙන්වීම (Fabric Guide)
              </a>

              <a
                href="#hours"
                className="px-3 py-2 text-xs lg:text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                ලිපිනය සහ වේලාවන්
              </a>
            </nav>

            {/* Actions: Both Phone Numbers & WhatsApp */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search garments"
                className="p-2 text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-lg transition-colors flex items-center gap-1.5"
                title="Search garments (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-xs font-mono text-[#8C8275] bg-[#EFE9DE] px-1.5 py-0.5 rounded border border-[#E0D7C9]">
                  ⌘K
                </span>
              </button>

              {/* Direct Phone Links */}
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#181614] text-[#FAF8F5] hover:bg-[#C28E46] transition-colors shadow-sm shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire Now</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 text-[#181614] hover:bg-[#F0EBE1] rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[62px] z-30 bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#E8E2D6] md:hidden overflow-y-auto px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4">
            <div className="pb-3 border-b border-[#E8E2D6] flex justify-between items-center">
              <span className="font-mono text-xs tracking-wider text-[#8C8275] uppercase">
                Navigation Menu
              </span>
              <span className="text-xs text-[#C28E46] font-medium">Minuwangoda</span>
            </div>

            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              මුල් පිටුව (Home)
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              මසා දෙන ඇඳුම් (Services)
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              විලාසිතා (Gallery)
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              අවශ්‍ය රෙදි ප්‍රමාණය (Fabric Guide)
            </a>
            <a
              href="#hours"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              ස්ථානය සහ වේලාවන්
            </a>
            <a
              href="#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              විස්තර විමසන්න (Enquiry)
            </a>

            <div className="pt-6 border-t border-[#E8E2D6] space-y-2.5">
              <div className="text-xs text-[#70665A] mb-1 font-mono uppercase">Contact Numbers:</div>
              <a
                href={`tel:${STUDIO_INFO.mobileClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#181614] text-[#181614] font-medium text-sm"
              >
                <Smartphone className="w-4 h-4 text-[#C28E46]" />
                Call Mobile: 077-8778317
              </a>
              <a
                href={`tel:${STUDIO_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#181614] text-[#181614] font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-[#C28E46]" />
                Call Landline: 011-2283254
              </a>
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-white font-medium text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: {STUDIO_INFO.whatsapp}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#EFE9DE] text-[#181614] font-medium text-sm"
              >
                <Search className="w-4 h-4 text-[#8C8275]" />
                Search Garments & Services
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
