
import React, { useState } from 'react';
import { 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, LineChart, Eye } from 'lucide-react';
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
    <AccordionItem 
      value={variant.variantId} 
      className="border rounded-md mb-2 overflow-hidden transition-all duration-200 hover:border-primary/30"
    >
      <AccordionTrigger className="px-4 py-2 hover:bg-secondary/5 [&[data-state=open]]:bg-secondary/10">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Size: {variant.size}
            </Badge>
            <InventoryQuantityControl 
              initialQuantity={variant.quantity || 1}
              variantId={variant.variantId}
              onQuantityChange={onQuantityChange}
            />
          </div>
          
          <div className="flex gap-2" onClick={handleStopPropagation}>
            <Button
              size="sm"
              variant="ghost"
              className="gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              onClick={() => onViewMarketData(variant)}
            >
              <LineChart size={14} />
              Market
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="gap-1 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
              onClick={() => onViewListings(variant)}
            >
              <Eye size={14} />
              Listings
            </Button>
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
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 w-full bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200"
                  onClick={(e) => {
                    handleStopPropagation(e);
                    onListItem('stockx', variant.variantId);
                  }}
                >
                  <Package size={14} />
                  List on StockX
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 w-full bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800 border-orange-200"
                  onClick={(e) => {
                    handleStopPropagation(e);
                    onListItem('goat', variant.variantId);
                  }}
                >
                  <Package size={14} />
                  List on GOAT
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
                    <div key={idx} className="border rounded-md p-2 text-sm bg-secondary/5">
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
