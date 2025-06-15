import React, { useState } from 'react';
import { Wallet, X, CheckCircle, Copy, ExternalLink } from 'lucide-react';

const WalletConnect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      id: 'metamask',
      status: 'Installed',
      iconBg: 'bg-orange-100'
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      id: 'coinbase',
      status: '',
      iconBg: 'bg-blue-100'
    },
    {
      name: 'Rainbow',
      icon: '🌈',
      id: 'rainbow',
      status: '',
      iconBg: 'bg-gradient-to-r from-red-100 to-blue-100'
    },
    {
      name: 'Rabby',
      icon: '🐰',
      id: 'rabby',
      status: '',
      iconBg: 'bg-purple-100'
    },
    {
      name: 'Zerion',
      icon: '⚡',
      id: 'zerion',
      status: '',
      iconBg: 'bg-blue-100'
    },
    {
      name: 'All Wallets',
      icon: '⋯',
      id: 'all-wallets',
      status: '500+',
      iconBg: 'bg-gray-100'
    }
  ];

  const handleWalletConnect = async (wallet) => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnectedWallet({
      name: wallet.name,
      address: '0x742d35Cc6362C4532C700d68c0544c8d38C9b1CA',
      balance: '2.45 ETH'
    });
    
    setIsConnecting(false);
    setIsModalOpen(false);
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(connectedWallet.address);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (connectedWallet) {
    return (
      <div className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{connectedWallet.name}</p>
              <p className="text-sm text-gray-600">{connectedWallet.balance}</p>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-mono text-gray-700">
            {formatAddress(connectedWallet.address)}
          </span>
          <button
            onClick={copyAddress}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <ExternalLink className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Wallet className="w-5 h-5" />
        <span>Connect Wallet</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-white">Sign in</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletConnect(wallet)}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className={`w-10 h-10 ${wallet.iconBg} rounded-lg flex items-center justify-center`}>
                    <span className="text-lg">{wallet.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{wallet.name}</p>
                      {wallet.status && (
                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                          {wallet.status}
                        </span>
                      )}
                    </div>
                  </div>
                  {isConnecting && (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-400">New to wallets?</p>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Get started
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Powered by All Wallets</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;