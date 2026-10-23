import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Pre-Footer Banner */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
              Your business is moving forward. Make sure your digital tools do too.
            </h3>
            <p className="mt-2 text-slate-400 text-sm">
              Tell us where your business is today and where you want to take it. We will help you identify the right place to start.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              Let's Build Your Business
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/256702086774?text=Hello%20Nyota%20One%2C%20I%20would%20like%20to%20talk%20about%20building%20my%20business%20digital%20foundation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-semibold transition-all border border-slate-700 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Talk to Nyota
            </a>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.83 6.96L22 10.1l-5.3 4.8 1.62 7.1L12 18.25 5.68 22l1.62-7.1L2 10.1l7.17-1.14L12 2z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">Nyota One</span>
              <p className="text-xs text-slate-400">Ordernow Digital Solutions</p>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            "Your business has a future. Let's build the digital foundation for it." Everything your business needs to move forward: websites, corporate email, POS, e-commerce, cloud systems, and IT hardware.
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Uganda Tel: <strong className="text-slate-200">+256 772 023461</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: <strong className="text-slate-200">+256 702 086774</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>UK Office: <strong className="text-slate-200">+44 747 210 5295</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Kampala, Uganda · Serving East Africa, UK, and US</span>
            </div>
          </div>
        </div>

        {/* Pillar 1 & 2 Solutions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Solution Pillars</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                1. Get Online (Web & Stores)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                2. Communicate Professionally
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                3. Run Your Business Better
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                4. Grow Your Presence
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/domains')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Domain Search (.co.ug & .com)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/advisor')}
                className="hover:text-white transition-colors cursor-pointer text-left text-blue-400"
              >
                Amara AI Business Advisor
              </button>
            </li>
          </ul>
        </div>

        {/* Shop & Hardware */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Hardware & Shop</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Mobile POS Terminals
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Desktop Touch POS
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Thermal Receipt Printers
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                CCTV Security Systems
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Business Laptops & PCs
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                POS Software Licenses
              </button>
            </li>
          </ul>
        </div>

        {/* Company & Portals */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Company & Portals</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                About Nyota One
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Our Work & Case Studies
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/pricing')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Service Pricing
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Resources & Blog
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/customer/dashboard')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Customer Portal & Orders
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/dashboard')}
                className="hover:text-white transition-colors cursor-pointer text-left text-slate-300 font-semibold"
              >
                Admin Operations Console
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Payment Security Strip */}
      <div className="border-t border-slate-900 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Nyota One · Ordernow Digital Solutions. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <button
              type="button"
              onClick={() => onNavigate('/privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate('/terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate('/refund-policy')}
              className="hover:text-slate-300 transition-colors"
            >
              Refund Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate('/shipping-policy')}
              className="hover:text-slate-300 transition-colors"
            >
              Shipping Policy
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500">Verified Payments:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">PesaPal 3.0</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">MTN MoMo</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">Airtel Money</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
