
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockXListings } from './StockXListings';
import { GoatListings } from './GoatListings';
import { Badge } from '@/components/ui/badge';
import { Variant } from '@/components/inventory-drawer/types';
import { useStockXListings, useGoatListings } from '@/hooks/use-listings-data';

interface VariantListingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: Variant | null;
  styleId: string;
}

export function VariantListingsDialog({ 
  open, 
  onOpenChange, 
  variant, 
  styleId 
}: VariantListingsDialogProps) {
  const [activeTab, setActiveTab] = useState('stockx');
  
  // Use our custom hooks to fetch listings
  const { data: stockXListings, isLoading: isLoadingStockX } = useStockXListings(variant?.variantId);
  const { data: goatListings, isLoading: isLoadingGoat } = useGoatListings(variant?.size);

  if (!variant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Listings for Size {variant.size}
            <Badge variant="outline" className="ml-2">Style ID: {styleId}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stockx">StockX</TabsTrigger>
            <TabsTrigger value="goat">GOAT</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stockx" className="mt-4">
            <StockXListings 
              listings={stockXListings || []}
              isLoading={isLoadingStockX}
              lastUpdated={new Date().toISOString()} 
              filterByVariantId={variant.variantId}
            />
          </TabsContent>
          
          <TabsContent value="goat" className="mt-4">
            <GoatListings 
              listings={goatListings || []}
              isLoading={isLoadingGoat}
              lastUpdated={new Date().toISOString()} 
              filterBySize={variant.size}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
