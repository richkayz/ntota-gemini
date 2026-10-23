import React, { useState } from 'react';
import {
  Menu,
  X,
  ShoppingCart,
  Sparkles,
  Search,
  User,
  ShieldCheck,
  MessageCircle,
  Globe
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenCart }) => {
  const { currency, setCurrency, cart, currentUser, switchRole } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Shop', path: '/shop' },
    { label: 'Our Work', path: '/projects' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Resources', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Kampala, Uganda · Global Delivery (UG, UK, US)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline">Tel: +256 772 023461 · UK: +44 747 210 5295</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Currency:</span>
              <button
                type="button"
                onClick={() => setCurrency('UGX')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  currency === 'UGX' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                UGX
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Quick RBAC Role Selector for testing */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                title="Switch active role for live capability testing"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-medium capitalize">Role: {currentUser.role}</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-3 py-1 text-[10px] uppercase text-slate-400 font-semibold tracking-wider border-b border-slate-800">
                    Switch Test Persona
                  </div>
                  {(['superadmin', 'admin', 'finance', 'sales', 'inventory', 'editor', 'support', 'customer'] as const).map(
                    (role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          switchRole(role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                          currentUser.role === role ? 'text-blue-400 font-medium' : 'text-slate-300'
                        }`}
                      >
                        <span className="capitalize">{role}</span>
                        {currentUser.role === role && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/256702086774?text=Hello%20Nyota%20One%2C%20I%20would%20like%20to%20inquire%20about%20your%20digital%20business%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo with Star Theme */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-amber-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Star symbol representing Nyota (Star in Swahili) */}
              <path d="M12 2l2.83 6.96L22 10.1l-5.3 4.8 1.62 7.1L12 18.25 5.68 22l1.62-7.1L2 10.1l7.17-1.14L12 2z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">Nyota One</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none tracking-tight">Ordernow Digital Solutions</p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & CTAs */}
        <div className="flex items-center gap-3">
          {/* Domain Search quick button */}
          <button
            type="button"
            onClick={() => handleLinkClick('/domains')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              currentPath === '/domains'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Domains</span>
          </button>

          {/* AI Advisor quick button */}
          <button
            type="button"
            onClick={() => handleLinkClick('/advisor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
              currentPath === '/advisor'
                ? 'bg-blue-600 text-white'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Amara</span>
            <span>Advisor</span>
          </button>

          {/* Cart Icon with Counter */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="View shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-slate-800" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Customer / Admin Dashboard button */}
          <button
            type="button"
            onClick={() =>
              handleLinkClick(currentUser.role === 'customer' ? '/customer/dashboard' : '/dashboard')
            }
            className="flex items-center gap-1.5 p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            title={currentUser.role === 'customer' ? 'Customer Portal' : 'Admin Operations Dashboard'}
          >
            <User className="w-5 h-5 text-slate-700" />
            <span className="hidden xl:inline text-xs font-medium text-slate-700">
              {currentUser.role === 'customer' ? 'My Account' : 'Dashboard'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === link.path ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-slate-100 my-2 pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleLinkClick('/domains')}
                className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                Domain Availability Search
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('/advisor')}
                className="text-left py-2 px-3 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                Amara AI Business Advisor
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('/customer/dashboard')}
                className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-600" />
                Customer Portal
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('/dashboard')}
                className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-900 bg-slate-100 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Admin Operations Console
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
