
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ListingTabsProps {
  activeTab: 'simple' | 'grouped';
  onChange: (value: 'simple' | 'grouped') => void;
}

export function ListingTabs({ activeTab, onChange }: ListingTabsProps) {
  return (
    <div className="border-b border-gray-800 mb-4">
      <Tabs value={activeTab} onValueChange={(value) => onChange(value as 'simple' | 'grouped')}>
        <TabsList className="bg-transparent mb-0">
          <TabsTrigger 
            value="simple" 
            className={`px-6 py-3 border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-transparent`}
          >
            Simple List
          </TabsTrigger>
          <TabsTrigger 
            value="grouped" 
            className={`px-6 py-3 border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-transparent`}
          >
            Grouped By Product
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
