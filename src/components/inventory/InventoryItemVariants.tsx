
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Package, ListOrdered } from 'lucide-react';

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

interface InventoryItemVariantsProps {
  variations?: Variant[];
  handleListItem: (platform: 'stockx' | 'goat', variantId?: string) => void;
}

export function InventoryItemVariants({ variations, handleListItem }: InventoryItemVariantsProps) {
  return (
    <>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Available Variants</h3>
        <p className="text-sm text-muted-foreground">
          {(variations?.length || 0)} size variants available
        </p>
      </div>
      
      {variations && variations.length > 0 ? (
        <div className="space-y-2">
          {variations.map((variant) => (
            <Accordion 
              type="single" 
              collapsible 
              className="border rounded-md" 
              key={variant.variantId}
            >
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
                          handleListItem('stockx', variant.variantId);
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
                          handleListItem('goat', variant.variantId);
                        }}
                      >
                        <ListOrdered size={14} />
                        GOAT
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border rounded-md">
          <p className="text-muted-foreground">No variant information available</p>
        </div>
      )}
    </>
  );
}
