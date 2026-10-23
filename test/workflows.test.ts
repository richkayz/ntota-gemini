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

// Summary
console.log(`\n==========================================`);
console.log(`Test Execution Finished: ${testsPassed} Passed, ${testsFailed} Failed.`);
console.log(`==========================================\n`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
