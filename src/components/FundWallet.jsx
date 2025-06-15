import React, { useState, useEffect } from 'react';

const FundWallet = () => {
  // State management
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [fromChain, setFromChain] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState('Connect Wallet to Continue');
  const [showTxInfo, setShowTxInfo] = useState(false);

  // Validate Ethereum address
  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Connect wallet functionality
  const handleWalletConnect = async () => {
    if (walletConnected) {
      // Disconnect
      setWalletConnected(false);
      setUserAddress(null);
      setUserBalance(0);
    } else {
      // Connect
      try {
        setIsProcessing(true);
        // Simulate wallet connection
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWalletConnected(true);
        setUserAddress('0x1234...5678');
        setUserBalance(1250.75);
        setIsProcessing(false);
      } catch (error) {
        console.error('Connection failed:', error);
        setIsProcessing(false);
      }
    }
  };

  // Update UI based on form state
  useEffect(() => {
    const hasValidAddress = isValidAddress(receiverAddress);
    const hasAmount = parseFloat(amount) > 0;
    const hasFromChain = fromChain !== '';

    // Show transaction info if form is partially filled
    setShowTxInfo(hasAmount && hasFromChain);

    // Update button state
    if (!walletConnected) {
      setButtonText('Connect Wallet to Continue');
    } else if (!hasFromChain) {
      setButtonText('Select Chain');
    } else if (!hasValidAddress) {
      setButtonText('Enter Valid Address');
    } else if (!hasAmount) {
      setButtonText('Enter Amount');
    } else if (parseFloat(amount) > userBalance) {
      setButtonText('Insufficient Balance');
    } else {
      setButtonText('Approve & Bridge USDT');
    }
  }, [walletConnected, fromChain, receiverAddress, amount, userBalance]);

  // Max button functionality
  const handleMaxClick = () => {
    if (walletConnected) {
      setAmount(userBalance.toString());
    }
  };

  // Bridge button functionality
  const handleBridge = async () => {
    if (!canProceed()) return;

    try {
      setButtonText('Processing...');
      setIsProcessing(true);

      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));

      setButtonText('Transaction Sent!');
      setIsProcessing(false);

      // Reset after success
      setTimeout(() => {
        setButtonText('Approve & Bridge USDT');
        setAmount('');
        setReceiverAddress('');
      }, 2000);

    } catch (error) {
      console.error('Transaction failed:', error);
      setButtonText('Transaction Failed');
      setIsProcessing(false);
      setTimeout(() => {
        setButtonText('Approve & Bridge USDT');
      }, 2000);
    }
  };

  // Check if transaction can proceed
  const canProceed = () => {
    return walletConnected &&
      fromChain &&
      isValidAddress(receiverAddress) &&
      parseFloat(amount) > 0 &&
      parseFloat(amount) <= userBalance;
  };

  const receiveAmount = parseFloat(amount) * 0.999; // 0.1% fee

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm">
          {/* Wallet Status */}
          <div className="mb-8 p-4 bg-zinc-800/80 border border-zinc-700 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="text-sm text-zinc-300">
              <p className="font-medium mb-2 text-white">Wallet Info</p>
              <p className={walletConnected ? 'text-green-400' : 'text-yellow-400'}>
                {walletConnected ? 'Wallet connected' : 'No wallet connected'}
              </p>
              {walletConnected && userAddress && (
                <div className="mt-2 p-2 bg-zinc-700 rounded text-xs font-mono break-all">
                  {userAddress}
                </div>
              )}
            </div>
          </div>

          {/* Bridge Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">From Chain</label>
              <select
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Chain</option>
                <option value="ethereum">Ethereum Mainnet</option>
                <option value="sepolia">Sepolia Testnet</option>
                <option value="polygon">Polygon</option>
                <option value="bsc">Binance Smart Chain</option>
                <option value="arbitrum">Arbitrum</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">Receiver Address</label>
              <input
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Enter receiver address"
                className={`w-full p-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${receiverAddress && !isValidAddress(receiverAddress) ? 'border-red-500' : 'border-zinc-700'
                  }`}
                type="text"
              />
              {receiverAddress && !isValidAddress(receiverAddress) && (
                <div className="text-red-400 text-xs">Please enter a valid Ethereum address</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">Amount (USDT)</label>
              <div className="relative">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  type="number"
                  step="0.01"
                  min="0"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 text-sm"></div>
              </div>

            </div>

            {/* Transaction Info */}
            {showTxInfo && (
              <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Bridge Fee:</span>
                    <span>0.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Gas Fee:</span>
                    <span>~$2.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Estimated Time:</span>
                    <span>2-5 minutes</span>
                  </div>
                  <hr className="border-zinc-700" />
                  <div className="flex justify-between font-medium">
                    <span>You'll receive:</span>
                    <span>{receiveAmount.toFixed(6)} USDT</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={handleBridge}
                disabled={!canProceed() || isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{buttonText}</span>
                {isProcessing && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FundWallet;