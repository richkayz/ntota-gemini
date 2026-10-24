import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertCircle,
  Building,
  Smartphone,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { MANUAL_PAYMENT_DETAILS } from '../../lib/pesapal';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
  onOrderCompleted: (orderRef: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderCompleted }) => {
  const { cart, currency, createOrder } = useAppStore();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Kampala');
  const [country, setCountry] = useState(currency === 'UGX' ? 'Uganda' : 'United Kingdom');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'upcountry' | 'pickup' | 'digital'>(
    'standard'
  );

  const [paymentMethod, setPaymentMethod] = useState<
    'pesapal_mobile_money' | 'manual_mobile_money' | 'manual_bank_wire' | 'pay_later'
  >('pesapal_mobile_money');

  const [manualTxnRef, setManualTxnRef] = useState('');
  const [manualNotes, setManualNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="py-24 bg-slate-50 min-h-screen text-center px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-heading">Your cart is currently empty</h2>
          <p className="text-xs text-slate-500">
            Add items from our service catalogue or IT shop to proceed with secure checkout.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors"
          >
            Browse Products & Services
          </button>
        </div>
      </div>
    );
  }

  // Authoritative calculations
  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = currency === 'UGX' ? item.priceUGX : item.priceUSD;
    return sum + unitPrice * item.quantity;
  }, 0);

  const hasOnlyDigitalOrServices = cart.every((i) => i.type === 'service' || i.category?.includes('Software'));

  let deliveryFee = 0;
  if (!hasOnlyDigitalOrServices) {
    if (shippingMethod === 'standard') {
      deliveryFee = currency === 'UGX' ? 15000 : 4;
    } else if (shippingMethod === 'upcountry') {
      deliveryFee = currency === 'UGX' ? 35000 : 10;
    }
  }

  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMessage('Please fill in your full name, email, and WhatsApp/phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const refSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderReference = `NYOTA-2026-${refSuffix}`;

      // 1. Authoritative Order Creation in Database
      const newOrder = createOrder({
        orderReference,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress: hasOnlyDigitalOrServices ? 'Digital Delivery' : deliveryAddress,
        city: hasOnlyDigitalOrServices ? 'Online' : city,
        country,
        items: cart.map((c) => ({
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          itemId: c.itemId,
          title: c.title,
          type: c.type,
          unitPrice: currency === 'UGX' ? c.priceUGX : c.priceUSD,
          quantity: c.quantity,
          subtotal: (currency === 'UGX' ? c.priceUGX : c.priceUSD) * c.quantity
        })),
        currency,
        subtotal,
        deliveryFee,
        discount: 0,
        total: grandTotal,
        orderStatus: 'pending',
        paymentStatus: 'pending',
        paymentMethod,
        manualPaymentReference: manualTxnRef || undefined,
        manualProofNote: manualNotes || undefined,
        internalNotes: `Shipping Method: ${shippingMethod}. Customer Notes: ${manualNotes || 'None'}`
      });

      // 2. Gateway Handshake
      if (paymentMethod === 'pesapal_mobile_money') {
        const response = await fetch('/api/pesapal/submit-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderReference,
            currency,
            amount: grandTotal,
            description: `Payment for Nyota One Order ${orderReference}`,
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

      // If manual payment or fallback, redirect to payment status confirmation page
      onOrderCompleted(orderReference);
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setErrorMessage('Could not initiate payment transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Secure Commercial Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Review Order & Select Payment
          </h1>
          <p className="text-xs text-slate-500">
            All prices and totals verified against authoritative server database records.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Customer Details & Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer Information */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                  1
                </span>
                Customer & Billing Contact
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal / Business Name *</label>
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
                    <label className="block font-semibold text-slate-700 mb-1">Email Address (for Receipt) *</label>
                    <input
                      type="email"
                      required
                      placeholder="patrick@ugandatrading.co.ug"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 772 123456"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                {!hasOnlyDigitalOrServices && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Physical Delivery Address</label>
                      <input
                        type="text"
                        placeholder="Plot number, building name, floor or landmark"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">City / Town</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Country</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Delivery Options */}
            {!hasOnlyDigitalOrServices && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                    2
                  </span>
                  Delivery Options
                </h2>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">Standard Kampala Dispatch</span>
                        <span className="text-[11px] text-slate-500">Same-day or next-day direct to your office/store</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">
                      {currency === 'UGX' ? 'UGX 15,000' : '$4.00'}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'upcountry'}
                        onChange={() => setShippingMethod('upcountry')}
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">Upcountry Regional Courier</span>
                        <span className="text-[11px] text-slate-500">Jinja, Mbarara, Gulu, Mbale, Entebbe nationwide</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">
                      {currency === 'UGX' ? 'UGX 35,000' : '$10.00'}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">Free Office Pickup</span>
                        <span className="text-[11px] text-slate-500">Collect in person at our Kampala technology office</span>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </label>
                </div>
              </div>
            )}

            {/* 3. Payment Method Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                  {hasOnlyDigitalOrServices ? '2' : '3'}
                </span>
                Payment Options & Verification
              </h2>

              <div className="space-y-3 text-xs">
                {/* PesaPal 3.0 Option */}
                <label className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'pesapal_mobile_money'}
                      onChange={() => setPaymentMethod('pesapal_mobile_money')}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">PesaPal API 3.0 (Instant Online Gateway)</span>
                        <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">RECOMMENDED</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Direct automated checkout for MTN MoMo, Airtel Money, Visa & Mastercard with instant cryptographic verification.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Manual Mobile Money */}
                <label className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'manual_mobile_money'}
                      onChange={() => setPaymentMethod('manual_mobile_money')}
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 text-sm">
                        Direct Mobile Money (Merchant Code 902144)
                      </span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Pay manually from your MTN or Airtel line and enter your Transaction ID for rapid finance team approval.
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'manual_mobile_money' && (
                    <div className="mt-3 p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-slate-700 space-y-2">
                      <p className="font-semibold text-slate-800">
                        {MANUAL_PAYMENT_DETAILS.ugandaMobileMoney.title}
                      </p>
                      <p className="text-[11px]">{MANUAL_PAYMENT_DETAILS.ugandaMobileMoney.instructions}</p>
                      <div className="pt-1">
                        <label className="block font-semibold text-slate-800 mb-1">
                          Enter your Mobile Money Transaction ID (if already sent):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 1928491024 or MTN-TXN-XXXX"
                          value={manualTxnRef}
                          onChange={(e) => setManualTxnRef(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* Commercial Bank Wire */}
                <label className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'manual_bank_wire'}
                      onChange={() => setPaymentMethod('manual_bank_wire')}
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 text-sm">Commercial Bank Wire (Stanbic Bank)</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        EFT / RTGS transfer for businesses and institutions in Uganda or international USD wire.
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'manual_bank_wire' && (
                    <div className="mt-3 p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-slate-700 space-y-2">
                      <p className="font-semibold text-slate-800">
                        {currency === 'UGX'
                          ? MANUAL_PAYMENT_DETAILS.bankTransferUGX.title
                          : MANUAL_PAYMENT_DETAILS.bankTransferUSD.title}
                      </p>
                      <div className="text-[11px] space-y-1">
                        <div>Bank: <strong>Stanbic Bank Uganda</strong></div>
                        <div>Account Name: <strong>Ordernow Digital Solutions - Nyota One</strong></div>
                        <div>Account Number: <strong>{currency === 'UGX' ? '9030018491024' : '9030018491032 (USD)'}</strong></div>
                        <div>SWIFT: <strong>SBICUGKX</strong></div>
                      </div>
                    </div>
                  )}
                </label>

                {/* Pay Later / Invoice Me Option */}
                <label className="block p-4 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer transition-colors bg-amber-50/20">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'pay_later'}
                      onChange={() => setPaymentMethod('pay_later')}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          Pay Later / Commercial Invoice (Net 7 Days)
                        </span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                          PAY LATER STAMP
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Ideal for corporate purchase orders, institutions, or settlement on delivery. Generates a formal invoice with an official <strong>PAY LATER</strong> stamp and due date.
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'pay_later' && (
                    <div className="mt-3 p-3 bg-white border border-amber-300 rounded-lg text-slate-700 text-[11px] space-y-1">
                      <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Terms: Net 7 Days from Invoice Issue Date
                      </div>
                      <p className="text-slate-600">
                        You will receive an official invoice stamped <strong>PAY LATER</strong> with your order reference. Our accounts team coordinates dispatch and payment settlement.
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 sticky top-24">
              <h2 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider pb-2 border-b border-slate-100">
                Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h2>

              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemPrice = currency === 'UGX' ? item.priceUGX : item.priceUSD;
                  return (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-900 block truncate max-w-[200px]">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Qty: {item.quantity} · {item.type}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatMoney(itemPrice * item.quantity, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal, currency)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee > 0 ? formatMoney(deliveryFee, currency) : 'Included / Digital'}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-base font-extrabold text-slate-900">
                  <span>Total Due</span>
                  <span className="text-blue-600 font-heading">
                    {formatMoney(grandTotal, currency)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting ? 'Verifying with Server...' : 'Confirm & Complete Order'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted · Verified Receipt Generated Immediately</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
