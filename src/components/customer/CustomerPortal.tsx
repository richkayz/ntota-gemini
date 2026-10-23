import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  FileText,
  LifeBuoy,
  Download,
  CheckCircle2,
  Clock,
  Printer,
  MessageCircle,
  Plus,
  Send,
  ArrowRight
} from 'lucide-react';
import { useAppStore, formatMoney } from '../../lib/store';

interface CustomerPortalProps {
  initialTab?: 'dashboard' | 'orders' | 'invoices' | 'services' | 'support';
  onNavigate: (path: string) => void;
  onViewInvoice: (orderRef: string) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  initialTab = 'dashboard',
  onNavigate,
  onViewInvoice
}) => {
  const {
    currentUser,
    orders,
    invoices,
    tickets,
    currency,
    addSupportTicket,
    replyToTicket
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'invoices' | 'services' | 'support'>(
    initialTab
  );

  // New ticket modal state
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<any>('Service Onboarding');
  const [ticketMessage, setTicketMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Filter orders for active customer
  const customerOrders = orders;
  const customerInvoices = invoices;

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    const tktNumber = `TKT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const created = addSupportTicket({
      ticketNumber: tktNumber,
      customerId: currentUser.id,
      customerName: currentUser.full_name,
      customerEmail: currentUser.email,
      subject: ticketSubject,
      category: ticketCategory,
      priority: 'medium',
      status: 'open',
      messages: [
        {
          sender: 'customer',
          senderName: currentUser.full_name,
          text: ticketMessage,
          timestamp: new Date().toISOString()
        }
      ]
    });

    setShowNewTicketModal(false);
    setTicketSubject('');
    setTicketMessage('');
    setActiveTicketId(created.id);
  };

  const handleSendTicketReply = (ticketId: string) => {
    if (!ticketReplyText.trim()) return;
    replyToTicket(ticketId, 'customer', currentUser.full_name, ticketReplyText);
    setTicketReplyText('');
  };

  const activeTicket = tickets.find((t) => t.id === activeTicketId);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {currentUser.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 font-heading">
                  {currentUser.full_name}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser.email} · {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Order New Service
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/shop')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Shop Hardware
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2 text-xs font-bold text-slate-500">
          {[
            { id: 'dashboard', label: 'Overview', icon: User },
            { id: 'orders', label: `Orders (${customerOrders.length})`, icon: ShoppingBag },
            { id: 'invoices', label: `Invoices & Receipts (${customerInvoices.length})`, icon: FileText },
            { id: 'services', label: 'My Digital Services', icon: CheckCircle2 },
            { id: 'support', label: `Support Tickets (${tickets.length})`, icon: LifeBuoy }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Overview Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Orders
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  {customerOrders.length}
                </div>
                <p className="text-[11px] text-slate-500">Tracked in database</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Invoices
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  {customerInvoices.length}
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">A4 Printable Receipts Available</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Support Tickets
                </span>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">
                  {tickets.length}
                </div>
                <p className="text-[11px] text-blue-600 font-medium">Direct Engineering Desk</p>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wider">
                Recent Orders & Service Progress
              </h3>

              <div className="divide-y divide-slate-100">
                {customerOrders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono">{ord.orderReference}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ord.paymentStatus === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {ord.items.map((i) => i.title).join(', ')}
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-bold text-slate-900">
                        {formatMoney(ord.total, ord.currency)}
                      </div>
                      <button
                        type="button"
                        onClick={() => onViewInvoice(ord.orderReference)}
                        className="text-[11px] text-blue-600 hover:underline font-semibold flex items-center gap-1 justify-end cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        View Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">My Orders History</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {customerOrders.map((ord) => (
                <div key={ord.id} className="py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900 font-mono">{ord.orderReference}</span>
                      <span className="text-slate-400 ml-2">Placed: {ord.created_at.split('T')[0]}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                        ord.paymentStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.title} (x{item.quantity})</span>
                        <span className="font-semibold">{formatMoney(item.subtotal, ord.currency)}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                      <span>Total ({ord.currency})</span>
                      <span>{formatMoney(ord.total, ord.currency)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">
                      Payment Method: <strong>{ord.paymentMethod.replace(/_/g, ' ')}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => onViewInvoice(ord.orderReference)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-bold hover:bg-blue-100 flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Official Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Invoices & Receipts Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">Invoices & Tax Receipts</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {customerInvoices.map((inv) => (
                <div key={inv.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-mono text-sm">{inv.invoiceNumber}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      Order: {inv.orderReference} · Issue Date: {inv.issueDate}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-extrabold text-sm text-slate-900">
                      {formatMoney(inv.total, inv.currency)}
                    </div>
                    <button
                      type="button"
                      onClick={() => onViewInvoice(inv.orderReference)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                    >
                      View & Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Services Tab (Digital Downloads & Credentials) */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Active Digital Services & Software Licenses
              </h3>

              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Nyota Stores POS Software (Lifetime License)</h4>
                  <p className="text-slate-600 mt-0.5">
                    License Key: <strong className="font-mono text-blue-900">NYOTA-LIC-8821-POS-V2</strong>
                  </p>
                  <p className="text-slate-500 text-[11px]">Includes offline billing engine & barcode drivers</p>
                </div>
                <a
                  href="#download-software"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Download initiated: Nyota Stores POS v2.6 Installation Archive (18.4 MB).');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Software (.ZIP)
                </a>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Managed Corporate Business Email (5 Inboxes)</h4>
                  <p className="text-slate-600 mt-0.5">
                    Domain: <strong className="font-mono text-slate-900">ugandatrading.co.ug</strong> (Active)
                  </p>
                  <p className="text-slate-500 text-[11px]">DKIM, SPF & DMARC 100% authenticated</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('support')}
                  className="px-3.5 py-1.5 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Request New Mailbox
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. Support Tickets Tab */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Technical Support Tickets
                </h3>
                <p className="text-xs text-slate-500">Direct channel to Nyota One solutions engineers</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewTicketModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Open New Ticket
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Tickets list */}
              <div className="md:col-span-5 divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                {tickets.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTicketId(t.id)}
                    className={`w-full text-left p-3.5 text-xs transition-colors cursor-pointer ${
                      activeTicketId === t.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-800">{t.ticketNumber}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          t.status === 'open'
                            ? 'bg-amber-100 text-amber-800'
                            : t.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {t.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mt-1 line-clamp-1">{t.subject}</h4>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{t.category}</span>
                  </button>
                ))}
              </div>

              {/* Ticket Chat Messages */}
              <div className="md:col-span-7 border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-96 bg-slate-50/50">
                {activeTicket ? (
                  <>
                    <div className="border-b border-slate-200 pb-2 mb-2">
                      <h4 className="text-xs font-bold text-slate-900">{activeTicket.subject}</h4>
                      <span className="text-[10px] text-slate-400">
                        {activeTicket.ticketNumber} · Category: {activeTicket.category}
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
                      {activeTicket.messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl max-w-[85%] ${
                            m.sender === 'customer'
                              ? 'ml-auto bg-blue-600 text-white'
                              : 'mr-auto bg-white border border-slate-200 text-slate-800 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 gap-2">
                            <span>{m.senderName}</span>
                            <span>{m.timestamp.split('T')[1].substring(0, 5)}</span>
                          </div>
                          <p className="leading-relaxed">{m.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type reply to engineering support..."
                        value={ticketReplyText}
                        onChange={(e) => setTicketReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendTicketReply(activeTicket.id);
                        }}
                        className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleSendTicketReply(activeTicket.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-slate-400">
                    Select a ticket to view conversation
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* New Ticket Modal */}
        {showNewTicketModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Open New Support Ticket
              </h3>

              <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Need assistance setting up Outlook on mobile"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 bg-white"
                  >
                    <option value="Service Onboarding">Service Onboarding</option>
                    <option value="Domain & Hosting">Domain & Hosting</option>
                    <option value="Technical Support">Technical Support (POS/Hardware)</option>
                    <option value="Billing & Payments">Billing & Payments</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about what you need assistance with..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                  >
                    Submit Ticket
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
