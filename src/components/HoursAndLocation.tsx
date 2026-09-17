import React, { useMemo, useState } from 'react';
import { Clock, MapPin, Phone, MessageCircle, ExternalLink, Smartphone, Navigation, Lock, Unlock } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';

export const HoursAndLocation: React.FC = () => {
  const [mapInteractive, setMapInteractive] = useState(false);

  // Determine if studio is open right now
  const status = useMemo(() => {
    const now = new Date();
    // Get Sri Lanka local time (UTC + 5:30)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const slDate = new Date(utc + 3600000 * 5.5);
    const day = slDate.getDay(); // 0 is Sunday, 1 is Monday...
    const hour = slDate.getHours() + slDate.getMinutes() / 60;

    let isOpen = false;

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayName = dayNames[day];

    if (day >= 1 && day <= 6) {
      // Mon to Sat: 8:30 to 17:30
      isOpen = hour >= 8.5 && hour < 17.5;
    } else if (day === 0) {
      // Sunday: 9:30 to 17:30
      isOpen = hour >= 9.5 && hour < 17.5;
    }

    return {
      isOpen,
      currentDayName,
    };
  }, []);

  return (
    <section id="hours" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-[#E6DDD0] relative cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#70665A] mb-2.5">
          <span className="w-6 h-px bg-[#181614]" />
          <span>Location & Hours</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#181614] leading-[1.15] mb-10">
          Visit our shop in <em className="italic text-[#C28E46]">Horampalla, Minuwangoda.</em>
        </h2>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hours Card & Contact Strip */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Opening Hours Box */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6DDCF] p-4 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-[#F0EAE1]">
                <div className="flex items-center gap-2 shrink-0">
                  <Clock className="w-5 h-5 text-[#C28E46] shrink-0" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#181614] whitespace-nowrap">
                    Opening Hours
                  </h3>
                </div>

                {/* Live Open / Closed Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono font-medium shrink-0 whitespace-nowrap ${
                    status.isOpen
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span>{status.isOpen ? 'Open Now' : 'Currently Closed'}</span>
                </span>
              </div>

              {/* Day-by-Day Schedule */}
              <div className="space-y-1.5">
                {STUDIO_INFO.hours.map((h) => {
                  const isToday = h.day === status.currentDayName;

                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between gap-2 py-2 px-2.5 sm:px-3 rounded-lg text-xs sm:text-sm transition-colors ${
                        isToday
                          ? 'bg-[#181614] text-[#FAF8F5] font-semibold shadow-xs'
                          : 'text-[#524B43] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="whitespace-nowrap font-medium">{h.day}</span>
                        {isToday && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C28E46] text-[#181614] shrink-0 uppercase tracking-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#181614] animate-pulse" />
                            Today
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs tracking-tight shrink-0 whitespace-nowrap">
                        {h.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs text-[#70665A]">
                  Walk in any time during opening hours to get your measurements taken.
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={`tel:${STUDIO_INFO.mobileClean}`}
                    className="text-xs font-semibold text-[#181614] hover:text-[#C28E46] inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#C28E46] shrink-0" />
                    <span>077-8778317</span>
                  </a>
                  <a
                    href={`tel:${STUDIO_INFO.phoneClean}`}
                    className="text-xs font-semibold text-[#181614] hover:text-[#C28E46] inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C28E46] shrink-0" />
                    <span>011-2283254</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Direct Contact Card */}
            <div className="bg-[#181614] text-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-md">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C28E46] block mb-1.5">
                Shop Address
              </span>
              <p className="text-sm font-medium leading-relaxed text-[#EAE3D6] mb-4">
                {STUDIO_INFO.address}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3.5 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[#8C8275] block font-mono text-[10px] uppercase">Mobile Number</span>
                  <a href={`tel:${STUDIO_INFO.mobileClean}`} className="text-white hover:text-[#C28E46] font-medium text-xs sm:text-sm whitespace-nowrap">
                    {STUDIO_INFO.mobile}
                  </a>
                </div>
                <div>
                  <span className="text-[#8C8275] block font-mono text-[10px] uppercase">Landline</span>
                  <a href={`tel:${STUDIO_INFO.phoneClean}`} className="text-white hover:text-[#C28E46] font-medium text-xs sm:text-sm whitespace-nowrap">
                    {STUDIO_INFO.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[#8C8275] block font-mono text-[10px] uppercase">Direct WhatsApp</span>
                  <a
                    href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-medium text-xs sm:text-sm whitespace-nowrap"
                  >
                    {STUDIO_INFO.whatsapp}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps & Direct Link */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E0D5C5] shadow-sm relative min-h-[380px] bg-[#E8DFD1] flex flex-col">
            <div className="relative w-full flex-1 min-h-[350px]">
              <iframe
                src={STUDIO_INFO.mapEmbedUrl}
                className={`w-full h-full min-h-[350px] border-0 transition-opacity ${
                  mapInteractive ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="S.P. Garment Minuwangoda Location Map"
              />

              {/* Scroll protection overlay banner for mobile browsers */}
              {!mapInteractive && (
                <div
                  onClick={() => setMapInteractive(true)}
                  className="absolute inset-0 bg-transparent flex items-center justify-center p-4 cursor-pointer"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapInteractive(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#181614]/90 hover:bg-[#181614] text-[#FAF8F5] text-xs font-medium shadow-lg backdrop-blur-xs border border-white/20 transition-all active:scale-95"
                  >
                    <Unlock className="w-3.5 h-3.5 text-[#C28E46]" />
                    <span>Tap to navigate the map</span>
                  </button>
                </div>
              )}

              {/* Lock button when map is active */}
              {mapInteractive && (
                <div className="absolute top-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={() => setMapInteractive(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181614]/90 text-white text-xs font-mono font-medium shadow-md border border-white/20 hover:bg-[#181614] transition-all"
                  >
                    <Lock className="w-3 h-3 text-[#C28E46]" />
                    <span>Lock Map</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Bar on Map with Direct Google Maps shortlink */}
            <div className="p-4 bg-[#FFFFFF] border-t border-[#E0D5C5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C28E46] shrink-0" />
                <span className="text-xs text-[#524B43] font-medium">
                  S.P Garment # 28, Horampalla, Minuwangoda
                </span>
              </div>

              <a
                href={STUDIO_INFO.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] text-xs font-semibold transition-colors shrink-0 shadow-xs"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
