import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Search, Menu, X, Scissors, ChevronDown } from 'lucide-react';
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
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D6] py-3'
            : 'bg-[#FAF8F5] border-b border-[#ECE6DB] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#181614] text-[#FAF8F5] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                <Scissors className="w-5 h-5 text-[#C28E46]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#181614] leading-tight">
                  S.P. <em className="font-normal italic text-[#C28E46]">Garment</em>
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#8C8275] -mt-0.5">
                  Est. Minuwangoda
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <a
                href="#hero"
                className="px-3 py-2 text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
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
                  className="px-3 py-2 text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors inline-flex items-center gap-1"
                >
                  Services
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </a>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50">
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
                          <div className="text-[11px] text-[#8C8275] truncate">{svc.title}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#gallery"
                className="px-3 py-2 text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Gallery
              </a>
              <a
                href="#calculator"
                className="px-3 py-2 text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Fabric Guide
              </a>
              <a
                href="#hours"
                className="px-3 py-2 text-sm font-medium text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-md transition-colors"
              >
                Hours & Studio
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search services"
                className="p-2 text-[#4A453E] hover:text-[#181614] hover:bg-[#F0EBE1] rounded-lg transition-colors flex items-center gap-1.5"
                title="Search garments & services (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline text-xs font-mono text-[#8C8275] bg-[#EFE9DE] px-1.5 py-0.5 rounded border border-[#E0D7C9]">
                  ⌘K
                </span>
              </button>

              <a
                href={`tel:${STUDIO_INFO.phoneClean}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#D9D0C3] hover:border-[#181614] rounded-lg text-[#181614] hover:bg-[#FAF8F5] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#C28E46]" />
                <span>011-2283254</span>
              </a>

              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#181614] text-[#FAF8F5] hover:bg-[#C28E46] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
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
        <div className="fixed inset-0 top-[65px] z-30 bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#E8E2D6] md:hidden overflow-y-auto px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4">
            <div className="pb-4 border-b border-[#E8E2D6]">
              <span className="font-mono text-xs tracking-wider text-[#8C8275] uppercase">Navigation</span>
            </div>

            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              Tailoring Services
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              Gallery & Work
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              Fabric Requirement Guide
            </a>
            <a
              href="#hours"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              Opening Hours & Studio
            </a>
            <a
              href="#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              Send WhatsApp Enquiry
            </a>

            <div className="pt-6 border-t border-[#E8E2D6] space-y-3">
              <a
                href={`tel:${STUDIO_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#181614] text-[#181614] font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-[#C28E46]" />
                Call Studio (011-2283254)
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#EFE9DE] text-[#181614] font-medium text-sm"
              >
                <Search className="w-4 h-4 text-[#8C8275]" />
                Search All Services
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center text-xs font-mono text-[#8C8275] pt-2 hover:underline"
              >
                Studio Admin Access
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
