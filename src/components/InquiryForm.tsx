import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ProjectInquiry } from '../types';

interface InquiryFormProps {
  onSubmitInquiry: (inquiry: Omit<ProjectInquiry, 'id' | 'timestamp' | 'status'>) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ onSubmitInquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'STRUCTURAL WELDING',
    scope: 'Residential Home Fabrication & Materials',
    preferredContact: 'Phone' as 'Phone' | 'WhatsApp' | 'Email',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your Name and Contact Phone Number.');
      return;
    }

    setErrorMsg('');
    onSubmitInquiry({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || 'fahimkhan234568@gmail.com',
      service: formData.service,
      scope: formData.scope,
      preferredContact: formData.preferredContact,
      details: formData.details.trim() || 'Need iron/steel materials and structural welding for main gate and solar structure.'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'STRUCTURAL WELDING',
        scope: 'Residential Home Fabrication & Materials',
        preferredContact: 'Phone',
        details: ''
      });
    }, 5000);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `*FAHIM TRADERS INQUIRY*\n` +
      `*Name:* ${formData.name || 'Customer'}\n` +
      `*Phone:* ${formData.phone || '03000127565'}\n` +
      `*Service Required:* ${formData.service}\n` +
      `*Details:* ${formData.details || 'We have all iron and steel materials needed to make home like main gate, solar structure etc'}`
    );
    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Company Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Direct Workshop & Depot Line
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Connect with FAHIM TRADERS
              </h2>
              <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                Contact us directly for site inspections, structural engineering consultations, wholesale iron/steel quotes, and custom architectural gate fabrication.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <a
                href="tel:03000127565"
                className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Phone Line (Fahim Khan)</div>
                  <div className="text-base font-bold text-white font-mono-numbers">0300-0127565</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Available for Calls & WhatsApp</div>
                </div>
              </a>

              <a
                href="mailto:fahimkhan234568@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Official Inquiries Email</div>
                  <div className="text-sm font-semibold text-white">fahimkhan234568@gmail.com</div>
                  <div className="text-[11px] text-neutral-500">Drawings & PDF specifications accepted</div>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Workshop & Materials Depot</div>
                    <div className="text-sm font-bold text-white">Nasirabad Mor, Near Ataullah Grass</div>
                    <div className="text-xs text-amber-400 font-medium">Bin Qasim, Karachi, Pakistan</div>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      Landmark: Near Ataullah Grass · Daily dispatch across all Karachi areas
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Nasirabad+Mor+Bin+Qasim+Karachi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="tel:03000127565"
                    className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/60 hover:bg-neutral-750 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp button */}
            <div className="pt-2">
              <button
                onClick={handleDirectWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Quick WhatsApp Chat (0300-0127565)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Submit Project or Material Inquiry
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Provide your project scope or required iron/steel materials. We respond promptly with formal estimates.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Received Successfully!</h4>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you! Your project request has been logged into Fahim Traders' orders desk. Fahim Khan will contact you at <span className="font-mono-numbers text-white font-semibold">{formData.phone || 'your phone'}</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleDirectWhatsApp}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open in WhatsApp for Instant Reply</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-lg text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Your Name / Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FAHIM TRADERS or Client Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-0127565"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono-numbers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="fahimkhan234568@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="STRUCTURAL WELDING">STRUCTURAL WELDING</option>
                      <option value="RESIDENTIAL MAIN GATES">RESIDENTIAL MAIN GATES</option>
                      <option value="SOLAR MOUNTING STRUCTURE">SOLAR MOUNTING STRUCTURE</option>
                      <option value="RAW IRON & STEEL SUPPLY">RAW IRON & STEEL MATERIALS SUPPLY</option>
                      <option value="INDUSTRIAL SHED / TRUSS">INDUSTRIAL SHED / TRUSS</option>
                      <option value="SECURITY GRILLS & BALCONY">SECURITY GRILLS & BALCONY</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4 text-xs text-neutral-300">
                    {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={() => setFormData({ ...formData, preferredContact: method })}
                          className="accent-amber-500"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Project Details & Material Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your requirement (e.g., We have all iron and steel materials needed to make home like main gate, solar structure etc)..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-neutral-500">
                    Direct line: 0300-0127565 · Guaranteed response
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-500/10 whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Project Inquiry</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
