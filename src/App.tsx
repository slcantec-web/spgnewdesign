import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [enquiryService, setEnquiryService] = useState<string>('Ladies Wear – Dresses');

  // Background Cloudflare sync on initial load so any device gets latest password hash & images
  useEffect(() => {
    const config = getCloudflareConfig();
    if (config.workerUrl) {
      fetchRemoteCloudflareConfig().then((res) => {
        if (res.success) {
          if (res.passwordHash) {
            setStoredPasswordHash(res.passwordHash);
          }
          if (res.images && Object.keys(res.images).length > 0) {
            saveMultipleCustomImages(res.images);
          }
        }
      }).catch(() => {
        // silent fallback to local storage
      });
    }
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
