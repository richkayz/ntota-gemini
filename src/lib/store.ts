import { useState, useEffect } from 'react';
import {
  Currency,
  UserRole,
  UserProfile,
  ServiceItem,
  ProductItem,
  CartItem,
  Order,
  Invoice,
  BlogPost,
  PortfolioProject,
  SupportTicket,
  ServiceEnquiryLead,
  AuditLog,
  ToastNotification
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PRODUCTS,
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS,
  INITIAL_ORDERS,
  INITIAL_INVOICES,
  DEMO_USER_PROFILES
} from '../data/seedData';

// Local storage keys
const STORAGE_KEYS = {
  CURRENCY: 'nyota_currency',
  CART: 'nyota_cart',
  USER: 'nyota_active_user',
  SERVICES: 'nyota_services',
  PRODUCTS: 'nyota_products',
  ORDERS: 'nyota_orders',
  INVOICES: 'nyota_invoices',
  POSTS: 'nyota_posts',
  PROJECTS: 'nyota_projects',
  TICKETS: 'nyota_tickets',
  LEADS: 'nyota_leads',
  LOGS: 'nyota_audit_logs'
};

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return defaultValue;
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage set failed', e);
  }
}

// Global state in-memory cache to allow reactive subscriptions across components
class AppStore {
  private listeners: Set<() => void> = new Set();

  public currency: Currency = getStoredItem<Currency>(STORAGE_KEYS.CURRENCY, 'UGX');
  public cart: CartItem[] = getStoredItem<CartItem[]>(STORAGE_KEYS.CART, []);
  public currentUser: UserProfile = getStoredItem<UserProfile>(
    STORAGE_KEYS.USER,
    DEMO_USER_PROFILES[0] // Default to Admin for full capability inspection
  );

  public services: ServiceItem[] = getStoredItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  public products: ProductItem[] = getStoredItem<ProductItem[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  public projects: PortfolioProject[] = getStoredItem<PortfolioProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  public blogPosts: BlogPost[] = getStoredItem<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_BLOG_POSTS);
  public orders: Order[] = getStoredItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  public invoices: Invoice[] = getStoredItem<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  public tickets: SupportTicket[] = getStoredItem<SupportTicket[]>(STORAGE_KEYS.TICKETS, [
    {
      id: 'tkt-001',
      ticketNumber: 'TKT-2026-104',
      customerId: 'usr-customer-03',
      customerName: 'Kakooza Patrick',
      customerEmail: 'patrick.k@ugandatrading.co.ug',
      subject: 'Inquiry regarding additional Google Workspace mailbox configuration',
      category: 'Service Onboarding',
      priority: 'medium',
      status: 'in_progress',
      messages: [
        {
          sender: 'customer',
          senderName: 'Kakooza Patrick',
          text: 'Good morning Nyota Team, our website is live. We would like to add an additional mailbox for accounts@ugandatrading.co.ug.',
          timestamp: '2026-02-18T08:30:00Z'
        },
        {
          sender: 'support',
          senderName: 'Nyota Support Engineer',
          text: 'Hello Patrick! We can provision this within 1 hour. Please confirm if you want standard IMAP/POP or Google Workspace license.',
          timestamp: '2026-02-18T09:05:00Z'
        }
      ],
      created_at: '2026-02-18T08:30:00Z',
      updated_at: '2026-02-18T09:05:00Z'
    }
  ]);
  public leads: ServiceEnquiryLead[] = getStoredItem<ServiceEnquiryLead[]>(STORAGE_KEYS.LEADS, [
    {
      id: 'lead-001',
      fullName: 'Dr. Timothy Ssemwanga',
      email: 'timothy@victoriaclinic.ug',
      phone: '+256 752 443322',
      serviceTitle: 'POS & Inventory Machine Setup',
      businessName: 'Victoria Healthcare Pharmacy',
      projectBrief: 'Need complete barcode POS and inventory control for 2 pharmacy branches in Ntinda and Entebbe.',
      budgetRange: 'UGX 2,000,000 - 3,500,000',
      preferredContact: 'whatsapp',
      status: 'contacted',
      created_at: '2026-02-20T11:00:00Z'
    }
  ]);
  public auditLogs: AuditLog[] = getStoredItem<AuditLog[]>(STORAGE_KEYS.LOGS, [
    {
      id: 'log-001',
      userId: 'usr-admin-01',
      userName: 'Richard K. (Executive Admin)',
      action: 'SERVICE_PRICE_CONFIGURED',
      entityType: 'Service',
      entityId: 'srv-starter-web',
      details: 'Validated initial baseline rate at UGX 450,000 / $120 USD.',
      timestamp: '2026-01-10T12:00:00Z'
    },
    {
      id: 'log-002',
      userId: 'system-gateway',
      userName: 'PesaPal IPN Listener',
      action: 'PAYMENT_VERIFIED',
      entityType: 'Order',
      entityId: 'ord-001',
      details: 'PesaPal 3.0 confirmed status completed for UGX 600,000.',
      timestamp: '2026-02-15T10:14:00Z'
    }
  ]);

