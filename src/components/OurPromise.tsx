import React from 'react';
import { Scissors, Compass, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface OurPromiseProps {
  onEnquireClick: () => void;
}

export const OurPromise: React.FC<OurPromiseProps> = ({ onEnquireClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Style & Fabric',
      desc: 'Bring your fabric along with a photo of the design you like, or just an idea in mind.',
      icon: Scissors
    },
    {
      num: '02',
      title: 'Measurements Taken',
      desc: 'Your exact measurements are taken in-store, for the most comfortable and flattering fit.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Cutting & Sewing',
      desc: 'The pattern is cut, lining and piping are added as needed, and the garment is sewn to a clean finish.',
      icon: Sparkles
    },
    {
      num: '04',
      title: 'Fitting & Handover',
      desc: 'Once finished, the garment is fitted on and adjusted if needed before being handed over on time.',
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#181614] text-[#FAF8F5] relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.03] select-none text-[320px] font-serif font-bold text-white">
        ✂
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#C28E46] mb-3">
            <span className="w-6 h-px bg-[#C28E46]" />
            <span>Our Process</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight tracking-tight text-[#FAF8F5] mb-4">
            Any style you like,<br />
            <em className="italic text-[#C28E46]">tailored to your own measurements.</em>
          </h2>

          <p className="text-sm sm:text-base text-[#C7BEB3] leading-relaxed font-light">
            S.P. Garment tailors Ladies and Kids wear in any style you choose, fitted beautifully to your body with premium sewing finish.
          </p>

          <div className="mt-5 pt-3 border-t border-white/10 font-mono text-xs sm:text-sm text-[#C28E46] tracking-wider uppercase">
            Your Fabric · Your Measurements · Your Design · Our Craft
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 sm:p-6 rounded-xl bg-[#23201C] border border-white/10 hover:border-[#C28E46]/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-mono text-xs text-[#C28E46] font-semibold tracking-wider">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#2E2A25] text-[#C28E46] flex items-center justify-center group-hover:bg-[#C28E46] group-hover:text-[#181614] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#FAF8F5] mb-2 group-hover:text-[#C28E46] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#A89E92] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tailor shop quick action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-[#23201C]/80 border border-white/10">
          <div>
            <h4 className="font-serif text-lg text-white font-semibold">
              Ready to get a garment tailored?
            </h4>
            <p className="text-xs text-[#A89E92]">
              Visit our tailor shop in Horampalla, Minuwangoda, or reach out via WhatsApp or phone for details.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnquireClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C28E46] hover:bg-[#D4A362] text-[#181614] font-semibold text-xs sm:text-sm transition-colors shrink-0 cursor-pointer"
          >
            <span>Send an Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
