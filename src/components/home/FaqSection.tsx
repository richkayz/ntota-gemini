import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Nyota One service delivery process work?',
      a: 'We follow a transparent, collaborative 4-step workflow: 1) Initial discovery and requirement confirmation. 2) Live setup sprint where you review progress in real-time. 3) Hands-on testing and verification of emails, forms, or POS hardware. 4) Official handover of master passwords, domain registrar credentials, and staff walkthrough.'
    },
    {
      q: 'Which payment methods are accepted?',
      a: 'We accept PesaPal API 3.0 (supporting MTN Mobile Money, Airtel Money, Visa, Mastercard) as well as direct verified manual payments via bank transfer (Stanbic Bank Uganda UGX/USD) and merchant mobile money code 902144.'
    },
    {
      q: 'Do I get full ownership of my domain and website source code?',
      a: 'Yes, 100%. Unlike restrictive agencies that hold domains hostage, Nyota One registers the domain in your company name and provides full administrative access, DNS controls, and downloadable backups upon completion.'
    },
    {
      q: 'Does your Point-of-Sale (POS) system work during internet cuts?',
      a: 'Yes. Our POS systems (such as Nyota Stores and Sunmi hardware) feature an offline-first cache. Cashiers can continue barcode scanning, generating thermal receipts, and opening cash drawers without an active internet connection. All sales sync to the master database once connection resumes.'
    },
    {
      q: 'Can Nyota One support diaspora clients in the UK, US, and East Africa?',
      a: 'Yes. We frequently serve clients in the UK, United States, Kenya, Tanzania, Nigeria, and Ghana. We provide multi-currency billing in USD and UGX, international wire coordination, and remote video consultations via Google Meet.'
    },
    {
      q: 'How quickly is the Business Email and Starter Website delivered?',
      a: 'Corporate Business Email and domain security records (SPF, DKIM, DMARC) are fully activated within 24 hours. Starter Business Websites are delivered in 3 to 5 business days upon receiving your brand assets.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about working with Nyota One.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:text-blue-600 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900 font-heading">Have a specific question about your project?</h4>
            <p className="text-xs text-slate-500">Our engineering desk in Kampala is on call to assist.</p>
          </div>
          <a
            href="https://wa.me/256702086774?text=Hello%20Nyota%20One%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
