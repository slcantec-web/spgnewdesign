import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'Ladies Wear',
    'Custom Tailoring',
    'Kids Frocks',
    'Fit Alterations',
    'Saree Blouse Craft',
    'Design & Finishing',
    'Made to Measure',
    'Pattern Drafting',
    'Occasion Gowns',
  ];

  return (
    <div className="border-y border-[#E6DDD0] py-3.5 bg-[#F5EFE6] overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-serif text-lg md:text-xl text-[#181614] tracking-wide">
              {item.includes('Tailoring') || item.includes('Craft') || item.includes('Measure') ? (
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
