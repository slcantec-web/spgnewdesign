import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'Ladies Wear (කාන්තා ඇඳුම්)',
    'Custom Tailoring (නියමිත මිනුමට මැසීම)',
    'Kids Frocks (ළමා ඇඳුම්)',
    'Saree Blouses (සාරි හැට්ට)',
    'Fit Alterations (ඇඳුම් හරිගැස්වීම)',
    'Design & Finishing (Lace & Piping)',
    'Pattern Drafting (රටා කැපීම)',
    'Occasion Gowns (උත්සව ඇඳුම්)',
    'School Uniforms (පාසල් ඇඳුම්)',
  ];

  return (
    <div className="border-y border-[#E6DDD0] py-3.5 bg-[#F5EFE6] overflow-hidden select-none [contain:paint]">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-serif text-base sm:text-lg text-[#181614] tracking-wide">
              {item.includes('Tailoring') || item.includes('Craft') || item.includes('Finishing') ? (
                <em className="italic text-[#C28E46]">{item}</em>
              ) : (
                item
              )}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C28E46]" />
          </div>
        ))}
      </div>
    </div>
  );
};
