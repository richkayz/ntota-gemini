import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Globe
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const ContactPage: React.FC = () => {
  const { addLead } = useAppStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceTitle, setServiceTitle] = useState('Starter Business Website');
  const [projectBrief, setProjectBrief] = useState('');
  const [budgetRange, setBudgetRange] = useState('UGX 500,000 - 1,500,000');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);

    // Save authoritative record to store / database first!
    addLead({
      fullName,
      email,
      phone,
      serviceTitle,
      businessName,
      projectBrief,
      budgetRange,
      preferredContact,
      status: 'new'
    });

    setIsSubmitting(false);
    setSubmitted(true);

    // If preferred contact is WhatsApp, open with pre-encoded details
    if (preferredContact === 'whatsapp') {
      const message = `Hello Nyota One, my name is ${fullName} from ${businessName || 'my business'}. I submitted an enquiry for ${serviceTitle}. My phone is ${phone}. Brief: ${projectBrief}`;
      window.open(
        `https://wa.me/256702086774?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Contact & Consultation Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Let's Talk About Your Business
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tell us where your business is today and where you want to take it. We will help you identify the right place to start.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Verified Contact Channels
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Operating under Ordernow Digital Solutions.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/256702086774?text=Hello%20Nyota%20One%2C%20I%20would%20like%20to%20consult%20on%20digital%20business%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex items-start gap-3.5"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                      UGANDA WHATSAPP DESK
                    </span>
                    <span className="text-sm font-bold text-slate-900 block mt-0.5">+256 702 086774</span>
                    <span className="text-[11px] text-slate-500">Instant chat & document sharing</span>
                  </div>
                </a>

                {/* Uganda Phone */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      UGANDA DIRECT CALLS
                    </span>
                    <span className="text-sm font-bold text-slate-900 block mt-0.5">+256 772 023461</span>
                    <span className="text-[11px] text-slate-500">Monday – Saturday: 8:00 AM – 6:30 PM EAT</span>
                  </div>
                </div>

                {/* UK Phone */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <Globe className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      UNITED KINGDOM & DIASPORA DESK
                    </span>
                    <span className="text-sm font-bold text-slate-900 block mt-0.5">+44 747 210 5295</span>
                    <span className="text-[11px] text-slate-500">For international inquiries & USD billing</span>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      OFFICIAL BUSINESS EMAIL
                    </span>
                    <span className="text-sm font-bold text-slate-900 block mt-0.5">support@nyotaone.com</span>
                    <span className="text-[11px] text-slate-500">Proposals, bids & formal tenders</span>
                  </div>
                </div>
              </div>

              {/* Geographic Footprint */}
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                  Active Service Coverage:
                </span>
                <p>
                  Uganda, Kenya, Tanzania, Nigeria, Ghana, United Kingdom, and the United States.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Database-Connected Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Thank you! Your enquiry has been recorded.
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    A record has been safely saved to our database. A Nyota One solution engineer will review your brief and follow up via {preferredContact}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-slate-900 font-heading">
                      Send a Project Brief or Service Enquiry
                    </h2>
                    <p className="text-xs text-slate-500">
                      All submissions are encrypted and reviewed directly by senior solutions architects.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kakooza Patrick"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Victoria Trading Hub"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="patrick@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+256 702 000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Service of Interest</label>
                      <select
                        value={serviceTitle}
                        onChange={(e) => setServiceTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 bg-white"
                      >
                        <option value="Starter Business Website">Starter Business Website (UGX 450,000)</option>
                        <option value="Custom Web & Software Application">Custom Web & Software App (UGX 1,800,000+)</option>
                        <option value="Business Email & Domain Setup">Business Email & Domain Setup (UGX 180,000)</option>
                        <option value="POS & Inventory Machine Setup">POS & Inventory Setup (UGX 850,000)</option>
                        <option value="Google Business & Local Search">Google Business & Local Search (UGX 220,000)</option>
                        <option value="Social Media & Content Engine">Social Media & Content Engine (UGX 350,000)</option>
                        <option value="Strategy Session (Remote)">Strategy Session 60min (UGX 100,000)</option>
                        <option value="Hardware / Shop Equipment Inquiry">Hardware / Shop Equipment Inquiry</option>
                        <option value="Custom Enterprise Plan">Custom Turnkey Enterprise Plan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Estimated Budget Range</label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 bg-white"
                      >
                        <option value="Under UGX 500,000 ($150 USD)">Under UGX 500,000 ($150 USD)</option>
                        <option value="UGX 500,000 - 1,500,000 ($150 - $400 USD)">UGX 500,000 - 1,500,000 ($150 - $400 USD)</option>
                        <option value="UGX 1,500,000 - 3,500,000 ($400 - $950 USD)">UGX 1,500,000 - 3,500,000 ($400 - $950 USD)</option>
                        <option value="Above UGX 3,500,000 ($1,000+ USD)">Above UGX 3,500,000 ($1,000+ USD)</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Project Description or Operational Pain Points
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you are trying to achieve, your timeline, or any specific tools you currently use..."
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-slate-700 mb-1">Preferred Response Method</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="preferred"
                          checked={preferredContact === 'whatsapp'}
                          onChange={() => setPreferredContact('whatsapp')}
                        />
                        <span>WhatsApp (Fastest)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="preferred"
                          checked={preferredContact === 'phone'}
                          onChange={() => setPreferredContact('phone')}
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="preferred"
                          checked={preferredContact === 'email'}
                          onChange={() => setPreferredContact('email')}
                        />
                        <span>Formal Email</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Recording Enquiry...' : 'Save Enquiry & Send Brief'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
