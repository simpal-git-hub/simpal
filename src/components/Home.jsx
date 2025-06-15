import React from "react";

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Main Content */}
      <main className="p-4 pb-10 min-h-screen flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20 text-center">
          {/* Header Section */}
          <header className="flex flex-col items-center mb-20">
            {/* Thirdweb Logo */}
            <div className="mb-8">
              <svg 
                className="w-32 h-32 md:w-40 md:h-40" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0px 0px 24px rgba(167, 38, 169, 0.66))'
                }}
              >
                <rect x="20" y="30" width="15" height="40" fill="#a726a9" rx="2"/>
                <rect x="42.5" y="20" width="15" height="60" fill="#d946ef" rx="2"/>
                <rect x="65" y="10" width="15" height="80" fill="#f472b6" rx="2"/>
              </svg>
            </div>
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
              thirdweb SDK
              <span className="text-zinc-300 inline-block mx-2">+</span>
              <span 
                className="inline-block text-blue-500"
                style={{ transform: 'skewX(-6deg)' }}
              >
                React.js
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-zinc-300 text-base max-w-2xl">
              Read the{' '}
              <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
                README.md
              </code>{' '}
              file to get started.
            </p>
          </header>

          {/* Feature Cards Grid */}
          <div className="grid gap-6 lg:grid-cols-3 justify-center max-w-4xl mx-auto">
            {/* SDK Docs Card */}
            <a 
              href="https://portal.thirdweb.com/typescript/v5?utm_source=next-template" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col border border-zinc-800 p-6 rounded-lg hover:bg-zinc-900 transition-all duration-200 hover:border-zinc-700 hover:scale-105 group"
            >
              <article>
                <h2 className="text-lg font-semibold mb-3 text-left group-hover:text-blue-400 transition-colors">
                  thirdweb SDK Docs
                </h2>
                <p className="text-sm text-zinc-400 text-left">
                  thirdweb TypeScript SDK documentation
                </p>
              </article>
            </a>

            {/* Components and Hooks Card */}
            <a 
              href="https://portal.thirdweb.com/typescript/v5/react?utm_source=next-template" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col border border-zinc-800 p-6 rounded-lg hover:bg-zinc-900 transition-all duration-200 hover:border-zinc-700 hover:scale-105 group"
            >
              <article>
                <h2 className="text-lg font-semibold mb-3 text-left group-hover:text-blue-400 transition-colors">
                  Components and Hooks
                </h2>
                <p className="text-sm text-zinc-400 text-left">
                  Learn about the thirdweb React components and hooks in thirdweb SDK
                </p>
              </article>
            </a>

            {/* Dashboard Card */}
            <a 
              href="https://thirdweb.com/dashboard?utm_source=next-template" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col border border-zinc-800 p-6 rounded-lg hover:bg-zinc-900 transition-all duration-200 hover:border-zinc-700 hover:scale-105 group"
            >
              <article>
                <h2 className="text-lg font-semibold mb-3 text-left group-hover:text-blue-400 transition-colors">
                  thirdweb Dashboard
                </h2>
                <p className="text-sm text-zinc-400 text-left">
                  Deploy, configure, and manage your smart contracts from the dashboard.
                </p>
              </article>
            </a>
          </div>

          {/* Getting Started Section */}
          <div className="mt-16 p-6 bg-zinc-900 rounded-lg border border-zinc-800 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
            <div className="text-left space-y-3 text-sm text-zinc-300">
              <p>
                1. Install dependencies:{' '}
                <code className="bg-zinc-800 px-2 py-1 rounded">npm install</code>
              </p>
              <p>
                2. Start development server:{' '}
                <code className="bg-zinc-800 px-2 py-1 rounded">npm run dev</code>
              </p>
              <p>
                3. Open{' '}
                <code className="bg-zinc-800 px-2 py-1 rounded">http://localhost:3000</code>{' '}
                in your browser
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;