import React, { useState } from 'react';
import { ArrowRight, Check, Clock, MessageSquare } from 'lucide-react';
import { SERVICES, STUDIO_INFO } from '../data/tailoringData';
import { useCustomImages } from '../services/imageManager';

interface ServicesSectionProps {
  selectedServiceId: string | null;
  onEnquireForService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceId,
  onEnquireForService,
}) => {
  const { getImage } = useCustomImages();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(selectedServiceId || null);

  const filters = [
    { key: 'all', label: 'All Services (සියල්ල)' },
    { key: 'ladies', label: 'Ladies Wear' },
    { key: 'kids', label: 'Kids Wear' },
    { key: 'custom', label: 'Custom Design' },
    { key: 'alterations', label: 'Alterations & Fitting' },
    { key: 'finishing', label: 'Finishing Details' },
  ];

  const filteredServices = activeFilter === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#70665A] mb-2.5">
              <span className="w-6 h-px bg-[#181614]" />
              <span>Tailoring Catalogue (මැහුම් සේවාවන්)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#181614] leading-[1.15]">
              Services <em className="italic text-[#C28E46]">crafted</em> for you.
            </h2>
            <p className="text-sm sm:text-base text-[#665D52] mt-2 max-w-xl font-normal">
              සාරි හැට්ට, කාන්තා ගවුම්, කලිසම්, සායවල් සහ පුංචි බබාලගේ ඇඳුම් ඔබ කැමති ඕනෑම විලාසිතාවකට අනුව පිළිවෙළට මසා දෙනු ලැබේ.
            </p>
          </div>

          {/* WhatsApp Direct Banner */}
          <div className="bg-[#FFFFFF] border border-[#E4DCCE] p-4 rounded-xl shadow-xs max-w-xs shrink-0">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#C28E46] font-semibold block">
              කැමති ඩිසයින් එකක Photo එකක් තියෙනවද?
            </span>
            <p className="text-xs text-[#524B43] mt-1 mb-2">
              ඔබ මසා ගැනීමට කැමති ඇඳුමේ photo එකක් අපේ WhatsApp අංකයට එවන්න. ඒ සඳහා යන වියදම සහ දින ගණන අපෙන් විමසන්න.
            </p>
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                'හෙලෝ S.P. Garment, මා ළඟ මැසීමට අවශ්‍ය ඇඳුමක Photo Reference එකක් තියෙනවා.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181614] hover:text-[#C28E46] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Photo එක WhatsApp කරන්න →</span>
            </a>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-[#181614] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#F2ECE2] text-[#5C5449] hover:bg-[#E8E0D2] hover:text-[#181614]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDCF] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#181614]">
                  <img
                    src={getImage(service.id, service.image)}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#181614]/85 text-[#FAF8F5] text-[10px] font-mono tracking-wider uppercase backdrop-blur-xs">
                    0{index + 1} / {service.categoryLabel}
                  </span>

                  {/* Lead Time Badge */}
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FAF8F5]/90 text-[#181614] text-[11px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C28E46]" />
                    <span>නිමකිරීම: {service.leadTime}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#181614] group-hover:text-[#C28E46] transition-colors mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#5C5449] leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    {/* Popular items / tags */}
                    <div className="space-y-1.5 pt-2 border-t border-[#F0EAE1]">
                      <span className="font-mono text-[10px] tracking-wider uppercase text-[#8C8275] block mb-1.5">
                        බහුලව මසන විලාසිතා:
                      </span>
                      {service.popularItems.slice(0, isExpanded ? service.popularItems.length : 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#423C34]">
                          <Check className="w-3.5 h-3.5 text-[#C28E46] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}

                      {service.popularItems.length > 3 && (
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : service.id)}
                          className="text-xs text-[#C28E46] hover:underline font-medium pt-1 block cursor-pointer"
                        >
                          {isExpanded ? 'අඩු කරන්න' : `+ තවත් ${service.popularItems.length - 3} ක් බලන්න...`}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-5 mt-5 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onEnquireForService(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181614] hover:text-[#C28E46] transition-colors cursor-pointer"
                    >
                      <span>විස්තර විමසන්න</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                        `හෙලෝ S.P. Garment, මට ඔබේ ${service.title} සේවාව පිළිබඳ විස්තර සහ මිල ගණන් දැනගැනීමට අවශ්‍යයි.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#181614] text-[#181614] hover:text-[#FAF8F5] text-xs font-medium transition-all"
                    >
                      WhatsApp
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
