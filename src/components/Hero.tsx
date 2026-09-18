import React from 'react';
import { ArrowRight, MessageCircle, Phone, Smartphone, CheckCircle2, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';
import { useCustomImages } from '../services/imageManager';
import { buildResponsiveImage } from '../utils/imageOptim';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { getImage } = useCustomImages();
  const heroUrl = getImage('hero_main', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&auto=format&fit=crop&q=80');
  const heroImg = buildResponsiveImage(
    heroUrl,
    [480, 768, 1000, 1200],
    '(min-width: 1024px) 40vw, 88vw'
  );

  return (
    /*
      Top padding is intentionally flat across breakpoints (not scaled up
      like the bottom padding) because the fixed header's rendered height
      barely changes between mobile and desktop (~65-68px either way) — it
      was previously scaling to pt-36 (144px) on desktop, leaving a large
      empty gap between the header and the hero content that isn't there
      on mobile. pt-24 already looked right on mobile, so that's kept as
      the value for every breakpoint.
    */
    <section id="hero" className="relative pt-24 pb-14 md:pb-20 lg:pb-24 overflow-hidden bg-[#FAF8F5]">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#181614_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* items-start on desktop: the left (text) column is naturally
            shorter than the right (image) column, so items-center was
            vertically centering it and leaving a visible gap above the
            headline. items-start pins both columns to the same top edge
            instead. Mobile stacks into a single column, where align-items
            only affects horizontal centering, so this has no effect there. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center lg:items-start">

          {/*
            Right Column: photo showcase.
            order-1 here (before the text block) so on mobile — where the
            grid stacks into a single column — the image appears first,
            above the fold, instead of the page opening on text alone.
            lg:order-2 restores the original text-left / image-right
            layout on desktop.
          */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none animate-fade-slide-up">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-[#E6DCCF] to-[#FAF8F5] border border-[#E0D5C5] -rotate-1 shadow-sm" />

              {/* Main Image Container */}
              <div className="relative rounded-xl overflow-hidden bg-[#181614] aspect-[4/5] shadow-xl border border-[#D9CEBF] group">
                <img
                  src={heroImg.src}
                  srcSet={heroImg.srcSet}
                  sizes={heroImg.sizes}
                  width={960}
                  height={1200}
                  alt="S.P. Garment Tailoring Atelier measuring fabric and patterns in Minuwangoda"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614]/80 via-transparent to-black/10" />

                {/* Floating Bottom Card — dark frosted glass: a translucent dark
                    panel (not light) so the photo underneath still shows through
                    the blur, but text contrast no longer depends on whatever is
                    behind it. Light text stays legible whether the photo there
                    is bright or dark, unlike the previous light-glass + dark-text
                    combo, which could wash out over lighter parts of the photo. */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#181614]/55 backdrop-blur-xl border border-white/15 shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#D9A868] font-semibold block">
                        Ladies & Kids Tailoring
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
                        Made to <em className="italic text-[#D9A868]">measure.</em>
                      </h3>
                      <p className="text-xs text-[#E5DED3] mt-0.5">
                        Bring your favorite design or photo to us
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/90 text-[#181614] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Left Column: Headline, Narrative & Actions */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
            
            {/* Main Editorial Headline — centered on mobile */}
            <h1 className="animate-fade-slide-up-delay-1 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#181614] leading-[1.25] mb-4 text-center sm:text-left">
              Ladies & Kids Wear,<br className="hidden sm:inline" />{' '}
              <span className="inline">Tailored to the <em className="italic font-normal text-[#C28E46]">Style You Love.</em></span>
            </h1>

            {/* Subtitle — centered on mobile */}
            <p className="animate-fade-slide-up-delay-1 text-sm sm:text-base text-[#524B43] leading-relaxed max-w-2xl mb-6 font-normal text-center sm:text-left mx-auto sm:mx-0">
              Show us any design or photo you have in mind. Saree blouses, dresses, skirts, trousers and kids' outfits are all tailored to fit you perfectly, finished to a clean, premium standard.
            </p>

            {/* CTAs + Call Numbers — one row (wraps on narrow/tablet widths).
                The two buttons use a fixed width (sm:w-72), not just a
                min-width — a min-width still lets the longer "Send a
                WhatsApp Message" label grow its own box bigger than the
                shorter "Explore Our Services" box, which is why they never
                actually matched before. A fixed width forces both to the
                exact same box regardless of label length. The phone chips
                sit in this same flex row with items-center, so they're
                vertically centered against the buttons rather than living
                in a separate, disconnected row below. */}
            <div className="animate-fade-slide-up-delay-2 flex flex-col sm:flex-row sm:flex-wrap items-center gap-3 mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-72 shrink-0 rounded-lg border border-transparent bg-[#181614] text-[#FAF8F5] hover:bg-[#C28E46] text-sm sm:text-base font-medium transition-all shadow-md group cursor-pointer whitespace-nowrap"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                  "Hello S.P. Garment! I'd like to know more about tailoring Ladies / Kids wear."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-72 shrink-0 rounded-lg border border-[#D9D0C3] hover:border-[#181614] bg-[#FFFFFF] hover:bg-[#F4EFEA] text-[#181614] text-sm sm:text-base font-medium transition-all shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Send a WhatsApp Message</span>
              </a>

              {/* Phone chips — grouped together so they wrap as a pair, and
                  vertically centered against the two buttons via the
                  parent's items-center. */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#70665A]">
                <a
                  href={`tel:${STUDIO_INFO.mobileClean}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#181614] font-medium bg-white/80 px-2.5 py-1.5 rounded-md border border-[#E0D5C5] whitespace-nowrap"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C28E46] shrink-0" />
                  <span>077-8778317</span>
                </a>
                <a
                  href={`tel:${STUDIO_INFO.phoneClean}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#181614] font-medium bg-white/80 px-2.5 py-1.5 rounded-md border border-[#E0D5C5] whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C28E46] shrink-0" />
                  <span>011-2283254</span>
                </a>
              </div>
            </div>

            {/* Key Highlights Grid */}
            <div className="animate-fade-slide-up-delay-2 pt-6 border-t border-[#EAE3D6] grid grid-cols-3 gap-2 sm:gap-4 w-full">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 text-center sm:text-left">
                <Ruler className="w-4 h-4 text-[#C28E46] shrink-0 sm:mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181614] uppercase tracking-wider font-mono whitespace-nowrap">Custom Fit</h4>
                  <p className="text-[11px] sm:text-xs text-[#70665A] leading-tight">Fits your body perfectly</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 text-center sm:text-left">
                <Sparkles className="w-4 h-4 text-[#C28E46] shrink-0 sm:mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181614] uppercase tracking-wider font-mono whitespace-nowrap">Ladies & Kids</h4>
                  <p className="text-[11px] sm:text-xs text-[#70665A] leading-tight">Every age, every style</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2.5 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-[#C28E46] shrink-0 sm:mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181614] uppercase tracking-wider font-mono whitespace-nowrap">Neat Finish</h4>
                  <p className="text-[11px] sm:text-xs text-[#70665A] leading-tight">Clean, premium stitching</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
