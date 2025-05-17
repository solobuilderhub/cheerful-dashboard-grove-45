
import React, { useState } from 'react';
import { 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ListOrdered, LineChart, Eye } from 'lucide-react';
import { InventoryQuantityControl } from './InventoryQuantityControl';

interface SizeChart {
  defaultConversion: {
    size: string;
    type: string;
  };
  availableConversions: Array<{
    size: string;
    type: string;
  }>;
}

interface Variant {
  _id: string;
  variantId: string;
  variantName: string;
  variantValue: string;
  size: string;
  sizeChart?: SizeChart;
  quantity?: number;
}

interface VariantAccordionItemProps {
  variant: Variant;
  onListItem: (platform: 'stockx' | 'goat', variantId: string) => void;
  onViewMarketData: (variant: Variant) => void;
  onViewListings: (variant: Variant) => void;
  onQuantityChange?: (variantId: string, newQuantity: number) => void;
}

export function VariantAccordionItem({ 
  variant, 
  onListItem, 
  onViewMarketData,
  onViewListings,
  onQuantityChange
}: VariantAccordionItemProps) {
  const [activeTab, setActiveTab] = useState<'conversions' | 'actions'>('actions');
  
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AccordionItem value={variant.variantId} className="border rounded-md mb-2 overflow-hidden">
      <AccordionTrigger className="px-4 py-2 hover:bg-secondary/5 [&[data-state=open]]:bg-secondary/10">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-3">
            <span className="font-medium">Size: {variant.size}</span>
            <InventoryQuantityControl 
              initialQuantity={variant.quantity || 1}
              variantId={variant.variantId}
              onQuantityChange={onQuantityChange}
            />
          </div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="border-t bg-background/50">
        <div className="p-3">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'conversions' | 'actions')} className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-2">
              <TabsTrigger value="actions">Quick Actions</TabsTrigger>
              <TabsTrigger value="conversions">Size Conversions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="actions" className="pt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 w-full"
                  onClick={(e) => {
                    handleStopPropagation(e);
                    onListItem('stockx', variant.variantId);
                  }}
                >
                  <Package size={14} />
                  StockX
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 w-full"
                  onClick={(e) => {
                    handleStopPropagation(e);
                    onListItem('goat', variant.variantId);
                  }}
                >
                  <ListOrdered size={14} />
                  GOAT
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 w-full"
                  onClick={(e) => {
                    handleStopPropagation(e);
                    onViewMarketData(variant);
                  }}
                >
                  <LineChart size={14} />
                  Market
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 w-full"
                  onClick={(e) => {
                    handleStopPropagation(e);
                    onViewListings(variant);
                  }}
                >
                  <Eye size={14} />
                  Listings
                </Button>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div className="border rounded-md p-2 bg-secondary/5">
                  <span className="text-muted-foreground block mb-1">StockX:</span>
                  <Badge variant="outline" className="bg-background">0 active</Badge>
                </div>
                <div className="border rounded-md p-2 bg-secondary/5">
                  <span className="text-muted-foreground block mb-1">GOAT:</span>
                  <Badge variant="outline" className="bg-background">0 active</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversions">
              {variant.sizeChart ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {variant.sizeChart.availableConversions.map((conversion, idx) => (
                    <div key={idx} className="border rounded-md p-2 text-sm">
                      <span className="text-muted-foreground">{conversion.type.toUpperCase()}: </span>
                      <span className="font-medium">{conversion.size}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-sm text-muted-foreground">
                  No size conversion information available
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
