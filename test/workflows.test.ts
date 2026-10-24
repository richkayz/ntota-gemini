/**
 * Automated Test Suite for Nyota One Business Platform
 * Tests critical business workflows outlined in Section 25 of Master Build Command
 */

import { INITIAL_SERVICES, INITIAL_PRODUCTS, MIGRATION_LOG } from '../src/data/seedData';
import { formatMoney } from '../src/lib/store';
import { mapPesaPalStatus, PESAPAL_ENDPOINTS } from '../src/lib/pesapal';

console.log('--- Starting Nyota One Automated Test Suite ---\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    testsFailed++;
  }
}

// 1. Service Catalogue Baseline Pricing Integrity Test
console.log('\n[1. Service Catalogue Baseline Pricing Integrity]');
const starterWeb = INITIAL_SERVICES.find((s) => s.slug === 'starter-business-website');
assert(!!starterWeb, 'Starter Business Website exists in catalogue');
assert(starterWeb?.priceUGX === 450000, 'Starter Business Website price is exactly UGX 450,000');
assert(starterWeb?.priceUSD === 120, 'Starter Business Website price is exactly $120 USD');

const customApp = INITIAL_SERVICES.find((s) => s.slug === 'custom-web-software-application');
assert(customApp?.priceUGX === 1800000, 'Custom Web Application starts at UGX 1,800,000');
assert(customApp?.priceUSD === 490, 'Custom Web Application starts at $490 USD');

const posSetup = INITIAL_SERVICES.find((s) => s.slug === 'pos-inventory-machine-setup');
assert(posSetup?.priceUGX === 850000, 'POS & Inventory Machine Setup is UGX 850,000');

// 2. Currency Formatting & Separation Test
console.log('\n[2. Multi-Currency Calculation & Formatting]');
assert(formatMoney(450000, 'UGX') === 'UGX 450,000', 'UGX formatting formats with comma separation');
assert(formatMoney(120, 'USD') === '$120', 'USD formatting formats with dollar sign');

// 3. Physical Product Stock Validation
console.log('\n[3. Product Inventory & Stock Validation]');
const mobilePos = INITIAL_PRODUCTS.find((p) => p.sku === 'POS-MOB-001');
assert(!!mobilePos, 'Sunmi V2 Mobile POS exists');
assert(mobilePos?.type === 'physical', 'POS device is tagged as physical hardware');
assert((mobilePos?.stockQuantity || 0) > 0, 'In-stock quantity is tracked and positive');

const softwareLicense = INITIAL_PRODUCTS.find((p) => p.sku === 'SFT-POS-008');
assert(softwareLicense?.type === 'digital', 'Nyota Stores software license is categorized as digital');

// 4. PesaPal API 3.0 Mapping & Endpoints
console.log('\n[4. PesaPal 3.0 Integration & Status Mapping]');
assert(
  PESAPAL_ENDPOINTS.sandbox === 'https://cybqa.pesapal.com/pesapalv3',
  'PesaPal sandbox endpoint matches official API 3.0 URL'
);
assert(mapPesaPalStatus(1) === 'completed', 'PesaPal status_code 1 maps to completed');
assert(mapPesaPalStatus(2) === 'failed', 'PesaPal status_code 2 maps to failed');
assert(mapPesaPalStatus(3) === 'refunded', 'PesaPal status_code 3 maps to refunded');

// 5. Existing URL Migration & 301 Redirects Coverage
console.log('\n[5. Source URL Preservation & 301 Redirects]');
assert(MIGRATION_LOG.length >= 10, 'All 10 identified nyotaone.com source URLs are mapped');
const twekolereRedirect = MIGRATION_LOG.find((m) => m.sourceUrl.includes('twekolere'));
assert(!!twekolereRedirect, 'Twekolere project URL is mapped with redirect');
const ugalightsRedirect = MIGRATION_LOG.find((m) => m.sourceUrl.includes('ugalights'));
assert(!!ugalightsRedirect, 'UGALights commerce hub URL is mapped with redirect');

// 6. Invoices, Matching Orders & Corporate Rubber Stamps (PAID / PAY LATER)
console.log('\n[6. Invoices, Pay Later Matching & Corporate Stamps]');
import { INITIAL_INVOICES, INITIAL_ORDERS } from '../src/data/seedData';
import { store } from '../src/lib/store';

const paidSeedInv = INITIAL_INVOICES.find((i) => i.stamp === 'PAID');
assert(!!paidSeedInv, 'Initial invoices contain at least one invoice with PAID stamp');
assert(paidSeedInv?.paidAt !== undefined, 'PAID invoice has paidAt timestamp');

