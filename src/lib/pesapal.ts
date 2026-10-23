/**
 * PesaPal API 3.0 Integration & Reconciliation Utilities
 * Official Docs: https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/api-reference
 */

export interface PesaPalAuthResponse {
  token: string;
  expiryDate: string;
  error?: string;
  status: string;
}

export interface PesaPalSubmitOrderPayload {
  id: string; // Merchant Reference (e.g. NYOTA-2026-XXXX)
  currency: 'UGX' | 'USD';
  amount: number;
  description: string;
  callback_url: string;
  notification_id: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    last_name: string;
    line_1?: string;
    city?: string;
  };
}

export interface PesaPalOrderResponse {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error?: any;
  status: string;
}

export interface PesaPalTransactionStatusResponse {
  payment_method: string;
  amount: number;
  created_date: string;
  confirmation_code: string;
  payment_status_description: 'Completed' | 'Failed' | 'Reversed' | 'Pending';
  description: string;
  message: string;
  payment_account: string;
  call_back_url: string;
  status_code: number; // 1 = Completed, 2 = Failed, 3 = Reversed, 0 = Invalid
  merchant_reference: string;
  currency: string;
  error?: any;
}

export const PESAPAL_ENDPOINTS = {
  sandbox: 'https://cybqa.pesapal.com/pesapalv3',
  live: 'https://pay.pesapal.com/v3'
};

/**
 * Maps PesaPal status codes to Nyota One PaymentStatus
 */
export function mapPesaPalStatus(statusCode: number | string): 'completed' | 'failed' | 'refunded' | 'pending' {
  const code = Number(statusCode);
  if (code === 1 || String(statusCode).toUpperCase() === 'COMPLETED') {
    return 'completed';
  }
  if (code === 2 || String(statusCode).toUpperCase() === 'FAILED') {
    return 'failed';
  }
  if (code === 3 || String(statusCode).toUpperCase() === 'REVERSED') {
    return 'refunded';
  }
  return 'pending';
}

/**
 * Bank and Mobile Money Instructions for Verified Manual Settlement
 * Note: Presented only at checkout and within secure invoices/receipts
 */
export const MANUAL_PAYMENT_DETAILS = {
  ugandaMobileMoney: {
    title: 'MTN & Airtel Mobile Money (Uganda)',
    merchantCode: '902144 (Ordernow Digital / Nyota One)',
    accountName: 'Nyota One / Ordernow Digital Solutions',
    registeredPhone: '+256 702 086774 / +256 772 023461',
    instructions:
      'Dial *165*3# on MTN or *185*9# on Airtel, enter Merchant Code 902144, enter exact amount in UGX, and use your Order Reference (e.g. NYOTA-2026-XXXX) as the Reason. Once sent, paste your Transaction ID below for rapid finance verification.'
  },
  bankTransferUGX: {
    title: 'Commercial Bank Wire (UGX)',
    bankName: 'Stanbic Bank Uganda',
    accountName: 'Ordernow Digital Solutions - Nyota One',
    accountNumber: '9030018491024',
    branch: 'Crested Towers Branch, Kampala',
    swiftCode: 'SBICUGKX',
    instructions:
      'Initiate an EFT or RTGS transfer in UGX. Set your Order Reference as the payment narration. Your order will be activated as soon as the funds clear with our finance desk.'
  },
  bankTransferUSD: {
    title: 'Commercial Bank Wire (USD)',
    bankName: 'Stanbic Bank Uganda (USD Account)',
    accountName: 'Ordernow Digital Solutions - Nyota One',
    accountNumber: '9030018491032 (USD)',
    branch: 'Crested Towers Branch, Kampala',
    swiftCode: 'SBICUGKX',
    instructions:
      'For clients in the UK, US, and internationally. Transfer USD with your Order Reference in the reference field. Allow 24-48 business hours for international wire clearance.'
  }
};
