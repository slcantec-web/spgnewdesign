import React, { useState } from 'react';
import { Send, MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO } from '../data/tailoringData';
import { EnquiryRecord } from '../types';

interface WhatsAppEnquirySectionProps {
  initialService?: string;
}

export const WhatsAppEnquirySection: React.FC<WhatsAppEnquirySectionProps> = ({
  initialService = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || 'Ladies Wear – Dresses');
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
        message: message.trim() || 'No specific notes provided',
        createdAt: new Date().toISOString(),
      };
      existing.unshift(newRecord);
      localStorage.setItem('spg_enquiries', JSON.stringify(existing.slice(0, 100)));
    } catch (err) {
      console.error('Storage error', err);
    }

    // Format WhatsApp message
    const waText = `*New Tailoring Enquiry – S.P. Garment*\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Phone:* ${phone.trim()}\n` +
      `*Service Required:* ${service}\n` +
      `*Details / Measurements:* ${message.trim() || 'Standard measurement consultation'}\n\n` +
      `_Sent from S.P. Garment Minuwangoda Studio Portal_`;

    const waUrl = `https://wa.me/${STUDIO_INFO.whatsappRaw}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="py-20 md:py-28 bg-[#FAF8F5] relative border-t border-[#E6DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Contact info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#70665A] mb-3">
              <span className="w-6 h-px bg-[#181614]" />
              <span>Get In Touch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#181614] leading-[1.12] mb-6">
              Send an <em className="italic text-[#C28E46]">enquiry.</em>
            </h2>

            <p className="text-sm sm:text-base text-[#524B43] leading-relaxed mb-8 font-light">
              Tell us what you need — a custom dress, saree blouse, flower girl frock, alteration, or pattern modification. We will review your request and get back to you immediately on WhatsApp.
            </p>

            <div className="space-y-4">
              <a
                href={`tel:${STUDIO_INFO.phoneClean}`}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDCF] hover:border-[#181614] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#C28E46] group-hover:bg-[#181614] group-hover:text-[#FAF8F5] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#8C8275] uppercase tracking-wider block">Call Direct</span>
                  <span className="text-sm font-semibold text-[#181614]">{STUDIO_INFO.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FFFFFF] border border-[#E6DDCF] hover:border-[#25D366] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#8C8275] uppercase tracking-wider block">WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-[#181614]">{STUDIO_INFO.whatsapp}</span>
                </div>
              </a>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-[#F0EAE0] border border-[#E0D7C9] text-xs text-[#524B43] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C28E46] shrink-0 mt-0.5" />
              <span>
                <strong>Studio Visit Tip:</strong> If you already have your fabric or reference pictures saved on your phone, bring them along! We have full fitting mirrors and sample catalogs ready.
              </span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E4DCCE] p-6 sm:p-8 lg:p-10 shadow-sm relative">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#181614] mb-2">
                  Enquiry Opened in WhatsApp!
                </h3>
                <p className="text-sm text-[#524B43] max-w-md mx-auto mb-6">
                  Thank you, <strong>{name}</strong>. If WhatsApp did not open automatically, tap the button below to complete sending your message.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-lg border border-[#181614] text-[#181614] hover:bg-[#181614] hover:text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="f-name" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nimasha Fernando"
                    className="w-full px-4 py-3 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all placeholder:text-[#9E9589]"
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
                      className="w-full px-4 py-3 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all placeholder:text-[#9E9589]"
                    />
                  </div>

                  <div>
                    <label htmlFor="f-service" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                      Service Category *
                    </label>
                    <select
                      id="f-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all cursor-pointer"
                    >
                      <optgroup label="Ladies Wear">
                        <option value="Ladies Wear – Dresses">Ladies Wear – Dresses & Gowns</option>
                        <option value="Ladies Wear – Saree Blouse">Ladies Wear – Custom Saree Blouse</option>
                        <option value="Ladies Wear – Skirts & Pants">Ladies Wear – Skirts & Trousers</option>
                        <option value="Ladies Wear – Traditional Salwar">Ladies Wear – Traditional Salwar / Lehenga</option>
                      </optgroup>
                      <optgroup label="Kids Wear">
                        <option value="Kids Wear – Party Frock">Kids Wear – Birthday / Party Frock</option>
                        <option value="Kids Wear – Day Dress & Sets">Kids Wear – Everyday Cotton Sets</option>
                        <option value="Kids Wear – School Uniform">Kids Wear – School / Preschool Uniform</option>
                      </optgroup>
                      <optgroup label="Custom & Alterations">
                        <option value="Custom Design – Customer Photo Reference">Custom Sewing from Photo / Reference</option>
                        <option value="Alteration – Resizing & Hemming">Garment Resizing, Hem & Fit Adjustments</option>
                        <option value="Finishing – Lining & Lace Details">Lining, Ruffles, Piping & Specialty Details</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="f-message" className="block text-xs font-mono font-medium text-[#70665A] uppercase tracking-wider mb-1.5">
                    Describe your garment / fabric details (optional)
                  </label>
                  <textarea
                    id="f-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your fabric, preferred sleeve style, target date, or reference design..."
                    className="w-full px-4 py-3 rounded-lg border border-[#D9D0C3] focus:border-[#181614] focus:ring-1 focus:ring-[#181614] bg-[#FAF8F5] text-[#181614] text-sm outline-none transition-all placeholder:text-[#9E9589]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#181614] hover:bg-[#C28E46] text-[#FAF8F5] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C28E46] group-hover:text-white transition-colors" />
                  <span>Send via WhatsApp (+94 76 831 8149)</span>
                </button>

                <p className="text-[11px] text-center text-[#8C8275] pt-1">
                  We reply promptly with measurement appointment options and estimated completion timing.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
