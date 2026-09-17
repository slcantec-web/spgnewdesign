import React, { useState } from 'react';
import { Send, MessageCircle, Phone, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';
import { EnquiryRecord } from '../types';
import { submitServerEnquiry } from '../services/apiSync';

interface WhatsAppEnquirySectionProps {
  initialService?: string;
}

export const WhatsAppEnquirySection: React.FC<WhatsAppEnquirySectionProps> = ({
  initialService = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || 'Ladies Wear – Dresses & Gowns');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Save locally for Studio Admin dashboard
    try {
      const existing: EnquiryRecord[] = JSON.parse(
        localStorage.getItem('spg_enquiries') || '[]'
      );
      const newRecord: EnquiryRecord = {
        id: 'enq_' + Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        service,
        message: message.trim() || 'No specific notes',
        createdAt: new Date().toISOString(),
      };
      existing.unshift(newRecord);
      localStorage.setItem('spg_enquiries', JSON.stringify(existing.slice(0, 100)));
      // Central server sync so inquiry is immediately visible in admin dashboard on PC and mobile
      submitServerEnquiry(newRecord).catch(() => {});
    } catch (err) {
      console.error('Storage error', err);
    }

    // Format WhatsApp message
    const waText = `*New Tailoring Enquiry – S.P. Garment*\n\n` +
      `*Customer Name:* ${name.trim()}\n` +
      `*Phone Number:* ${phone.trim()}\n` +
      `*Service Requested:* ${service}\n` +
      `*Details:* ${message.trim() || 'Enquiry about pricing and measurements'}\n\n` +
      `_Sent from the S.P. Garment Minuwangoda website_`;

    const waUrl = `https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="py-16 md:py-24 bg-[#FAF8F5] relative border-t border-[#E6DDD0] cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Context & Contact info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#70665A] mb-2.5">
              <span className="w-6 h-px bg-[#181614]" />
              <span>Contact Us</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#181614] leading-[1.15] mb-5">
              Send an <em className="italic text-[#C28E46]">enquiry.</em>
            </h2>

            <p className="text-sm sm:text-base text-[#524B43] leading-relaxed mb-6 font-normal">
              Send us the details of the dress, saree blouse, kids' outfit or alteration you need. We'll get back to you quickly via WhatsApp or phone.
            </p>

            <div className="space-y-3">
              {/* Mobile Phone Card */}
              <a
                href={`tel:${STUDIO_INFO.mobileClean}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E6DDCF] hover:border-[#181614] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#C28E46] group-hover:bg-[#181614] group-hover:text-[#FAF8F5] transition-colors">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8C8275] uppercase tracking-wider block">Mobile Call</span>
                  <span className="text-sm font-semibold text-[#181614]">{STUDIO_INFO.mobile}</span>
                </div>
              </a>

              {/* Landline Phone Card */}
              <a
                href={`tel:${STUDIO_INFO.phoneClean}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E6DDCF] hover:border-[#181614] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#C28E46] group-hover:bg-[#181614] group-hover:text-[#FAF8F5] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8C8275] uppercase tracking-wider block">Landline Call</span>
                  <span className="text-sm font-semibold text-[#181614]">{STUDIO_INFO.phone}</span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E6DDCF] hover:border-[#25D366] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8C8275] uppercase tracking-wider block">Direct WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-[#181614]">{STUDIO_INFO.whatsapp}</span>
                </div>
              </a>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#F0EAE0] border border-[#E0D7C9] text-xs text-[#524B43] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C28E46] shrink-0 mt-0.5" />
              <span>
                <strong>Tip:</strong> Bring any design photo you like along with your fabric to our tailor shop. We'll go over the details and take your measurements on the spot.
              </span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E4DCCE] p-5 sm:p-8 shadow-sm relative">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#181614] mb-2">
                  Your message has been sent to WhatsApp!
                </h3>
                <p className="text-sm text-[#524B43] max-w-md mx-auto mb-6">
                  Thank you, <strong>{name}</strong>. If WhatsApp didn't open automatically, please try again.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-lg border border-[#181614] text-[#181614] hover:bg-[#181614] hover:text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="f-name" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nimasha Fernando"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all placeholder:text-[#9E9589]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f-phone" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07X XXX XXXX"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all placeholder:text-[#9E9589]"
                    />
                  </div>

                  <div>
                    <label htmlFor="f-service" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                      Service Needed *
                    </label>
                    <select
                      id="f-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all cursor-pointer"
                    >
                      <optgroup label="Ladies Wear">
                        <option value="Ladies Wear – Dresses & Gowns">Ladies Wear – Dresses & Gowns</option>
                        <option value="Ladies Wear – Saree Blouse">Ladies Wear – Custom Saree Blouse</option>
                        <option value="Ladies Wear – Skirts & Pants">Ladies Wear – Skirts & Trousers</option>
                        <option value="Ladies Wear – Traditional Salwar">Ladies Wear – Salwar / Lehenga</option>
                      </optgroup>
                      <optgroup label="Kids Wear">
                        <option value="Kids Wear – Birthday Frock">Kids Wear – Birthday / Party Frock</option>
                        <option value="Kids Wear – Casual Dresses">Kids Wear – Everyday Cotton Sets</option>
                        <option value="Kids Wear – School Uniform">Kids Wear – School / Preschool Uniform</option>
                      </optgroup>
                      <optgroup label="Custom & Alterations">
                        <option value="Custom Design – Reference Photo">Custom Sewing from Photo / Reference</option>
                        <option value="Alteration – Resizing & Hemming">Garment Resizing, Hem & Fit Adjustments</option>
                        <option value="Finishing – Lining & Lace Details">Lining, Ruffles, Piping & Specialty Details</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="f-message" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                    Further Details (optional)
                  </label>
                  <textarea
                    id="f-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="The design you want, sleeve style, needed date, or anything else..."
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all placeholder:text-[#9E9589]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4 text-[#C28E46] group-hover:text-white transition-colors shrink-0" />
                  <span>Send WhatsApp Message</span>
                  <span className="hidden sm:inline text-xs font-mono text-[#D9C4A6] font-normal">(+94 76 831 8149)</span>
                </button>

                <p className="text-[11px] text-center text-[#8C8275] pt-0.5">
                  We'll get back to you quickly with measurements, pricing and the expected completion date.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
