import React, { useState } from 'react';

function SendMoney() {
  const [formData, setFormData] = useState({
    address: '',
    amount: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  // const availableBalance = 1234.56;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      // Format amount to 2 decimal places
      if (value.includes('.')) {
        const parts = value.split('.');
        if (parts[1] && parts[1].length > 2) {
          return;
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = () => {
    const { address, amount } = formData;
    const numAmount = parseFloat(amount);
    
    // Validation
    if (!address.trim()) {
      setErrorMessage('Please enter a valid address or username');
      return;
    }
    
    if (!amount || numAmount <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }
    
    // if (numAmount > availableBalance) {
    //   setErrorMessage('Insufficient balance');
    //   return;
    // }
    
    simulateTransaction(address.trim(), numAmount);
  };

  const simulateTransaction = (address, amount) => {
    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate success (90% chance) or failure
      if (Math.random() > 0.1) {
        setSuccessMessage(`Successfully sent ${amount} USDT to ${address.substring(0, 10)}...`);
        setFormData({ address: '', amount: '' });
      } else {
        setErrorMessage('Transaction failed. Please try again.');
      }
    }, 2000);
  };

  const handleQRScan = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Camera access granted
          stream.getTracks().forEach(track => track.stop());
          setSuccessMessage('QR Scanner ready! (Demo mode)');
          // In a real app, you would open the QR scanner here
        })
        .catch(() => {
          setErrorMessage('Failed to access camera');
        });
    } else {
      setErrorMessage('Camera not supported on this device');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-6 border border-zinc-800">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">Send Money</h1>
          
          <div className="space-y-6">
            {/* Username or Address Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">
                Username or Address
              </label>
              <input 
                name="address"
                type="text" 
                placeholder="Enter username or wallet address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                autoFocus
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">
                Amount (USDT)
              </label>
              <input 
                name="amount"
                type="number" 
                placeholder="Enter amount"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
                <p className="text-red-300 text-sm font-medium">
                  {errorMessage}
                </p>
              </div>
            )}
            
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-900/50 border border-green-700 rounded-lg p-3">
                <p className="text-green-300 text-sm font-medium">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Send Button */}
            <div className="pt-4">
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/> */}
                    </svg>
                    <span>Send USDT</span>
                  </>
                )}
              </button>
            </div>

            {/* QR Code Scanner Button */}
            <div className="pt-4 border-t border-zinc-700">
              <button 
                type="button" 
                onClick={handleQRScan}
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 border border-zinc-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/> */}
                </svg>
                <span>Scan QR Code</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Balance Display Card */}
        {/* <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-zinc-700"> */}
          {/* <div className="text-center">
            <p className="text-zinc-400 text-sm font-medium mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-white">{availableBalance.toLocaleString()} USDT</p>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default SendMoney;