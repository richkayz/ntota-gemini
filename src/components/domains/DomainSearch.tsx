import React, { useState, useEffect } from 'react';
import { Search, Globe, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Mail, AlertCircle, Sparkles } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { DomainCheckResult } from '../../types';

interface DomainSearchProps {
  initialQuery?: string;
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
}

export const DomainSearch: React.FC<DomainSearchProps> = ({
  initialQuery = '',
  onNavigate,
  onAddToCart
}) => {
  const { currency } = useAppStore();
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DomainCheckResult[]>([]);
  const [searchedName, setSearchedName] = useState('');
  const [error, setError] = useState('');

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setError('');

    try {
      const response = await fetch('/api/domains/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm })
      });

      const data = await response.json();
      if (data.results) {
        setResults(data.results);
        setSearchedName(data.query);
      } else {
        setError('Could not complete registry check.');
      }
    } catch (e) {
      console.error('Domain search error:', e);
      setError('Domain registry check failed. Please check network connection.');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            Official Domain Registry Gateway
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Register Your Business Domain
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Secure your brand name across <strong>.co.ug</strong>, <strong>.com</strong>, and global extensions. You retain 100% legal ownership and DNS control.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Enter your business name (e.g. kampalatrading)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 text-sm text-slate-900 placeholder-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              {isSearching ? 'Querying Registries...' : 'Check Availability'}
            </button>
          </form>

          {/* Registry Disclaimer required by Section 14 */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
            <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>
              <strong>Regulatory Notice:</strong> Availability checks query global DNS and RDAP registry data. Availability is subject to final registrar confirmation at the moment of order placement.
            </span>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center max-w-lg mx-auto">
            {error}
          </div>
        )}

        {/* Results Table */}
        {results.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Registry Availability for: <span className="text-blue-600 font-mono">"{searchedName}"</span>
              </h3>
              <span className="text-xs text-slate-400">{results.length} extensions evaluated</span>
            </div>

            <div className="divide-y divide-slate-100">
              {results.map((item) => {
                const regPrice = currency === 'UGX' ? item.registrationPriceUGX : item.registrationPriceUSD;
                const renewPrice = currency === 'UGX' ? item.renewalPriceUGX : item.renewalPriceUSD;

                return (
                  <div
                    key={item.domain}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900 font-mono">{item.domain}</span>
                        {item.available ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                            TAKEN
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{item.statusNote}</p>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-slate-900 font-heading">
                          {formatMoney(regPrice, currency)} / 1st year
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Renews at {formatMoney(renewPrice, currency)}/yr
                        </span>
                      </div>

                      {item.available ? (
                        <button
                          type="button"
                          onClick={() => {
                            onAddToCart({
                              type: 'product',
                              itemId: `dom-${item.domain}`,
                              title: `Domain Registration (${item.domain})`,
                              priceUGX: item.registrationPriceUGX,
                              priceUSD: item.registrationPriceUSD,
                              quantity: 1,
                              category: 'Domain & Hosting'
                            });
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          Select & Add to Order
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-xs font-medium cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Business Email & Hosting Bundle Callout */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md max-w-4xl mx-auto">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Recommended Foundation Bundle
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              Need Business Email with your domain?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get your custom domain registered, plus 5 verified corporate inboxes (e.g. info@yourdomain.com) with SPF, DKIM, and DMARC security records for just <strong>UGX 180,000 ($50 USD)</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/services/business-email-domain-setup')}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            Explore Email Bundle
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
