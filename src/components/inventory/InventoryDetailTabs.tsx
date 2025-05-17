
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryItemDetails } from './InventoryItemDetails';
import { InventoryItemVariants } from './InventoryItemVariants';

interface InventoryDetailTabsProps {
  item: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleListItem: (platform: 'stockx' | 'goat', variantId?: string) => void;
}

export function InventoryDetailTabs({
  item,
  activeTab,
  setActiveTab,
  handleListItem
}: InventoryDetailTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="variants">Variants</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-4">
        <InventoryItemDetails item={item} />
      </TabsContent>
      
      <TabsContent value="variants" className="space-y-4">
        <InventoryItemVariants 
          variations={item.variations} 
          handleListItem={handleListItem}
          styleId={item.styleId} 
        />
      </TabsContent>
    </Tabs>
  );
}
