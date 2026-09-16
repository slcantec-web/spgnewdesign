import React, { useState } from 'react';
import { Ruler, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { FABRIC_GUIDES, STUDIO_INFO } from '../data/tailoringData';

export const FabricCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Ladies' | 'Kids'>('All');
  const [selectedGarment, setSelectedGarment] = useState<string>(FABRIC_GUIDES[0].garment);

  const filteredGuides = selectedCategory === 'All'
    ? FABRIC_GUIDES
    : FABRIC_GUIDES.filter((g) => g.category === selectedCategory);

  const activeGuide = FABRIC_GUIDES.find((g) => g.garment === selectedGarment) || filteredGuides[0];

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#FAF8F5] relative cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#70665A] mb-2.5">
            <span className="w-6 h-px bg-[#181614]" />
            <span>රෙදි ප්‍රමාණය පිළිබඳ මඟපෙන්වීම (Fabric Guide)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#181614] leading-[1.15]">
            Fabric requirement <em className="italic text-[#C28E46]">estimator.</em>
          </h2>
          <p className="text-sm sm:text-base text-[#665D52] mt-2 font-normal">
            රෙදි මිලදී ගැනීමට පෙර සාරි හැට්ටයක්, ගවුමක් හෝ බබාගේ ඇඳුමක් සඳහා සාමාන්‍යයෙන් අවශ්‍ය වන රෙදි ප්‍රමාණය මෙතැනින් බලාගත හැක.
          </p>
        </div>

        {/* Interactive Selector & Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Garment Selector List */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl border border-[#E6DDCF] p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F0EAE1]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                ඇඳුම් වර්ගය තෝරන්න:
              </span>

              {/* Filter */}
              <div className="flex gap-1">
                {(['All', 'Ladies', 'Kids'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      const matching = cat === 'All' ? FABRIC_GUIDES : FABRIC_GUIDES.filter((g) => g.category === cat);
                      if (matching.length > 0) setSelectedGarment(matching[0].garment);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#181614] text-white'
                        : 'bg-[#F2ECE2] text-[#5C5449] hover:bg-[#E4DCCE]'
                    }`}
                  >
                    {cat === 'All' ? 'සියල්ල' : cat === 'Ladies' ? 'කාන්තා' : 'ළමා'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {filteredGuides.map((guide) => {
                const isSelected = activeGuide.garment === guide.garment;
                return (
                  <button
                    key={guide.garment}
                    type="button"
                    onClick={() => setSelectedGarment(guide.garment)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#181614] text-[#FAF8F5] shadow-xs'
                        : 'hover:bg-[#FAF8F5] text-[#181614] border border-transparent hover:border-[#EAE3D7]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Ruler className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C28E46]' : 'text-[#8C8275]'}`} />
                      <span className="text-xs sm:text-sm font-medium">{guide.garment}</span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/15 text-[#C28E46]' : 'text-[#8C8275]'
                    }`}>
                      {guide.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Output Card */}
          <div className="lg:col-span-7 bg-[#201D1A] text-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg relative overflow-hidden">
            <div className="absolute right-4 top-4 opacity-10">
              <Sparkles className="w-24 h-24 text-[#C28E46]" />
            </div>

            <div className="relative">
              <span className="font-mono text-xs uppercase tracking-wider text-[#C28E46] block mb-2">
                අවශ්‍ය විය හැකි රෙදි ප්‍රමාණය
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-5">
                {activeGuide.garment}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="p-4 rounded-xl bg-[#2A2622] border border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89E92] block mb-1">
                    අවශ්‍ය රෙදි ප්‍රමාණය
                  </span>
                  <div className="text-base sm:text-lg font-serif font-bold text-[#C28E46]">
                    {activeGuide.fabricRequirement}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#2A2622] border border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89E92] block mb-1">
                    ගැලපෙන රෙදි වර්ග
                  </span>
                  <div className="text-xs sm:text-sm text-white font-medium flex flex-wrap gap-1.5 mt-1">
                    {activeGuide.recommendedFabrics.map((fab, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[11px]">
                        {fab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Master Tip */}
              <div className="p-4 rounded-xl bg-[#C28E46]/10 border border-[#C28E46]/30 mb-6 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#C28E46] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#E2DACF] leading-relaxed">
                  <strong className="text-[#C28E46]">විශේෂ උපදෙසක්:</strong> {activeGuide.tip}
                </p>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <p className="text-xs text-[#8C8275]">
                  ඔබේ උස හෝ දරුවාගේ වයස අනුව අවශ්‍ය නිවැරදි ප්‍රමාණය දැනගැනීමට:
                </p>
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(
                    `හෙලෝ S.P. Garment, මට ${activeGuide.garment} එකක් මසා ගැනීමට අවශ්‍යයි. ඒ සඳහා රෙදි කොපමණ ප්‍රමාණයක් මිලදී ගත යුතුද?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C28E46] hover:bg-[#D4A362] text-[#181614] font-semibold text-xs transition-colors shrink-0"
                >
                  <span>WhatsApp එකෙන් විමසන්න</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
