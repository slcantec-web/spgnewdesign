import React from 'react';
import { Scissors, Compass, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface OurPromiseProps {
  onEnquireClick: () => void;
}

export const OurPromise: React.FC<OurPromiseProps> = ({ onEnquireClick }) => {
  const steps = [
    {
      num: '01',
      title: 'විලාසිතාව සහ රෙදි තෝරාගැනීම',
      desc: 'ඔබ කැමති ඩිසයින් එකක photo එකක් හෝ අදහසක් සමඟ රෙදි රැගෙන අප වෙත පැමිණෙන්න.',
      icon: Scissors
    },
    {
      num: '02',
      title: 'මිනුම් ලබාගැනීම',
      desc: 'ඔබේ සිරුරට වඩාත්ම සුවපහසුවෙන් සහ අලංකාරව ගැලපෙන ලෙස අපගේ tailor shop එකේදීම නිවැරදිව මිනුම් ලබාගනු ලැබේ.',
      icon: Compass
    },
    {
      num: '03',
      title: 'රෙදි කපා මැසීම',
      desc: 'පැටර්න් කපා, අවශ්‍ය lining සහ piping යොදා ඉතා පිරිසිදු නිමාවකින් යුතුව මසා නිම කරනු ලැබේ.',
      icon: Sparkles
    },
    {
      num: '04',
      title: 'ඇඳ බලා භාරගැනීම (Fitting)',
      desc: 'ඇඳුම මසා නිම වූ පසු ඇඳ බලා, අවශ්‍ය නම් වෙනස්කම්ද සිදු කර නියමිත දිනටම ලබාදෙනු ලැබේ.',
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
            <span>අපේ සේවාව සිදුවන ආකාරය (Our Process)</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight tracking-tight text-[#FAF8F5] mb-4">
            ඔබ කැමති ඕනෑම ඩිසයින් එකක්,<br />
            <em className="italic text-[#C28E46]">ඔබේම මිනුමට ලස්සනට මසා ගන්න.</em>
          </h2>

          <p className="text-sm sm:text-base text-[#C7BEB3] leading-relaxed font-light">
            S.P. Garment වෙතින් කාන්තා සහ ළමා ඇඳුම් ඔබ කැමති විලාසිතාවකට අනුව, ඔබේ සිරුරට අලංකාරව ගැලපෙන පරිදි උසස් මැහුම් නිමාවකින් යුතුව මසා ගත හැක.
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
              ඇඳුමක් මසා ගැනීමට අවශ්‍යද?
            </h4>
            <p className="text-xs text-[#A89E92]">
              මිනුවන්ගොඩ හොරම්පැල්ලේ අපගේ tailor shop එකට පැමිණෙන්න. නැතහොත් WhatsApp හෝ දුරකථනයෙන් විස්තර විමසන්න.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnquireClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C28E46] hover:bg-[#D4A362] text-[#181614] font-semibold text-xs sm:text-sm transition-colors shrink-0 cursor-pointer"
          >
            <span>විස්තර විමසන්න</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
