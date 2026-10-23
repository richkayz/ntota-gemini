import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Download
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { ProductItem } from '../../types';

interface ProductDetailProps {
  product: ProductItem;
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onNavigate,
  onAddToCart
}) => {
  const { currency } = useAppStore();
  const [quantity, setQuantity] = useState(1);

  const currentPrice = currency === 'UGX' ? product.priceUGX : product.priceUSD;
  const salePrice = currency === 'UGX' ? product.salePriceUGX : product.salePriceUSD;
  const hasDiscount = salePrice && salePrice < currentPrice;
  const activePrice = hasDiscount ? salePrice : currentPrice;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all shop products
        </button>

        {/* Product Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded">
                Brand: {product.brand}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Delivery: <strong>{product.deliveryEstimate}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Warranty: <strong>{product.warranty}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Returns: <strong>{product.returnPolicy}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Purchase */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <span className="text-[11px] text-slate-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 font-heading">
                  {formatMoney(activePrice, currency)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-slate-400 line-through">
                    {formatMoney(currentPrice, currency)}
                  </span>
                )}
              </div>

              <div className="mt-2">
                {product.stockQuantity > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock ({product.stockQuantity} units available for dispatch)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                    Pre-order Procurement (Dispatches in 3-5 days upon verified payment)
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Features:
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Technical Specifications:
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                  {Object.entries(product.specifications).map(([specKey, specVal]) => (
                    <div key={specKey} className="grid grid-cols-3 p-2.5 bg-slate-50/50">
                      <span className="font-semibold text-slate-600">{specKey}</span>
                      <span className="col-span-2 text-slate-900 font-medium">{specVal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-slate-200 text-slate-600 rounded-l-xl"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-slate-200 text-slate-600 rounded-r-xl"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart({
                    type: 'product',
                    itemId: product.id,
                    title: product.name,
                    priceUGX: product.salePriceUGX || product.priceUGX,
                    priceUSD: product.salePriceUSD || product.priceUSD,
                    quantity,
                    imageUrl: product.imageUrl
                  });
                }}
                className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Add {quantity} to Cart ({formatMoney(activePrice * quantity, currency)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
