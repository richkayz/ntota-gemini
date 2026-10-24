import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShoppingBag, X, ArrowRight, Package, Layers, AlertCircle, Info } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { ToastNotification as ToastNotificationType } from '../../types';

interface ToastItemProps {
  toast: ToastNotificationType;
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
  onNavigate?: (path: string) => void;
}

const SingleToast: React.FC<ToastItemProps> = ({ toast, onDismiss, onOpenCart, onNavigate }) => {
  const { currency } = useAppStore();
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  const duration = toast.duration || 4500;

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onDismiss(toast.id);
          return 0;
        }
        return Math.max(0, prev - step);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPaused, duration, toast.id, onDismiss]);

  const itemPrice = toast.item
    ? currency === 'UGX'
      ? toast.item.priceUGX
      : toast.item.priceUSD
    : null;

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative overflow-hidden bg-slate-900/95 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 w-full sm:w-[380px] pointer-events-auto"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Info className="w-3.5 h-3.5 text-blue-400" />
            )}
          </div>
          <span className="text-xs font-bold font-heading text-emerald-400 tracking-wide uppercase">
            {toast.title}
          </span>
          {toast.item?.type && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium capitalize">
              {toast.item.type}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Item Visual & Details */}
      {toast.item ? (
        <div className="mt-3 flex items-center gap-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
          {toast.item.imageUrl ? (
            <img
              src={toast.item.imageUrl}
              alt={toast.item.title}
              className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              {toast.item.type === 'service' ? (
                <Layers className="w-6 h-6" />
              ) : (
                <Package className="w-6 h-6" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-100 truncate" title={toast.item.title}>
              {toast.item.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              {typeof itemPrice === 'number' && (
                <span className="text-xs font-extrabold text-blue-400 font-mono">
                  {formatMoney(itemPrice * (toast.item.quantity || 1), currency)}
                </span>
              )}
              {toast.item.quantity && toast.item.quantity > 1 && (
                <span className="text-[10px] text-slate-400 bg-slate-700/60 px-1.5 py-0.2 rounded font-mono">
                  Qty: {toast.item.quantity}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : toast.message ? (
        <p className="mt-2 text-xs text-slate-300 leading-relaxed">{toast.message}</p>
      ) : null}

      {/* Quick Action Buttons */}
      <div className="mt-3.5 flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={() => {
            onDismiss(toast.id);
            if (onOpenCart) onOpenCart();
            else if (onNavigate) onNavigate('/cart');
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer border border-slate-700"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
          View Cart
        </button>

        <button
          type="button"
          onClick={() => {
            onDismiss(toast.id);
            if (onNavigate) onNavigate('/checkout');
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          Checkout
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

interface ToastNotificationContainerProps {
  onOpenCart?: () => void;
  onNavigate?: (path: string) => void;
}

export const ToastNotificationContainer: React.FC<ToastNotificationContainerProps> = ({
  onOpenCart,
  onNavigate
}) => {
  const { toasts, dismissToast } = useAppStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none max-w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <SingleToast
          key={toast.id}
          toast={toast}
          onDismiss={dismissToast}
          onOpenCart={onOpenCart}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};
