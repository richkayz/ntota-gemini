export type Currency = 'UGX' | 'USD';

export type UserRole = 
  | 'superadmin' 
  | 'admin' 
  | 'finance' 
  | 'sales' 
  | 'inventory' 
  | 'support' 
  | 'editor' 
  | 'customer';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'web' | 'email' | 'pos' | 'growth' | 'consultation' | 'custom';
  shortDescription: string;
  fullDescription: string;
  problemSolved: string;
  deliverables: string[];
  scope: string[];
  exclusions: string[];
  priceUGX: number;
  priceUSD: number;
  isStartingPrice?: boolean;
  timelineEstimate: string;
  requiredInfo: string[];
  isQuotationBased?: boolean;
  faqs?: { q: string; a: string }[];
  featured?: boolean;
}

export type ProductCategory = 
  | 'Mobile POS'
  | 'Desktop POS'
  | 'POS Terminals & Accessories'
  | 'Computers & Laptops'
  | 'CCTV Cameras'
  | 'CCTV Recorders'
  | 'CCTV Installation Equipment'
  | 'Networking Equipment'
  | 'Business Accessories'
  | 'Software & Digital Products';

export type ProductProcurementType = 'stocked' | 'supplier_preorder' | 'payment_first';

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: ProductCategory;
  brand: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  priceUGX: number;
  priceUSD: number;
  salePriceUGX?: number;
  salePriceUSD?: number;
  type: 'physical' | 'digital';
  procurementType: ProductProcurementType;
  stockQuantity: number;
  isAvailable: boolean;
  warranty: string;
  returnPolicy: string;
  deliveryEstimate: string;
  imageUrl: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  downloadUrl?: string; // For digital products
  created_at: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  itemId: string;
  title: string;
  priceUGX: number;
  priceUSD: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
  notes?: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  item?: {
    id?: string;
    title: string;
    quantity?: number;
    priceUGX?: number;
    priceUSD?: number;
    imageUrl?: string;
    type?: 'product' | 'service';
    category?: string;
  };
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export type OrderStatus = 'pending' | 'processing' | 'fulfilled' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'partially_refunded';
export type PaymentMethod = 
  | 'pesapal_card' 
  | 'pesapal_mobile_money' 
  | 'manual_mobile_money' 
  | 'manual_bank_wire'
  | 'pay_later';

export interface OrderItem {
  id: string;
  itemId: string;
  title: string;
  type: 'product' | 'service';
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderReference: string; // e.g. NYOTA-2026-XXXX
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  city?: string;
  country?: string;
  items: OrderItem[];
  currency: Currency;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  pesapalTrackingId?: string;
  manualPaymentReference?: string;
  manualProofNote?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  internalNotes?: string;
  created_at: string;
  updated_at: string;
}

export type InvoiceStatus = 'paid' | 'pay_later' | 'unpaid' | 'partially_paid' | 'pending' | 'cancelled' | 'draft';
export type InvoiceStamp = 'PAID' | 'PAY_LATER' | 'PARTIALLY_PAID' | 'UNPAID';

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-001
  orderId?: string;
  orderReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  currency: Currency;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  status: InvoiceStatus;
  stamp?: InvoiceStamp;
  paymentTerms?: string;
  paidAt?: string;
  verifiedBy?: string;
  paymentReference?: string;
  notes?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  readTime: string;
  featuredImage: string;
  publishedAt: string;
  isDraft: boolean;
  isMigrated: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: 'E-commerce' | 'Education Technology' | 'Finance' | 'Internal Business Tools' | 'Logistics' | 'Websites' | 'Business Systems';
  client: string;
  location: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  techStack: string[];
  imageUrl: string;
  outcome: string;
  featured: boolean;
  isMigrated: boolean;
}

export interface DomainCheckResult {
  domain: string;
  extension: string;
  available: boolean;
  statusNote: string;
  registrationPriceUGX: number;
  registrationPriceUSD: number;
  renewalPriceUGX: number;
  renewalPriceUSD: number;
  verificationSource: 'RDAP/DNS Registry Query' | 'Direct Registrar Feed';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  category: 'Billing & Payments' | 'Technical Support' | 'Domain & Hosting' | 'Service Onboarding' | 'General Enquiry';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_on_customer' | 'resolved' | 'closed';
  messages: {
    sender: 'customer' | 'support';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface ServiceEnquiryLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId?: string;
  serviceTitle: string;
  businessName?: string;
  projectBrief: string;
  budgetRange?: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'archived';
  created_at: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}
