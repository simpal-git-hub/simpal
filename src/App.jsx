
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import FundWallet from './components/FundWallet';
import SendMoney from './components/SendMoney';
import ReceiveMoney from './components/ ReceiveMoney';
import Home from './components/Home';
import { Mail, ChevronDown, Phone ,Fingerprint} from "lucide-react";


const App = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");

  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [showDropdown, setShowDropdown] = useState(false);

  const [showPasskeyModal, setShowPasskeyModal] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+55', country: 'BR', flag: '🇧🇷' },
    { code: '+7', country: 'RU', flag: '🇷🇺' },
  ];

  const handlePhoneSubmit = () => {
    const fullNumber = `${countryCode}${phoneNumber}`;
    console.log("Phone number submitted:", fullNumber);
  };

  const handlePasskeyAuth = () => {
    // Simulate passkey authentication
    console.log("Passkey authentication initiated");
    // Here you would integrate with WebAuthn API
    setTimeout(() => {
      console.log("Passkey authentication successful");
      setShowPasskeyModal(false);
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    setShowGoogleModal(true);

    /* global google */
    if (window.google) {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: "302163634917-d2apb6vu86vpfpsf8i8f9ucs82cun7c2.apps.googleusercontent.com", // 🔁 Replace with your actual client ID
        scope: 'email profile openid',
        callback: (tokenResponse) => {
          console.log('✅ Access Token:', tokenResponse.access_token);

          // Optional: Fetch user profile info
          fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((user) => {
              console.log('👤 User Info:', user);
              // You can store this in state, context, etc.
            });
        },
      });
      client.requestAccessToken(); // This opens the Google account modal
    } else {
      alert('Google script not loaded yet.');
    }
  };

  const [userData, setUserData] = useState(null);

  // Load Facebook SDK on mount
  const [fbReady, setFbReady] = useState(false);

  useEffect(() => {
    // Wait for FB to be available and init to finish
    const checkFBInit = setInterval(() => {
      if (window.FB && window.FB.init) {
        setFbReady(true);
        clearInterval(checkFBInit);
      }
    }, 100); // check every 100ms

    return () => clearInterval(checkFBInit);
  }, []);


  const fetchFacebookUserData = () => {
    window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo) => {
      setUserData(userInfo);
      console.log('User info:', userInfo);
    });
  };

  const handleFBLogin = () => {
    if (!fbReady || !window.FB) {
      alert("Facebook SDK not ready yet.");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          fetchFacebookUserData();
        } else {
          alert('Facebook login failed or was cancelled');
        }
      },
      { scope: 'public_profile,email' }
    );
  };


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };



  // // Close mobile menu on window resize
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
    { href: '/send', label: 'Send Money', active: false },
  ];

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fund" element={<FundWallet />} />
          <Route path="/receive" element={<ReceiveMoney />} />
          <Route path="/send" element={<SendMoney />} />

        </Routes>
      </Router>

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
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`font-medium transition-colors ${isActive
                      ? 'text-blue-500'
                      : 'text-zinc-100 hover:text-blue-500'
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Connect Wallet Button */}
              <button
                className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-medium transition-colors hidden md:block"
                style={{ minWidth: '165px', height: '50px', fontSize: '16px' }}
                onClick={() => setDialogOpen(true)}
              >
                Connect
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-zinc-100"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-zinc-800 border-t border-zinc-700">
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`block py-2 px-3 rounded-md font-medium transition-colors ${isActive
                        ? 'text-blue-500 bg-zinc-700'
                        : 'text-zinc-100 hover:text-blue-500 hover:bg-zinc-700'
                        }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <button
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-medium transition-colors"
                  onClick={() => {
                    setDialogOpen(true);
                    closeMobileMenu();
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Connect Dialog Modal */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgb(9,9,11)] bg-opacity-50 z-50"
          onClick={() => setDialogOpen(false)}
        >

          <div
            className="bg-white rounded-lg p-6 relative max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setDialogOpen(false)}
            >
              <X size={20} />
            </button>

            {/* Dialog Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h2>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button onClick={handleGoogleSignIn} className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MDUuNiIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxODYuNjkgMTkwLjUiIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE4NC41ODMgNzY1LjE3MSkiPjxwYXRoIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIgZD0iTS0xMDg5LjMzMy02ODcuMjM5djM2Ljg4OGg1MS4yNjJjLTIuMjUxIDExLjg2My05LjAwNiAyMS45MDgtMTkuMTM3IDI4LjY2MmwzMC45MTMgMjMuOTg2YzE4LjAxMS0xNi42MjUgMjguNDAyLTQxLjA0NCAyOC40MDItNzAuMDUyIDAtNi43NTQtLjYwNi0xMy4yNDktMS43MzItMTkuNDgzeiIgZmlsbD0iIzQyODVmNCIvPjxwYXRoIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIgZD0iTS0xMTQyLjcxNC02NTEuNzkxbC02Ljk3MiA1LjMzNy0yNC42NzkgMTkuMjIzaDBjMTUuNjczIDMxLjA4NiA0Ny43OTYgNTIuNTYxIDg1LjAzIDUyLjU2MSAyNS43MTcgMCA0Ny4yNzgtOC40ODYgNjMuMDM4LTIzLjAzM2wtMzAuOTEzLTIzLjk4NmMtOC40ODYgNS43MTUtMTkuMzEgOS4xNzktMzIuMTI1IDkuMTc5LTI0Ljc2NSAwLTQ1LjgwNi0xNi43MTItNTMuMzQtMzkuMjI2eiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIgZD0iTS0xMTc0LjM2NS03MTIuNjFjLTYuNDk0IDEyLjgxNS0xMC4yMTcgMjcuMjc2LTEwLjIxNyA0Mi42ODlzMy43MjMgMjkuODc0IDEwLjIxNyA0Mi42ODljMCAuMDg2IDMxLjY5My0yNC41OTIgMzEuNjkzLTI0LjU5Mi0xLjkwNS01LjcxNS0zLjAzMS0xMS43NzYtMy4wMzEtMTguMDk4czEuMTI2LTEyLjM4MyAzLjAzMS0xOC4wOTh6IiBmaWxsPSIjZmJiYzA1Ii8+PHBhdGggZD0iTS0xMDg5LjMzMy03MjcuMjQ0YzE0LjAyOCAwIDI2LjQ5NyA0Ljg0OSAzNi40NTUgMTQuMjAxbDI3LjI3Ni0yNy4yNzZjLTE2LjUzOS0xNS40MTMtMzguMDEzLTI0Ljg1Mi02My43MzEtMjQuODUyLTM3LjIzNCAwLTY5LjM1OSAyMS4zODgtODUuMDMyIDUyLjU2MWwzMS42OTIgMjQuNTkyYzcuNTMzLTIyLjUxNCAyOC41NzUtMzkuMjI2IDUzLjM0LTM5LjIyNnoiIGZpbGw9IiNlYTQzMzUiIGNsaXAtcGF0aD0ibm9uZSIgbWFzaz0ibm9uZSIvPjwvZz48L3N2Zz4="
                      alt="Google"
                      className="w-5 h-5"

                    />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDM4IiBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9IjAgMCA0OTYuMjU1IDYwOC43MjgiIGlkPSJhcHBsZSI+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTI3My44MSA1Mi45NzNDMzEzLjgwNi4yNTcgMzY5LjQxIDAgMzY5LjQxIDBzOC4yNzEgNDkuNTYyLTMxLjQ2MyA5Ny4zMDZjLTQyLjQyNiA1MC45OC05MC42NDkgNDIuNjM4LTkwLjY0OSA0Mi42MzhzLTkuMDU1LTQwLjA5NCAyNi41MTItODYuOTcxek0yNTIuMzg1IDE3NC42NjJjMjAuNTc2IDAgNTguNzY0LTI4LjI4NCAxMDguNDcxLTI4LjI4NCA4NS41NjIgMCAxMTkuMjIyIDYwLjg4MyAxMTkuMjIyIDYwLjg4M3MtNjUuODMzIDMzLjY1OS02NS44MzMgMTE1LjMzMWMwIDkyLjEzMyA4Mi4wMSAxMjMuODg1IDgyLjAxIDEyMy44ODVzLTU3LjMyOCAxNjEuMzU3LTEzNC43NjIgMTYxLjM1N2MtMzUuNTY1IDAtNjMuMjE1LTIzLjk2Ny0xMDAuNjg4LTIzLjk2Ny0zOC4xODggMC03Ni4wODQgMjQuODYxLTEwMC43NjYgMjQuODYxQzg5LjMzIDYwOC43MyAwIDQ1NS42NjYgMCAzMzIuNjI4YzAtMTIxLjA1MiA3NS42MTItMTg0LjU1NCAxNDYuNTMzLTE4NC41NTQgNDYuMTA1IDAgODEuODgzIDI2LjU4OCAxMDUuODUyIDI2LjU4OHoiPjwvcGF0aD48L3N2Zz4="
                      alt="Apple"
                      className="w-5 h-5"
                    />
                  </button>
                  {
                    !userData ? (
                      <button
                        onClick={handleFBLogin}
                        className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iRWJlbmUgMSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgaWQ9ImZhY2Vib29rLWxvZ28tMjAxOSI+PHBhdGggZmlsbD0iIzE4NzdmMiIgZD0iTTEwMjQsNTEyQzEwMjQsMjI5LjIzMDE2LDc5NC43Njk3OCwwLDUxMiwwUzAsMjI5LjIzMDE2LDAsNTEyYzAsMjU1LjU1NCwxODcuMjMxLDQ2Ny4zNzAxMiw0MzIsNTA1Ljc3Nzc3VjY2MEgzMDJWNTEySDQzMlYzOTkuMkM0MzIsMjcwLjg3OTgyLDUwOC40Mzg1NCwyMDAsNjI1LjM4OTIyLDIwMCw2ODEuNDA3NjUsMjAwLDc0MCwyMTAsNzQwLDIxMFYzMzZINjc1LjQzNzEzQzYxMS44MzUwOCwzMzYsNTkyLDM3NS40NjY2Nyw1OTIsNDE1Ljk1NzI4VjUxMkg3MzRMNzExLjMsNjYwSDU5MnYzNTcuNzc3NzdDODM2Ljc2OSw5NzkuMzcwMTIsMTAyNCw3NjcuNTU0LDEwMjQsNTEyWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03MTEuMyw2NjAsNzM0LDUxMkg1OTJWNDE1Ljk1NzI4QzU5MiwzNzUuNDY2NjcsNjExLjgzNTA4LDMzNiw2NzUuNDM3MTMsMzM2SDc0MFYyMTBzLTU4LjU5MjM1LTEwLTExNC42MTA3OC0xMEM1MDguNDM4NTQsMjAwLDQzMiwyNzAuODc5ODIsNDMyLDM5OS4yVjUxMkgzMDJWNjYwSDQzMnYzNTcuNzc3NzdhNTE3LjM5NjE5LDUxNy4zOTYxOSwwLDAsMCwxNjAsMFY2NjBaIj48L3BhdGg+PC9zdmc+"
                          alt="Facebook"
                          className="w-5 h-5"
                        />
                      </button>
                    ) : (
                      <div className="text-sm text-gray-600">Welcome, {userData.name}</div>
                    )
                  }
                </div>


          {/* Email Address Field / Button */}
                {!showInput ? (
                  <button
                    onClick={() => {
                      setShowInput(true);
                      setShowPhoneInput(false);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 bg-white border border-gray-500 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Mail size={18} className="mr-2 text-blue-500" />
                    <span className="flex-1 text-left text-gray-600">Email address</span>
                  </button>
                ) : (
                  <div className="flex items-center border border-gray-500 bg-white rounded-md px-4 py-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={() => console.log("Email submitted:", email)}
                      className="text-gray-800 hover:text-black transition-colors"
                    >
                      →
                    </button>
                  </div>
                )}

                <div className="mb-4 mt-4">
                  {!showPhoneInput ? (
                    <button
                      onClick={() => {
                        setShowPhoneInput(true);
                        setShowInput(false);
                      }}
                      className="w-full flex items-center px-4 py-2 bg-white border border-gray-500 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <Phone size={18} className="mr-2 text-blue-500" />
                      <span className="flex-1 text-left text-gray-600">Phone number</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-gray-500 bg-white rounded-md">
                      {/* Country code dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="flex items-center px-3 py-2 border-r border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700 mr-1">
                            {countryCodes.find(c => c.code === countryCode)?.flag} {countryCode}
                          </span>
                          <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {showDropdown && (
                          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-48">
                            {countryCodes.map((country) => (
                              <button
                                key={country.code}
                                onClick={() => {
                                  setCountryCode(country.code);
                                  setShowDropdown(false);
                                }}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                              >
                                <span className="mr-2">{country.flag}</span>
                                <span className="font-medium mr-2">{country.code}</span>
                                <span className="text-gray-500 text-sm">{country.country}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Phone number input */}
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone number"
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none px-4 py-2"
                      />

                      {/* Submit button */}
                      <button
                        onClick={handlePhoneSubmit}
                        className="text-gray-800 hover:text-black transition-colors px-3 py-2"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>


                {/* show paas key option */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowPasskeyModal(true)}
                    className="w-full flex items-center px-4 py-2 bg-white border border-gray-500 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Fingerprint size={18} className="mr-2 text-blue-500" />
                    <span className="flex-1 text-left text-gray-600">Passkey</span>
                  </button>
                </div>


                {showPasskeyModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80 max-w-sm mx-4">
                      {/* Modal Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Sign in with Passkey</h3>
                        <button
                          onClick={() => {setShowPasskeyModal(false)
                            setShowPhoneInput(false);
                            setShowDropdown(false);
                          }}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Fingerprint Icon */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <Fingerprint size={32} className="text-blue-600" />
                        </div>
                        <p className="text-gray-600 text-center text-sm">
                          Use your fingerprint, face, or screen lock to sign in
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={handlePasskeyAuth}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                      >
                        Authenticate with Passkey
                      </button>

                      {/* Cancel Button */}
                      <button
                        onClick={() => setShowPasskeyModal(false)}
                        className="w-full mt-2 text-gray-500 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {showDropdown && (
                  <div
                    className="fixed inset-0 z-5"
                    onClick={() => setShowDropdown(false)}
                  ></div>
                )}
                <div className="text-center text-gray-500 text-sm">OR</div>

                <button className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xl">👛</span>
                  <span>Connect a Wallet</span>
                </button>
              </div>

              {/* Footer */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Powered by <span className="font-semibold">thirdweb</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default App;