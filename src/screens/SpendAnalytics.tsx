import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, Activity } from 'lucide-react';

const spendData = [
  { name: 'Jan', vendors: 400000, influencers: 240000, events: 240000 },
  { name: 'Feb', vendors: 300000, influencers: 139800, events: 221000 },
  { name: 'Mar', vendors: 200000, influencers: 980000, events: 229000 },
  { name: 'Apr', vendors: 278000, influencers: 390800, events: 200000 },
  { name: 'May', vendors: 189000, influencers: 480000, events: 218100 },
  { name: 'Jun', vendors: 239000, influencers: 380000, events: 250000 },
];

const categoryData = [
  { name: 'IT Vendors', value: 400 },
  { name: 'Marketing', value: 300 },
  { name: 'Facilities', value: 300 },
  { name: 'Events', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const SpendAnalytics: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1D23]">Spend Analytics</h1>
          <p className="text-gray-500 mt-2">Visualize category spend and identify savings opportunities.</p>
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white">
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Spend</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-[#1A1D23]">₹4.2 Cr</div>
          <div className="flex items-center text-sm text-green-600 mt-2 font-medium">
            <TrendingDown className="w-4 h-4 mr-1" /> 12% vs last period
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Savings</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Activity className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-[#1A1D23]">₹85 L</div>
          <div className="flex items-center text-sm text-green-600 mt-2 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> 8% vs last period
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Active Categories</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><PieChartIcon className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-[#1A1D23]">6</div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            Across 42 active vendors
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-[#1A1D23] mb-6">Spend Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip cursor={{fill: '#F8F9FA'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" />
                <Bar dataKey="vendors" name="Vendors" stackId="a" fill="#3B82F6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="influencers" name="Influencers" stackId="a" fill="#8B5CF6" />
                <Bar dataKey="events" name="Events" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-[#1A1D23] mb-6">Spend by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-[#1A1D23]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
