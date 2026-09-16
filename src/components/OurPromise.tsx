import React from 'react';
import { Scissors, Compass, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface OurPromiseProps {
  onEnquireClick: () => void;
}

export const OurPromise: React.FC<OurPromiseProps> = ({ onEnquireClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Bring Fabric & Design',
      desc: 'Bring your fabric roll, sari piece, or dress material along with any inspiration photo from Pinterest or Instagram.',
      icon: Scissors
    },
    {
      num: '02',
      title: 'Precision Measurements',
      desc: 'We take meticulous individual body measurements in our Minuwangoda studio, accounting for posture and ease.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Pattern & Crafting',
      desc: 'Our master cutter prepares individual patterns and hand-stitches with reinforced seams, soft linings, and neat piping.',
      icon: Sparkles
    },
    {
      num: '04',
      title: 'Trial & Perfect Fit',
      desc: 'Try your custom garment on. Any minor adjustments are completed promptly until you are completely delighted.',
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#181614] text-[#FAF8F5] relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.03] select-none text-[320px] font-serif font-bold text-white">
        ✂
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#C28E46] mb-3">
            <span className="w-6 h-px bg-[#C28E46]" />
            <span>Our Studio Promise</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-[#FAF8F5] mb-6">
            Bring your fabric. Bring your design.<br />
            <em className="italic text-[#C28E46]">We craft it for you.</em>
          </h2>

          <p className="text-base sm:text-lg text-[#C7BEB3] leading-relaxed font-light">
            At S.P. Garment, we specialise exclusively in custom tailoring for ladies and kids. Bring your own fabric, tell us your vision, and we will take exact measurements, adapt or draft the pattern, and sew your garment with meticulous care.
          </p>

          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs sm:text-sm text-[#C28E46] tracking-wider uppercase">
            Your Fabric · Your Measurements · Your Design · Our Craft
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-xl bg-[#23201C] border border-white/10 hover:border-[#C28E46]/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#C28E46] font-semibold tracking-wider">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#2E2A25] text-[#C28E46] flex items-center justify-center group-hover:bg-[#C28E46] group-hover:text-[#181614] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#FAF8F5] mb-2 group-hover:text-[#C28E46] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A89E92] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Studio quick action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-[#23201C]/80 border border-white/10">
          <div>
            <h4 className="font-serif text-lg text-white font-semibold">
              Have fabric ready at home?
            </h4>
            <p className="text-xs sm:text-sm text-[#A89E92]">
              Visit our studio in Horampalla, Minuwangoda or send photos over WhatsApp for initial consultation.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnquireClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C28E46] hover:bg-[#D4A362] text-[#181614] font-semibold text-xs sm:text-sm transition-colors shrink-0 cursor-pointer"
          >
            <span>Consult Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
