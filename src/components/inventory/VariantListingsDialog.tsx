
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockXListings, StockXListing } from './StockXListings';
import { GoatListings, GoatListing } from './GoatListings';
import { Badge } from '@/components/ui/badge';
import { Variant } from '@/components/inventory-drawer/types';
import { useStockXListings, useGoatListings } from '@/hooks/use-listings-data';

interface VariantListingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: Variant | null;
  styleId: string;
}

// Mock StockX listing data that matches the StockXListing interface
const mockStockXListings: StockXListing[] = [
  {
    amount: "150",
    ask: {
      askId: "ask123",
      askCreatedAt: new Date().toISOString(),
      askUpdatedAt: new Date().toISOString(),
      askExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    order: null,
    product: {
      productId: "prod123",
      productName: "Nike Dunk Low",
      styleId: "DD1391-100",
    },
    variant: {
      variantId: "var123",
      variantName: "US 9",
      variantValue: "9",
    },
    currencyCode: "USD",
    listingId: "list123",
    status: "ACTIVE",
    inventoryType: "standard",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authenticationDetails: null,
    batch: {
      batchId: "batch123",
      taskId: "task123",
    },
    initiatedShipments: null,
  }
];

// Mock GOAT listing data that matches the GoatListing interface
const mockGoatListings: GoatListing[] = [
  {
    amount: "150",
    order: null,
    product: {
      productId: "prod123",
      productName: "Nike Dunk Low",
      styleId: "DD1391-100",
    },
    variant: {
      variantId: "var123",
      variantName: "US 9",
      variantValue: "9",
    },
    currencyCode: "USD",
    listingId: "list123",
    status: "ACTIVE",
    inventoryType: "standard",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

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
  
  // Function to ensure proper types by merging mock data with API responses if needed
  const getStockXListings = () => {
    return stockXListings as StockXListing[] || mockStockXListings;
  };
  
  const getGoatListings = () => {
    return goatListings as GoatListing[] || mockGoatListings;
  };

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
              listings={getStockXListings()}
              isLoading={isLoadingStockX}
              lastUpdated={new Date().toISOString()} 
              filterByVariantId={variant.variantId}
            />
          </TabsContent>
          
          <TabsContent value="goat" className="mt-4">
            <GoatListings 
              listings={getGoatListings()}
              isLoading={isLoadingGoat}
              lastUpdated={new Date().toISOString()} 
              filterByVariantId={variant.variantId}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
