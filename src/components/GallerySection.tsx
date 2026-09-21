import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS, STUDIO_INFO } from '../data/tailoringData';
import { GalleryPhoto } from '../types';
import { useCustomImages } from '../services/imageManager';
import { buildResponsiveImage } from '../utils/imageOptim';

export const GallerySection: React.FC = () => {
  const { getImage } = useCustomImages();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'ladies', label: 'Ladies Wear' },
    { key: 'kids', label: 'Kids Wear' },
    { key: 'custom', label: 'Custom Designs' },
    { key: 'details', label: 'Finishing Details' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredPhotos[0]);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#F5EFE6] border-t border-[#E6DDD0] relative cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#70665A] mb-2.5">
              <span className="w-6 h-px bg-[#181614]" />
              <span>Design Inspirations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#181614] leading-[1.15]">
              A glimpse of <em className="italic text-[#C28E46]">our craft.</em>
            </h2>
            <p className="text-sm sm:text-base text-[#665D52] mt-2 max-w-xl font-normal">
              A few of the Ladies and Kids wear styles we've tailored.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#181614] text-[#FAF8F5]'
                    : 'bg-[#EAE2D5] text-[#5C5449] hover:bg-[#DDD4C5] hover:text-[#181614]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredPhotos.map((photo, index) => {
            // Grid tiles render at roughly 150–280px wide depending on breakpoint,
            // so request correspondingly small images instead of a flat w=600 for everyone.
            const tileImg = buildResponsiveImage(
              getImage(photo.id, photo.url),
              [280, 400, 560],
              '(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw'
            );

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="cv-tile group relative rounded-xl overflow-hidden bg-[#181614] aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E0D5C5]"
              >
                <img
                  src={tileImg.src}
                  srcSet={tileImg.srcSet}
                  sizes={tileImg.sizes}
                  width={480}
                  height={640}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                  decoding="async"
                />

                {/* Number tag */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-white/90">
                  0{index + 1}
                </span>

                {/* Category chip */}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#FAF8F5]/90 text-[10px] font-mono text-[#181614] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.categoryName}
                </span>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Details on Hover / Card Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h4 className="font-serif text-sm sm:text-base font-semibold leading-tight line-clamp-1 text-[#FAF8F5]">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-[#D4CBBF] line-clamp-2 mt-1 hidden sm:block">
                    {photo.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#C28E46]">
                    <span>{photo.fabricType}</span>
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3 h-3" /> View
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/*
        Lightbox Modal — rendered via a React portal directly into
        document.body.

        WHY THE PORTAL IS NECESSARY:
        This <section> carries the `.cv-auto` class, which sets
        `content-visibility: auto`. That property implicitly applies CSS
        containment (`contain: layout paint` and friends) to the section.
        Per the CSS spec, any ancestor with layout/paint containment becomes
        the *containing block* for `position: fixed` descendants — so a
        `fixed inset-0` modal nested inside this section is no longer fixed
        to the viewport, it's fixed to the (very tall) section box instead.
        That's exactly why the old inline lightbox wasn't centering and
        required scrolling the page to reach the close button on both PC
        and mobile: it was being positioned relative to the whole gallery
        section, not the screen.

        Portaling the modal out to document.body removes it from that
        containment context entirely, so `fixed inset-0` centers on the
        real viewport again, regardless of where in the page the trigger
        tile lives.
      */}
      {selectedPhoto && createPortal(
        (() => {
          const lightboxImg = buildResponsiveImage(
            getImage(selectedPhoto.id, selectedPhoto.url),
            [480, 720, 960],
            '(min-width: 768px) 60vw, 100vw'
          );
          return (
            <div
              role="dialog"
              aria-modal="true"
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-[60] w-11 h-11 rounded-full bg-white/10 hover:bg-[#C28E46] text-white hover:text-[#181614] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons — visible on all screen sizes now (was
                  hidden on mobile via `hidden sm:flex`, which is why
                  forward/back didn't appear in the mobile browser even
                  though it worked on PC). Slightly smaller on mobile so
                  they don't crowd the narrower screen. */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[60] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#C28E46] text-white hover:text-[#181614] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[60] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#C28E46] text-white hover:text-[#181614] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Modal Container — fixed height (h-[85vh], capped so it never
                  gets absurdly tall on big desktop screens) instead of
                  sizing itself off the image's intrinsic aspect ratio.
                  Previously the box grew/shrank on every photo (portrait
                  vs. landscape), causing a visible resize + re-center each
                  time you clicked next/prev. Now the box is constant and
                  only the image scales to fit inside it. my-auto still lets
                  the backdrop's own scroll handle very short viewports. */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl my-auto bg-[#181614] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] max-h-[640px]"
              >
                {/* Image side — fixed-height container; the image just fits
                    inside it via object-contain rather than dictating the
                    container's own size. */}
                <div className="md:w-3/5 h-[42%] md:h-full bg-black flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={lightboxImg.src}
                    srcSet={lightboxImg.srcSet}
                    sizes={lightboxImg.sizes}
                    alt={selectedPhoto.title}
                    className="max-h-full max-w-full w-auto h-auto object-contain"
                    decoding="async"
                  />
                </div>

                {/* Info side — its own scroll region so a long caption never
                    forces the whole modal to resize; it scrolls internally
                    within the fixed-height box instead. */}
                <div className="md:w-2/5 p-6 flex flex-col justify-between text-white bg-[#201D1A] overflow-y-auto">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C28E46]/20 text-[#C28E46] text-[10px] font-mono uppercase tracking-wider">
                        {selectedPhoto.categoryName}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#FAF8F5] mb-2 leading-snug">
                      {selectedPhoto.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#C4B9AC] leading-relaxed mb-5 font-light">
                      {selectedPhoto.caption}
                    </p>

                    <div className="p-3.5 rounded-lg bg-[#2B2723] border border-white/10 mb-5">
                      <span className="font-mono text-[10px] text-[#A89E92] uppercase tracking-wider block mb-1">
                        Featured Fabric / Finishing:
                      </span>
                      <p className="text-xs font-medium text-[#FAF8F5]">
                        {selectedPhoto.fabricType}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                    <a
                      href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                        `Hello S.P. Garment, I saw the "${selectedPhoto.title}" design in your gallery. I'd like to know more about getting a similar garment tailored.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#C28E46] hover:bg-[#D4A362] text-[#181614] font-semibold text-xs transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-[#181614]" />
                      <span>Ask About This Design on WhatsApp</span>
                    </a>

                    <div className="text-center text-[11px] text-[#8C8275] space-y-0.5">
                      <div>S.P. Garment · Horampalla, Minuwangoda</div>
                      <div>Phone: 077-8778317 / 011-2283254</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })(),
        document.body
      )}
    </section>
  );
};
