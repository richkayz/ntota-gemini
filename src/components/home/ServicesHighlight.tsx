import React from 'react';
import { Check, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';

interface ServicesHighlightProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
}

export const ServicesHighlight: React.FC<ServicesHighlightProps> = ({ onNavigate, onAddToCart }) => {
  const { services, currency } = useAppStore();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Clear, Configured Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Everything your business needs to move forward.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No ambiguous estimates or arbitrary quotes. Clear deliverables, fixed rates, and direct delivery timelines.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const price = currency === 'UGX' ? service.priceUGX : service.priceUSD;
            const isPopular = service.id === 'srv-starter-web' || service.id === 'srv-pos-inventory';

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                  isPopular
                    ? 'border-2 border-blue-600 shadow-xl bg-white'
                    : 'border border-slate-200 bg-slate-50/50 shadow-xs hover:border-slate-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-6 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">{service.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 pb-1 border-b border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        {formatMoney(price, currency)}
                      </span>
                      {service.isStartingPrice && (
                        <span className="text-xs text-slate-500 font-medium">starting</span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Est. Timeline: {service.timelineEstimate}
                    </span>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {service.deliverables.slice(0, 4).map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    View Details & Deliverables
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        type: 'service',
                        itemId: service.id,
                        title: service.title,
                        priceUGX: service.priceUGX,
                        priceUSD: service.priceUSD,
                        quantity: 1
                      });
                    }}
                    className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Add Service to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Plan Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-heading">Need a tailored turnkey institutional setup?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              From school management systems and multi-branch retail hardware to enterprise custom software, Nyota One architects custom roadmaps starting at UGX 300,000 ($100 USD).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            Request Quotation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
