import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';

const PhoneNumberInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US +1');
  const inputRef = useRef(null);

  const countries = [
    { code: 'US +1', flag: '🇺🇸', name: 'United States' },
    { code: 'CA +1', flag: '🇨🇦', name: 'Canada' },
    { code: 'GB +44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'IN +91', flag: '🇮🇳', name: 'India' },
    { code: 'AU +61', flag: '🇦🇺', name: 'Australia' },
    { code: 'DE +49', flag: '🇩🇪', name: 'Germany' },
    { code: 'FR +33', flag: '🇫🇷', name: 'France' },
    { code: 'JP +81', flag: '🇯🇵', name: 'Japan' }
  ];

  const handleButtonClick = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (!phoneNumber.trim()) {
        setIsExpanded(false);
      }
    }
  };

  const selectedCountry = countries.find(country => country.code === countryCode);

  if (!isExpanded) {
    return (
      <div className="w-full max-w-md mx-auto p-8">
        <div className="bg-gray-900 p-6 rounded-lg">
          <button
            onClick={handleButtonClick}
            className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-white transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Phone number</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="bg-gray-900 p-6 rounded-lg">
        <div 
          className="relative"
          onBlur={handleBlur}
        >
          <div className="flex rounded-lg border border-gray-700 bg-gray-800 overflow-hidden">
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-gray-800 text-white px-4 py-3 pr-8 border-r border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code} className="bg-gray-800">
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <input
              ref={inputRef}
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="flex-1 bg-gray-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>
          
          {selectedCountry && (
            <div className="mt-2 text-xs text-gray-400">
              {selectedCountry.flag} {selectedCountry.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInput;

// // Main App Component
// function App() {
//   return (
//     <div className="min-h-screen bg-black">
//       <h1 className="text-white text-center py-8 text-2xl">Phone Number Input Demo</h1>
//       <PhoneNumberInput />
//     </div>
//   );
// }

// export default App;