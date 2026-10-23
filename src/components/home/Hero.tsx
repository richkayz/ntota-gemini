import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe, Sparkles, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [domainQuery, setDomainQuery] = useState('');

  const handleDomainSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domainQuery.trim()) {
      onNavigate(`/domains?q=${encodeURIComponent(domainQuery.trim())}`);
    } else {
      onNavigate('/domains');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Subtle Star & Glow Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Brand Messaging */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              DIGITAL SOLUTIONS FOR BUSINESS
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading leading-tight">
              Your business has a future.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Let's build the digital foundation for it.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              From your first website and professional business email to the systems that manage sales, stock and customers, Nyota One brings the right digital tools together to help your business move forward.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-1px]"
              >
                Get Your Business Online
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-sm font-semibold transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
              >
                Explore Our Services
              </button>
            </div>

            {/* Domain Availability Quick Search Mini-Bar */}
            <div className="pt-4 max-w-xl">
              <form
                onSubmit={handleDomainSearchSubmit}
                className="p-1.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center gap-2 shadow-inner"
              >
                <div className="pl-3 text-slate-400">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Find your business name (e.g. yourcompany.co.ug)"
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden py-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  Check Domain
                </button>
              </form>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 px-1">
                <span>Supported extensions:</span>
                <span className="text-slate-300 font-medium">.co.ug (UGX 110,000)</span>
                <span>·</span>
                <span className="text-slate-300 font-medium">.com ($18 / UGX 65,000)</span>
                <span>·</span>
                <span className="text-slate-300 font-medium">.org</span>
              </div>
            </div>

            {/* Supporting 4 Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Practical solutions</span>
                </div>
                <p className="text-[11px] text-slate-400">For real businesses</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Start with what you need</span>
                </div>
                <p className="text-[11px] text-slate-400">No forced bloated costs</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Room to grow</span>
                </div>
                <p className="text-[11px] text-slate-400">Scale as revenue expands</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Support where offered</span>
                </div>
                <p className="text-[11px] text-slate-400">Direct human assistance</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Business Foundation Interactive Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 p-6 shadow-2xl space-y-6">
              {/* Badge strip */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Nyota Foundation Stack</h3>
                    <p className="text-[11px] text-slate-400">Turnkey Enterprise Setup</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  Active in UG & Global
                </span>
              </div>

              {/* Four Foundation Steps Preview */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Starter Business Website</p>
                      <p className="text-[11px] text-slate-400">Custom 5-page responsive · Free domain</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">UGX 450,000</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Business Email & Custom Domain</p>
                      <p className="text-[11px] text-slate-400">5 corporate inboxes · SPF/DKIM secured</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">UGX 180,000</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">POS & Inventory Machine Setup</p>
                      <p className="text-[11px] text-slate-400">Barcode scanner · Thermal receipts · Offline</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">UGX 850,000</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Verified Local Mobile Money & Cards</p>
                      <p className="text-[11px] text-slate-400">PesaPal 3.0 · MTN · Airtel · Visa/Mastercard</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Integrated</span>
                </div>
              </div>

              {/* Advisor Callout in Hero */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/advisor')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Not sure where to start? Ask Amara AI Advisor
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
