
import React from 'react';
import { 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Package, ListOrdered, LineChart, Eye } from 'lucide-react';

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
}

export function VariantAccordionItem({ 
  variant, 
  onListItem, 
  onViewMarketData,
  onViewListings
}: VariantAccordionItemProps) {
  return (
    <AccordionItem value={variant.variantId}>
      <AccordionTrigger className="px-4 py-3 hover:bg-secondary/5">
        <div className="flex items-center justify-between w-full px-2">
          <div>
            <span className="font-medium mr-2">Size: {variant.size}</span>
            <Badge variant="outline" className="ml-2">
              Qty: {variant.quantity || 1}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onListItem('stockx', variant.variantId);
              }}
            >
              <Package size={14} />
              StockX
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onListItem('goat', variant.variantId);
              }}
            >
              <ListOrdered size={14} />
              GOAT
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onViewMarketData(variant);
              }}
            >
              <LineChart size={14} />
              Market
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onViewListings(variant);
              }}
            >
              <Eye size={14} />
              Listings
            </Button>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-3">
        {variant.sizeChart && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Size Conversions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {variant.sizeChart.availableConversions.map((conversion, idx) => (
                <div key={idx} className="border rounded-md p-2 text-sm">
                  <span className="text-muted-foreground">{conversion.type.toUpperCase()}: </span>
                  <span className="font-medium">{conversion.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Active Listings</h4>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-sm">
            <span>StockX: <Badge variant="outline" className="ml-1">0 active</Badge></span>
            <span>GOAT: <Badge variant="outline" className="ml-1">0 active</Badge></span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
