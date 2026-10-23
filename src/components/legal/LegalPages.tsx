import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'refund' | 'shipping';
  onNavigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    refund: 'Refund & Cancellation Policy',
    shipping: 'Shipping & Delivery Policy'
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Legal Compliance & Governance
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              {titles[type]}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Nyota One, operating under Ordernow Digital Solutions · Effective Date: January 1, 2026
            </p>
          </div>

          <div className="prose prose-slate text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
            {type === 'privacy' && (
              <>
                <p>
                  Nyota One ("we", "our", or "the Platform") respects your personal data. This Privacy Policy details how we collect, store, and process client information when you use our website, consult with our advisors, or purchase digital products and hardware.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">1. Information We Collect</h3>
                <p>
                  We collect names, commercial email addresses, telephone/WhatsApp numbers, billing addresses, and technical project brief requirements submitted via our order and enquiry forms.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">2. Use of Information</h3>
                <p>
                  Information collected is strictly utilized to provision domains, configure corporate email systems, deploy Point-of-Sale hardware, generate authoritative A4 invoices, and verify transactions processed via PesaPal API 3.0 or banking channels.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">3. Security & Data Protection</h3>
                <p>
                  All transactional communication is secured via modern TLS encryption. We do not store raw credit card numbers or Mobile Money PINs on our servers; payments are processed directly through certified PesaPal 3.0 and banking gateways.
                </p>
              </>
            )}

            {type === 'terms' && (
              <>
                <p>
                  By accessing the Nyota One platform or commissioning digital services, you agree to these Terms of Service.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">1. Services Scope & Milestones</h3>
                <p>
                  Each fixed-price service package outlines clear inclusions and exclusions. Custom plans and institutional software deployments are governed by a mutually executed Statement of Work (SOW).
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">2. Ownership of Domains and Code</h3>
                <p>
                  Upon verified settlement of invoice amounts, the client holds 100% full administrative ownership of registered domains and bespoke application source code. Nyota One does not hold client assets hostage.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">3. Payment Terms</h3>
                <p>
                  All orders are invoiced in the selected currency (UGX or USD). Work commences upon receipt of confirmed gateway settlement or finance team clearance for manual wire transfers.
                </p>
              </>
            )}

            {type === 'refund' && (
              <>
                <p>
                  We strive for total client satisfaction through our transparent, collaborative build process.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">1. Physical Hardware Products</h3>
                <p>
                  POS machines, barcode scanners, and CCTV hardware that exhibit factory defects may be returned within 7 to 14 days of receipt for immediate replacement or repair under official manufacturer warranty.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">2. Turnkey Digital Services</h3>
                <p>
                  Because domain registration fees and server provisioning involve non-recoverable third-party registry charges, domain purchases are non-refundable once activated with the registrar. If service delivery fails to meet the agreed Statement of Work, our finance desk reviews refund applications within 5 business days.
                </p>
              </>
            )}

            {type === 'shipping' && (
              <>
                <p>
                  Nyota One delivers physical POS terminals, receipt printers, CCTV equipment, and computer systems across Uganda and internationally.
                </p>
                <h3 className="text-base font-bold text-slate-900 font-heading">1. Delivery Zones & Timelines</h3>
                <p>
                  - <strong>Kampala & Entebbe Metropolitan</strong>: Same-day or next-day delivery via direct dispatch (UGX 15,000 / $4).<br />
                  - <strong>Upcountry Uganda</strong> (Jinja, Mbarara, Gulu, Mbale, Fort Portal): 2 to 3 business days via verified courier (UGX 35,000 / $10).<br />
                  - <strong>Office Pickup</strong>: Free collection available at our Kampala office during business hours.<br />
                  - <strong>Digital Products & Licenses</strong>: Instant digital download upon verified payment.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