const payLaterSeedInv = INITIAL_INVOICES.find((i) => i.stamp === 'PAY_LATER');
assert(!!payLaterSeedInv, 'Initial invoices contain at least one invoice with PAY_LATER stamp');
assert(Boolean(payLaterSeedInv?.paymentTerms?.includes('Net')), 'PAY_LATER invoice has clear net payment terms');

// Test automated matching invoice generation for Pay Later Order
const testPayLaterOrder = store.createOrder({
  orderReference: 'NYOTA-TEST-PAY-LATER-999',
  customerName: 'Sarah Namugga',
  customerEmail: 'sarah@testenterprise.com',
  customerPhone: '+256 701 999 888',
  deliveryAddress: 'Plot 12, Lugogo Bypass, Kampala',
  currency: 'UGX',
  paymentMethod: 'pay_later',
  paymentStatus: 'pending',
  orderStatus: 'processing',
  items: [
    {
      id: 'item-test-1',
      itemId: 'srv-1',
      type: 'service',
      title: 'Starter Business Website',
      quantity: 1,
      unitPrice: 450000,
      subtotal: 450000
    }
  ],
  total: 450000,
  subtotal: 450000,
  deliveryFee: 0,
  discount: 0
});

const matchingPayLaterInv = store.invoices.find((i) => i.orderReference === testPayLaterOrder.orderReference);
assert(!!matchingPayLaterInv, 'Pay later order has an automatically generated matching invoice');
assert(matchingPayLaterInv?.stamp === 'PAY_LATER', 'Pay later order invoice has PAY_LATER stamp');
assert(matchingPayLaterInv?.balanceDue === 450000, 'Pay later invoice accurately records full balance due');

// Test recording payment flips stamp to PAID
const updatedInv = store.recordInvoicePayment(
  matchingPayLaterInv!.id,
  450000,
  'MOMO-TID-TEST-888',
  'Finance Director',
  'Full settlement via MTN MoMo'
);
assert(updatedInv?.stamp === 'PAID', 'Recording full payment flips PAY_LATER stamp to PAID');
assert(updatedInv?.balanceDue === 0, 'Balance due is cleared to 0 upon payment');
assert(updatedInv?.verifiedBy === 'Finance Director', 'Payment verification staff recorded on stamp');

// Test manual finance commercial invoice creation
const manualInv = store.createManualInvoice({
  customerName: 'Kikubo Wholesalers Association',
  customerEmail: 'accounts@kikubo.ug',
  customerPhone: '+256 752 111 222',
  customerAddress: 'Kikubo Lane, Kampala',
  currency: 'UGX',
  paymentTerms: 'Pay Later — Net 14 Days',
  dueDate: '2026-11-15',
  stamp: 'PAY_LATER',
  items: [
    {
      description: 'Custom ERP and Multi-Branch Sync Machine',
      quantity: 1,
      unitPrice: 1800000,
      amount: 1800000
    }
  ],
  notes: 'Commercial credit granted under Nyota Partner Terms.'
});
assert(!!manualInv, 'Manual invoice created successfully via finance desk');
assert(manualInv.stamp === 'PAY_LATER', 'Manual invoice has PAY_LATER stamp applied');
const matchingOrderForManual = store.orders.find((o) => o.orderReference === manualInv.orderReference);
assert(!!matchingOrderForManual, 'Manual finance invoice creates synchronized matching order record');

// 7. Toast Notification Feedback on Cart Additions
console.log('\n[7. Toast Notification Feedback on Cart Additions]');
store.clearToasts();
assert(store.toasts.length === 0, 'Toast list is initially empty after clearing');

store.addToCart({
  itemId: 'POS-MOB-001',
  type: 'product',
  title: 'Sunmi V2 Mobile POS Terminal',
  priceUGX: 650000,
  priceUSD: 175,
  quantity: 2,
  category: 'Mobile POS'
});

assert(store.toasts.length > 0, 'Adding an item to the cart triggers a toast notification');
const latestToast = store.toasts[0];
assert(latestToast.type === 'success', 'Toast notification has success type');
assert(latestToast.title === 'Added to Cart', 'Toast notification title is "Added to Cart"');
assert(latestToast.item?.title === 'Sunmi V2 Mobile POS Terminal', 'Toast notification accurately records item title');
assert(latestToast.item?.quantity === 2, 'Toast notification records item quantity');
assert(latestToast.item?.priceUGX === 650000, 'Toast notification records accurate item pricing');

store.dismissToast(latestToast.id);
assert(store.toasts.length === 0, 'Dismissing the toast removes it from active list');

// Summary
console.log(`\n==========================================`);
console.log(`Test Execution Finished: ${testsPassed} Passed, ${testsFailed} Failed.`);
console.log(`==========================================\n`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
