import React, { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { OurPromise } from './components/OurPromise';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { FabricCalculator } from './components/FabricCalculator';
import { HoursAndLocation } from './components/HoursAndLocation';
import { WhatsAppEnquirySection } from './components/WhatsAppEnquirySection';
import { SearchModal } from './components/SearchModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { fetchRemoteCloudflareConfig, getCloudflareConfig } from './services/cloudflareService';
import { setStoredPasswordHash } from './utils/security';
import { saveMultipleCustomImages } from './services/imageManager';
import { syncFromServer } from './services/apiSync';

// Caps how long we'll wait for a sync call before giving up on it and
// showing the site anyway (with whatever defaults are available). Prevents
// a slow or offline connection from blocking the page indefinitely.
const SYNC_TIMEOUT_MS = 4000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [enquiryService, setEnquiryService] = useState<string>('Ladies Wear – Dresses');

  // Gates the first real paint until the initial cross-device sync has
  // finished (or timed out). Without this, a brand-new device has nothing
  // in localStorage yet, so every image component renders with its default
  // stock photo first, then visibly swaps to the admin's custom photo a few
  // seconds later once syncFromServer() resolves. Waiting here means the
  // site only ever paints once, already showing the correct images.
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const runInitialSync = async () => {
      // 1. Central server sync — this is the one that matters for the
      // "new device shows default images" issue, since it's what pulls
      // the admin's saved password hash + custom images down for the
      // first time on this browser.
      await withTimeout(syncFromServer(), SYNC_TIMEOUT_MS);

      // 2. Cloudflare Worker sync fallback/secondary, only if configured.
      // Awaited here too (rather than fired-and-forgotten) so it can't
      // cause a second, later image flip after the page is already shown.
      const config = getCloudflareConfig();
      if (config.workerUrl) {
        const res = await withTimeout(fetchRemoteCloudflareConfig(), SYNC_TIMEOUT_MS);
        if (res && res.success) {
          if (res.passwordHash) {
            setStoredPasswordHash(res.passwordHash);
          }
          if (res.images && Object.keys(res.images).length > 0) {
            saveMultipleCustomImages(res.images);
          }
        }
      }

      if (!cancelled) setIsInitializing(false);
    };

    runInitialSync();

    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEnquiry = (serviceName?: string) => {
    if (serviceName) setEnquiryService(serviceName);
    const el = document.getElementById('enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#181614] text-[#C28E46] flex items-center justify-center shadow-md animate-pulse">
            <Scissors className="w-6 h-6" />
          </div>
          <span className="font-serif text-sm text-[#70665A] tracking-wide">
            S.P. Garment
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181614] flex flex-col font-sans selection:bg-[#C28E46] selection:text-white">
      {/* Navigation Header */}
      <Header
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onSelectService={handleSelectService}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Rebuilt Non-Overlapping Hero Section with Curated Stock Imagery */}
        <Hero onExploreClick={scrollToServices} />

        {/* Elegant Animated Marquee */}
        <Marquee />

        {/* Studio Craft Promise & 4-Step Process */}
        <OurPromise onEnquireClick={() => scrollToEnquiry()} />

        {/* Full Interactive Tailoring Services Catalogue */}
        <ServicesSection
          selectedServiceId={selectedServiceId}
          onEnquireForService={(svcName) => scrollToEnquiry(svcName)}
        />

        {/* Curated High-Resolution Stock Photo Gallery with Lightbox */}
        <GallerySection />

        {/* Fabric Requirement Yardage Estimator */}
        <FabricCalculator />

        {/* Real-time Opening Hours & Minuwangoda Studio Map */}
        <HoursAndLocation />

        {/* WhatsApp Direct Enquiry Form */}
        <WhatsAppEnquirySection initialService={enquiryService} />
      </main>

      {/* Luxury Footer */}
      <Footer
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileBottomBar onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectService={handleSelectService}
      />

      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
