
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { MarketDataCard } from './MarketDataCard';
import { Variant } from '@/components/inventory-drawer/types';
import { useStockXMarketData, useGoatMarketData } from '@/hooks/use-market-data';

interface MarketDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: Variant | null;
}

export function MarketDataDialog({ 
  open, 
  onOpenChange, 
  variant
}: MarketDataDialogProps) {
  // Use our custom hooks to fetch market data
  const { data: stockXData, isLoading: isLoadingStockX } = useStockXMarketData(variant);
  const { data: goatData, isLoading: isLoadingGoat } = useGoatMarketData(variant);
  
  if (!variant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Market Data for Size {variant.size}
          </DialogTitle>
          <DialogDescription>
            <Badge variant="outline" className="mr-2">Last Updated: {new Date().toLocaleString()}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <MarketDataCard 
            stockXData={stockXData} 
            goatData={goatData}
            selectedSize={variant.size}
            isLoading={isLoadingStockX || isLoadingGoat}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
