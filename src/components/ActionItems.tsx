
import React from 'react';
import { cn } from '@/lib/utils';

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

export function ActionItems() {
  return (
    <div className="space-y-6">
      <ActionItem title="Listing need to take action">
        <div className="h-[100px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No urgent actions required</p>
        </div>
      </ActionItem>
    </div>
  );
}
