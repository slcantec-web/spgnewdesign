import React from 'react';
import { Phone, MessageCircle, FileText, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#181614] border-t border-white/10 px-3 py-2 flex items-center justify-around text-white/80 shadow-2xl safe-area-pb">
      <a
        href={`tel:${STUDIO_INFO.phoneClean}`}
        className="flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-wider hover:text-[#C28E46] transition-colors"
      >
        <Phone className="w-4 h-4 text-[#C28E46]" />
        <span>Call</span>
      </a>

      <a
        href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-wider hover:text-[#25D366] transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      <a
        href="#enquiry"
        className="flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-wider hover:text-[#C28E46] transition-colors"
      >
        <FileText className="w-4 h-4 text-[#FAF8F5]" />
        <span>Quote</span>
      </a>

      <a
        href="#hours"
        className="flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-wider hover:text-[#C28E46] transition-colors"
      >
        <MapPin className="w-4 h-4 text-[#C28E46]" />
        <span>Studio</span>
      </a>
    </div>
  );
};
