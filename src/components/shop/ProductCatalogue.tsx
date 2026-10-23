import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, ShieldCheck, Truck, Check, Eye } from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { ProductItem, ProductCategory } from '../../types';

interface ProductCatalogueProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: any) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  onNavigate,
  onAddToCart,
  onSelectProduct
}) => {
  const { products, currency } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = [
    'all',
    'Mobile POS',
    'Desktop POS',
    'POS Terminals & Accessories',
    'Computers & Laptops',
    'CCTV Cameras',
    'CCTV Recorders',
    'Networking Equipment',
    'Software & Digital Products'
  ];

  const filtered = products.filter((p) => {
    if (!p.published) return false;
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.stockQuantity > 0;
    return matchesCategory && matchesSearch && matchesStock;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Hardware, Systems & Digital Products
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Nyota One Commercial Store
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enterprise hardware tested and calibrated for Ugandan and African commercial environments. All items include official manufacturer warranty and on-call setup support.
          </p>
        </div>

        {/* Filter Bar & Category Chips */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by brand, name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>In-Stock Only</span>
            </label>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const currentPrice = currency === 'UGX' ? product.priceUGX : product.priceUSD;
            const salePrice =
              currency === 'UGX' ? product.salePriceUGX : product.salePriceUSD;
            const hasDiscount = salePrice && salePrice < currentPrice;
            const activePrice = hasDiscount ? salePrice : currentPrice;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {product.brand}
                  </div>
                  {hasDiscount && (
                    <div className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      SALE
                    </div>
                  )}
                  {product.type === 'digital' && (
                    <div className="absolute bottom-2.5 left-2.5 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      DIGITAL DOWNLOAD
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                      SKU: {product.sku}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer font-heading leading-snug"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-base font-extrabold text-slate-900 font-heading">
                          {formatMoney(activePrice, currency)}
                        </div>
                        {hasDiscount && (
                          <span className="text-[11px] text-slate-400 line-through">
                            {formatMoney(currentPrice, currency)}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        {product.stockQuantity > 0 ? (
                          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {product.stockQuantity} in stock
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-amber-600">
                            Pre-order Available
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="w-full py-2 px-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onAddToCart({
                            type: 'product',
                            itemId: product.id,
                            title: product.name,
                            priceUGX: product.salePriceUGX || product.priceUGX,
                            priceUSD: product.salePriceUSD || product.priceUSD,
                            quantity: 1,
                            imageUrl: product.imageUrl
                          })
                        }
                        className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>
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
