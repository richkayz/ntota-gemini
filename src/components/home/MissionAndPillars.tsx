import React from 'react';
import { Globe, Mail, BarChart3, TrendingUp, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';

interface MissionAndPillarsProps {
  onNavigate: (path: string) => void;
}

export const MissionAndPillars: React.FC<MissionAndPillarsProps> = ({ onNavigate }) => {
  const { currency } = useAppStore();

  const pillars = [
    {
      number: '01',
      title: 'Get Online',
      subtitle: 'Websites, domains, hosting and online stores',
      description:
        'When potential clients search for your services or products, an amateur social media page is not enough to win high-value contracts. We build fast, mobile-friendly websites and commerce portals that establish commercial credibility from the first click.',
      customerBenefit:
        'Turns casual searchers into paying clients, builds institutional trust, and ensures you permanently own your web domain and customer traffic.',
      icon: Globe,
      color: 'blue',
      priceUgx: '450,000',
      priceUsd: '120',
      ctaText: 'Explore Web Solutions',
      path: '/services/starter-business-website'
    },
    {
      number: '02',
      title: 'Communicate Professionally',
      subtitle: 'Business email and customer communication tools',
      description:
        'Enterprise procurement boards, embassies, and corporate clients frequently discard quotes sent from free webmail handles. We set up authenticated corporate inboxes under your company domain with Google Workspace or Microsoft 365.',
      customerBenefit:
        'Eliminates the spam folder risk, protects sensitive client correspondence when employees leave, and elevates your commercial reputation.',
      icon: Mail,
      color: 'indigo',
      priceUgx: '180,000',
      priceUsd: '50',
      ctaText: 'Setup Corporate Email',
      path: '/services/business-email-domain-setup'
    },
    {
      number: '03',
      title: 'Run Your Business Better',
      subtitle: 'POS, inventory, business systems and automation',
      description:
        'Stop losing money to untracked inventory shrinkage, manual paper receipt miscalculations, and end-of-day cash reconciliation headaches. We deploy durable barcode POS systems that work seamlessly both online and offline.',
      customerBenefit:
        'Gives you instant visibility over daily cash takings, alerts you before critical stock runs out, and prevents employee theft.',
      icon: BarChart3,
      color: 'emerald',
      priceUgx: '850,000',
      priceUsd: '230',
      ctaText: 'Explore POS Systems',
      path: '/services/pos-inventory-machine-setup'
    },
    {
      number: '04',
      title: 'Grow Your Presence',
      subtitle: 'Digital content, Google local search and growth support',
      description:
        'Having great products is meaningless if local buyers in your city cannot find your address or phone number. We optimize your Google Business Profile to place your business on Google Maps and produce crisp branded social media assets.',
      customerBenefit:
        'Generates direct inbound phone calls and store visits from customers actively searching for your solutions nearby.',
      icon: TrendingUp,
      color: 'orange',
      priceUgx: '220,000',
      priceUsd: '60',
      ctaText: 'View Growth Engine',
      path: '/services/google-business-local-search'
    }
  ];

  return (
    <div className="space-y-24 py-20">
      {/* 1. Purpose & Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Purpose & Commitment
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Good businesses deserve good digital tools.
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                Many businesses have the skill, the customers and the ambition to grow. What they lack is the right digital support.
              </p>
              <p>
                They need to be found online. They need customers to reach them easily. They need professional communication and better ways to manage everyday work.
              </p>
              <p className="font-semibold text-slate-900">
                That is why Nyota One exists.
              </p>
              <p>
                We make practical technology easier to access, easier to use and easier to grow with — so business owners can spend less time struggling with systems and more time building their businesses.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">No locked-in contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">You own your domain & source code</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Transparent, honest pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Core Solution Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Four Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Built around how real businesses operate.
          </h2>
          <p className="text-slate-600 text-base">
            Instead of piecing together random software from unrelated vendors, Nyota One provides a unified, practical foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const displayPrice = currency === 'UGX' ? `UGX ${pillar.priceUgx}` : `$${pillar.priceUsd}`;

            return (
              <div
                key={pillar.number}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 font-mono tracking-widest">
                      {pillar.number}. PILLAR
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Direct Customer Benefit
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {pillar.customerBenefit}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting from</span>
                    <span className="text-base font-bold text-slate-900">{displayPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(pillar.path)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    {pillar.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
