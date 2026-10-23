import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
  onNavigate
}) => {
  const { cart, currency, updateCartQuantity, removeFromCart, clearCart } = useAppStore();

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = currency === 'UGX' ? item.priceUGX : item.priceUSD;
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900 font-heading">Shopping Cart</h2>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our business solutions, IT hardware, and POS machines to add to your order.
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate('/services');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500"
                  >
                    View Services
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate('/shop');
                    }}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200"
                  >
                    Browse Shop
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => {
                  const price = currency === 'UGX' ? item.priceUGX : item.priceUSD;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex gap-3 items-start"
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold uppercase">
                          {item.type}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">{item.title}</h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                          {item.type === 'service' ? 'Service Package' : 'Hardware Product'}
                        </span>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-slate-200 text-slate-600 rounded-l-lg"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-slate-800">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-slate-200 text-slate-600 rounded-r-lg"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold text-slate-900">
                              {formatMoney(price * item.quantity, currency)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-[10px] text-slate-400">
                                {formatMoney(price, currency)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal ({currency})</span>
                <span className="text-base font-bold text-slate-900">{formatMoney(subtotal, currency)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Delivery fees calculated during checkout. PesaPal 3.0 & Mobile Money accepted.
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
