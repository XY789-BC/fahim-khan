import React from 'react';
import { Phone, Mail, MessageSquare, Wrench, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ProjectInquiry } from '../types';

interface InquiryHighlightBannerProps {
  inquiry: ProjectInquiry;
  onOpenInquiriesModal: () => void;
}

export const InquiryHighlightBanner: React.FC<InquiryHighlightBannerProps> = ({
  inquiry,
  onOpenInquiriesModal,
}) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Fahim Traders! Regarding inquiry [${inquiry.id}]: Structural welding and iron/steel materials for main gate and solar structures.`
    );
    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
  };

  return (
    <section className="bg-neutral-900 border-b border-neutral-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Info Block */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  Active Project Inquiry
                </span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-xs font-mono-numbers text-neutral-400">Ref: {inquiry.id}</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Preferred: {inquiry.preferredContact}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {inquiry.service} — {inquiry.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-300 max-w-3xl leading-relaxed">
                  "{inquiry.details}"
                </p>
              </div>

              {/* Contact metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-400 pt-1">
                <a
                  href={`tel:${inquiry.phone}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono-numbers font-semibold text-white">{inquiry.phone}</span>
                </a>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{inquiry.email}</span>
                </a>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-amber-400 font-medium">Bin Qasim, Karachi (Nasirabad Mor, near Ataullah Grass)</span>
              </div>
            </div>

            {/* Right Quick Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Submit Project Inquiry</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={onOpenInquiriesModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Manage Inquiries</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
