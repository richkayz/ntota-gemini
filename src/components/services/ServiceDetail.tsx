import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Shield,
  CreditCard,
  MessageCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { ServiceItem } from '../../types';

interface ServiceDetailProps {
  serviceSlug: string;
  onNavigate: (path: string) => void;
  onOrderInitiated: (orderReference: string) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  serviceSlug,
  onNavigate,
  onOrderInitiated
}) => {
  const { services, currency, createOrder, addLead } = useAppStore();
  const service = services.find((s) => s.slug === serviceSlug) || services[0];

  const price = currency === 'UGX' ? service.priceUGX : service.priceUSD;

  // Checkout / Booking modal state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pesapal_mobile_money' | 'manual_mobile_money' | 'manual_bank_wire'>(
    'pesapal_mobile_money'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    setIsSubmitting(true);

    try {
      // 1. Generate unique merchant reference: NYOTA-2026-XXXX
      const refSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderReference = `NYOTA-2026-${refSuffix}`;

      // 2. Authoritative database creation
      const created = createOrder({
        orderReference,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress: `Digital Delivery / ${businessName || 'Direct Service'}`,
        city: 'Kampala',
        country: currency === 'UGX' ? 'Uganda' : 'International',
        items: [
          {
            id: `item-${Date.now()}`,
            itemId: service.id,
            title: service.title,
            type: 'service',
            unitPrice: price,
            quantity: 1,
            subtotal: price
          }
        ],
        currency,
        subtotal: price,
        deliveryFee: 0,
        discount: 0,
        total: price,
        orderStatus: 'pending',
        paymentStatus: 'pending',
        paymentMethod,
        internalNotes: `Customer Project Brief: ${projectBrief || 'None provided'}`
      });

      // 3. Save as lead record before redirection
      addLead({
        fullName: customerName,
        email: customerEmail,
        phone: customerPhone,
        serviceId: service.id,
        serviceTitle: service.title,
        businessName,
        projectBrief: projectBrief || 'Direct Service Order Form submission',
        preferredContact: 'whatsapp',
        status: 'new'
      });

      // 4. If PesaPal selected, initiate payment
      if (paymentMethod === 'pesapal_mobile_money') {
        const response = await fetch('/api/pesapal/submit-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderReference,
            currency,
            amount: price,
            description: `Payment for Nyota One Service: ${service.title}`,
            customerEmail,
            customerPhone,
            customerName
          })
        });

        const data = await response.json();
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
          return;
        }
      }

      // If manual or simulation, proceed to payment status verification
      onOrderInitiated(orderReference);
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => onNavigate('/services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all services
        </button>

        {/* Main Service Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              {service.category.toUpperCase()} SOLUTION
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              {service.title}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Pricing & Key Bar */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Configured Investment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-heading text-white">
                  {formatMoney(price, currency)}
                </span>
                {service.isStartingPrice && (
                  <span className="text-xs text-slate-400">starting price</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Standard Delivery: {service.timelineEstimate}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowOrderModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              Order This Service
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Problem Solved */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-heading">The Problem This Solves</h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
              {service.problemSolved}
            </div>
          </div>

          {/* Grid: Deliverables vs Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                What is Included
              </h3>
              <ul className="space-y-2.5">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-500" />
                Exclusions & Out of Scope
              </h3>
              <ul className="space-y-2.5">
                {service.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Customer Information */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Information We Will Need to Begin:</h3>
            <div className="flex flex-wrap gap-2">
              {service.requiredInfo.map((info, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                >
                  {info}
                </span>
              ))}
            </div>
          </div>

          {/* Service FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Frequently Asked About This Service</h3>
              <div className="space-y-2">
                {service.faqs.map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {f.q}
                    </p>
                    <p className="text-slate-600 leading-relaxed pl-5">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Order Service</h3>
                <p className="text-xs text-slate-500">{service.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between text-xs">
                <span className="text-blue-900 font-medium">Service Investment:</span>
                <span className="text-sm font-bold text-blue-900 font-heading">
                  {formatMoney(price, currency)}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kakooza Patrick"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="patrick@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 702 000000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business or Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Uganda Trading Hub Ltd"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brief Project Notes / Desired Domain</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us any specific requirements, current website URL, or desired domain name..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'pesapal_mobile_money'}
                        onChange={() => setPaymentMethod('pesapal_mobile_money')}
                      />
                      <div className="text-left">
                        <span className="font-semibold text-slate-900 block">PesaPal 3.0 (Instant Mobile Money / Card)</span>
                        <span className="text-[11px] text-slate-500">Supports MTN MoMo, Airtel Money, Visa & Mastercard</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'manual_mobile_money'}
                        onChange={() => setPaymentMethod('manual_mobile_money')}
                      />
                      <div className="text-left">
                        <span className="font-semibold text-slate-900 block">Direct Mobile Money (Merchant Code 902144)</span>
                        <span className="text-[11px] text-slate-500">Submit transaction reference for manual finance verification</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'manual_bank_wire'}
                        onChange={() => setPaymentMethod('manual_bank_wire')}
                      />
                      <div className="text-left">
                        <span className="font-semibold text-slate-900 block">Bank Wire Transfer (Stanbic Bank)</span>
                        <span className="text-[11px] text-slate-500">For commercial bank transfers in UGX or USD</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Validating Order...' : 'Confirm & Proceed to Payment'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
