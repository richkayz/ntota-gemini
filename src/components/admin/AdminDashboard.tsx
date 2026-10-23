import React, { useState } from 'react';
import {
  ShieldCheck,
  ShoppingBag,
  Package,
  Layers,
  FileText,
  DollarSign,
  Users,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Check,
  X,
  RefreshCw,
  ExternalLink,
  BookOpen,
  LifeBuoy
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';
import { UserRole, ProductItem, ServiceItem, Order, BlogPost } from '../../types';
import { MIGRATION_LOG, MIGRATION_RECONCILIATION_REPORT } from '../../data/seedData';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
  onViewInvoice: (orderRef: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onViewInvoice }) => {
  const {
    currentUser,
    switchRole,
    orders,
    invoices,
    products,
    services,
    blogPosts,
    leads,
    tickets,
    auditLogs,
    updateOrderStatus,
    updatePaymentStatus,
    updateProduct,
    addProduct,
    updateService,
    saveBlogPost,
    replyToTicket
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'services' | 'finance' | 'blog' | 'leads' | 'migration' | 'audit'
  >('overview');

  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Editing state for products
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Revenue separated strictly by original transaction currency (Section 9 & 19)
  const revenueUGX = orders
    .filter((o) => o.currency === 'UGX' && o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const revenueUSD = orders
    .filter((o) => o.currency === 'USD' && o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingVerificationOrders = orders.filter((o) => o.paymentStatus === 'pending');
  const paidOrders = orders.filter((o) => o.paymentStatus === 'completed');
  const lowStockProducts = products.filter((p) => p.type === 'physical' && p.stockQuantity <= 5);

  // Quick access role check
  const isAuthorized = (allowed: UserRole[]) => {
    return allowed.includes(currentUser.role) || currentUser.role === 'superadmin' || currentUser.role === 'admin';
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Control Bar & RBAC Switcher */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h1 className="text-xl font-bold font-heading">Nyota Operations Console</h1>
              <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded uppercase font-semibold">
                Role: {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as {currentUser.full_name} ({currentUser.email})
            </p>
          </div>

          {/* Quick RBAC Role Tester */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Live Role Switcher:
            </span>
            {(['superadmin', 'admin', 'finance', 'sales', 'inventory', 'editor', 'support'] as const).map(
              (r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => switchRole(r)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold capitalize transition-all cursor-pointer ${
                    currentUser.role === r
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              )
            )}
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-2 text-xs font-bold text-slate-600 scrollbar-none">
          {[
            { id: 'overview', label: 'Executive Overview', roles: ['superadmin', 'admin', 'finance'] },
            { id: 'orders', label: `Orders (${orders.length})`, roles: ['superadmin', 'admin', 'sales', 'finance'] },
            { id: 'products', label: `Inventory & Shop (${products.length})`, roles: ['superadmin', 'admin', 'inventory'] },
            { id: 'services', label: `Services Catalogue (${services.length})`, roles: ['superadmin', 'admin', 'sales'] },
            { id: 'finance', label: `Finance & PesaPal IPN (${invoices.length})`, roles: ['superadmin', 'admin', 'finance'] },
            { id: 'leads', label: `Service Enquiries (${leads.length})`, roles: ['superadmin', 'admin', 'sales', 'support'] },
            { id: 'blog', label: `Blog & Editorial (${blogPosts.length})`, roles: ['superadmin', 'admin', 'editor'] },
            { id: 'migration', label: 'Migration & 301 Redirects', roles: ['superadmin', 'admin', 'editor'] },
            { id: 'audit', label: `Audit Log (${auditLogs.length})`, roles: ['superadmin', 'admin'] }
          ].map((tab) => {
            const hasAccess = isAuthorized(tab.roles as UserRole[]);
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : hasAccess
                    ? 'bg-white text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-200 text-slate-400 opacity-60'
                }`}
                title={!hasAccess ? `Requires ${tab.roles.join(', ')} permission` : ''}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 1. Executive Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards - Separate Currencies (Section 19) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Confirmed Revenue (UGX)
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  UGX {revenueUGX.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">From verified completed transactions</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Confirmed Revenue (USD)
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  ${revenueUSD.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">Original transaction currency</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pending Verification
                </span>
                <div className="text-2xl font-extrabold text-amber-600 font-heading">
                  {pendingVerificationOrders.length}
                </div>
                <p className="text-[11px] text-slate-500">Manual MoMo or wire transfers</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Low Stock Alerts
                </span>
                <div className="text-2xl font-extrabold text-rose-600 font-heading">
                  {lowStockProducts.length}
                </div>
                <p className="text-[11px] text-slate-500">Items below reorder point (5 units)</p>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Latest Orders Awaiting Review
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{ord.orderReference}</span>
                        <span className="text-slate-500">· {ord.customerName}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ord.paymentStatus === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {ord.items.map((i) => i.title).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 font-heading">
                        {formatMoney(ord.total, ord.currency)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onViewInvoice(ord.orderReference)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                      >
                        Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                All Orders & Delivery Tracking
              </h3>
              <input
                type="text"
                placeholder="Search by customer, reference, or phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg w-full sm:w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Order Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders
                    .filter(
                      (o) =>
                        o.orderReference.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customerPhone.includes(orderSearch)
                    )
                    .map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">
                          {ord.orderReference}
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-900">{ord.customerName}</div>
                          <div className="text-[11px] text-slate-500">{ord.customerPhone}</div>
                        </td>
                        <td className="p-3 text-slate-600">
                          {ord.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="p-3 font-bold text-slate-900">
                          {formatMoney(ord.total, ord.currency)}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              ord.paymentStatus === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5 capitalize">
                            {ord.paymentMethod.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="text-xs p-1 border border-slate-300 rounded bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing / In Progress</option>
                            <option value="fulfilled">Fulfilled / Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => onViewInvoice(ord.orderReference)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Products & Inventory Management */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Product Catalogue & Stock Tracking
                </h3>
                <p className="text-xs text-slate-500">
                  Update stock quantities, edit UGX/USD pricing, and manage warranties.
                </p>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg w-full sm:w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                  <tr>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price (UGX)</th>
                    <th className="p-3">Price (USD)</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3 text-right">Adjust Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.sku.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono text-slate-700">{prod.sku}</td>
                        <td className="p-3 font-semibold text-slate-900">{prod.name}</td>
                        <td className="p-3 text-slate-500">{prod.category}</td>
                        <td className="p-3 font-bold text-slate-900">
                          UGX {prod.priceUGX.toLocaleString()}
                        </td>
                        <td className="p-3 font-bold text-slate-700">${prod.priceUSD}</td>
                        <td className="p-3">
                          <span
                            className={`font-bold ${
                              prod.stockQuantity <= 5 ? 'text-rose-600' : 'text-emerald-700'
                            }`}
                          >
                            {prod.stockQuantity} units
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateProduct({
                                ...prod,
                                stockQuantity: prod.stockQuantity + 5
                              })
                            }
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold cursor-pointer"
                          >
                            +5 Restock
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Services Configuration */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Configured Services & Price Catalog
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {services.map((srv) => (
                <div key={srv.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{srv.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{srv.problemSolved}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Timeline: {srv.timelineEstimate} · Deliverables: {srv.deliverables.length} items
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-extrabold text-slate-900 text-sm">
                        UGX {srv.priceUGX.toLocaleString()} / ${srv.priceUSD}
                      </div>
                      <span className="text-[10px] text-slate-400">Configured baseline</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate(`/services/${srv.slug}`)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 cursor-pointer"
                    >
                      View Live Scope
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Finance Management & Manual Payment Approvals */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Pending Manual Payment Verifications
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative finance desk approval for customer-submitted MTN MoMo, Airtel Money, or Bank wire transaction IDs.
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                {pendingVerificationOrders.length === 0 ? (
                  <div className="py-6 text-center text-slate-400">
                    No orders currently pending verification. All accounts balanced.
                  </div>
                ) : (
                  pendingVerificationOrders.map((ord) => (
                    <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{ord.orderReference}</span>
                          <span className="font-semibold text-slate-700">{ord.customerName}</span>
                          <span className="text-slate-400">({ord.customerPhone})</span>
                        </div>
                        <p className="text-slate-500">
                          Submitted Ref: <strong className="font-mono text-slate-900">{ord.manualPaymentReference || 'None provided yet'}</strong>
                        </p>
                        {ord.manualProofNote && (
                          <p className="text-[11px] text-slate-600 bg-amber-50 p-1.5 rounded border border-amber-200 inline-block">
                            Note: {ord.manualProofNote}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-sm text-slate-900">
                          {formatMoney(ord.total, ord.currency)}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updatePaymentStatus(
                              ord.id,
                              'completed',
                              `FIN-VERIFIED-${Date.now().toString(36).toUpperCase()}`,
                              currentUser.full_name
                            )
                          }
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Approve Payment
                        </button>

                        <button
                          type="button"
                          onClick={() => updatePaymentStatus(ord.id, 'failed', undefined, currentUser.full_name)}
                          className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. Service Enquiries / Leads */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Incoming Service & Project Enquiries
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {leads.map((lead) => (
                <div key={lead.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{lead.fullName}</span>
                      <span className="text-slate-500 ml-2">({lead.phone} · {lead.email})</span>
                      {lead.businessName && (
                        <span className="text-slate-400 block text-[11px]">Org: {lead.businessName}</span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                      {lead.serviceTitle}
                    </span>
                  </div>

                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                    "{lead.projectBrief}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Budget: {lead.budgetRange}</span>
                    <span>Received: {lead.created_at.split('T')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Migration Reconciliation Report & 301 Redirects Table */}
        {activeTab === 'migration' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Content Migration Reconciliation Report & 301 Redirects
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Full audit of all source URLs from nyotaone.com, migrated assets, preserved slugs, and active HTTP redirects.
              </p>
            </div>

            {/* Reconciliation KPI cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Source URLs</span>
                <div className="text-xl font-bold text-slate-900">
                  {MIGRATION_RECONCILIATION_REPORT.totalSourceUrlsIdentified}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] text-emerald-700 uppercase font-bold">Migrated 100%</span>
                <div className="text-xl font-bold text-emerald-800">
                  {MIGRATION_RECONCILIATION_REPORT.migratedSuccessfully}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[10px] text-blue-700 uppercase font-bold">301 Redirects</span>
                <div className="text-xl font-bold text-blue-800">
                  {MIGRATION_RECONCILIATION_REPORT.redirectsConfigured}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Missing Content</span>
                <div className="text-xl font-bold text-slate-900">0 (Zero Lost)</div>
              </div>
            </div>

            {/* 301 Redirects Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                  <tr>
                    <th className="p-3">Source URL (nyotaone.com)</th>
                    <th className="p-3">Destination Route</th>
                    <th className="p-3">Migration Status</th>
                    <th className="p-3">Redirect Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {MIGRATION_LOG.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-700">{log.sourceUrl}</td>
                      <td className="p-3 text-blue-600 font-semibold">{log.destUrl}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-slate-500">{log.redirectStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              System Audit & Security Logs
            </h3>
            <div className="divide-y divide-slate-100 text-xs font-mono">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-blue-600 font-bold">[{log.action}]</span>{' '}
                    <span className="text-slate-900">{log.details}</span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 font-sans shrink-0">
                    <span>{log.userName}</span> · <span>{log.timestamp.split('T')[1].substring(0, 8)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
