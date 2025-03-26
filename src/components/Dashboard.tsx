
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { SummaryCards } from './SummaryCards';
import { TopProducts } from './TopProducts';
import { MonthlyTarget } from './MonthlyTarget';
import { SalesChart } from './SalesChart';
import { OrderFulfillment } from './OrderFulfillment';
import { ActionItems } from './ActionItems';

export function Dashboard() {
  return (
    <div className="flex-1 py-8 px-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-72">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-secondary border-none rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell size={18} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange"></span>
          </button>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <span className="font-medium text-sm text-primary-foreground">JD</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Today's Sales</h1>
        <p className="text-muted-foreground text-sm">Sales Summary</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SummaryCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopProducts />
            <MonthlyTarget />
          </div>
          
          <SalesChart />
        </div>
        
        <div className="space-y-8">
          <ActionItems />
          <OrderFulfillment />
        </div>
      </div>
    </div>
  );
}
