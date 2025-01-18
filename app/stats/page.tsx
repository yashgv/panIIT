'use client';
import { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

interface StatsData {
  platform: string;
  data: {
    date: string;
    reach: number;
    engagement: number;
  }[];
}

export default function StatsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');
  
  // Sample data - replace with real data
  const statsData: StatsData[] = [
    {
      platform: 'Instagram',
      data: [
        { date: '2024-01-12', reach: 1000, engagement: 200 },
        { date: '2024-01-13', reach: 1200, engagement: 250 },
        { date: '2024-01-14', reach: 1500, engagement: 300 },
        { date: '2024-01-15', reach: 1300, engagement: 280 },
        { date: '2024-01-16', reach: 1800, engagement: 350 },
      ]
    }
  ];

  const currentStats = statsData.find(stat => stat.platform === selectedPlatform);

  // Corrected the avg. engagement calculation
  const totalEngagement = currentStats?.data.reduce((sum, item) => sum + item.engagement, 0) || 0;
  const avgEngagement = totalEngagement / (currentStats?.data.length || 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Performance Statistics</h1>
          <select 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="Instagram">Instagram</option>
            <option value="X">X</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Reach</h3>
            <p className="text-3xl font-bold text-orange-500">
              {currentStats?.data.reduce((sum, item) => sum + item.reach, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Avg. Engagement</h3>
            <p className="text-3xl font-bold text-orange-500">
              {Math.round(avgEngagement).toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Growth Rate</h3>
            <p className="text-3xl font-bold text-orange-500">+12.5%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Reach Over Time</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentStats?.data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reach" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#84cc16" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
