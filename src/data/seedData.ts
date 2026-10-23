import { ServiceItem, ProductItem, BlogPost, PortfolioProject, Order, Invoice, UserProfile } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-starter-web',
    slug: 'starter-business-website',
    title: 'Starter Business Website',
    category: 'web',
    shortDescription: 'Professional, mobile-responsive company website tailored to win local trust and convert visitors into calls and inquiries.',
    fullDescription: 'Establish your authoritative online footprint with a fast, modern, and beautifully designed business website. Built specifically for East African and international businesses that need to look credible, load smoothly even on mobile connections, and rank on Google.',
    problemSolved: 'Solves the lack of a verified digital presence, unprofessional free email links, and lost customer confidence from relying solely on informal social media profiles.',
    deliverables: [
      'Modern 4–6 page responsive layout (Home, Services, About, Portfolio, Contact)',
      'Free 1-year .com or .co.ug domain name setup',
      'High-speed cloud SSD web hosting & SSL security certificate',
      'Direct WhatsApp chat integration & interactive quote request form',
      'Google Maps & Google Business Profile indexing setup',
      'Mobile-first responsive optimization and fast load times'
    ],
    scope: [
      'Design consultation and content structure arrangement',
      'Up to 6 custom branded pages',
      'Integration of client logos, copy, and product photos',
      'Basic on-page SEO metadata and social share preview tags'
    ],
    exclusions: [
      'Full e-commerce shopping cart with multi-step gateway (see Custom Web)',
      'Content copywriting from scratch without client briefing'
    ],
    priceUGX: 450000,
    priceUSD: 120,
    timelineEstimate: '3 to 5 business days',
    requiredInfo: ['Business name and logo', 'List of services offered', 'Contact numbers and office address', 'Target audience description'],
    featured: true,
    faqs: [
      {
        q: 'Can I update the website content myself after launch?',
        a: 'Yes. We provide an easy-to-use content dashboard and a walkthrough session so you can edit text, photos, and contact info at any time.'
      },
      {
        q: 'Will my website display properly on smartphones?',
        a: 'Every Nyota One website is built mobile-first, ensuring smooth loading and sharp display on all smartphones, tablets, and desktops.'
      }
    ]
  },
  {
    id: 'srv-custom-web-app',
    slug: 'custom-web-software-application',
    title: 'Custom Web & Software Application',
    category: 'web',
    shortDescription: 'Tailor-engineered web applications, bespoke client portals, and multi-currency e-commerce systems with local payment gateway integrations.',
    fullDescription: 'When off-the-shelf software falls short, Nyota One builds custom scalable web applications, client booking portals, multi-tenant SaaS tools, and e-commerce systems integrated with local mobile money (MTN, Airtel) and Visa/Mastercard.',
    problemSolved: 'Eliminates clumsy manual spreadsheets, disconnected operational workflows, and clunky international payment gateways that reject African customer cards or mobile money.',
    deliverables: [
      'Custom database architecture and secure authentication system',
      'Role-based access control for staff, managers, and clients',
      'PesaPal 3.0, MTN MoMo, Airtel Money, or Stripe integration',
      'Client portal with order history, invoices, and account tracking',
      'Automated transactional emails and SMS notification alerts',
      'Comprehensive deployment, source code handover, and security hardening'
    ],
    scope: [
      'Architecture design sprint and technical specifications',
      'Full-stack frontend and backend development',
      'Database schema setup, automated data backups, and API webhooks',
      '30 days of post-launch stabilization support'
    ],
    exclusions: [
      'Third-party cloud infrastructure subscription fees (AWS/GCP/Supabase hosting accounts are owned by the client)'
    ],
    priceUGX: 1800000,
    priceUSD: 490,
    isStartingPrice: true,
    timelineEstimate: '2 to 4 weeks depending on scope',
    requiredInfo: ['Detailed workflow diagram or brief', 'Payment gateway preferences', 'Staff roles and permissions requirement'],
    featured: true,
    faqs: [
      {
        q: 'Which payment methods can be accepted?',
        a: 'We integrate PesaPal 3.0, direct MTN MoMo and Airtel Money open APIs, Flutterwave, and Stripe for card payments.'
      }
    ]
  },
  {
    id: 'srv-email-domain',
    slug: 'business-email-domain-setup',
    title: 'Business Email & Domain Setup',
    category: 'email',
    shortDescription: 'Elevate your commercial communications from @gmail.com to verified custom addresses (e.g. info@yourbusiness.com) configured for 100% inbox delivery.',
    fullDescription: 'Stop losing lucrative enterprise contracts because your proposals originate from a generic free webmail address. We configure verified corporate email systems with Google Workspace or Microsoft 365, SPF, DKIM, and DMARC security records.',
    problemSolved: 'Prevents emails landing in spam folders, eliminates reputational risks of free email handles, and centralizes team communication under corporate ownership.',
    deliverables: [
      'Registration or DNS connection of your custom domain',
      'Setup of up to 5 business email inboxes (e.g., info@, sales@, ceo@)',
      'Full cryptographic email security configuration (DKIM, SPF, DMARC, MX records)',
      'Outlook, iPhone, and Android app configuration instructions',
      'Centralized admin control so former employees lose access immediately'
    ],
    scope: [
      'DNS records verification and troubleshooting',
      'Inbox creation and mailbox routing test',
      'Setup documentation and remote video walkthrough'
    ],
    exclusions: [
      'Google Workspace or Microsoft 365 monthly mailbox licensing fees if premium cloud suites are selected'
    ],
    priceUGX: 180000,
    priceUSD: 50,
    timelineEstimate: '24 hours',
    requiredInfo: ['Desired domain name', 'List of team mailbox names (e.g. john@, info@)', 'Current domain registrar login if already purchased'],
    featured: true,
    faqs: [
      {
        q: 'Can I access these emails on my mobile phone?',
        a: 'Yes, we configure your mailboxes to work seamlessly with Apple Mail, Gmail app, Outlook app, or webmail.'
      }
    ]
  },
  {
    id: 'srv-pos-inventory',
    slug: 'pos-inventory-machine-setup',
    title: 'POS & Inventory Machine Setup',
    category: 'pos',
    shortDescription: 'Complete retail or wholesale Point-of-Sale setup with barcode scanning, automated stock alerts, receipt printing, and daily reconciliation.',
    fullDescription: 'Take total control over stock pilferage, cash reconciliation, and sales reporting. Nyota One supplies and configures complete POS hardware and cloud/offline software tailored for shops, supermarkets, pharmacies, restaurants, and wholesale distribution.',
    problemSolved: 'Stops untracked staff cash shortages, manual paper receipt errors, unnoticed stock depletion, and supplier billing discrepancies.',
    deliverables: [
      'POS software deployment and initial product catalogue upload (up to 150 SKUs)',
      'Barcode scanner and thermal receipt printer connection and test',
      'Cash drawer calibration and split tender payment setup (Cash + Mobile Money + Card)',
      'Daily Z-report and end-of-day sales reconciliation configuration',
      'Hands-on staff training session in Kampala or remote video onboarding'
    ],
    scope: [
      'Software configuration, database creation, user permissions setup',
      'Hardware peripheral pairing and printer template customization'
    ],
    exclusions: [
      'Physical POS hardware units (purchased separately in our Shop)'
    ],
    priceUGX: 850000,
    priceUSD: 230,
    timelineEstimate: '2 to 3 business days',
    requiredInfo: ['Store layout and product category breakdown', 'Existing inventory list (Excel or paper ledgers)', 'Receipt header details'],
    featured: true,
    faqs: [
      {
        q: 'Does the POS still work if our internet connection drops?',
        a: 'Yes, our POS system features an offline-first cache so sales and receipt printing continue uninterrupted, auto-syncing once connectivity resumes.'
      }
    ]
  },
  {
    id: 'srv-google-search',
    slug: 'google-business-local-search',
    title: 'Google Business & Local Search',
    category: 'growth',
    shortDescription: 'Get your business pinned on Google Maps, optimized for local search results, and verified to receive direct phone calls and navigation visits.',
    fullDescription: 'When high-intent customers search for your products or services "near me" in Kampala, Entebbe, or Jinja, make sure your company appears first with official directions, phone number, operating hours, photos, and genuine client reviews.',
    problemSolved: 'Fixes being invisible to nearby buyers searching Google, unverified location pins leading customers astray, and competitor dominance on local map packs.',
    deliverables: [
      'Official Google Business Profile setup or claim and verification support',
      'Accurate GPS pin placement and directions calibration',
      'Keyword-optimized business description, service categories, and trading hours',
      'Professional photo gallery upload of your physical storefront or products',
      'Direct Google Review QR code and link generator for happy customers'
    ],
    scope: [
      'Profile setup, category optimization, keyword research, review strategy guide'
    ],
    exclusions: [
      'Paid Google Ads spend (this is for organic Google Maps presence)'
    ],
    priceUGX: 220000,
    priceUSD: 60,
    timelineEstimate: '2 to 4 business days',
    requiredInfo: ['Exact physical address or landmark location', 'Business telephone and WhatsApp numbers', 'Storefront photos'],
    featured: false,
    faqs: [
      {
        q: 'How long until my business appears on Google Maps?',
        a: 'Once Google verifies the ownership pin (usually 3 to 7 days), your profile is live immediately for local searchers.'
      }
    ]
  },
  {
    id: 'srv-social-content',
    slug: 'social-media-content-engine',
    title: 'Social Media & Content Engine',
    category: 'growth',
    shortDescription: 'Monthly branded content assets, promotional graphic banners, and short-form video reels that showcase your actual products and services.',
    fullDescription: 'Turn your social channels into a consistent customer acquisition channel. We produce crisp branded graphics, product carousels, and promotional reels that clearly communicate your value and drive WhatsApp inquiries.',
    problemSolved: 'Ends erratic posting, blurry generic stock photos, inconsistent branding, and dead social media accounts that harm your credibility.',
    deliverables: [
      '12 high-resolution branded promotional graphics per month',
      '4 short-form video reels/carousels optimized for TikTok and Instagram',
      'Customized captions with high-relevance East African hashtags',
      'Monthly editorial calendar and content scheduling',
      'Performance analytics and enquiry volume review'
    ],
    scope: [
      'Graphic design, caption copywriting, branding alignment, monthly reporting'
    ],
    exclusions: [
      'Paid ad spend budget (handled as an optional add-on managed ad campaign)'
    ],
    priceUGX: 350000,
    priceUSD: 95,
    timelineEstimate: 'Ongoing monthly retainer',
    requiredInfo: ['Brand logos and brand colors', 'High-res photos of your products or work', 'Key promotions or target products for the month'],
    featured: false
  },
  {
    id: 'srv-strategy-remote',
    slug: 'strategy-session-remote',
    title: 'Strategy Session (Remote)',
    category: 'consultation',
    shortDescription: '60-minute focused video consultation with a senior digital architect to audit your systems, technology roadmap, and online conversion bottlenecks.',
    fullDescription: 'Sit down 1-on-1 via Google Meet or Zoom with a senior digital engineer. We review your current website, customer acquisition flow, software stack, and identify immediate high-ROI digital fixes and automations for your business.',
    problemSolved: 'Stops wasted budget on wrong software tools, clarifies technical priorities, and provides an unbiased expert assessment before you commit large capital.',
    deliverables: [
      '60-minute deep-dive video call with screen-sharing audit',
      'Written action summary report with prioritized recommendations',
      'Vendor and architecture recommendation list',
      'Direct session recording link for your internal team'
    ],
    scope: ['Technical evaluation, digital architecture review, question & answer'],
    exclusions: ['Hands-on software implementation during the consultation call'],
    priceUGX: 100000,
    priceUSD: 30,
    timelineEstimate: 'Scheduled within 48 hours',
    requiredInfo: ['Your current website URL if any', 'Main operational bottlenecks or goals', 'List of questions you need answered'],
    featured: false
  },
  {
    id: 'srv-oncall-consult',
    slug: 'on-call-consultation',
    title: 'On-call Consultation',
    category: 'consultation',
    shortDescription: 'Priority direct access and on-site or emergency on-call technical consulting for urgent infrastructure, deployment, or mission-critical troubleshooting.',
    fullDescription: 'When downtime, system lockouts, or mission-critical technical transitions happen, Nyota One provides rapid-response on-call senior engineering support either on-site in Kampala or via priority remote channel.',
    problemSolved: 'Resolves emergency website outages, database crashes, malware infections, and payment gateway downtime without long support ticket delays.',
    deliverables: [
      'Up to 3 hours of dedicated senior engineer time',
      'Emergency root-cause diagnostic and immediate remediation',
      'Post-incident preventive maintenance briefing'
    ],
    scope: ['Urgent diagnosis, server recovery, data restore, emergency configurations'],
    exclusions: ['Long-term development sprints (quoted separately)'],
    priceUGX: 200000,
    priceUSD: 80,
    timelineEstimate: 'Same-day response within 4 hours',
    requiredInfo: ['System access credentials', 'Incident timeline and error logs'],
    featured: false
  },
  {
    id: 'srv-custom-plan',
    slug: 'custom-plans',
    title: 'Custom Digital Solutions Plan',
    category: 'custom',
    shortDescription: 'Multi-service turnkey digital foundation: from branding and enterprise ERP to hardware supply and managed cloud infrastructure.',
    fullDescription: 'Designed for institutions, schools, regional logistics hubs, and growing enterprises that require a comprehensive combination of hardware, custom software, training, and ongoing technical support.',
    problemSolved: 'Consolidates multi-vendor fragmentation into a single accountable digital engineering partner.',
    deliverables: [
      'Full technical discovery workshop and system blueprint',
      'Consolidated hardware and software delivery schedule',
      'Dedicated project manager and priority SLA support contract'
    ],
    scope: ['Customized based on formal requirement specification'],
    exclusions: ['Determined in mutual Statement of Work'],
    priceUGX: 300000,
    priceUSD: 100,
    isStartingPrice: true,
    isQuotationBased: true,
    timelineEstimate: 'Custom timeline',
    requiredInfo: ['Organizational structure', 'Scale of operations and hardware needs'],
    featured: false
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-mpos-sunmi-v2',
    sku: 'POS-MOB-001',
    name: 'Sunmi V2 Handheld Android Mobile POS Terminal',
    slug: 'sunmi-v2-handheld-android-mobile-pos',
    category: 'Mobile POS',
    brand: 'Sunmi',
    description: 'Ultra-portable Android handheld POS device with built-in 58mm thermal receipt printer, barcode camera scanner, and 4G SIM + Wi-Fi connectivity. Ideal for restaurants, delivery riders, and mobile retail.',
    features: [
      'Built-in 58mm high-speed Seiko thermal receipt printer',
      '5.45" HD+ IPS capacitive touch display',
      '4G cellular SIM slot + dual-band Wi-Fi connectivity',
      'Rechargeable 2580mAh lithium polymer battery (all-day shift)',
      'Pre-loaded with Nyota Stores POS or compatible retail APKs'
    ],
    specifications: {
      'Operating System': 'Android 7.1 / Sunmi OS',
      'Processor': 'Quad-Core 1.3GHz CPU',
      'Printer': 'Thermal Printer 58mm, 70mm/s',
      'Connectivity': '4G / 3G / 2G / Wi-Fi 2.4G & 5G / Bluetooth 4.0',
      'Weight': '364g'
    },
    priceUGX: 680000,
    priceUSD: 185,
    salePriceUGX: 650000,
    salePriceUSD: 175,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 14,
    isAvailable: true,
    warranty: '12 Months Official Manufacturer Warranty',
    returnPolicy: '7 Days Replacement for factory defects',
    deliveryEstimate: 'Next-day delivery in Kampala / 2-3 days nationwide',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-01-15T00:00:00Z'
  },
  {
    id: 'prod-pos-desktop-allinone',
    sku: 'POS-DSK-002',
    name: '15.6" Dual-Screen All-in-One Desktop Touch POS System',
    slug: '15-6-inch-dual-screen-desktop-touch-pos',
    category: 'Desktop POS',
    brand: 'Senor Touch',
    description: 'Heavy-duty commercial countertop POS terminal with 15.6" primary capacitive touchscreen and customer-facing 10.1" advertising display. Built for supermarkets, wholesale counters, and busy pharmacies.',
    features: [
      'Dual displays: 15.6" operator touch + 10.1" customer bill viewer',
      'Intel Core i5 processor with 8GB RAM and 128GB SSD',
      'Solid aluminum alloy weighted base resistant to vibration',
      'Extensive ports: 6x USB, 2x COM, 1x LAN, 1x Cash Drawer RJ11 port',
      'Runs Windows 10/11 Pro or Linux'
    ],
    specifications: {
      'Screen Size': '15.6 Inch Main (1920x1080) + 10.1 Inch Secondary',
      'CPU': 'Intel Core i5-6200U 2.3GHz',
      'RAM': '8GB DDR4',
      'Storage': '128GB mSATA SSD',
      'Touch Panel': '10-Point Projected Capacitive Touch'
    },
    priceUGX: 2450000,
    priceUSD: 660,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 8,
    isAvailable: true,
    warranty: '1 Year Warranty & Free Onsite Calibration in Kampala',
    returnPolicy: '14 Days Repair or Replacement Guarantee',
    deliveryEstimate: 'Same-day dispatch in Kampala',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-01-20T00:00:00Z'
  },
  {
    id: 'prod-pos-thermal-printer',
    sku: 'POS-ACC-003',
    name: '80mm Thermal Receipt Printer with Auto-Cutter (USB + LAN + Bluetooth)',
    slug: '80mm-thermal-receipt-printer-auto-cutter',
    category: 'POS Terminals & Accessories',
    brand: 'Xprinter',
    description: 'High-speed 260mm/s 80mm commercial thermal receipt printer with reliable auto-cutter, cash drawer kick-out port, and multi-interface connectivity.',
    features: [
      'Triple connectivity: USB + Ethernet LAN + Bluetooth',
      'Automatic guillotine cutter rated for 1.5 million cuts',
      'Drop-in thermal paper roll loading (easy paper changes)',
      'RJ11 standard port for automatic cash drawer triggering'
    ],
    specifications: {
      'Print Method': 'Direct Thermal',
      'Print Speed': '260mm/sec',
      'Paper Width': '79.5±0.5mm',
      'Interface': 'USB + LAN + Bluetooth + Cash Drawer RJ11'
    },
    priceUGX: 380000,
    priceUSD: 105,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 25,
    isAvailable: true,
    warranty: '6 Months Warranty',
    returnPolicy: '7 Days Return',
    deliveryEstimate: '1-2 Days',
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-02-01T00:00:00Z'
  },
  {
    id: 'prod-cctv-hikvision-4cam-kit',
    sku: 'SEC-CAM-004',
    name: 'Hikvision 4-Camera 5MP HD Security Surveillance Kit',
    slug: 'hikvision-4-camera-5mp-hd-security-kit',
    category: 'CCTV Cameras',
    brand: 'Hikvision',
    description: 'Complete commercial and office security kit with four 5MP weatherproof cameras (color night vision), 4-channel DVR with 1TB surveillance hard drive, and mobile phone live-monitoring app.',
    features: [
      '4x 5MP high-resolution indoor/outdoor weather-sealed cameras',
      'Smart EXIR night vision up to 25 meters',
      '1TB Western Digital Purple surveillance-grade hard drive included',
      'Free Hik-Connect iOS and Android live mobile monitoring app'
    ],
    specifications: {
      'Resolution': '5 Megapixel (2560 × 1944)',
      'DVR Channels': '4-Channel Turbo HD DVR',
      'Storage': '1TB Surveillance Hard Drive Installed',
      'Weatherproofing': 'IP67 Weatherproof rating'
    },
    priceUGX: 1350000,
    priceUSD: 365,
    salePriceUGX: 1250000,
    salePriceUSD: 340,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 12,
    isAvailable: true,
    warranty: '2 Years Manufacturer Warranty',
    returnPolicy: '7 Days Return on unopened equipment',
    deliveryEstimate: 'Next-day delivery with optional installation service',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-02-10T00:00:00Z'
  },
  {
    id: 'prod-cctv-nvr-8ch',
    sku: 'SEC-REC-005',
    name: '8-Channel 4K PoE Network Video Recorder (NVR)',
    slug: '8-channel-4k-poe-network-video-recorder',
    category: 'CCTV Recorders',
    brand: 'Dahua',
    description: 'Professional 8-channel PoE NVR supporting up to 8K/4K IP cameras with plug-and-play Power over Ethernet ports, motion detection analytics, and remote mobile access.',
    features: [
      '8 independent PoE network interfaces (no external power adapters needed for cameras)',
      'Supports up to 8 Megapixel 4K ultra HD IP cameras',
      'Dual SATA interfaces supporting up to 16TB storage',
      'Smart AI motion alerts and tripwire detection'
    ],
    specifications: {
      'Channels': '8 PoE Channels',
      'Bandwidth': '80Mbps incoming',
      'Video Output': '1 HDMI (up to 4K), 1 VGA',
      'Compression': 'H.265+ smart video coding'
    },
    priceUGX: 890000,
    priceUSD: 240,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 6,
    isAvailable: true,
    warranty: '1 Year Warranty',
    returnPolicy: '7 Days Replacement',
    deliveryEstimate: '1-3 Business Days',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-02-14T00:00:00Z'
  },
  {
    id: 'prod-laptop-dell-latitude',
    sku: 'CMP-LAP-006',
    name: 'Dell Latitude 5420 Business Ultrabook (Intel Core i5, 16GB, 512GB SSD)',
    slug: 'dell-latitude-5420-business-ultrabook',
    category: 'Computers & Laptops',
    brand: 'Dell',
    description: 'Enterprise-grade 14-inch durable business laptop engineered for day-in day-out office work, accounting software, and executive productivity with 10-hour battery life.',
    features: [
      'Intel Core i5-1145G7 11th Gen quad-core processor',
      '16GB DDR4 high-speed RAM for multitasking without stutter',
      '512GB NVMe PCIe ultra-fast Solid State Drive',
      '14" Full HD anti-glare display with narrow bezel',
      'Backlit spill-resistant keyboard and Windows 11 Pro licensed'
    ],
    specifications: {
      'Processor': 'Intel Core i5-1145G7 (up to 4.40 GHz)',
      'RAM': '16GB DDR4-3200MHz',
      'Storage': '512GB M.2 NVMe SSD',
      'Screen': '14.0" FHD (1920x1080) WVA Anti-Glare',
      'Weight': '1.4 kg'
    },
    priceUGX: 2150000,
    priceUSD: 580,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 9,
    isAvailable: true,
    warranty: '1 Year Warranty with Nyota Care Support',
    returnPolicy: '7 Days Return on hardware faults',
    deliveryEstimate: 'Same-day in Kampala / Free delivery',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-02-22T00:00:00Z'
  },
  {
    id: 'prod-net-tp-omada-router',
    sku: 'NET-RTR-007',
    name: 'TP-Link Omada Gigabit Multi-WAN VPN Business Gateway Router',
    slug: 'tp-link-omada-gigabit-multi-wan-vpn-router',
    category: 'Networking Equipment',
    brand: 'TP-Link',
    description: 'Dual-WAN/Multi-WAN gigabit business router that allows you to plug two internet providers (e.g., MTN + Airtel or Roke Telkom) simultaneously with automatic failover.',
    features: [
      'Multi-WAN load balancing & automatic link failover (never lose internet)',
      'Up to 4 WAN Gigabit ports for redundancy',
      'Hardware-based OpenVPN & IPsec VPN server for secure remote branch access',
      'Enterprise firewall, VLAN segmentation, and guest Wi-Fi portal support'
    ],
    specifications: {
      'Ports': '1 Gigabit SFP + 4 Gigabit RJ45 ports',
      'Throughput': 'Gigabit wire-speed routing',
      'VPN Sessions': 'Up to 50 IPsec / 50 OpenVPN tunnels',
      'Management': 'Omada Cloud Centralized SDN Controller'
    },
    priceUGX: 420000,
    priceUSD: 115,
    type: 'physical',
    procurementType: 'stocked',
    stockQuantity: 18,
    isAvailable: true,
    warranty: '1 Year TP-Link Official Warranty',
    returnPolicy: '7 Days Return',
    deliveryEstimate: '1-2 Days',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    published: true,
    created_at: '2026-03-01T00:00:00Z'
  },
  {
    id: 'prod-soft-nyota-stores-lic',
    sku: 'SFT-POS-008',
    name: 'Nyota Stores Retail & Wholesale POS Software License (Lifetime)',
    slug: 'nyota-stores-retail-wholesale-pos-software-license',
    category: 'Software & Digital Products',
    brand: 'Nyota One',
    description: 'Lifetime single-station license for Nyota Stores POS. Offline-capable, barcode scanner enabled, automated low-stock notifications, profit margin calculation, and daily sales auditing.',
    features: [
      'Offline-first operational mode (no internet required for routine billing)',
      'Unlimited products, customer records, and receipt generations',
      'Daily Z-reading, cash drawer reconciliation, and expense tracking',
      'Instant digital download with activation license key upon verified payment',
      'Free software patch updates for life'
    ],
    specifications: {
      'Platform': 'Windows 10/11, macOS, Android Tablet',
      'License Type': 'Perpetual Single-Terminal License',
      'Database': 'Encrypted Local SQLite with optional cloud backup',
      'Delivery Format': 'Instant Digital Download + License Key via Email'
    },
    priceUGX: 450000,
    priceUSD: 120,
    type: 'digital',
    procurementType: 'stocked',
    stockQuantity: 999,
    isAvailable: true,
    warranty: 'Lifetime License & 90 Days Free Tech Support',
    returnPolicy: 'Digital download terms apply (non-refundable once activated)',
    deliveryEstimate: 'Instant digital delivery upon payment verification',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    downloadUrl: '/downloads/nyota-stores-pos-v2.6.zip',
    published: true,
    created_at: '2026-03-05T00:00:00Z'
  }
];