  // Toast notifications for visual feedback
  public toasts: ToastNotification[] = [];

  public showToast(toast: Omit<ToastNotification, 'id'> & { id?: string }): string {
    const id = toast.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = {
      ...toast,
      id,
      duration: toast.duration ?? 4500
    };
    this.toasts = [newToast, ...this.toasts.filter((t) => t.id !== id).slice(0, 2)];
    this.notify();
    return id;
  }

  public dismissToast(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  public clearToasts(): void {
    this.toasts = [];
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  public setCurrency(c: Currency): void {
    this.currency = c;
    setStoredItem(STORAGE_KEYS.CURRENCY, c);
    this.notify();
  }

  public setCurrentUser(u: UserProfile): void {
    this.currentUser = u;
    setStoredItem(STORAGE_KEYS.USER, u);
    this.notify();
  }

  public switchRole(role: UserRole): void {
    const updated: UserProfile = {
      ...this.currentUser,
      role,
      full_name: `${role.toUpperCase()} User (${this.currentUser.full_name.split(' ')[0]})`
    };
    this.setCurrentUser(updated);
  }

  // Cart operations
  public addToCart(item: Omit<CartItem, 'id'>): void {
    const existingIndex = this.cart.findIndex(
      (c) => c.itemId === item.itemId && c.type === item.type
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...this.cart];
      updated[existingIndex].quantity += item.quantity;
    } else {
      updated = [
        ...this.cart,
        {
          ...item,
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
        }
      ];
    }
    this.cart = updated;
    setStoredItem(STORAGE_KEYS.CART, updated);

    // Auto-trigger visual feedback toast notification
    this.showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${item.title} has been added to your order.`,
      item: {
        id: item.itemId,
        title: item.title,
        quantity: item.quantity,
        priceUGX: item.priceUGX,
        priceUSD: item.priceUSD,
        imageUrl: item.imageUrl,
        type: item.type,
        category: item.category
      },
      duration: 4500
    });

    this.notify();
  }

  public updateCartQuantity(cartId: string, quantity: number): void {
    let updated: CartItem[];
    if (quantity <= 0) {
      updated = this.cart.filter((c) => c.id !== cartId);
    } else {
      updated = this.cart.map((c) => (c.id === cartId ? { ...c, quantity } : c));
    }
    this.cart = updated;
    setStoredItem(STORAGE_KEYS.CART, updated);
    this.notify();
  }

  public removeFromCart(cartId: string): void {
    const updated = this.cart.filter((c) => c.id !== cartId);
    this.cart = updated;
    setStoredItem(STORAGE_KEYS.CART, updated);
    this.notify();
  }

  public clearCart(): void {
    this.cart = [];
    setStoredItem(STORAGE_KEYS.CART, []);
    this.notify();
  }

  // Orders & checkout
  public createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Order {
    const id = `ord-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updated = [newOrder, ...this.orders];
    this.orders = updated;
    setStoredItem(STORAGE_KEYS.ORDERS, updated);

    // Auto generate corresponding draft or unpaid invoice
    this.createInvoiceFromOrder(newOrder);

    // Decrement stock for physical items
    orderData.items.forEach((item) => {
      if (item.type === 'product') {
        this.decrementProductStock(item.itemId, item.quantity);
      }
    });

    this.addAuditLog({
      action: 'ORDER_CREATED',
      entityType: 'Order',
      entityId: id,
      details: `Created order ${newOrder.orderReference} for ${newOrder.customerName} (${newOrder.currency} ${newOrder.total.toLocaleString()}).`
    });

    this.clearCart();
    this.notify();
    return newOrder;
  }

  public updateOrderStatus(orderId: string, status: Order['orderStatus'], notes?: string): void {
    const updated = this.orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: status,
          internalNotes: notes ? `${o.internalNotes ? o.internalNotes + '\n' : ''}${notes}` : o.internalNotes,
          updated_at: new Date().toISOString()
        };
      }
      return o;
    });
    this.orders = updated;
    setStoredItem(STORAGE_KEYS.ORDERS, updated);

    this.addAuditLog({
      action: 'ORDER_STATUS_UPDATED',
      entityType: 'Order',
      entityId: orderId,
      details: `Status shifted to ${status}.`
    });
    this.notify();
  }

  public updatePaymentStatus(
    orderId: string,
    paymentStatus: Order['paymentStatus'],
    trackingId?: string,
    verifiedBy: string = 'Authorized Staff'
  ): void {
    let affectedOrder: Order | undefined;
    const updated = this.orders.map((o) => {
      if (o.id === orderId) {
        affectedOrder = {
          ...o,
          paymentStatus,
          pesapalTrackingId: trackingId || o.pesapalTrackingId,
          verifiedBy: paymentStatus === 'completed' ? verifiedBy : o.verifiedBy,
          verifiedAt: paymentStatus === 'completed' ? new Date().toISOString() : o.verifiedAt,
          orderStatus: paymentStatus === 'completed' ? 'processing' : o.orderStatus,
          updated_at: new Date().toISOString()
        };
        return affectedOrder;
      }
      return o;
    });
    this.orders = updated;
    setStoredItem(STORAGE_KEYS.ORDERS, updated);

    // If completed, update invoice to paid with PAID stamp
    if (affectedOrder) {
      const isCompleted = paymentStatus === 'completed';
      const invUpdated = this.invoices.map((inv) => {
        if (inv.orderId === orderId || inv.orderReference === affectedOrder?.orderReference) {
          return {
            ...inv,
            status: isCompleted ? ('paid' as const) : ('pay_later' as const),
            stamp: isCompleted ? ('PAID' as const) : ('PAY_LATER' as const),
            amountPaid: isCompleted ? inv.total : inv.amountPaid,
            balanceDue: isCompleted ? 0 : inv.total,
            paidAt: isCompleted ? new Date().toISOString() : inv.paidAt,
            verifiedBy: isCompleted ? verifiedBy : inv.verifiedBy,
            paymentReference: trackingId || affectedOrder?.pesapalTrackingId || affectedOrder?.manualPaymentReference || inv.paymentReference
          };
        }
        return inv;
      });
      this.invoices = invUpdated;
      setStoredItem(STORAGE_KEYS.INVOICES, invUpdated);
    }

    this.addAuditLog({
      action: 'PAYMENT_STATUS_UPDATED',
      entityType: 'Order',
      entityId: orderId,
      details: `Payment status marked as ${paymentStatus} by ${verifiedBy}.`
    });
    this.notify();
  }

  // Stock management
  public decrementProductStock(productId: string, qty: number): void {
    const updated = this.products.map((p) => {
      if (p.id === productId && p.type === 'physical') {
        const remaining = Math.max(0, p.stockQuantity - qty);
        return {
          ...p,
          stockQuantity: remaining,
          isAvailable: remaining > 0
        };
      }
      return p;
    });
    this.products = updated;
    setStoredItem(STORAGE_KEYS.PRODUCTS, updated);
  }

  public updateProduct(updatedProd: ProductItem): void {
    const updated = this.products.map((p) => (p.id === updatedProd.id ? updatedProd : p));
    this.products = updated;
    setStoredItem(STORAGE_KEYS.PRODUCTS, updated);

    this.addAuditLog({
      action: 'PRODUCT_UPDATED',
      entityType: 'Product',
      entityId: updatedProd.id,
      details: `Updated ${updatedProd.name} (Stock: ${updatedProd.stockQuantity}).`
    });
    this.notify();
  }

  public addProduct(newProd: ProductItem): void {
    const updated = [newProd, ...this.products];
    this.products = updated;
    setStoredItem(STORAGE_KEYS.PRODUCTS, updated);

    this.addAuditLog({
      action: 'PRODUCT_ADDED',
      entityType: 'Product',
      entityId: newProd.id,
      details: `Added new product ${newProd.name}.`
    });
    this.notify();
  }

  // Service management
  public updateService(updatedSrv: ServiceItem): void {
    const updated = this.services.map((s) => (s.id === updatedSrv.id ? updatedSrv : s));
    this.services = updated;
    setStoredItem(STORAGE_KEYS.SERVICES, updated);

    this.addAuditLog({
      action: 'SERVICE_UPDATED',
      entityType: 'Service',
      entityId: updatedSrv.id,
      details: `Updated ${updatedSrv.title} (Price: UGX ${updatedSrv.priceUGX.toLocaleString()} / $${updatedSrv.priceUSD}).`
    });
    this.notify();
  }

  // Invoice management
  public createInvoiceFromOrder(order: Order): Invoice {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(this.invoices.length + 1).padStart(3, '0')}`;
    const isPaid = order.paymentStatus === 'completed';
    const isPayLater = order.paymentMethod === 'pay_later' || order.paymentStatus === 'pending' || order.paymentMethod.startsWith('manual_');

    const status = isPaid ? 'paid' : (order.paymentMethod === 'pay_later' ? 'pay_later' : 'unpaid');
    const stamp = isPaid ? 'PAID' : (isPayLater ? 'PAY_LATER' : 'UNPAID');
    const paymentTerms = isPaid
      ? 'Immediate Gateway Settlement (Verified)'
      : (order.paymentMethod === 'pay_later' 
          ? 'Pay Later — Net 7 Days' 
          : 'Pending Payment Verification / Pay on Delivery');

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      orderId: order.id,
      orderReference: order.orderReference,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerAddress: order.deliveryAddress,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: order.items.map((i) => ({
        description: i.title,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        amount: i.subtotal
      })),
      currency: order.currency,
      subtotal: order.subtotal,
      tax: 0,
      discount: order.discount,
      total: order.total,
      amountPaid: isPaid ? order.total : 0,
      balanceDue: isPaid ? 0 : order.total,
      status,
      stamp,
      paymentTerms,
      paidAt: isPaid ? order.verifiedAt || new Date().toISOString() : undefined,
      verifiedBy: isPaid ? order.verifiedBy || 'Automated Gateway' : undefined,
      paymentReference: order.pesapalTrackingId || order.manualPaymentReference || undefined,
      notes: isPaid
        ? 'Payment verified. Thank you for partnering with Nyota One.'
        : 'Pay Later terms applied. Please settle before due date to avoid service suspension.',
      created_at: new Date().toISOString()
    };

    const updated = [newInvoice, ...this.invoices];
    this.invoices = updated;
    setStoredItem(STORAGE_KEYS.INVOICES, updated);
    return newInvoice;
  }

  public createManualInvoice(data: Partial<Invoice> & { customerName: string; currency: Currency }): Invoice {
    const id = `inv-${Date.now()}`;
    const invoiceNumber =
      data.invoiceNumber || `INV-${new Date().getFullYear()}-${String(this.invoices.length + 1).padStart(3, '0')}`;
    const orderReference =
      data.orderReference || `NYOTA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const items = (data.items || []).map((item) => {
      const quantity = Number(item.quantity) || 1;
      const unitPrice = Number(item.unitPrice) || 0;
      return {
        description: item.description,
        quantity,
        unitPrice,
        amount: item.amount ?? quantity * unitPrice
      };
    });

    const subtotal = data.subtotal ?? items.reduce((sum, i) => sum + i.amount, 0);
    const tax = data.tax ?? Math.round(subtotal * 0.18);
    const discount = data.discount ?? 0;
    const total = data.total ?? Math.max(0, subtotal + tax - discount);
    const isPaid = data.stamp === 'PAID' || data.status === 'paid';
    const amountPaid = data.amountPaid ?? (isPaid ? total : 0);
    const balanceDue = data.balanceDue ?? (isPaid ? 0 : Math.max(0, total - amountPaid));
    const status = isPaid ? ('paid' as const) : ('pending' as const);
    const stamp = isPaid ? ('PAID' as const) : (data.stamp || ('PAY_LATER' as const));
    const issueDate = data.issueDate || new Date().toISOString().split('T')[0];
    const dueDate =
      data.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const paymentTerms =
      data.paymentTerms || (stamp === 'PAY_LATER' ? 'Pay Later — Net 7 Days' : 'Due on Receipt');

    const newInvoice: Invoice = {
      id,
      invoiceNumber,
      orderReference,
      customerName: data.customerName,
      customerEmail: data.customerEmail || 'billing@client.com',
      customerPhone: data.customerPhone || '+256 700 000 000',
      customerAddress: data.customerAddress || 'Kampala, Uganda',
      items,
      currency: data.currency,
      subtotal,
      tax,
      discount,
      total,
      amountPaid,
      balanceDue,
      status,
      stamp,
      paymentTerms,
      issueDate,
      dueDate,
      paidAt: isPaid ? data.paidAt || new Date().toISOString() : undefined,
      verifiedBy: data.verifiedBy,
      paymentReference: data.paymentReference,
      notes: data.notes || 'Commercial digital solutions by Nyota One. Net terms apply.',
      created_at: new Date().toISOString()
    };

    // If there is no matching order, auto-create a matching order so records stay synchronized
    const existingOrder = this.orders.find((o) => o.orderReference === orderReference);
    if (!existingOrder) {
      const matchingOrder: Order = {
        id: `ord-${Date.now()}`,
        orderReference,
        customerName: data.customerName,
        customerEmail: data.customerEmail || 'billing@client.com',
        customerPhone: data.customerPhone || '+256 700 000 000',
        deliveryAddress: data.customerAddress || 'Client Office',
        city: 'Kampala',
        country: data.currency === 'UGX' ? 'Uganda' : 'International',
        items: items.map((item, idx) => ({
          id: `item-${Date.now()}-${idx}`,
          itemId: `custom-${idx}`,
          title: item.description,
          type: 'service',
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          subtotal: item.amount
        })),
        currency: data.currency,
        subtotal,
        deliveryFee: 0,
        discount,
        total,
        orderStatus: isPaid ? 'processing' : 'pending',
        paymentStatus: isPaid ? 'completed' : 'pending',
        paymentMethod: isPaid ? 'pesapal_mobile_money' : 'pay_later',
        verifiedBy: data.verifiedBy,
        verifiedAt: data.paidAt,
        internalNotes: `Manual invoice created via Finance desk: ${invoiceNumber}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const updatedOrders = [matchingOrder, ...this.orders];
      this.orders = updatedOrders;
      setStoredItem(STORAGE_KEYS.ORDERS, updatedOrders);
    }

    const updated = [newInvoice, ...this.invoices];
    this.invoices = updated;
    setStoredItem(STORAGE_KEYS.INVOICES, updated);

    this.addAuditLog({
      action: 'INVOICE_GENERATED_BY_FINANCE',
      entityType: 'Invoice',
      entityId: id,
      details: `Finance generated ${invoiceNumber} for ${data.customerName} (${data.currency} ${total.toLocaleString()}) with ${stamp} stamp.`
    });

    this.notify();
    return newInvoice;
  }

  public recordInvoicePayment(
    invoiceId: string,
    amount: number,
    paymentRef: string,
    verifiedBy: string = 'Finance Desk',
    notes?: string
  ): Invoice | undefined {
    let affectedOrderRef: string | undefined;
    let updatedInvResult: Invoice | undefined;

    const updatedInvoices = this.invoices.map((inv) => {
      if (inv.id === invoiceId) {
        affectedOrderRef = inv.orderReference;
        const newPaid = Math.min(inv.total, (inv.amountPaid || 0) + amount);
        const newBalance = Math.max(0, inv.total - newPaid);
        const isFullyPaid = newBalance === 0;

        const updated: Invoice = {
          ...inv,
          amountPaid: newPaid,
          balanceDue: newBalance,
          status: isFullyPaid ? ('paid' as const) : ('partially_paid' as const),
          stamp: isFullyPaid ? ('PAID' as const) : ('PARTIALLY_PAID' as const),
          paidAt: new Date().toISOString(),
          verifiedBy,
          paymentReference: paymentRef || inv.paymentReference,
          notes: notes ? `${inv.notes ? inv.notes + ' | ' : ''}${notes}` : inv.notes
        };
        updatedInvResult = updated;
        return updated;
      }
      return inv;
    });

    this.invoices = updatedInvoices;
    setStoredItem(STORAGE_KEYS.INVOICES, updatedInvoices);

    // Synchronize matching order
    if (affectedOrderRef) {
      const updatedOrders = this.orders.map((o) => {
        if (o.orderReference === affectedOrderRef) {
          return {
            ...o,
            paymentStatus: (updatedInvResult?.stamp === 'PAID' ? 'completed' : 'pending') as any,
            orderStatus: 'processing' as const,
            verifiedBy,
            verifiedAt: new Date().toISOString(),
            manualPaymentReference: paymentRef || o.manualPaymentReference,
            updated_at: new Date().toISOString()
          };
        }
        return o;
      });
      this.orders = updatedOrders;
      setStoredItem(STORAGE_KEYS.ORDERS, updatedOrders);
    }

    this.addAuditLog({
      action: 'INVOICE_PAYMENT_RECORDED',
      entityType: 'Invoice',
      entityId: invoiceId,
      details: `Finance recorded payment of ${amount} for invoice ${invoiceId}. Stamp updated.`
    });

    this.notify();
    return updatedInvResult;
  }

  // Blog management
  public saveBlogPost(post: BlogPost): void {
    const existingIndex = this.blogPosts.findIndex((p) => p.id === post.id);
    let updated: BlogPost[];
    if (existingIndex > -1) {
      updated = [...this.blogPosts];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...this.blogPosts];
    }
    this.blogPosts = updated;
    setStoredItem(STORAGE_KEYS.POSTS, updated);

    this.addAuditLog({
      action: existingIndex > -1 ? 'BLOG_POST_UPDATED' : 'BLOG_POST_CREATED',
      entityType: 'BlogPost',
      entityId: post.id,
      details: `Saved post "${post.title}" (Draft: ${post.isDraft}).`
    });
    this.notify();
  }

  // Leads & Contact
  public addLead(lead: Omit<ServiceEnquiryLead, 'id' | 'created_at'>): ServiceEnquiryLead {
    const id = `lead-${Date.now()}`;
    const newLead: ServiceEnquiryLead = {
      ...lead,
      id,
      created_at: new Date().toISOString()
    };
    const updated = [newLead, ...this.leads];
    this.leads = updated;
    setStoredItem(STORAGE_KEYS.LEADS, updated);

    this.addAuditLog({
      action: 'ENQUIRY_RECEIVED',
      entityType: 'ServiceLead',
      entityId: id,
      details: `Enquiry from ${newLead.fullName} (${newLead.phone}) for ${newLead.serviceTitle}.`
    });
    this.notify();
    return newLead;
  }

  // Tickets
  public addSupportTicket(ticket: Omit<SupportTicket, 'id' | 'created_at' | 'updated_at'>): SupportTicket {
    const id = `tkt-${Date.now()}`;
    const newTicket: SupportTicket = {
      ...ticket,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const updated = [newTicket, ...this.tickets];
    this.tickets = updated;
    setStoredItem(STORAGE_KEYS.TICKETS, updated);
    this.notify();
    return newTicket;
  }

  public replyToTicket(ticketId: string, sender: 'customer' | 'support', senderName: string, text: string): void {
    const updated = this.tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: sender === 'support' ? ('waiting_on_customer' as const) : ('in_progress' as const),
          messages: [
            ...t.messages,
            {
              sender,
              senderName,
              text,
              timestamp: new Date().toISOString()
            }
          ],
          updated_at: new Date().toISOString()
        };
      }
      return t;
    });
    this.tickets = updated;
    setStoredItem(STORAGE_KEYS.TICKETS, updated);
    this.notify();
  }

  // Audit Logs
  public addAuditLog(log: Omit<AuditLog, 'id' | 'userId' | 'userName' | 'timestamp'>): void {
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      userId: this.currentUser.id,
      userName: this.currentUser.full_name,
      timestamp: new Date().toISOString()
    };
    const updated = [newLog, ...this.auditLogs.slice(0, 99)]; // Keep latest 100
    this.auditLogs = updated;
    setStoredItem(STORAGE_KEYS.LOGS, updated);
    this.notify();
  }
}

export const store = new AppStore();

// React hook for consuming store reactive state
export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  return {
    currency: store.currency,
    setCurrency: (c: Currency) => store.setCurrency(c),
    currentUser: store.currentUser,
    switchRole: (role: UserRole) => store.switchRole(role),
    cart: store.cart,
    addToCart: (item: Omit<CartItem, 'id'>) => store.addToCart(item),
    updateCartQuantity: (id: string, qty: number) => store.updateCartQuantity(id, qty),
    removeFromCart: (id: string) => store.removeFromCart(id),
    clearCart: () => store.clearCart(),
    services: store.services,
    products: store.products,
    projects: store.projects,
    blogPosts: store.blogPosts,
    orders: store.orders,
    invoices: store.invoices,
    tickets: store.tickets,
    leads: store.leads,
    auditLogs: store.auditLogs,
    toasts: store.toasts,
    showToast: (t: Omit<ToastNotification, 'id'> & { id?: string }) => store.showToast(t),
    dismissToast: (id: string) => store.dismissToast(id),
    clearToasts: () => store.clearToasts(),
    createOrder: (data: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => store.createOrder(data),
    createInvoiceFromOrder: (order: Order) => store.createInvoiceFromOrder(order),
    createManualInvoice: (
      data: Partial<Omit<Invoice, 'items'>> & {
        customerName: string;
        currency: Currency;
        items: { description: string; quantity: number; unitPrice: number; amount?: number }[];
      }
    ) => store.createManualInvoice(data as any),
    recordInvoicePayment: (
      invoiceId: string,
      amount: number,
      paymentRef: string,
      verifiedBy?: string,
      notes?: string
    ) => store.recordInvoicePayment(invoiceId, amount, paymentRef, verifiedBy, notes),
    updateOrderStatus: (id: string, s: Order['orderStatus'], notes?: string) => store.updateOrderStatus(id, s, notes),
    updatePaymentStatus: (id: string, s: Order['paymentStatus'], trackingId?: string, verifiedBy?: string) =>
      store.updatePaymentStatus(id, s, trackingId, verifiedBy),
    updateProduct: (p: ProductItem) => store.updateProduct(p),
    addProduct: (p: ProductItem) => store.addProduct(p),
    updateService: (s: ServiceItem) => store.updateService(s),
    saveBlogPost: (p: BlogPost) => store.saveBlogPost(p),
    addLead: (l: Omit<ServiceEnquiryLead, 'id' | 'created_at'>) => store.addLead(l),
    addSupportTicket: (t: Omit<SupportTicket, 'id' | 'created_at' | 'updated_at'>) => store.addSupportTicket(t),
    replyToTicket: (id: string, sender: 'customer' | 'support', name: string, text: string) =>
      store.replyToTicket(id, sender, name, text)
  };
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency === 'UGX') {
    return `UGX ${Math.round(amount).toLocaleString('en-US')}`;
  }
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
