
import React, { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { VariantAccordionItem } from './VariantAccordionItem';
import { VariantListingsDialog } from './VariantListingsDialog';
import { MarketDataDialog } from './MarketDataDialog';
import { useToast } from '@/hooks/use-toast';

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
  styleId: string;
}

// Mock market data - in a real app this would come from an API
const mockStockXMarketData = {
  productId: "b80ff5b5-98ab-40ff-a58c-83f6962fe8aa",
  variantId: "a09ff70f-48ca-4abd-a23a-a0fd716a4dff",
  currencyCode: "USD",
  highestBidAmount: "15",
  lowestAskAmount: "158",
  flexLowestAskAmount: null
};

// Mock GOAT market data
const mockGoatMarketData = [
  {
    size: 9,
    product_condition: "PRODUCT_CONDITION_NEW",
    packaging_condition: "PACKAGING_CONDITION_GOOD_CONDITION",
    availability: {
      lowest_listing_price_cents: "15800",
      highest_offer_price_cents: "14000",
      last_sold_listing_price_cents: "16500",
      global_indicator_price_cents: "17000"
    }
  },
  {
    size: 10,
    product_condition: "PRODUCT_CONDITION_NEW",
    packaging_condition: "PACKAGING_CONDITION_GOOD_CONDITION",
    availability: {
      lowest_listing_price_cents: "16800",
      highest_offer_price_cents: "15000",
      last_sold_listing_price_cents: "17200",
      global_indicator_price_cents: "18000"
    }
  }
];

export function InventoryItemVariants({ variations, handleListItem, styleId }: InventoryItemVariantsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [showListingsDialog, setShowListingsDialog] = useState<boolean>(false);
  const [showMarketDataDialog, setShowMarketDataDialog] = useState<boolean>(false);
  const { toast } = useToast();

  // Function to handle viewing market data for a variant
  const handleViewMarketData = (variant: Variant) => {
    setSelectedVariant(variant);
    setShowMarketDataDialog(true);
  };

  // Function to handle viewing listings for a variant
  const handleViewListings = (variant: Variant) => {
    setSelectedVariant(variant);
    setShowListingsDialog(true);
  };

  // Function to handle quantity updates
  const handleQuantityChange = (variantId: string, newQuantity: number) => {
    // In a real app, this would update the backend
    console.log(`Updated quantity for variant ${variantId} to ${newQuantity}`);
    
    // Show a toast notification
    toast({
      title: "Quantity updated",
      description: `Inventory quantity for Size ${
        variations?.find(v => v.variantId === variantId)?.size || ''
      } has been updated to ${newQuantity}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
        <h3 className="font-semibold text-blue-800 mb-2">Available Variants</h3>
        <p className="text-sm text-blue-600">
          {(variations?.length || 0)} size variants available. Click on a variant to see detailed information.
        </p>
      </div>
      
      {variations && variations.length > 0 ? (
        <div className="space-y-3">
          <Accordion type="single" collapsible className="space-y-3">
            {variations.map((variant) => (
              <VariantAccordionItem
                key={variant.variantId}
                variant={variant}
                onListItem={handleListItem}
                onViewMarketData={handleViewMarketData}
                onViewListings={handleViewListings}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="text-center py-6 border rounded-md">
          <p className="text-muted-foreground">No variant information available</p>
        </div>
      )}

      {/* Variant Listings Dialog */}
      {selectedVariant && (
        <VariantListingsDialog
          open={showListingsDialog}
          onOpenChange={(open) => setShowListingsDialog(open)}
          variant={selectedVariant}
          styleId={styleId}
        />
      )}

      {/* Market Data Dialog */}
      {selectedVariant && (
        <MarketDataDialog
          open={showMarketDataDialog}
          onOpenChange={(open) => setShowMarketDataDialog(open)}
          variant={selectedVariant}
          stockXData={mockStockXMarketData}
          goatData={mockGoatMarketData}
        />
      )}
    </div>
  );
}
