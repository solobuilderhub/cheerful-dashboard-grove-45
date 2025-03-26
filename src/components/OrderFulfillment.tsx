
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Week 1', orders: 220, fulfillment: 230 },
  { name: 'Week 2', orders: 250, fulfillment: 240 },
  { name: 'Week 3', orders: 230, fulfillment: 260 },
  { name: 'Week 4', orders: 290, fulfillment: 270 },
  { name: 'Week 5', orders: 270, fulfillment: 290 },
  { name: 'Week 6', orders: 250, fulfillment: 240 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-lg shadow-md border border-border">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm" style={{ color: "#A66FF0" }}>{`Orders: ${payload[0].value}`}</p>
        <p className="text-sm" style={{ color: "#3DA5F5" }}>{`Fulfillment: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

export function OrderFulfillment() {
  return (
    <div className="dashboard-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Order Fulfillment</h2>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg">
            <span className="text-xs font-medium">Order</span>
            <span className="h-2 w-2 rounded-full bg-purple"></span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg">
            <span className="text-xs font-medium">%</span>
            <span className="h-2 w-2 rounded-full bg-blue"></span>
          </div>
        </div>
      </div>

      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#A66FF0" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 5, fill: "#A66FF0", stroke: "#1C1C25", strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="fulfillment" 
              stroke="#3DA5F5" 
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 5, fill: "#3DA5F5", stroke: "#1C1C25", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Stock</p>
            <div className="flex items-center gap-1 text-teal text-xs">
              <ArrowUpRight size={12} />
              <span>+2.5%</span>
            </div>
          </div>
          <p className="text-lg font-bold mt-1">96%</p>
        </div>
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Goal</p>
            <a href="#" className="text-xs text-primary hover:underline flex items-center">
              Details <ArrowRight size={12} className="ml-1" />
            </a>
          </div>
          <p className="text-lg font-bold mt-1">90%</p>
        </div>
      </div>
    </div>
  );
}
