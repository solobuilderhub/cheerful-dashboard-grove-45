
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Updated data to include both sales and profit
const data = [
  { month: 'Jan', sales: 10200, profit: 3800 },
  { month: 'Feb', sales: 12400, profit: 4600 },
  { month: 'Mar', sales: 18500, profit: 7200 },
  { month: 'Apr', sales: 25600, profit: 9800 },
  { month: 'May', sales: 31200, profit: 12400 },
  { month: 'Jun', sales: 27800, profit: 10600 },
  { month: 'Jul', sales: 36500, profit: 14200 },
  { month: 'Aug', sales: 41000, profit: 16800 },
  { month: 'Sep', sales: 32800, profit: 13200 },
  { month: 'Oct', sales: 39400, profit: 15800 },
  { month: 'Nov', sales: 46200, profit: 18600 },
  { month: 'Dec', sales: 49800, profit: 20400 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-lg shadow-md border border-border">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm text-teal mb-1">{`Sales: $${payload[0].value.toLocaleString()}`}</p>
        <p className="text-sm text-purple">{`Profit: $${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

export function SalesChart() {
  return (
    <div className="dashboard-card w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Sales & Profit</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-teal"></span>
            <span className="text-xs text-muted-foreground">Sales</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-purple"></span>
            <span className="text-xs text-muted-foreground">Profit</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#20D9D2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#20D9D2" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A66FF0" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#A66FF0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#20D9D2" 
              fillOpacity={1} 
              fill="url(#colorSales)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#A66FF0" 
              fillOpacity={1} 
              fill="url(#colorProfit)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
