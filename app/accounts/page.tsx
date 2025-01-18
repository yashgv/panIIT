// app/accounts/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AccountData {
  platform: string;
  username: string;
  lastPosted: string;
  icon: string;
  isConnected: boolean;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<AccountData[]>([
    {
      platform: 'Instagram',
      username: '@username',
      lastPosted: '2024-01-18',
      icon: '📸',
      isConnected: true
    },
    // Add more platforms as needed
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Connected Accounts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div 
              key={account.platform}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{account.icon}</span>
                  <div>
                    <h3 className="font-semibold">{account.platform}</h3>
                    <p className="text-gray-600">{account.username}</p>
                  </div>
                </div>
                <div className={`h-3 w-3 rounded-full ${account.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>
              <div className="text-sm text-gray-500">
                Last posted: {new Date(account.lastPosted).toLocaleDateString()}
              </div>
              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                Manage Account
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}