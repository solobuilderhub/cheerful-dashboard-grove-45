
import React from 'react';
import { DollarSign, PackageCheck, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: 'orange' | 'teal' | 'purple' | 'blue';
}

const SummaryCard = ({ title, value, change, icon, color }: SummaryCardProps) => {
  const isPositive = change > 0;
  
  const colorMap = {
    orange: 'bg-orange/10 text-orange',
    teal: 'bg-teal/10 text-teal',
    purple: 'bg-purple/10 text-purple',
    blue: 'bg-blue/10 text-blue'
  };
  
  const iconClass = cn('p-3 rounded-lg', colorMap[color]);
  
  return (
    <div className="dashboard-card animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <p className="metric-label">{title}</p>
          <p className="metric-value">{value}</p>
        </div>
        <div className={iconClass}>
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-3 text-xs font-medium">
        <div className={cn(
          "flex items-center gap-1 mr-2",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{Math.abs(change)}%</span>
        </div>
        <span className="text-muted-foreground">from previous day</span>
      </div>
    </div>
  );
};

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Sales"
        value="$5k"
        change={+12.5}
        icon={<DollarSign size={20} />}
        color="orange"
      />
      <SummaryCard
        title="Total Order"
        value="500"
        change={+4.2}
        icon={<PackageCheck size={20} />}
        color="teal"
      />
      <SummaryCard
        title="Profit"
        value="$2.1k"
        change={+2.3}
        icon={<DollarSign size={20} />}
        color="purple"
      />
      <SummaryCard
        title="Cost"
        value="$1.4k"
        change={-0.5}
        icon={<DollarSign size={20} />}
        color="blue"
      />
    </div>
  );
}
