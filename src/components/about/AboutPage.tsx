import React from 'react';
import { ShieldCheck, Target, Zap, Globe, Users, ArrowRight, HeartHandshake } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            About Nyota One
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
            "Your business has a future. Let's build the digital foundation for it."
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Nyota One operates under Ordernow Digital Solutions in Uganda, engineering turnkey digital infrastructure for businesses in East Africa, the United Kingdom, and the United States.
          </p>
        </div>

        {/* Mission & Purpose */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Target className="w-4 h-4" />
            Our Core Purpose
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Good businesses deserve good digital tools.
          </h2>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
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
        </div>

        {/* Four Operating Principles */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 font-heading">How We Build & Support</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
                01
              </span>
              <h4 className="text-base font-bold text-slate-900 font-heading">Practical solutions for real businesses</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We avoid abstract tech jargon, bloated software suites, and speculative promises. Every website, email inbox, and POS machine we deploy directly solves an operational bottleneck.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
                02
              </span>
              <h4 className="text-base font-bold text-slate-900 font-heading">Start with what you need</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You do not need to purchase a giant enterprise package on day one. Start lean with a Starter Website or Business Email, and scale into inventory automation when your revenue warrants it.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
                03
              </span>
              <h4 className="text-base font-bold text-slate-900 font-heading">Room to grow</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All systems are built on open, standards-compliant relational databases, modern React/TypeScript stacks, and secure APIs. You will never be locked into proprietary walled gardens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
                04
              </span>
              <h4 className="text-base font-bold text-slate-900 font-heading">Support where offered</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you call us or message our WhatsApp desk, you speak with a real technical engineer in Kampala or the UK, not an outsourced script reader.
              </p>
            </div>
          </div>
        </div>

        {/* Operating Entity & Trust Strip */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold font-heading">Ordernow Digital Solutions</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nyota One is the flagship enterprise and SME solutions brand of Ordernow Digital Solutions, legally registered in Uganda and serving clients worldwide.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/services')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            Explore Our Services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
