import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { Hero } from './components/home/Hero';
import { MissionAndPillars } from './components/home/MissionAndPillars';
import { FeaturedProjects } from './components/home/FeaturedProjects';
import { ServicesHighlight } from './components/home/ServicesHighlight';
import { FaqSection } from './components/home/FaqSection';
import { ServicesCatalogue } from './components/services/ServicesCatalogue';
import { ServiceDetail } from './components/services/ServiceDetail';
import { ProductCatalogue } from './components/shop/ProductCatalogue';
import { ProductDetail } from './components/shop/ProductDetail';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { PaymentStatus } from './components/checkout/PaymentStatus';
import { DomainSearch } from './components/domains/DomainSearch';
import { AmaraAdvisor } from './components/advisor/AmaraAdvisor';
import { PortfolioPage } from './components/projects/PortfolioPage';
import { ProjectDetail } from './components/projects/ProjectDetail';
import { BlogList } from './components/blog/BlogList';
import { BlogPostDetail } from './components/blog/BlogPostDetail';
import { AboutPage } from './components/about/AboutPage';
import { PricingPage } from './components/pricing/PricingPage';
import { ContactPage } from './components/contact/ContactPage';
import { LegalPages } from './components/legal/LegalPages';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAppStore } from './lib/store';
import { ProductItem, ServiceItem, PortfolioProject, BlogPost } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrderRef, setActiveOrderRef] = useState<string>('');

  // Selected entities for deep view
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { addToCart, services, products, projects, blogPosts } = useAppStore();

  // Handle URL history state & sync
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleAddToCartWithDrawer = (item: any) => {
    addToCart(item);
    setIsCartOpen(true);
  };

  // Render main route content
  const renderContent = () => {
    // 1. Homepage
    if (currentPath === '/' || currentPath === '') {
      return (
        <main>
          <Hero onNavigate={navigateTo} />
          <MissionAndPillars onNavigate={navigateTo} />
          <FeaturedProjects onNavigate={navigateTo} />
          <ServicesHighlight
            onNavigate={navigateTo}
            onAddToCart={handleAddToCartWithDrawer}
          />
          <FaqSection />
        </main>
      );
    }

    // 2. Services Catalogue & Detail
    if (currentPath === '/services') {
      return (
        <ServicesCatalogue
          onNavigate={navigateTo}
          onAddToCart={handleAddToCartWithDrawer}
          onSelectServiceForOrder={(srv) => {
            setSelectedService(srv);
            navigateTo(`/services/${srv.slug}`);
          }}
        />
      );
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <ServiceDetail
          serviceSlug={slug}
          onNavigate={navigateTo}
          onOrderInitiated={(ref) => {
            setActiveOrderRef(ref);
            navigateTo(`/payment-status?OrderMerchantReference=${ref}`);
          }}
        />
      );
    }

    // 3. Shop & Product Detail
    if (currentPath === '/shop') {
      return (
        <ProductCatalogue
          onNavigate={navigateTo}
          onAddToCart={handleAddToCartWithDrawer}
          onSelectProduct={(prod) => {
            setSelectedProduct(prod);
            navigateTo(`/shop/${prod.slug}`);
          }}
        />
      );
    }

    if (currentPath.startsWith('/shop/')) {
      const slug = currentPath.replace('/shop/', '');
      const prod = products.find((p) => p.slug === slug) || selectedProduct || products[0];
      return (
        <ProductDetail
          product={prod}
          onNavigate={navigateTo}
          onAddToCart={handleAddToCartWithDrawer}
        />
      );
    }

    // 4. Cart & Checkout
    if (currentPath === '/cart') {
      return (
        <CheckoutPage
          onNavigate={navigateTo}
          onOrderCompleted={(ref) => {
            setActiveOrderRef(ref);
            navigateTo(`/payment-status?OrderMerchantReference=${ref}`);
          }}
        />
      );
    }

    if (currentPath === '/checkout') {
      return (
        <CheckoutPage
          onNavigate={navigateTo}
          onOrderCompleted={(ref) => {
            setActiveOrderRef(ref);
            navigateTo(`/payment-status?OrderMerchantReference=${ref}`);
          }}
        />
      );
    }

    // 5. Payment Status & Invoice
    if (currentPath === '/payment-status' || currentPath === '/booking-confirmation') {
      return (
        <PaymentStatus
          orderReference={activeOrderRef}
          onNavigate={navigateTo}
        />
      );
    }

    // 6. Domain Availability Search
    if (currentPath.startsWith('/domains')) {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q') || '';
      return (
        <DomainSearch
          initialQuery={q}
          onNavigate={navigateTo}
          onAddToCart={handleAddToCartWithDrawer}
        />
      );
    }

    // 7. Amara AI Business Advisor
    if (currentPath === '/advisor') {
      return (
        <AmaraAdvisor
          onNavigate={navigateTo}
          onAddToCart={handleAddToCartWithDrawer}
        />
      );
    }

    // 8. Projects & Portfolio
    if (currentPath === '/projects' || currentPath === '/our-work') {
      return (
        <PortfolioPage
          onNavigate={navigateTo}
          onSelectProject={(proj) => {
            setSelectedProject(proj);
            navigateTo(`/projects/${proj.slug}`);
          }}
        />
      );
    }

    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      const proj = projects.find((p) => p.slug === slug) || selectedProject || projects[0];
      return <ProjectDetail project={proj} onNavigate={navigateTo} />;
    }

    // 9. Blog & Knowledge Base
    if (currentPath === '/blog' || currentPath === '/resources') {
      return (
        <BlogList
          onNavigate={navigateTo}
          onSelectPost={(post) => {
            setSelectedPost(post);
            navigateTo(`/blog/${post.slug}`);
          }}
        />
      );
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const post = blogPosts.find((p) => p.slug === slug) || selectedPost || blogPosts[0];
      return (
        <BlogPostDetail
          post={post}
          onNavigate={navigateTo}
          onSelectPost={(p) => {
            setSelectedPost(p);
            navigateTo(`/blog/${p.slug}`);
          }}
        />
      );
    }

    // 10. Company & Pricing & Contact
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    if (currentPath === '/pricing') {
      return (
        <PricingPage
          onNavigate={navigateTo}
          onAddToCart={handleAddToCartWithDrawer}
        />
      );
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    if (currentPath === '/faq') {
      return (
        <div className="py-12 bg-slate-50 min-h-screen">
          <FaqSection />
        </div>
      );
    }

    // 11. Legal Policies
    if (currentPath === '/privacy') {
      return <LegalPages type="privacy" onNavigate={navigateTo} />;
    }
    if (currentPath === '/terms') {
      return <LegalPages type="terms" onNavigate={navigateTo} />;
    }
    if (currentPath === '/refund-policy') {
      return <LegalPages type="refund" onNavigate={navigateTo} />;
    }
    if (currentPath === '/shipping-policy') {
      return <LegalPages type="shipping" onNavigate={navigateTo} />;
    }

    // 12. Customer Portal
    if (currentPath.startsWith('/customer/')) {
      const sub = currentPath.replace('/customer/', '') as any;
      const validSub = ['dashboard', 'orders', 'invoices', 'services', 'support'].includes(sub)
        ? sub
        : 'dashboard';
      return (
        <CustomerPortal
          initialTab={validSub}
          onNavigate={navigateTo}
          onViewInvoice={(ref) => {
            setActiveOrderRef(ref);
            navigateTo(`/payment-status?OrderMerchantReference=${ref}`);
          }}
        />
      );
    }

    // 13. Admin Operations Console
    if (currentPath === '/dashboard' || currentPath === '/admin') {
      return (
        <AdminDashboard
          onNavigate={navigateTo}
          onViewInvoice={(ref) => {
            setActiveOrderRef(ref);
            navigateTo(`/payment-status?OrderMerchantReference=${ref}`);
          }}
        />
      );
    }

    // Fallback: 404 cleanly routed to Home
    return (
      <div className="py-24 text-center bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 font-heading">Page Not Found</h2>
        <p className="text-xs text-slate-500">The requested address has moved or does not exist.</p>
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <div className="flex-1">{renderContent()}</div>

      <Footer onNavigate={navigateTo} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => navigateTo('/checkout')}
        onNavigate={navigateTo}
      />
    </div>
  );
}
