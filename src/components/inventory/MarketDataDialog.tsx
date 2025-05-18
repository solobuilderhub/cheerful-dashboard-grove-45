
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MarketDataCard } from './MarketDataCard';
import { Variant } from '@/components/inventory-drawer/types';
import { useStockXMarketData, useGoatMarketData } from '@/hooks/use-market-data';
import { X } from 'lucide-react';

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

  // Format the current date and time
  const formattedDate = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).replace(",", "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-neutral-900 text-white border-0 p-0">
        <div className="p-6">
          <header className="flex items-center justify-between mb-1">
            <div>
              <DialogTitle className="text-white text-lg font-medium m-0">
                Market Data for Size {variant.size}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-400">
                Last Updated: {formattedDate}
              </DialogDescription>
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>
          
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
