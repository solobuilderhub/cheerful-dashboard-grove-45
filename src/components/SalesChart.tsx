
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { month: 'Jan', visits: 100 },
  { month: 'Feb', visits: 120 },
  { month: 'Mar', visits: 180 },
  { month: 'Apr', visits: 250 },
  { month: 'May', visits: 300 },
  { month: 'Jun', visits: 270 },
  { month: 'Jul', visits: 350 },
  { month: 'Aug', visits: 400 },
  { month: 'Sep', visits: 320 },
  { month: 'Oct', visits: 380 },
  { month: 'Nov', visits: 450 },
  { month: 'Dec', visits: 480 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-lg shadow-md border border-border">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm text-teal">{`Visitors: ${payload[0].value}`}</p>
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-teal"></span>
            <span className="text-xs text-muted-foreground">New Visitors</span>
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
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#20D9D2" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#20D9D2" stopOpacity={0}/>
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
              dataKey="visits" 
              stroke="#20D9D2" 
              fillOpacity={1} 
              fill="url(#colorVisits)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
