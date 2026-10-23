import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Printer,
  Download,
  ArrowRight,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore, formatMoney } from '../../lib/store';
import { Order, Invoice } from '../../types';

interface PaymentStatusProps {
  orderReference?: string;
  onNavigate: (path: string) => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ orderReference, onNavigate }) => {
  const { orders, invoices, updatePaymentStatus } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  // Determine current order from URL parameters or prop
  const urlParams = new URLSearchParams(window.location.search);
  const orderRef = orderReference || urlParams.get('OrderMerchantReference') || (orders[0] ? orders[0].orderReference : '');
  const trackingId = urlParams.get('OrderTrackingId') || '';

  const order = orders.find((o) => o.orderReference === orderRef) || orders[0];
  const invoice = invoices.find((inv) => inv.orderReference === orderRef) || invoices[0];

  useEffect(() => {
    // Perform independent verification check with the server endpoint
    const verifyWithServer = async () => {
      if (!order) {
        setIsVerifying(false);
        return;
      }

      if (trackingId) {
        try {
          const res = await fetch(`/api/pesapal/verify/${trackingId}?merchantReference=${orderRef}`);
          const data = await res.json();
          if (data.verified || data.status_code === 1) {
            updatePaymentStatus(order.id, 'completed', trackingId, 'PesaPal 3.0 Verified Gateway');
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
          }
        } catch (e) {
          console.warn('Verification query error:', e);
        }
      } else if (order.paymentStatus === 'completed') {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 }
        });
      }
      setIsVerifying(false);
    };

    verifyWithServer();
  }, [orderRef, trackingId]);

  if (!order) {
    return (
      <div className="py-24 bg-slate-50 min-h-screen text-center px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-heading">No active transaction found</h2>
          <p className="text-xs text-slate-500">
            Please check your email receipt or navigate to the customer portal to view your order history.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const isPaid = order.paymentStatus === 'completed';

  const copyOrderRef = () => {
    navigator.clipboard.writeText(order.orderReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-slate-100/60 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Status Notification Banner (No-print) */}
        <div className="no-print bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isPaid ? (
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 font-heading">
                  {isPaid ? 'Payment Confirmed & Verified' : 'Order Awaiting Verification'}
                </h1>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isPaid ? 'PAID' : 'PENDING'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isPaid
                  ? 'Your transaction has been verified independently. Service onboarding and dispatch have begun.'
                  : 'Your order is recorded in the Nyota One system. Awaiting final clearance from the finance desk.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Invoice (A4)
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/customer/dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Customer Portal
            </button>
          </div>
        </div>

        {/* Professional Printable Navy-and-Gold A4 Invoice Container */}
        <div
          id="invoice-document"
          className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-md space-y-8 print:border-none print:shadow-none print:p-0"
        >
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.83 6.96L22 10.1l-5.3 4.8 1.62 7.1L12 18.25 5.68 22l1.62-7.1L2 10.1l7.17-1.14L12 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                    Nyota One
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Ordernow Digital Solutions</p>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-0.5 pt-2">
                <p>Plot 14, Commercial Complex, Kampala, Uganda</p>
                <p>Support: +256 702 086774 · +256 772 023461</p>
                <p>UK Desk: +44 747 210 5295 · billing@nyotaone.com</p>
                <p>https://nyotaone.com</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="inline-block px-3 py-1 rounded bg-slate-900 text-amber-300 text-xs font-bold uppercase tracking-widest font-heading">
                {isPaid ? 'OFFICIAL RECEIPT' : 'COMMERCIAL INVOICE'}
              </div>
              <div className="text-base font-extrabold text-slate-900 font-mono">
                {invoice ? invoice.invoiceNumber : 'INV-2026-001'}
              </div>
              <div className="text-xs text-slate-500">
                Date: <strong>{order.created_at.split('T')[0]}</strong>
              </div>
              <div className="text-xs text-slate-500 flex items-center sm:justify-end gap-1">
                <span>Order Ref:</span>
                <strong className="text-slate-800 font-mono">{order.orderReference}</strong>
                <button
                  type="button"
                  onClick={copyOrderRef}
                  className="text-slate-400 hover:text-slate-600 no-print"
                  title="Copy reference"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copied && <span className="text-[10px] text-emerald-600 no-print">Copied!</span>}
            </div>
          </div>

          {/* Billed To / Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                BILLED TO:
              </span>
              <p className="text-sm font-bold text-slate-900">{order.customerName}</p>
              <p>{order.customerEmail}</p>
              <p>{order.customerPhone}</p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                FULFILLMENT / DESTINATION:
              </span>
              <p className="text-sm font-semibold text-slate-900">{order.deliveryAddress || 'Digital Service Delivery'}</p>
              <p>{order.city}, {order.country}</p>
              <p className="capitalize">Payment Method: {order.paymentMethod.replace(/_/g, ' ')}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Type</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">{item.title}</td>
                    <td className="p-3 text-center text-slate-500 uppercase text-[10px] font-bold">
                      {item.type}
                    </td>
                    <td className="p-3 text-center font-medium text-slate-700">{item.quantity}</td>
                    <td className="p-3 text-right font-medium text-slate-700">
                      {formatMoney(item.unitPrice, order.currency)}
                    </td>
                    <td className="p-3 text-right font-bold text-slate-900">
                      {formatMoney(item.subtotal, order.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Payment Summary */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-sm text-xs text-slate-500">
              <h4 className="font-bold text-slate-800">Verification & Audit Trail:</h4>
              <p>
                Status: <strong className="uppercase text-slate-900">{order.paymentStatus}</strong>
              </p>
              {order.pesapalTrackingId && (
                <p>
                  PesaPal Tracking ID: <strong className="font-mono text-slate-800">{order.pesapalTrackingId}</strong>
                </p>
              )}
              {order.manualPaymentReference && (
                <p>
                  Submitted Reference: <strong className="font-mono text-slate-800">{order.manualPaymentReference}</strong>
                </p>
              )}
              {order.verifiedBy && (
                <p>
                  Verified By: <strong>{order.verifiedBy}</strong> on {order.verifiedAt?.split('T')[0]}
                </p>
              )}
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatMoney(order.subtotal, order.currency)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery & Logistics</span>
                <span>{formatMoney(order.deliveryFee, order.currency)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Amount</span>
                <span>{formatMoney(order.total, order.currency)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Amount Paid</span>
                <span>{formatMoney(isPaid ? order.total : 0, order.currency)}</span>
              </div>
              <div className="border-t border-slate-200 pt-1 flex justify-between font-bold text-slate-900">
                <span>Balance Due</span>
                <span>{formatMoney(isPaid ? 0 : order.total, order.currency)}</span>
              </div>
            </div>
          </div>

          {/* Invoice Footer Notes */}
          <div className="border-t border-slate-200 pt-6 text-[11px] text-slate-500 space-y-1 leading-relaxed">
            <p className="font-bold text-slate-700">Payment & Delivery Policy:</p>
            <p>
              1. Work commences immediately upon verified receipt of funds or approved quotation terms.
            </p>
            <p>
              2. For any questions regarding this invoice, contact our Kampala finance team at accounts@nyotaone.com or WhatsApp +256 702 086774.
            </p>
            <p className="italic text-slate-400 pt-2">
              "Your business has a future. Let's build the digital foundation for it."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
