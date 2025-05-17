
import React, { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { MarketDataCard } from './MarketDataCard';
import { VariantAccordionItem } from './VariantAccordionItem';
import { VariantListingsDialog } from './VariantListingsDialog';

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
  const [loadingMarketData, setLoadingMarketData] = useState<boolean>(false);
  const [showListingsDialog, setShowListingsDialog] = useState<boolean>(false);

  // Function to fetch market data for a variant
  const handleViewMarketData = (variant: Variant) => {
    setSelectedVariant(variant);
    setLoadingMarketData(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoadingMarketData(false);
    }, 800);
  };

  // Function to handle viewing listings for a variant
  const handleViewListings = (variant: Variant) => {
    setSelectedVariant(variant);
    setShowListingsDialog(true);
  };

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
          <Accordion type="single" collapsible>
            {variations.map((variant) => (
              <VariantAccordionItem
                key={variant.variantId}
                variant={variant}
                onListItem={handleListItem}
                onViewMarketData={handleViewMarketData}
                onViewListings={handleViewListings}
              />
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="text-center py-6 border rounded-md">
          <p className="text-muted-foreground">No variant information available</p>
        </div>
      )}
      
      {/* Market Data Section */}
      {selectedVariant && (
        <MarketDataCard
          stockXData={mockStockXMarketData}
          goatData={mockGoatMarketData}
          selectedSize={selectedVariant.size}
          isLoading={loadingMarketData}
        />
      )}

      {/* Variant Listings Dialog */}
      <VariantListingsDialog
        open={showListingsDialog}
        onOpenChange={(open) => setShowListingsDialog(open)}
        variant={selectedVariant}
        styleId={styleId}
      />
    </>
  );
}
