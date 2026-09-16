import React from 'react';
import { ArrowRight, MessageCircle, Phone, Smartphone, CheckCircle2, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF8F5]">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#181614_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Atelier Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F4EFEA] border border-[#E2D9CC] text-[#70665A] text-xs font-mono tracking-wider uppercase mb-5 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C28E46] animate-pulse" />
              <span>Horampalla, Minuwangoda · Western Province, LK</span>
            </div>

            {/* Main Editorial Headline with Natural Sinhala and balanced sizing */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#181614] leading-[1.25] mb-4">
              කාන්තා සහ ළමා ඇඳුම්,<br className="hidden sm:inline" />
              ඔබ කැමති විලාසිතාවට <em className="italic font-normal text-[#C28E46]">මසා ගන්න.</em>
            </h1>

            {/* Natural Native Subtitle */}
            <p className="text-sm sm:text-base text-[#524B43] leading-relaxed max-w-2xl mb-6 font-normal">
              ඔබ කැමති ඕනෑම ඇඳුමක ඩිසයින් එකක් හෝ photo එකක් අපිට පෙන්වන්න. සාරි හැට්ට, ගවුම්, සාය, කලිසම් සහ පුංචි බබාලගේ ඇඳුම් ඔබේ සිරුරට වඩාත්ම සුවපහසු ලෙස, ඉතා පිරිසිදු නිමාවකින් යුතුව මසා දෙනු ලැබේ.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#181614] text-[#FAF8F5] hover:bg-[#C28E46] text-sm sm:text-base font-medium transition-all shadow-md group cursor-pointer"
              >
                <span>අපේ සේවාවන් බලන්න</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'හෙලෝ S.P. Garment! මට Ladies / Kids ඇඳුමක් මසා ගැනීම පිළිබඳ විස්තර දැනගැනීමට අවශ්‍යයි.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-[#D9D0C3] hover:border-[#181614] bg-[#FFFFFF] hover:bg-[#F4EFEA] text-[#181614] text-sm sm:text-base font-medium transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp පණිවිඩයක් එවන්න</span>
              </a>

              {/* Call Numbers */}
              <div className="flex items-center justify-center gap-2 sm:flex-col sm:items-start text-xs text-[#70665A]">
                <a
                  href={`tel:${STUDIO_INFO.mobileClean}`}
                  className="inline-flex items-center gap-1 hover:text-[#181614] font-medium"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>077-8778317</span>
                </a>
                <a
                  href={`tel:${STUDIO_INFO.phoneClean}`}
                  className="inline-flex items-center gap-1 hover:text-[#181614] font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C28E46]" />
                  <span>011-2283254</span>
                </a>
              </div>
            </div>

            {/* Key Highlights Grid */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5">
                <Ruler className="w-4 h-4 text-[#C28E46] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181614] uppercase tracking-wider font-mono">Custom Fit</h4>
                  <p className="text-xs text-[#70665A]">ඔබේ ඇඟටම හරියන සේ</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C28E46] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181614] uppercase tracking-wider font-mono">Ladies & Kids</h4>
                  <p className="text-xs text-[#70665A]">කාන්තා සහ ළමා ඇඳුම්</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#C28E46] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181614] uppercase tracking-wider font-mono">Neat Finish</h4>
                  <p className="text-xs text-[#70665A]">පිරිසිදු මැහුම් නිමාව</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Res Stock Photo Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-[#E6DCCF] to-[#FAF8F5] border border-[#E0D5C5] -rotate-1 shadow-sm" />

              {/* Main Image Container */}
              <div className="relative rounded-xl overflow-hidden bg-[#181614] aspect-[4/5] shadow-xl border border-[#D9CEBF] group">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&auto=format&fit=crop&q=80"
                  alt="S.P. Garment Tailoring Atelier measuring fabric and patterns in Minuwangoda"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614]/80 via-transparent to-black/10" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E8E2D6] shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#C28E46] font-semibold block">
                        Ladies & Kids Tailoring
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#181614] leading-tight">
                        Made to <em className="italic text-[#C28E46]">measure.</em>
                      </h3>
                      <p className="text-xs text-[#70665A] mt-0.5">
                        ඔබ කැමති ඩිසයින් එකක් හෝ photo එකක් රැගෙන අප වෙත පැමිණෙන්න
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#181614] text-[#C28E46] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Top Corner Floating Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#181614]/85 text-[#FAF8F5] backdrop-blur-sm border border-white/20 text-xs font-mono tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C28E46]" />
                  <span>Horampalla, Minuwangoda (# 28)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
