
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Clock, AlertTriangle, Calendar, ArrowRight } from 'lucide-react';

interface ActionItemProps {
  title: string;
  children: React.ReactNode;
}

function ActionItem({ title, children }: ActionItemProps) {
  return (
    <div className="dashboard-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="border-b border-muted/20 pb-3 mb-4">
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

interface TaskProps {
  title: string;
  date: string;
  status: 'pending' | 'completed' | 'warning';
  description?: string;
}

const Task = ({ title, date, status, description }: TaskProps) => {
  const statusIcons = {
    pending: <Clock size={16} className="text-blue" />,
    completed: <Check size={16} className="text-teal" />,
    warning: <AlertTriangle size={16} className="text-orange" />
  };

  const statusClasses = {
    pending: "bg-blue/10 text-blue",
    completed: "bg-teal/10 text-teal",
    warning: "bg-orange/10 text-orange"
  };
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-secondary/40">
      <div className={cn("p-2 rounded-lg", statusClasses[status])}>
        {statusIcons[status]}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  );
};

export function ActionItems() {
  return (
    <div className="space-y-6">
      <ActionItem title="Actions Required">
        <div className="space-y-2">
          <Task 
            title="Update Inventory Count" 
            date="Today" 
            status="warning"
            description="Stock discrepancy in 3 products" 
          />
          <Task 
            title="Review New Orders" 
            date="Today" 
            status="pending"
            description="6 new orders need approval" 
          />
          <Task 
            title="Product Listing Update" 
            date="Yesterday" 
            status="completed"
            description="All listings updated successfully" 
          />
        </div>
        <div className="mt-4">
          <a href="#" className="text-xs text-primary flex items-center hover:underline">
            View all actions <ArrowRight size={12} className="ml-1" />
          </a>
        </div>
      </ActionItem>
      
      <ActionItem title="Upcoming Events">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple/10 text-purple rounded-lg">
              <Calendar size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Monthly Inventory Review</h4>
                <span className="text-xs text-muted-foreground">May, 28</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">09:00 AM - 11:00 AM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal/10 text-teal rounded-lg">
              <Calendar size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Supplier Meeting</h4>
                <span className="text-xs text-muted-foreground">Jun, 02</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">02:00 PM - 03:30 PM</p>
            </div>
          </div>
        </div>
      </ActionItem>
    </div>
  );
}
