import React from 'react';
import { Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';

interface PricingPageProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onAddToCart }) => {
  const { services, currency, setCurrency } = useAppStore();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Transparent Investment Schedule
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Clear, Configured Pricing
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All prices are explicitly configured in both UGX and USD with zero hidden conversion marks. What you see is exactly what appears on your official invoice.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setCurrency('UGX')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'UGX' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ugandan Shilling (UGX)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              US Dollar ($ USD)
            </button>
          </div>
        </div>

        {/* Pricing Table View (Section 7 Table) */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Initial Standard Service Rates
              </h2>
              <p className="text-xs text-slate-500">
                Subject to administrative configuration and custom quotation scope.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600">Active Currency: {currency}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="p-4 sm:p-5">Service Solution</th>
                  <th className="p-4 sm:p-5">Rate (UGX)</th>
                  <th className="p-4 sm:p-5">Rate (USD)</th>
                  <th className="p-4 sm:p-5">Estimated Timeline</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((srv) => {
                  const isHighlighted = srv.id === 'srv-starter-web' || srv.id === 'srv-pos-inventory';
                  return (
                    <tr
                      key={srv.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isHighlighted ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td className="p-4 sm:p-5">
                        <div className="font-bold text-slate-900 text-sm">{srv.title}</div>
                        <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                          {srv.shortDescription}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">
                        {srv.isStartingPrice ? 'Starting at ' : ''}
                        UGX {srv.priceUGX.toLocaleString()}
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-slate-700">
                        {srv.isStartingPrice ? 'Starting at ' : ''}
                        ${srv.priceUSD}
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 font-medium">
                        {srv.timelineEstimate}
                      </td>
                      <td className="p-4 sm:p-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => onNavigate(`/services/${srv.slug}`)}
                          className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Scope
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onAddToCart({
                              type: 'service',
                              itemId: srv.id,
                              title: srv.title,
                              priceUGX: srv.priceUGX,
                              priceUSD: srv.priceUSD,
                              quantity: 1
                            });
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quotation Policy Note */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Quotation & Milestone Policy
          </h4>
          <p>
            We strictly distinguish fixed-price turnkey services from quotation-based institutional developments. For custom plans, we deliver an authoritative Statement of Work (SOW) outlining milestones, payment phases, and acceptance criteria before receiving any deposit.
          </p>
        </div>
      </div>
    </div>
  );
};
