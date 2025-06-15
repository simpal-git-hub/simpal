import React, { useState } from 'react';

const ReceiveMoney = () => {
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
  });
  const [qrData, setQrData] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateQRCode = () => {
    if (!formData.username.trim()) {
      alert('Please enter an address or username');
      return;
    }

    const paymentData = `Payment Request
To: ${formData.username}
Amount: ${formData.amount || 'Any amount'}
Timestamp: ${new Date().toISOString()}`;

    setQrData(paymentData);
    setShowQR(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrData);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  const createNewPayment = () => {
    setShowQR(false);
    setFormData({
      username: '',
      amount: '',
    });
    setQrData('');
  };

  // Simple QR Code representation (since we can't use external QR libraries in React artifacts)
  const QRCodeDisplay = ({ data }) => (
    <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
      <div className="text-black text-xs text-center break-all p-2">
        <div className="font-mono text-[8px] leading-tight">
          {data.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">Receive Money</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              Address/Username *
            </label>
            <input 
              name="username"
              required 
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="Enter address or username" 
              type="text"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              Amount (Optional)
            </label>
            <input 
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="Enter amount" 
              type="number" 
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="pt-4">
            <button 
              onClick={generateQRCode}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Generate QR Code
            </button>
          </div>
        </div>
        
        {showQR && (
          <div className="mt-8 p-6 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Payment QR Code</h3>
            
            <div className="flex justify-center mb-4">
              <QRCodeDisplay data={qrData} />
            </div>
            
            <div className="text-sm text-zinc-300 space-y-1">
              <div><strong>To:</strong> {formData.username}</div>
              <div><strong>Amount:</strong> {formData.amount || 'Any amount'}</div>
              <div><strong>Generated:</strong> {new Date().toLocaleString()}</div>
            </div>
            
            <button 
              onClick={copyToClipboard}
              className={`w-full mt-4 py-2 px-4 font-medium rounded-lg transition-colors ${
                copySuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {copySuccess ? 'Copied!' : 'Copy Payment Info'}
            </button>
            
            <button 
              onClick={createNewPayment}
              className="w-full mt-2 py-2 px-4 bg-zinc-600 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
            >
              Create New Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiveMoney;