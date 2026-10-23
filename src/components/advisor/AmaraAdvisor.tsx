import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  Clock,
  RotateCcw,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';

interface AmaraAdvisorProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
}

export const AmaraAdvisor: React.FC<AmaraAdvisorProps> = ({ onNavigate, onAddToCart }) => {
  const { currency, services } = useAppStore();

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form states
  const [businessType, setBusinessType] = useState('');
  const [currentPresence, setCurrentPresence] = useState('');
  const [communicationTools, setCommunicationTools] = useState('');
  const [salesModel, setSalesModel] = useState('');
  const [mainChallenge, setMainChallenge] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [goals, setGoals] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerateAssessment = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType,
          currentPresence,
          communicationTools,
          salesModel,
          mainChallenge,
          budgetRange,
          goals
        })
      });

      const data = await response.json();
      setResult(data);
      setStep(8); // View recommendations
    } catch (e) {
      console.error('Advisor evaluation error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setBusinessType('');
    setCurrentPresence('');
    setCommunicationTools('');
    setSalesModel('');
    setMainChallenge('');
    setBudgetRange('');
    setGoals('');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Amara — AI Business Advisor
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Discover Your Ideal Digital Foundation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Answer 7 quick questions about your business operations. Amara evaluates your bottlenecks and matches you with real, configured Nyota One services and transparent budgets.
          </p>
        </div>

        {/* Multi-Step Questionnaire */}
        {step <= totalSteps && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>QUESTION {step} OF {totalSteps}</span>
                <span>{Math.round((step / totalSteps) * 100)}% COMPLETE</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Business Type */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  What industry or sector best describes your enterprise?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Retail Shop, Boutique or Supermarket',
                    'Professional Services (Law, Consulting, Accounting)',
                    'Healthcare, Pharmacy or Clinic',
                    'School, College or Training Institution',
                    'Wholesale Trading & Distribution',
                    'Hospitality, Travel, Safari or Restaurant',
                    'Construction, Real Estate or Engineering',
                    'Other Growing SME / Startup'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setBusinessType(option);
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        businessType === option
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Current Online Presence */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  What is your current online presence today?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'No online presence whatsoever yet',
                    'Only informal social media (Facebook, Instagram or TikTok)',
                    'An outdated, slow or broken website that needs redesign',
                    'Listed on Google Maps but with unverified details'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setCurrentPresence(option);
                        setStep(3);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        currentPresence === option
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Customer Communication */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  How do you currently communicate with clients and send quotes?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Free personal Gmail or Yahoo addresses (e.g. company@gmail.com)',
                    'Personal WhatsApp and direct mobile phone calls only',
                    'Verified business email domain (info@ourdomain.com)',
                    'Paper delivery of written quotations'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setCommunicationTools(option);
                        setStep(4);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        communicationTools === option
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Sales & Inventory */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  How do you track sales, receipts, and daily stock?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Manual physical paper notebooks and receipt books',
                    'Manual Excel spreadsheets updated at end of day',
                    'A POS machine or software that frequently freezes or fails offline',
                    'We do not carry physical inventory (pure service / consulting)'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSalesModel(option);
                        setStep(5);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        salesModel === option
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Main Operational Challenge */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  What is your biggest operational or digital bottleneck right now?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Losing corporate bids because we look informal without a domain',
                    'Stock pilferage, missing inventory and daily cash shortages',
                    'Nearby buyers search on Google but cannot find our location',
                    'Accepting card and mobile money payments from international clients',
                    'Inconsistent marketing and lack of promotional graphics'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setMainChallenge(option);
                        setStep(6);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        mainChallenge === option
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Budget Range */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  What budget range have you allocated for this digital upgrade?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Under UGX 500,000 (Under $150 USD) — Lean Foundation',
                    'UGX 500,000 – 1,500,000 ($150 – $400 USD) — Standard Growth',
                    'UGX 1,500,000 – 3,500,000 ($400 – $950 USD) — Complete Turnkey System',
                    'Above UGX 3,500,000 ($1,000+ USD) — Enterprise Infrastructure'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setBudgetRange(option);
                        setStep(7);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        budgetRange === option
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Goals & Confirmation */}
            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  What is your primary commercial goal over the next 6 months?
                </h3>
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="e.g. Win institutional corporate bids, eliminate cashier reconciliation errors, and increase store footfall..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="w-full p-3.5 border border-slate-300 rounded-xl text-xs focus:outline-hidden focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAssessment}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    {isLoading ? 'Amara is Analyzing Your Profile...' : 'Generate My Digital Roadmap'}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step > 1 && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  ← Previous question
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-rose-500 hover:text-rose-700 font-medium"
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 8: Structured Assessment Results */}
        {step === 8 && result && (
          <div className="space-y-8 animate-fadeIn">
            {/* Assessment Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                    AMARA ADVISORY ASSESSMENT
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 font-heading mt-2">
                    Custom Roadmap for {businessType}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Audit Another Business
                </button>
              </div>

              {/* Assessment Text */}
              <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                <p>{result.businessAssessment}</p>
              </div>

              {/* Key Bottlenecks */}
              {result.keyBottlenecks && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Primary Operational Bottlenecks Identified:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-800">
                    {result.keyBottlenecks.map((b: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Services Grid */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Recommended Nyota One Packages
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.recommendedServices?.map((srv: any, idx: number) => {
                    const price = currency === 'UGX' ? srv.priceUGX : srv.priceUSD;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              {srv.priority || 'Immediate Priority'}
                            </span>
                            <span className="text-xs font-bold text-slate-900 font-heading">
                              {formatMoney(price, currency)}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 font-heading">{srv.serviceTitle}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{srv.whyItFits}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                          <span className="text-slate-500 text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {srv.estimatedTimeline || '3 to 5 business days'}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              const found = services.find((s) => s.title === srv.serviceTitle);
                              if (found) {
                                onNavigate(`/services/${found.slug}`);
                              } else {
                                onNavigate('/services');
                              }
                            }}
                            className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                          >
                            View Scope
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Suggested Next Steps */}
              {result.suggestedNextSteps && (
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Recommended Implementation Sequence:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {result.suggestedNextSteps.map((stepItem: string, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-100 text-slate-700 space-y-1">
                        <span className="font-bold text-blue-600 block text-[10px]">STEP {idx + 1}</span>
                        <p>{stepItem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Direct Handoff Banner */}
            <div className="p-8 rounded-3xl bg-emerald-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-emerald-800">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  Direct Technical Engineering Handoff
                </span>
                <h3 className="text-xl font-bold font-heading">
                  Ready to deploy these recommendations with Nyota One?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tap below to open WhatsApp with your pre-filled business audit. An executive systems architect will review your scope and provide live onboarding assistance.
                </p>
              </div>

              <a
                href={`https://wa.me/256702086774?text=${encodeURIComponent(
                  result.preparedWhatsAppMessage ||
                    `Hello Nyota One, I completed the Amara Business Advisory audit for my ${businessType}. I would like to get started.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp with Prepared Brief
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
