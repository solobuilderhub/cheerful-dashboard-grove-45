
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryItemSummary } from './InventoryItemSummary';
import { InventoryItemDetails } from './InventoryItemDetails';
import { InventoryItemVariants } from './InventoryItemVariants';
import { InventoryItemMarketplace } from './InventoryItemMarketplace';
import { InventoryItemListings } from './InventoryItemListings';
import { List } from 'lucide-react';

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
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="variants">Variants</TabsTrigger>
        <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        <TabsTrigger value="listings" className="flex items-center gap-2">
          <List size={14} />
          Listings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-4">
        <InventoryItemDetails item={item} />
      </TabsContent>
      
      <TabsContent value="variants" className="space-y-4">
        <InventoryItemVariants 
          variations={item.variations} 
          handleListItem={handleListItem} 
        />
      </TabsContent>
      
      <TabsContent value="marketplace" className="space-y-6">
        <InventoryItemMarketplace 
          item={item} 
          handleListItem={handleListItem} 
        />
      </TabsContent>
      
      <TabsContent value="listings" className="space-y-6">
        <InventoryItemListings 
          styleId={item.styleId} 
          name={item.name}
        />
      </TabsContent>
    </Tabs>
  );
}
