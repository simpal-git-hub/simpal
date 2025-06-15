import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', active: false },
    { href: '/fund', label: 'Fund Wallet', active: false },
    { href: '/receive', label: 'Receive Money', active: false },
    { href: '/send', label: 'Send Money', active: true },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="h-16 flex items-center justify-between px-4">
            {/* Logo */}
            <a className="flex items-center gap-2" href="/">
              <img
                alt="Butter Payments Logo"
                width="32"
                height="32"
                className="rounded-lg"
                src="/butter-payments-logo.png"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback logo */}
              <div 
                className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center text-white font-bold text-sm hidden"
                style={{ display: 'none' }}
              >
                BP
              </div>
              <span className="text-xl font-semibold text-blue-500">
                Butter Payments
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className={`font-medium transition-colors hover:text-blue-400 ${
                    item.active ? 'text-blue-500' : 'text-zinc-100'
                  }`}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Connect Wallet Button */}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hidden md:block"
                style={{ minWidth: '165px', height: '50px', fontSize: '16px' }}
                data-theme="dark"
                data-is-loading="false"
                type="button"
                aria-label="Connect"
                data-test="connect-wallet-button"
              >
                Connect
              </button>

              {/* Mobile Connect Button */}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors md:hidden"
                data-theme="dark"
                data-is-loading="false"
                type="button"
                aria-label="Connect"
                data-test="connect-wallet-button"
              >
                Connect
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-zinc-100" />
                ) : (
                  <Menu className="w-6 h-6 text-zinc-100" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-zinc-900 border-b border-zinc-800 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`block font-medium py-2 transition-colors hover:text-blue-400 ${
                  item.active ? 'text-blue-500' : 'text-zinc-100'
                }`}
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Header;