import React, { useState } from 'react';
import {
  Globe,
  Mail,
  BarChart3,
  TrendingUp,
  Headphones,
  Check,
  ArrowRight,
  Filter,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { ServiceItem } from '../../types';

interface ServicesCatalogueProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
  onSelectServiceForOrder: (service: ServiceItem) => void;
}

export const ServicesCatalogue: React.FC<ServicesCatalogueProps> = ({
  onNavigate,
  onAddToCart,
  onSelectServiceForOrder
}) => {
  const { services, currency } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'web', label: 'Websites & Apps' },
    { id: 'email', label: 'Business Email & Domains' },
    { id: 'pos', label: 'POS & Inventory' },
    { id: 'growth', label: 'Google Search & Content' },
    { id: 'consultation', label: 'Advisory & Consultation' }
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Database-Driven Service Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Commercial Digital Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every service is scoped with documented deliverables, transparent configured rates in UGX and USD, and accountable technical delivery schedules.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const price = currency === 'UGX' ? service.priceUGX : service.priceUSD;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {service.category.toUpperCase()}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 font-heading mt-1.5">
                        {service.title}
                      </h2>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                        {formatMoney(price, currency)}
                      </div>
                      {service.isStartingPrice && (
                        <span className="text-[10px] text-slate-400 font-medium">starting price</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Customer Problem Solved */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700">Problem Solved:</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {service.problemSolved}
                    </p>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Included Deliverables:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Delivery: {service.timelineEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    View Scope & FAQs
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onAddToCart({
                          type: 'service',
                          itemId: service.id,
                          title: service.title,
                          priceUGX: service.priceUGX,
                          priceUSD: service.priceUSD,
                          quantity: 1
                        })
                      }
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForOrder(service)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <span>Order Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
