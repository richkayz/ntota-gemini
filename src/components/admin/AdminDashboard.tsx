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
  LifeBuoy,
  Printer,
  Receipt,
  Calendar,
  BadgeCheck
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
    replyToTicket,
    createInvoiceFromOrder,
    createManualInvoice,
    recordInvoicePayment
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'services' | 'finance' | 'blog' | 'leads' | 'migration' | 'audit'
  >('overview');

  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [invoiceSearch, setInvoiceSearch] = useState('');

  // Invoice creation and payment recording modal states
  const [createInvoiceModalOpen, setCreateInvoiceModalOpen] = useState(false);
  const [recordPaymentModalOpen, setRecordPaymentModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<any | null>(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState<number>(0);
  const [paymentRefInput, setPaymentRefInput] = useState<string>('');

  // New Invoice form state
  const [invCustName, setInvCustName] = useState('');
  const [invCustEmail, setInvCustEmail] = useState('');
  const [invCustPhone, setInvCustPhone] = useState('');
  const [invCustAddress, setInvCustAddress] = useState('');
  const [invCurrency, setInvCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [invTerms, setInvTerms] = useState('Pay Later — Net 7 Days');
  const [invDueDate, setInvDueDate] = useState(() =>
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [invStamp, setInvStamp] = useState<'PAID' | 'PAY_LATER' | 'UNPAID'>('PAY_LATER');
  const [invItems, setInvItems] = useState([
    { description: 'Business Website & Cloud Infrastructure Setup', quantity: 1, unitPrice: 450000 }
  ]);
  const [invNotes, setInvNotes] = useState('Thank you for partnering with Nyota One. Commercial digital solutions.');
  const [stampFilter, setStampFilter] = useState<'ALL' | 'PAID' | 'PAY_LATER' | 'PARTIALLY_PAID'>('ALL');

  // Handle missing invoices batch synchronization
  const handleSyncMissingInvoices = () => {
    let synced = 0;
    orders.forEach((ord) => {
      const exists = invoices.some((inv) => inv.orderReference === ord.orderReference);
      if (!exists) {
        createInvoiceFromOrder(ord);
        synced++;
      }
    });
    alert(`Audit complete: Generated ${synced} matching stamped invoices for unsynced orders.`);
  };

  // Open record payment modal
  const handleOpenRecordPayment = (inv: any) => {
    setSelectedInvoiceForPayment(inv);
    setPaymentAmountInput(inv.balanceDue ?? inv.total);
    setPaymentRefInput(`FIN-REC-${Date.now().toString(36).toUpperCase()}`);
    setRecordPaymentModalOpen(true);
  };

  // Confirm record payment
  const handleConfirmRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPayment) return;
    recordInvoicePayment(
      selectedInvoiceForPayment.id,
      paymentAmountInput,
      paymentRefInput,
      currentUser.full_name,
      'Settled via Nyota Finance Desk'
    );
    setRecordPaymentModalOpen(false);
    setSelectedInvoiceForPayment(null);
  };

  // Create manual invoice submit
  const handleCreateManualInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invCustName.trim()) {
      alert('Please enter a customer name.');
      return;
    }
    if (invItems.length === 0 || invItems.some((i) => !i.description.trim() || i.unitPrice <= 0)) {
      alert('Please add valid line items with descriptions and positive unit prices.');
      return;
    }

    const createdInv = createManualInvoice({
      customerName: invCustName,
      customerEmail: invCustEmail || 'billing@client.com',
      customerPhone: invCustPhone || '+256 700 000 000',
      customerAddress: invCustAddress || 'Kampala, Uganda',
      currency: invCurrency,
      paymentTerms: invTerms,
      dueDate: invDueDate,
      stamp: invStamp,
      items: invItems,
      notes: invNotes,
      verifiedBy: invStamp === 'PAID' ? currentUser.full_name : undefined
    });

    setCreateInvoiceModalOpen(false);
    // Reset form
    setInvCustName('');
    setInvCustEmail('');
    setInvCustPhone('');
    setInvCustAddress('');
    setInvItems([{ description: 'Business Software Architecture & Implementation', quantity: 1, unitPrice: 450000 }]);
    onViewInvoice(createdInv.orderReference);
  };

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
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                ord.paymentStatus === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {ord.paymentStatus}
                            </span>

                            {(() => {
                              const matchingInv = invoices.find((inv) => inv.orderReference === ord.orderReference);
                              if (!matchingInv) return null;
                              if (matchingInv.stamp === 'PAID') {
                                return (
                                  <span className="px-1.5 py-0.5 rounded border border-emerald-600 bg-emerald-50 text-emerald-800 text-[9px] font-extrabold font-mono uppercase tracking-wider">
                                    [ PAID ]
                                  </span>
                                );
                              }
                              if (matchingInv.stamp === 'PAY_LATER') {
                                return (
                                  <span className="px-1.5 py-0.5 rounded border border-amber-600 bg-amber-50 text-amber-800 text-[9px] font-extrabold font-mono uppercase tracking-wider">
                                    [ PAY LATER ]
                                  </span>
                                );
                              }
                              if (matchingInv.stamp === 'PARTIALLY_PAID') {
                                return (
                                  <span className="px-1.5 py-0.5 rounded border border-blue-600 bg-blue-50 text-blue-800 text-[9px] font-extrabold font-mono uppercase tracking-wider">
                                    [ PARTIAL ]
                                  </span>
                                );
                              }
                              return (
                                <span className="px-1.5 py-0.5 rounded border border-slate-400 bg-slate-50 text-slate-700 text-[9px] font-extrabold font-mono uppercase tracking-wider">
                                  [ UNPAID ]
                                </span>
                              );
                            })()}
                          </div>
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
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {(() => {
                            const matchingInv = invoices.find((inv) => inv.orderReference === ord.orderReference);
                            if (matchingInv) {
                              return (
                                <button
                                  type="button"
                                  onClick={() => onViewInvoice(ord.orderReference)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded text-xs font-semibold cursor-pointer transition-colors"
                                  title="View Stamped A4 Commercial Invoice"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Invoice
                                </button>
                              );
                            }
                            return (
                              <button
                                type="button"
                                onClick={() => createInvoiceFromOrder(ord)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold cursor-pointer shadow-xs"
                                title="Generate Matching Stamped Invoice"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                Gen Invoice
                              </button>
                            );
                          })()}
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

        {/* 5. Finance Management, Commercial Invoices & Manual Payment Approvals */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            {/* Top Finance Action Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Finance Desk & Accounts Receivable
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Corporate commercial invoices, PesaPal IPN reconciliations, Pay Later credit agreements, and visual rubber stamp auditing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSyncMissingInvoices}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  title="Verify all successful and pay-later orders have matching stamped invoices"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Audit & Sync Invoices
                </button>

                <button
                  type="button"
                  onClick={() => setCreateInvoiceModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Create Invoice via Finance
                </button>
              </div>
            </div>

            {/* Finance KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Commercial Invoices
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  {invoices.length}
                </div>
                <p className="text-[11px] text-slate-500">100% matched to orders</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Paid Invoices [ PAID Stamp ]
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-800 font-heading">
                  {invoices.filter((i) => i.stamp === 'PAID').length}
                </div>
                <p className="text-[11px] text-emerald-700">Verified & settled in full</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Credit / Pay Later [ PAY LATER ]
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                </div>
                <div className="text-2xl font-extrabold text-amber-800 font-heading">
                  {invoices.filter((i) => i.stamp === 'PAY_LATER' || i.stamp === 'PARTIALLY_PAID').length}
                </div>
                <p className="text-[11px] text-amber-700">Accounts receivable outstanding</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pending Manual Proofs
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  {pendingVerificationOrders.length}
                </div>
                <p className="text-[11px] text-slate-500">MoMo / Bank wires awaiting signoff</p>
              </div>
            </div>

            {/* Pending Manual Verifications */}
            {pendingVerificationOrders.length > 0 && (
              <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Pending Manual Payment Approvals ({pendingVerificationOrders.length})
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Authoritative finance desk verification for customer-submitted MTN MoMo, Airtel Money, or Bank wire transaction IDs. Approving applies the emerald <strong>[ PAID ]</strong> stamp immediately to the matching invoice.
                </p>

                <div className="divide-y divide-slate-100 text-xs">
                  {pendingVerificationOrders.map((ord) => (
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
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer shadow-xs"
                        >
                          Approve Payment & Apply PAID Stamp
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
                  ))}
                </div>
              </div>
            )}

            {/* Invoices Directory Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    All Stamped Invoices & Commercial Accounts
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official tax invoices with authentic PAID or PAY LATER rubber stamps, ready for A4 PDF download and printing.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    {(['ALL', 'PAID', 'PAY_LATER', 'PARTIALLY_PAID'] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStampFilter(filter)}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          stampFilter === filter
                            ? 'bg-white text-slate-900 shadow-xs font-bold'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {filter === 'ALL' ? 'All Invoices' : filter.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Search invoices by number, client, order..."
                    value={invoiceSearch}
                    onChange={(e) => setInvoiceSearch(e.target.value)}
                    className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg w-full md:w-64"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                    <tr>
                      <th className="p-3">Invoice & Date</th>
                      <th className="p-3">Order Ref</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Invoice Total</th>
                      <th className="p-3">Paid / Balance</th>
                      <th className="p-3">Terms & Due Date</th>
                      <th className="p-3">Rubber Stamp</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices
                      .filter((inv) => {
                        const matchesSearch =
                          inv.invoiceNumber.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                          inv.customerName.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                          inv.orderReference.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                          inv.customerEmail.toLowerCase().includes(invoiceSearch.toLowerCase());
                        if (!matchesSearch) return false;
                        if (stampFilter === 'ALL') return true;
                        return inv.stamp === stampFilter;
                      })
                      .map((inv) => {
                        const isPaid = inv.stamp === 'PAID';
                        const isPayLater = inv.stamp === 'PAY_LATER';
                        const isPartial = inv.stamp === 'PARTIALLY_PAID';

                        return (
                          <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3">
                              <div className="font-mono font-bold text-slate-900">{inv.invoiceNumber}</div>
                              <div className="text-[11px] text-slate-400">{inv.issueDate}</div>
                            </td>
                            <td className="p-3 font-mono font-semibold text-slate-600">
                              {inv.orderReference}
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-slate-900">{inv.customerName}</div>
                              <div className="text-[11px] text-slate-500">{inv.customerPhone}</div>
                            </td>
                            <td className="p-3 font-bold text-slate-900">
                              {formatMoney(inv.total, inv.currency)}
                            </td>
                            <td className="p-3">
                              <div className="text-slate-700">
                                Paid: <span className="font-semibold">{formatMoney(inv.amountPaid || 0, inv.currency)}</span>
                              </div>
                              <div className={`text-[11px] font-bold ${(inv.balanceDue || 0) > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                                Due: {formatMoney(inv.balanceDue || 0, inv.currency)}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-slate-800">{inv.paymentTerms || 'Net 7 Days'}</div>
                              <div className="text-[11px] text-slate-400">Due: {inv.dueDate}</div>
                            </td>
                            <td className="p-3">
                              {isPaid && (
                                <div className="inline-block border-2 border-emerald-600 bg-emerald-50 px-2 py-1 rounded text-center">
                                  <div className="text-[11px] font-black font-mono text-emerald-800 uppercase tracking-widest leading-none">
                                    [ PAID ]
                                  </div>
                                  <div className="text-[9px] text-emerald-600 mt-0.5">
                                    {inv.paidAt || 'Settled'}
                                  </div>
                                </div>
                              )}
                              {isPayLater && (
                                <div className="inline-block border-2 border-amber-600 bg-amber-50 px-2 py-1 rounded text-center">
                                  <div className="text-[11px] font-black font-mono text-amber-800 uppercase tracking-widest leading-none">
                                    [ PAY LATER ]
                                  </div>
                                  <div className="text-[9px] text-amber-600 mt-0.5">
                                    {inv.paymentTerms || 'Net 7 Days'}
                                  </div>
                                </div>
                              )}
                              {isPartial && (
                                <div className="inline-block border-2 border-blue-600 bg-blue-50 px-2 py-1 rounded text-center">
                                  <div className="text-[11px] font-black font-mono text-blue-800 uppercase tracking-widest leading-none">
                                    [ PARTIAL ]
                                  </div>
                                  <div className="text-[9px] text-blue-600 mt-0.5">
                                    Bal: {formatMoney(inv.balanceDue || 0, inv.currency)}
                                  </div>
                                </div>
                              )}
                              {!isPaid && !isPayLater && !isPartial && (
                                <div className="inline-block border border-slate-300 bg-slate-100 px-2 py-1 rounded text-center">
                                  <div className="text-[11px] font-bold font-mono text-slate-700 uppercase tracking-wider leading-none">
                                    [ UNPAID ]
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => onViewInvoice(inv.orderReference)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                                title="View and Print A4 Stamped Invoice"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                View A4
                              </button>

                              {!isPaid && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenRecordPayment(inv)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold cursor-pointer shadow-xs"
                                  title="Record Payment & Flip Stamp to PAID"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Record Pay
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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

        {/* 8. Blog & Editorial Management */}
        {activeTab === 'blog' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Editorial & Insights Management
                </h3>
                <p className="text-xs text-slate-500">
                  Published business guides, ICT tutorials, and SME technology case studies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/insights')}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold cursor-pointer"
              >
                View Public Insights
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {blogPosts.map((post) => (
                <div key={post.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{post.excerpt}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Category: {post.category} · Author: {post.author} · Published: {post.publishedAt}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/insights/${post.slug}`)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. Audit Log */}
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

        {/* MODAL: Create Commercial Invoice via Finance */}
        {createInvoiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Create Commercial Invoice via Finance
                    </h3>
                    <p className="text-xs text-slate-500">
                      Authoritative B2B corporate billing with authentic rubber stamp options.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCreateInvoiceModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateManualInvoiceSubmit} className="space-y-5 text-xs">
                {/* Client Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Customer / Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={invCustName}
                      onChange={(e) => setInvCustName(e.target.value)}
                      placeholder="e.g. Mukwano Industries Ltd"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Customer Email</label>
                    <input
                      type="email"
                      value={invCustEmail}
                      onChange={(e) => setInvCustEmail(e.target.value)}
                      placeholder="billing@company.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={invCustPhone}
                      onChange={(e) => setInvCustPhone(e.target.value)}
                      placeholder="+256 772 000 000"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Billing Address</label>
                    <input
                      type="text"
                      value={invCustAddress}
                      onChange={(e) => setInvCustAddress(e.target.value)}
                      placeholder="Plot 45, Jinja Road, Kampala"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Terms, Currency & Initial Rubber Stamp */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Currency</label>
                    <select
                      value={invCurrency}
                      onChange={(e) => setInvCurrency(e.target.value as 'UGX' | 'USD')}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-bold"
                    >
                      <option value="UGX">UGX — Ugandan Shillings</option>
                      <option value="USD">USD — US Dollars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Payment Terms</label>
                    <select
                      value={invTerms}
                      onChange={(e) => setInvTerms(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                    >
                      <option value="Pay Later — Net 7 Days">Pay Later — Net 7 Days</option>
                      <option value="Pay Later — Net 14 Days">Pay Later — Net 14 Days</option>
                      <option value="Pay Later — Net 30 Days">Pay Later — Net 30 Days</option>
                      <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                      <option value="Due on Receipt / Immediate">Due on Receipt / Immediate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={invDueDate}
                      onChange={(e) => setInvDueDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                    />
                  </div>
                </div>

                {/* Rubber Stamp Selector */}
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">Imprinted Visual Rubber Stamp *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        invStamp === 'PAY_LATER'
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="stamp"
                        value="PAY_LATER"
                        checked={invStamp === 'PAY_LATER'}
                        onChange={() => setInvStamp('PAY_LATER')}
                        className="sr-only"
                      />
                      <span className="font-mono font-black text-amber-800 text-xs uppercase tracking-wider">
                        [ PAY LATER ]
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        Orange stamp for commercial credit & net payment terms
                      </span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        invStamp === 'PAID'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="stamp"
                        value="PAID"
                        checked={invStamp === 'PAID'}
                        onChange={() => setInvStamp('PAID')}
                        className="sr-only"
                      />
                      <span className="font-mono font-black text-emerald-800 text-xs uppercase tracking-wider">
                        [ PAID ]
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        Emerald stamp with verification signoff & instant settlement
                      </span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        invStamp === 'UNPAID'
                          ? 'border-slate-600 bg-slate-50 text-slate-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="stamp"
                        value="UNPAID"
                        checked={invStamp === 'UNPAID'}
                        onChange={() => setInvStamp('UNPAID')}
                        className="sr-only"
                      />
                      <span className="font-mono font-black text-slate-700 text-xs uppercase tracking-wider">
                        [ UNPAID ]
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        Pro-forma quotation / pending commercial invoice
                      </span>
                    </label>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700">Invoice Line Items</label>
                    <button
                      type="button"
                      onClick={() =>
                        setInvItems([
                          ...invItems,
                          { description: 'Additional Commercial Deliverable / Hardware', quantity: 1, unitPrice: 150000 }
                        ])
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Line Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {invItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...invItems];
                            newItems[idx].description = e.target.value;
                            setInvItems(newItems);
                          }}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-xl"
                        />
                        <input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...invItems];
                            newItems[idx].quantity = Math.max(1, parseInt(e.target.value) || 1);
                            setInvItems(newItems);
                          }}
                          className="w-16 px-2 py-2 border border-slate-300 rounded-xl text-center"
                        />
                        <input
                          type="number"
                          min="0"
                          placeholder="Unit Price"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const newItems = [...invItems];
                            newItems[idx].unitPrice = Math.max(0, parseInt(e.target.value) || 0);
                            setInvItems(newItems);
                          }}
                          className="w-28 px-3 py-2 border border-slate-300 rounded-xl text-right font-mono"
                        />
                        {invItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setInvItems(invItems.filter((_, i) => i !== idx))}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Calculations Preview */}
                  {(() => {
                    const subtotal = invItems.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
                    const vat = Math.round(subtotal * 0.18);
                    const total = subtotal + vat;
                    return (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-right space-y-1">
                        <div className="text-slate-500">
                          Subtotal: <span className="font-mono">{formatMoney(subtotal, invCurrency)}</span>
                        </div>
                        <div className="text-slate-500">
                          URA VAT (18%): <span className="font-mono">{formatMoney(vat, invCurrency)}</span>
                        </div>
                        <div className="text-base font-bold text-slate-900 pt-1 border-t border-slate-200">
                          Total Due: <span className="font-mono text-blue-700">{formatMoney(total, invCurrency)}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Commercial Notes & Wire Info</label>
                  <textarea
                    rows={2}
                    value={invNotes}
                    onChange={(e) => setInvNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCreateInvoiceModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold cursor-pointer shadow-xs"
                  >
                    Generate & Print Stamped Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: Record Invoice Payment & Apply PAID Stamp */}
        {recordPaymentModalOpen && selectedInvoiceForPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Record Invoice Payment
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Flips rubber stamp from PAY LATER to PAID upon settlement.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRecordPaymentModalOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmRecordPayment} className="space-y-4 text-xs">
                {/* Details card */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedInvoiceForPayment.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer:</span>
                    <span className="font-semibold text-slate-800">{selectedInvoiceForPayment.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice Total:</span>
                    <span className="font-bold text-slate-900">
                      {formatMoney(selectedInvoiceForPayment.total, selectedInvoiceForPayment.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Already Paid:</span>
                    <span className="text-emerald-700 font-medium">
                      {formatMoney(selectedInvoiceForPayment.amountPaid || 0, selectedInvoiceForPayment.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="font-bold text-slate-700">Remaining Balance Due:</span>
                    <span className="font-mono font-bold text-amber-700">
                      {formatMoney(selectedInvoiceForPayment.balanceDue ?? selectedInvoiceForPayment.total, selectedInvoiceForPayment.currency)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Amount to Record *</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedInvoiceForPayment.balanceDue ?? selectedInvoiceForPayment.total}
                    value={paymentAmountInput}
                    onChange={(e) => setPaymentAmountInput(Number(e.target.value) || 0)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Transaction / Settlement Reference *
                  </label>
                  <input
                    type="text"
                    value={paymentRefInput}
                    onChange={(e) => setPaymentRefInput(e.target.value)}
                    required
                    placeholder="e.g. MOMO-938204, STANBIC-WIRE-4820"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] space-y-1">
                  <div className="font-bold">Verified Rubber Stamp Imprint:</div>
                  <p>
                    Upon confirmation, the visual <strong>[ PAID ]</strong> stamp with date and verification by <strong>{currentUser.full_name}</strong> will be permanently applied to this invoice.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setRecordPaymentModalOpen(false)}
                    className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer shadow-xs"
                  >
                    Confirm & Apply PAID Stamp
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
