
import React, { useState } from 'react';
import { 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Eye, Tag, Truck } from 'lucide-react';
import { InventoryQuantityControl } from './InventoryQuantityControl';
import { Variant } from '@/components/inventory-drawer/types';

interface VariantAccordionItemProps {
  variant: Variant;
  onListItem: (platform: 'stockx' | 'goat', variantId: string) => void;
  onViewMarketData: (variant: Variant) => void;
  onViewListings: (variant: Variant) => void;
  onQuantityChange?: (variantId: string, newQuantity: number) => void;
  itemId?: string;
}

export function VariantAccordionItem({ 
  variant, 
  onListItem, 
  onViewMarketData,
  onViewListings,
  onQuantityChange,
  itemId = '1'
}: VariantAccordionItemProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'actions'>('details');
  
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Format date helper function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <AccordionItem 
      value={variant.variantId} 
      className="border rounded-lg mb-2 overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
    >
      <AccordionTrigger className="px-4 py-3 hover:bg-secondary/5 [&[data-state=open]]:bg-secondary/10">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-secondary/30 text-foreground border-secondary">
              Size {variant.size}
            </Badge>
            
            <div className="ml-2" onClick={handleStopPropagation}>
              <InventoryQuantityControl 
                initialQuantity={variant.quantity || 1}
                variantId={variant.variantId}
                onQuantityChange={onQuantityChange}
                itemId={itemId}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2" onClick={handleStopPropagation}>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 bg-secondary/40 text-foreground hover:bg-secondary hover:text-foreground border-secondary/30"
              onClick={() => onViewMarketData(variant)}
            >
              <LineChart size={14} />
              Market Data
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="gap-1 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20"
              onClick={() => onViewListings(variant)}
            >
              <Eye size={14} />
              Listings
            </Button>
          </div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="border-t bg-background/50">
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'details' | 'actions')} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-secondary/10 mb-3">
              <TabsTrigger value="details" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Details</TabsTrigger>
              <TabsTrigger value="actions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Quick Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-md p-3 bg-secondary/10">
                      <span className="text-muted-foreground text-xs block mb-1">Date Added</span>
                      <span className="text-sm font-medium">{formatDate(variant.dateAdded)}</span>
                    </div>
                    <div className="border rounded-md p-3 bg-secondary/10">
                      <span className="text-muted-foreground text-xs block mb-1">Retail Price</span>
                      <span className="text-sm font-medium">${variant.retailPrice || 'N/A'}</span>
                    </div>
                    <div className="border rounded-md p-3 bg-secondary/10">
                      <span className="text-muted-foreground text-xs block mb-1">Wholesale Price</span>
                      <span className="text-sm font-medium">${variant.wholesalePrice || 'N/A'}</span>
                    </div>
                    <div className="border rounded-md p-3 bg-secondary/10">
                      <span className="text-muted-foreground text-xs block mb-1">Quantity</span>
                      <span className="text-sm font-medium">{variant.quantity || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="border rounded-md p-3 bg-secondary/10">
                      <span className="text-muted-foreground text-xs block mb-1">Warehouse Locations</span>
                      <div className="grid grid-cols-3 gap-1 mt-1">
                        <Badge variant="outline" className="justify-center">{variant.warehouseLocation1 || 'N/A'}</Badge>
                        <Badge variant="outline" className="justify-center">{variant.warehouseLocation2 || 'N/A'}</Badge> 
                        <Badge variant="outline" className="justify-center">{variant.warehouseLocation3 || 'N/A'}</Badge>
                      </div>
                    </div>
                    <div className="border rounded-md p-3 bg-secondary/10">
                      <span className="text-muted-foreground text-xs block mb-1">Total Sold</span>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">StockX</span>
                          <span className="text-sm font-medium">{variant.totalSoldStockX || 0}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">GOAT</span>
                          <span className="text-sm font-medium">{variant.totalSoldGoat || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="actions" className="pt-2">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 w-full bg-secondary/20 text-foreground hover:bg-secondary hover:text-foreground border-secondary/30"
                  onClick={() => onListItem('stockx', variant.variantId)}
                >
                  <Tag size={14} />
                  List on StockX
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 w-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20"
                  onClick={() => onListItem('goat', variant.variantId)}
                >
                  <Truck size={14} />
                  List on GOAT
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="border rounded-md p-3 bg-secondary/10">
                  <span className="text-muted-foreground block mb-1">StockX:</span>
                  <Badge variant="outline" className="bg-secondary/20">0 active</Badge>
                </div>
                <div className="border rounded-md p-3 bg-secondary/10">
                  <span className="text-muted-foreground block mb-1">GOAT:</span>
                  <Badge variant="outline" className="bg-secondary/20">0 active</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
