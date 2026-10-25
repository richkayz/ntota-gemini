
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL DEFAULT '',
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('superadmin','admin','finance','sales','inventory','support','editor','customer')
        NOT NULL DEFAULT 'customer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    sku VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(150) NOT NULL DEFAULT '',
    description TEXT NOT NULL,
    features JSON NOT NULL,
    specifications JSON NOT NULL,
    price_ugx DECIMAL(15,2) NOT NULL DEFAULT 0,
    price_usd DECIMAL(12,2) NOT NULL DEFAULT 0,
    sale_price_ugx DECIMAL(15,2) NULL,
    sale_price_usd DECIMAL(12,2) NULL,
    product_type ENUM('physical','digital') NOT NULL,
    procurement_type ENUM('stocked','supplier_preorder','payment_first') NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    warranty VARCHAR(255) NOT NULL DEFAULT '',
    return_policy TEXT NOT NULL,
    delivery_estimate VARCHAR(255) NOT NULL DEFAULT '',
    image_url TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    download_url TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_products_category (category),
    INDEX idx_products_published (published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(100) PRIMARY KEY,
    order_reference VARCHAR(100) NOT NULL UNIQUE,
    customer_id CHAR(36) NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(254) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    delivery_address TEXT NULL,
    city VARCHAR(100) NULL,
    country VARCHAR(100) NULL,
    currency ENUM('UGX','USD') NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    delivery_fee DECIMAL(15,2) NOT NULL DEFAULT 0,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    total DECIMAL(15,2) NOT NULL,
    order_status ENUM('pending','processing','fulfilled','cancelled','refunded') NOT NULL DEFAULT 'pending',
    payment_status ENUM('pending','processing','completed','failed','cancelled','refunded','partially_refunded') NOT NULL DEFAULT 'pending',
    payment_method ENUM('pesapal_card','pesapal_mobile_money','manual_mobile_money','manual_bank_wire','pay_later') NOT NULL,
    pesapal_tracking_id VARCHAR(255) NULL,
    manual_payment_reference VARCHAR(255) NULL,
    manual_proof_note TEXT NULL,
    verified_by CHAR(36) NULL,
    verified_at DATETIME NULL,
    internal_notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_status (order_status, payment_status),
    INDEX idx_orders_created (created_at),
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(100) PRIMARY KEY,
    order_id VARCHAR(100) NOT NULL,
    item_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    item_type ENUM('product','service') NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    INDEX idx_order_items_order (order_id),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(100) PRIMARY KEY,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    order_id VARCHAR(100) NULL,
    order_reference VARCHAR(100) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(254) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_address TEXT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    currency ENUM('UGX','USD') NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    tax DECIMAL(15,2) NOT NULL DEFAULT 0,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    total DECIMAL(15,2) NOT NULL,
    amount_paid DECIMAL(15,2) NOT NULL DEFAULT 0,
    balance_due DECIMAL(15,2) NOT NULL,
    status ENUM('paid','pay_later','unpaid','partially_paid','pending','cancelled','draft') NOT NULL DEFAULT 'unpaid',
    stamp ENUM('PAID','PAY_LATER','PARTIALLY_PAID','UNPAID') NULL,
    payment_terms TEXT NULL,
    paid_at DATETIME NULL,
    verified_by CHAR(36) NULL,
    payment_reference VARCHAR(255) NULL,
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_invoices_order (order_id),
    INDEX idx_invoices_status (status),
    CONSTRAINT fk_invoices_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payments (
    id CHAR(36) PRIMARY KEY,
    order_id VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_reference VARCHAR(255) NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency ENUM('UGX','USD') NOT NULL,
    status ENUM('pending','processing','completed','failed','cancelled','refunded','partially_refunded') NOT NULL DEFAULT 'pending',
    verified_at DATETIME NULL,
    raw_response JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_payments_order (order_id),
    INDEX idx_payments_reference (provider_reference),
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS support_tickets (
    id VARCHAR(100) PRIMARY KEY,
    ticket_number VARCHAR(100) NOT NULL UNIQUE,
    customer_id CHAR(36) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(254) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    priority ENUM('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
    status ENUM('open','in_progress','waiting_on_customer','resolved','closed') NOT NULL DEFAULT 'open',
    messages JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tickets_customer (customer_id),
    INDEX idx_tickets_status (status),
    CONSTRAINT fk_tickets_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_leads (
    id VARCHAR(100) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL DEFAULT '',
    phone VARCHAR(30) NOT NULL,
    service_id VARCHAR(100) NULL,
    service_title VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NULL,
    project_brief TEXT NOT NULL,
    budget_range VARCHAR(100) NULL,
    preferred_contact ENUM('whatsapp','phone','email') NOT NULL,
    status ENUM('new','contacted','quoted','converted','archived') NOT NULL DEFAULT 'new',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leads_status (status),
    INDEX idx_leads_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags JSON NOT NULL,
    author VARCHAR(150) NOT NULL,
    author_role VARCHAR(150) NOT NULL,
    read_time VARCHAR(50) NOT NULL,
    featured_image TEXT NOT NULL,
    published_at DATETIME NULL,
    is_draft BOOLEAN NOT NULL DEFAULT TRUE,
    is_migrated BOOLEAN NOT NULL DEFAULT FALSE,
    seo_title VARCHAR(255) NOT NULL DEFAULT '',
    seo_description TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    client VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    live_url TEXT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    tech_stack JSON NOT NULL,
    image_url TEXT NOT NULL,
    outcome TEXT NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_migrated BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(100) PRIMARY KEY,
    user_id CHAR(36) NULL,
    user_name VARCHAR(150) NOT NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_created (created_at),
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category ENUM('web','email','pos','growth','consultation','custom') NOT NULL,
    short_description TEXT NOT NULL,
    full_description LONGTEXT NOT NULL,
    problem_solved TEXT NOT NULL,
    deliverables JSON NOT NULL,
    scope JSON NOT NULL,
    exclusions JSON NOT NULL,
    price_ugx DECIMAL(15,2) NOT NULL DEFAULT 0,
    price_usd DECIMAL(12,2) NOT NULL DEFAULT 0,
    is_starting_price BOOLEAN NOT NULL DEFAULT FALSE,
    timeline_estimate VARCHAR(255) NOT NULL,
    required_info JSON NOT NULL,
    is_quotation_based BOOLEAN NOT NULL DEFAULT FALSE,
    faqs JSON NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_services_category (category),
    INDEX idx_services_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;