export const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-twekolere',
    slug: 'twekolere-job-noticeboard',
    title: 'Twekolere — Phone-Verified Direct Employment Platform',
    category: 'Internal Business Tools',
    client: 'Twekolere Uganda',
    location: 'Kampala, Uganda',
    liveUrl: 'https://twekolere.com',
    problem: 'Job seekers in Uganda frequently fell victim to extortionate intermediary brokers and fake employment bureaus charging exorbitant advance registration fees for non-existent vacancies.',
    solution: 'Engineered a direct employer-to-worker verified noticeboard where households and businesses post genuine vacancies and job seekers contact verified hiring managers directly with zero agency commissions.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'SMS Phone Verification API'],
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    outcome: 'Eliminated middlemen for thousands of job postings, providing an uncompromised, phone-verified platform with zero agency charges.',
    featured: true,
    isMigrated: true
  },
  {
    id: 'proj-ugalights',
    slug: 'ugalights-commerce-hub',
    title: 'UGALights — Lighting & Electrical E-Commerce Hub',
    category: 'E-commerce',
    client: 'UGALights Electrical Suppliers',
    location: 'Nakivubo / Kampala, Uganda',
    liveUrl: 'https://ugalights.com',
    problem: 'A major wholesale distributor of solar lights, chandeliers, and industrial electrical panels in downtown Kampala needed an online catalogue to receive bulk quote requests and retail orders with local mobile money checkout.',
    solution: 'Designed and launched a multi-category commerce platform showcasing over 600 SKUs with filterable wattage specifications, automated quotation generation, and PesaPal mobile money checkout.',
    techStack: ['Next.js', 'Tailwind CSS', 'PesaPal 3.0 API', 'Supabase Database', 'Cloudinary CDN'],
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
    outcome: 'Increased outbound regional orders from upcountry buyers in Gulu, Mbarara, and Jinja who previously had to travel to Kampala to place orders.',
    featured: true,
    isMigrated: true
  },
  {
    id: 'proj-choma-journeys',
    slug: 'choma-journeys',
    title: 'Choma Journeys — East African Travel & Culinary Expedition Portal',
    category: 'Websites',
    client: 'Choma Journeys Ltd',
    location: 'Entebbe & Nairobi',
    liveUrl: 'https://chomajourneys.com',
    problem: 'An experiential travel company offering curated wildlife safaris and East African culinary expeditions was losing bookings due to an outdated slow website that could not handle international card reservations.',
    solution: 'Created an immersive, high-speed travel booking experience featuring interactive safari itineraries, authentic photography, and multi-currency reservation checkout supporting USD and UGX.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe & PesaPal Multi-Gateway', 'Cloudflare Pages'],
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',
    outcome: 'Enabled seamless online deposit payments for international tourists from the UK and USA.',
    featured: true,
    isMigrated: true
  },
  {
    id: 'proj-nyota-stores',
    slug: 'nyota-stores-pos-dashboard',
    title: 'Nyota Stores — Multi-Branch Retail & Barcode POS Dashboard',
    category: 'Business Systems',
    client: 'Nyota One Internal Product',
    location: 'Kampala, Uganda',
    liveUrl: 'https://nyotaone.com/shop/software',
    problem: 'Independent retail outlets faced severe stock theft and reconciliation headaches from relying on offline paper logbooks or expensive monthly cloud POS subscriptions that halted whenever the internet failed.',
    solution: 'Built an offline-first POS architecture that synchronizes local barcode sales, generates A4 and 58mm/80mm thermal receipts, tracks stock expiry dates, and alerts owners of low inventory.',
    techStack: ['Electron', 'React', 'SQLite Local Engine', 'Tailwind CSS', 'Thermal ESC/POS Driver'],
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80',
    outcome: 'Tested across supermarkets and pharmacies, reducing end-of-day stock reconciliation time from 2 hours to under 10 minutes.',
    featured: true,
    isMigrated: true
  },
  {
    id: 'proj-nyota-inbox',
    slug: 'nyota-inbox-workspace-suite',
    title: 'Nyota Inbox — Managed Business Email & Workspace Suite',
    category: 'Internal Business Tools',
    client: 'Nyota One Cloud Services',
    location: 'East Africa / Global',
    liveUrl: 'https://nyotaone.com/services/business-email',
    problem: 'SMEs were losing credibility sending bids from free @gmail or @yahoo addresses, and lacked the technical expertise to configure complex SPF, DKIM, and MX records without breaking their websites.',
    solution: 'Engineered an automated DNS provisioning and mailbox orchestration workflow that deploys enterprise-grade branded mailboxes configured for 100% inbox deliverability.',
    techStack: ['Node.js', 'DNS RFC Engine', 'Google Cloud APIs', 'DMARC Analyzer', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=900&q=80',
    outcome: 'Configured over 240 professional inboxes with 0% bounce-to-spam rates across commercial bids and corporate proposals.',
    featured: true,
    isMigrated: true
  },
  {
    id: 'proj-greenstars',
    slug: 'greenstars-high-school-portal',
    title: 'Greenstars High School — Academic Portal & Student Verification',
    category: 'Education Technology',
    client: 'Greenstars High School Entebbe',
    location: 'Entebbe, Wakiso District',
    liveUrl: 'https://greenstars.sc.ug',
    problem: 'School administrators struggled with printed term report cards, long queues for bank pay-in slip verifications, and prospective parents having to physically travel to collect admission forms.',
    solution: 'Delivered an institutional portal with online student admissions, digital termly report card downloads, and verified tuition payment tracking.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'PDF Auto-Generator'],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    outcome: 'Streamlined annual admissions for over 850 students and reduced clerical verification delays during start-of-term rush.',
    featured: true,
    isMigrated: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  // Migrated from current nyotaone.com
  {
    id: 'blog-migrated-01',
    slug: 'why-ugandan-businesses-need-professional-business-email',
    title: 'Why Ugandan Businesses Lose Lucrative Bids by Using Free Gmail Addresses',
    excerpt: 'Discover why corporate procurement managers discard proposals sent from free personal email accounts and how custom domains protect your business reputation.',
    content: `
# Why Ugandan Businesses Lose Lucrative Bids by Using Free Gmail Addresses

When you submit a quotation to an NGO, international firm, or commercial enterprise in Kampala, your email address is the first credential the procurement committee evaluates.

A proposal originating from *kampalabuilders2021@gmail.com* immediately raises red flags. Does this enterprise have an incorporated legal entity? Who owns the data? Can someone impersonate this firm next week?

By contrast, an email sent from *richard@kampalabuilders.co.ug* or *bids@kampalabuilders.com* signals corporate permanence, legal accountability, and professional discipline.

### The Real Risks of Relying on Free Mailboxes

1. **Vulnerability to Staff Turnover**: When an employee leaves your company, if they were communicating with clients via their personal Gmail, they walk away with your customer history, supplier contacts, and ongoing quotes.
2. **Spam Filtering Algorithms**: Enterprise mail servers automatically downgrade incoming emails from free domains containing commercial keywords and invoices.
3. **Lack of Cryptographic Signatures**: Without DKIM (DomainKeys Identified Mail) and SPF (Sender Policy Framework) verified on your own domain, scammers can easily spoof your identity to divert invoice payments.

### How Nyota One Sets Up Your Corporate Email

At Nyota One, we configure verified business inboxes within 24 hours. We connect your custom domain, establish DMARC security policies, and ensure your team can access their inboxes comfortably on their iPhones, Androids, and Outlook desktops.
    `,
    category: 'Business Email',
    tags: ['Business Email', 'Google Workspace', 'Uganda SMEs', 'Corporate Trust'],
    author: 'Nyota One Engineering Team',
    authorRole: 'Cloud Systems Architects',
    readTime: '4 min read',
    featuredImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2025-11-14T09:00:00Z',
    isDraft: false,
    isMigrated: true,
    seoTitle: 'Why Ugandan Businesses Need Professional Business Email | Nyota One',
    seoDescription: 'Learn why using a custom business email like info@yourcompany.com wins corporate trust and prevents proposals from landing in spam folders.'
  },
  {
    id: 'blog-migrated-02',
    slug: 'how-to-choose-pos-system-kampala-retail-supermarket',
    title: 'Choosing a Reliable POS System in Kampala: Cloud vs Offline-First',
    excerpt: 'Power outages and internet cuts are realities in East Africa. Here is how to pick a Point-of-Sale system that keeps your cash register running no matter what.',
    content: `
# Choosing a Reliable POS System in Kampala: Cloud vs Offline-First

Every retail owner in Uganda has experienced that nightmare moment: Saturday afternoon peak shopping hour, a queue of 15 customers at the cash desk, and suddenly the internet router loses signal.

If your Point-of-Sale (POS) depends entirely on an active internet browser tab, your business grinds to a complete halt. Customers abandon carts, and your staff must scramble for pen and paper.

### What to Look for in a Commercial POS Setup

- **Offline-First Synchronization**: The POS should process sales, scan barcodes, kick open cash drawers, and print receipts locally on the terminal, then sync to the cloud quietly in the background when connectivity returns.
- **Hardware Durability**: Countertops experience dust, heat, and accidental spills. Avoid delicate domestic tablets; invest in solid touch terminals with spill-resistant capacitive screens.
- **Split Tender Payment Modes**: Customers in Uganda frequently pay with a combination of cash and MTN MoMo or Airtel Money. Your software must record split tenders effortlessly.
- **Role-Based Staff Permissions**: Cashiers should not have the ability to delete past sales or edit inventory numbers without a manager's override PIN.

Nyota One provides end-to-end POS hardware and software deployment tailored specifically for East African retail workflows.
    `,
    category: 'POS & Inventory',
    tags: ['POS Systems', 'Retail Uganda', 'Inventory Management', 'Sunmi'],
    author: 'Nyota One Solutions Team',
    authorRole: 'Retail Automation Specialists',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2025-12-02T11:30:00Z',
    isDraft: false,
    isMigrated: true,
    seoTitle: 'How to Choose a POS System in Uganda | Nyota One',
    seoDescription: 'Guide to choosing retail POS terminals in Kampala. Learn why offline-first POS systems protect your revenue during internet cuts.'
  },

  // Proposed Editorial Plan Articles (Section 16)
  {
    id: 'blog-plan-01',
    slug: 'how-to-choose-website-design-company-in-uganda',
    title: 'How to Choose a Website Design Company in Uganda (Without Getting Stranded)',
    excerpt: 'Key questions to ask before paying a web design agency in Uganda, including domain ownership, source code access, and mobile responsiveness.',
    content: `
# How to Choose a Website Design Company in Uganda (Without Getting Stranded)

Finding someone who claims they can build a website in Kampala is easy. Finding a dependable partner who actually finishes the project on time, hands over your login credentials, and ensures the website generates real inquiries is much rarer.

Many business owners end up stranded: the freelancer disappears halfway through, or worse, registers the company's domain under their own personal name, holding the business hostage.

### 5 Critical Checks Before You Sign a Contract

1. **Who Holds the Domain & Hosting Accounts?**: Always ensure your company owns the registrar account. Never allow an agency to register your core brand domain under an inaccessible personal email.
2. **Is the Website Optimized for Mobile Phones?**: In Uganda, over 80% of your web traffic will arrive on Android or iPhone smartphones. Test the developer's past portfolio directly on a budget phone over 3G/4G.
3. **Is On-Page SEO Included?**: A website without Google Business Profile integration, meta tags, and local search markup is like a billboard placed deep in the forest.
4. **Transparent Pricing**: Beware of vague "free hosting" promises that turn into exorbitant renewal extortion 12 months later.
5. **Direct WhatsApp & Call Integration**: Make it effortless for visitors to reach your sales desk with one tap.
    `,
    category: 'Websites',
    tags: ['Website Design Uganda', 'Web Development', 'Digital Agency', 'Kampala'],
    author: 'Nyota One Editorial',
    authorRole: 'Product Architecture',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2026-01-10T08:00:00Z',
    isDraft: false,
    isMigrated: false,
    seoTitle: 'How to Choose a Website Design Company in Uganda | Nyota One',
    seoDescription: 'Avoid web agency pitfalls in Uganda. Discover 5 critical checks to ensure you own your domain, get mobile-first speed, and generate leads.'
  },
  {
    id: 'blog-plan-02',
    slug: 'how-much-does-a-business-website-cost-in-uganda',
    title: 'How Much Does a Business Website Cost in Uganda? (2026 Honest Breakdown)',
    excerpt: 'Clear, transparent pricing breakdown of website design costs in Uganda: from starter company sites to custom e-commerce and software platforms.',
    content: `
# How Much Does a Business Website Cost in Uganda? (2026 Honest Breakdown)

If you ask five different web developers in Kampala how much a website costs, you will get five vastly different numbers—ranging from UGX 250,000 to UGX 15,000,000.

Why does this discrepancy exist, and what should a serious business budget for?

### The Three Main Tiers of Business Websites

#### 1. Starter Business Presence (UGX 450,000 – UGX 900,000)
- **Best for**: Service providers, law practices, clinics, consultancies, contractors, and schools.
- **Includes**: 4 to 6 responsive pages, domain registration, cloud hosting, corporate email setup, and direct WhatsApp / call buttons.
- **Nyota One Starter Price**: **UGX 450,000** (fully transparent, no hidden surprise fees).

#### 2. E-Commerce & Catalogue Stores (UGX 1,200,000 – UGX 3,500,000)
- **Best for**: Retail stores, fashion boutiques, electronics suppliers, and equipment wholesalers.
- **Includes**: Product catalogue, shopping cart, stock management, and integration with PesaPal, MTN Mobile Money, Airtel Money, and Visa/Mastercard.

#### 3. Custom Web Applications & Enterprise Portals (UGX 1,800,000+)
- **Best for**: Saccos, logistics companies, booking portals, and multi-branch operations requiring custom database architecture and user access levels.
    `,
    category: 'Websites',
    tags: ['Website Cost Uganda', 'Web Pricing', 'Small Business', 'UGX'],
    author: 'Nyota One Finance & Strategy',
    authorRole: 'Commercial Advisory',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2026-01-18T10:00:00Z',
    isDraft: false,
    isMigrated: false,
    seoTitle: 'How Much Does a Business Website Cost in Uganda? | 2026 Guide',
    seoDescription: 'Transparent pricing breakdown for business websites in Uganda. Compare starter company sites, e-commerce stores, and custom software costs.'
  },
  {
    id: 'blog-plan-03',
    slug: 'business-email-vs-free-email-growing-business',
    title: 'Business Email vs Free Email: The Hidden Cost of "Free" Accounts',
    excerpt: 'Why continuing to run your commercial deals on free webmail hurts your closing rates and leaves your brand vulnerable.',
    content: `
# Business Email vs Free Email: The Hidden Cost of "Free" Accounts

Many entrepreneurs start out with *businessname@gmail.com*. In the first three months of starting up, this is understandable. But when your enterprise begins pitching for corporate tenders, institutional contracts, or international supply deals, that free handle becomes an expensive liability.

### Why Corporate Decision-Makers Distrust Free Webmail

1. **Zero Proof of Existence**: Anyone can create an email address called *ministrysupplierug@gmail.com* in 30 seconds without any validation.
2. **Lack of Corporate Governance**: If a staff member leaves on bad terms, you cannot revoke access to their personal Gmail. They retain all sensitive client communications.
3. **Spam Flagging**: Automated enterprise spam filters automatically score incoming mail from free webmail providers lower than verified SPF/DKIM business domains.

Upgrade to a verified custom mailbox at just UGX 180,000 with Nyota One and start presenting your business with the prestige it deserves.
    `,
    category: 'Business Email',
    tags: ['Corporate Email', 'Cybersecurity', 'SME Growth'],
    author: 'Nyota One Engineering',
    authorRole: 'Infrastructure',
    readTime: '4 min read',
    featuredImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2026-01-28T09:15:00Z',
    isDraft: false,
    isMigrated: false,
    seoTitle: 'Business Email vs Free Email for Growing Businesses | Nyota One',
    seoDescription: 'Learn why custom business email increases bid win rates and protects client communication.'
  },
  {
    id: 'blog-plan-04',
    slug: 'how-to-register-domain-for-ugandan-business',
    title: 'How to Register a Domain for a Ugandan Business: .com vs .co.ug',
    excerpt: 'Should you choose a global .com or a local .co.ug domain? Learn the technical differences, search engine implications, and registration steps.',
    content: `
# How to Register a Domain for a Ugandan Business: .com vs .co.ug

Your domain name is your permanent commercial address on the internet. Selecting the right extension (.com, .co.ug, .org, or .africa) impacts how easily clients remember you and how Google understands your geographic focus.

### Comparing .com and .co.ug

- **The .com Extension**: The universal global standard. Ideal if you serve both Ugandan clients and international buyers (e.g. tourism, export, remote consulting).
- **The .co.ug Extension**: The designated national commercial domain for Uganda, managed by the Uganda ccTLD registry. It signals strong local presence and boosts your geographic relevance on Google.ug searches.

### The Safest Way to Secure Your Domain

Use the **Nyota One Domain Search tool** at \`/domains\` to verify availability across both .com and .co.ug in real time. We ensure the domain is registered with full administrative control retained in your name.
    `,
    category: 'Domains & Hosting',
    tags: ['Domain Registration', '.co.ug', '.com', 'Uganda ccTLD'],
    author: 'Nyota One Network Team',
    authorRole: 'DNS Specialists',
    readTime: '4 min read',
    featuredImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2026-02-04T12:00:00Z',
    isDraft: false,
    isMigrated: false,
    seoTitle: 'How to Register a Domain in Uganda (.com vs .co.ug) | Nyota One',
    seoDescription: 'Guide to registering business domains in Uganda. Compare .com and .co.ug extensions, pricing, and DNS setup.'
  },
  {
    id: 'blog-plan-05',
    slug: 'practical-ways-to-improve-google-visibility-uganda',
    title: 'Practical Ways to Improve a Business’s Google Visibility in Uganda',
    excerpt: 'Actionable steps to get your Kampala or Entebbe business showing up when customers search for your products on Google and Google Maps.',
    content: `
# Practical Ways to Improve a Business’s Google Visibility in Uganda

When someone's car breaks down, when a hospital needs medical equipment, or when an office needs catering in Kampala, where do they look first? They search on Google.

If your competitors show up with 4.8 stars and direct contact buttons while your company doesn't appear at all, you are losing high-intent business every single day.

### 4 Immediate Actions to Dominate Local Search

1. **Verify Your Google Business Profile**: Claim your physical listing, pin your exact building entrance, and add operating hours.
2. **Collect Authentic Customer Reviews**: Send your verified Google review link to satisfied clients immediately after a transaction.
3. **Include Localized Search Keywords on Your Website**: Ensure your website explicitly lists your city and service areas (e.g. "Commercial Electrical Supplier in Nakivubo, Kampala").
4. **Publish Real Project Photos**: Google ranks profiles higher when they frequently upload genuine photos of products, facilities, and completed work.
    `,
    category: 'SEO & Marketing',
    tags: ['Google Maps', 'Local SEO', 'Kampala Search', 'Google Business'],
    author: 'Nyota One SEO Team',
    authorRole: 'Search Optimizers',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
    publishedAt: '2026-02-12T14:30:00Z',
    isDraft: false,
    isMigrated: false,
    seoTitle: 'Practical Ways to Improve Google Visibility in Uganda | Nyota One',
    seoDescription: 'Discover how to optimize your Google Business Profile and website to attract paying local clients in Uganda.'
  }
];

export const MIGRATION_LOG = [
  { sourceUrl: 'https://nyotaone.com/', destUrl: '/', status: 'Migrated & Enhanced', redirectStatus: '301 Active' },
  { sourceUrl: 'https://nyotaone.com/services', destUrl: '/services', status: 'Migrated & Enhanced', redirectStatus: '301 Active' },
  { sourceUrl: 'https://nyotaone.com/our-work', destUrl: '/projects', status: 'Migrated & Enhanced', redirectStatus: '301 Active' },
  { sourceUrl: 'https://nyotaone.com/contact', destUrl: '/contact', status: 'Migrated & Enhanced', redirectStatus: '301 Active' },
  { sourceUrl: 'https://nyotaone.com/blog/why-ugandan-businesses-need-professional-business-email', destUrl: '/blog/why-ugandan-businesses-need-professional-business-email', status: 'Migrated Complete', redirectStatus: 'Direct Slug Preserved' },
  { sourceUrl: 'https://nyotaone.com/blog/how-to-choose-pos-system-kampala-retail-supermarket', destUrl: '/blog/how-to-choose-pos-system-kampala-retail-supermarket', status: 'Migrated Complete', redirectStatus: 'Direct Slug Preserved' },
  { sourceUrl: 'https://nyotaone.com/projects/twekolere', destUrl: '/projects/twekolere-job-noticeboard', status: 'Migrated & Enriched', redirectStatus: '301 Redirect Mapped' },
  { sourceUrl: 'https://nyotaone.com/projects/ugalights', destUrl: '/projects/ugalights-commerce-hub', status: 'Migrated & Enriched', redirectStatus: '301 Redirect Mapped' },
  { sourceUrl: 'https://nyotaone.com/projects/choma-journeys', destUrl: '/projects/choma-journeys', status: 'Migrated & Enriched', redirectStatus: 'Direct Slug Preserved' },
  { sourceUrl: 'https://nyotaone.com/projects/greenstars', destUrl: '/projects/greenstars-high-school-portal', status: 'Migrated & Enriched', redirectStatus: '301 Redirect Mapped' }
];

export const MIGRATION_RECONCILIATION_REPORT = {
  totalSourceUrlsIdentified: 10,
  migratedSuccessfully: 10,
  updatedAndEnriched: 10,
  redirectsConfigured: 10,
  missingOrUnrecoverable: 0,
  editorialPlanNewArticlesCreated: 5,
  status: 'Reconciled 100% with zero lost assets or broken search URLs'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderReference: 'NYOTA-2026-8491',
    customerName: 'Kakooza Patrick',
    customerEmail: 'patrick.k@ugandatrading.co.ug',
    customerPhone: '+256 772 123456',
    deliveryAddress: 'Plot 14 Jinja Road, Commercial Plaza Suite 4',
    city: 'Kampala',
    country: 'Uganda',
    items: [
      {
        id: 'item-01',
        itemId: 'srv-starter-web',
        title: 'Starter Business Website',
        type: 'service',
        unitPrice: 450000,
        quantity: 1,
        subtotal: 450000
      },
      {
        id: 'item-02',
        itemId: 'srv-email-domain',
        title: 'Business Email & Domain Setup',
        type: 'service',
        unitPrice: 180000,
        quantity: 1,
        subtotal: 180000
      }
    ],
    currency: 'UGX',
    subtotal: 630000,
    deliveryFee: 0,
    discount: 30000,
    total: 600000,
    orderStatus: 'processing',
    paymentStatus: 'completed',
    paymentMethod: 'pesapal_mobile_money',
    pesapalTrackingId: 'PESA-UG-882194',
    verifiedBy: 'PesaPal IPN Webhook System',
    verifiedAt: '2026-02-15T10:14:00Z',
    created_at: '2026-02-15T10:10:00Z',
    updated_at: '2026-02-15T10:14:00Z'
  },
  {
    id: 'ord-002',
    orderReference: 'NYOTA-2026-9214',
    customerName: 'Sarah M. Nambi',
    customerEmail: 'sarah@safarisafrica.com',
    customerPhone: '+256 701 987654',
    deliveryAddress: 'Lugogo Bypass, House 8B',
    city: 'Kampala',
    country: 'Uganda',
    items: [
      {
        id: 'item-03',
        itemId: 'prod-mpos-sunmi-v2',
        title: 'Sunmi V2 Handheld Android Mobile POS Terminal',
        type: 'product',
        unitPrice: 650000,
        quantity: 2,
        subtotal: 1300000
      }
    ],
    currency: 'UGX',
    subtotal: 1300000,
    deliveryFee: 15000,
    discount: 0,
    total: 1315000,
    orderStatus: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'manual_mobile_money',
    manualPaymentReference: 'MM-TXN-UG-99812',
    manualProofNote: 'Paid via MTN MoMo to Nyota One merchant line. Transaction ID received.',
    created_at: '2026-03-01T15:20:00Z',
    updated_at: '2026-03-01T15:25:00Z'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-001',
    orderId: 'ord-001',
    orderReference: 'NYOTA-2026-8491',
    customerName: 'Kakooza Patrick',
    customerEmail: 'patrick.k@ugandatrading.co.ug',
    customerPhone: '+256 772 123456',
    customerAddress: 'Plot 14 Jinja Road, Commercial Plaza Suite 4, Kampala',
    issueDate: '2026-02-15',
    dueDate: '2026-02-22',
    items: [
      {
        description: 'Starter Business Website (Custom 5-page responsive, domain & hosting included)',
        quantity: 1,
        unitPrice: 450000,
        amount: 450000
      },
      {
        description: 'Business Email & Domain Setup (5 mailboxes, SPF/DKIM/DMARC authenticated)',
        quantity: 1,
        unitPrice: 180000,
        amount: 180000
      }
    ],
    currency: 'UGX',
    subtotal: 630000,
    tax: 0,
    discount: 30000,
    total: 600000,
    amountPaid: 600000,
    balanceDue: 0,
    status: 'paid',
    notes: 'Thank you for choosing Nyota One. Service onboarding is actively in progress.',
    created_at: '2026-02-15T10:14:00Z'
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-002',
    orderId: 'ord-002',
    orderReference: 'NYOTA-2026-9214',
    customerName: 'Sarah M. Nambi',
    customerEmail: 'sarah@safarisafrica.com',
    customerPhone: '+256 701 987654',
    customerAddress: 'Lugogo Bypass, House 8B, Kampala',
    issueDate: '2026-03-01',
    dueDate: '2026-03-04',
    items: [
      {
        description: 'Sunmi V2 Handheld Android Mobile POS Terminal (Pre-calibrated with 58mm printer)',
        quantity: 2,
        unitPrice: 650000,
        amount: 1300000
      },
      {
        description: 'Dispatch & Delivery to Lugogo Bypass',
        quantity: 1,
        unitPrice: 15000,
        amount: 15000
      }
    ],
    currency: 'UGX',
    subtotal: 1315000,
    tax: 0,
    discount: 0,
    total: 1315000,
    amountPaid: 0,
    balanceDue: 1315000,
    status: 'unpaid',
    notes: 'Awaiting finance verification of submitted Mobile Money transaction reference.',
    created_at: '2026-03-01T15:20:00Z'
  }
];

export const DEMO_USER_PROFILES: UserProfile[] = [
  {
    id: 'usr-admin-01',
    user_id: 'auth-admin-richard',
    full_name: 'Richard K. (Executive Admin)',
    email: 'richard@nyotaone.com',
    phone: '+256 702 086774',
    role: 'superadmin',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-finance-02',
    user_id: 'auth-finance-claire',
    full_name: 'Claire A. (Finance Desk)',
    email: 'accounts@nyotaone.com',
    phone: '+256 772 023461',
    role: 'finance',
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-customer-03',
    user_id: 'auth-client-patrick',
    full_name: 'Kakooza Patrick',
    email: 'patrick.k@ugandatrading.co.ug',
    phone: '+256 772 123456',
    role: 'customer',
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-02-15T10:00:00Z'
  }
];
