
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ListOrdered, LineChart, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GoatListings } from './GoatListings';
import { StockXListings } from './StockXListings';

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

export function InventoryItemVariants({ variations, handleListItem }: InventoryItemVariantsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loadingMarketData, setLoadingMarketData] = useState<boolean>(false);
  const [activeMarketTab, setActiveMarketTab] = useState<string>('stockx');
  const [showListingsDialog, setShowListingsDialog] = useState<boolean>(false);

  // Function to fetch market data for a variant
  const fetchMarketData = (variant: Variant) => {
    setSelectedVariant(variant);
    setLoadingMarketData(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoadingMarketData(false);
    }, 800);
  };

  // Format price function
  const formatPrice = (cents: string) => {
    if (!cents) return '$0.00';
    const dollars = parseInt(cents) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(dollars);
  };

  // Get GOAT market data for a specific size
  const getGoatMarketDataForSize = (size: string) => {
    const numericSize = parseFloat(size);
    return mockGoatMarketData.find(item => item.size === numericSize);
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchMarketData(variant);
                        }}
                      >
                        <LineChart size={14} />
                        Market
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
                  
                  {/* Active Listings Section */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Active Listings</h4>
                      <Dialog open={showListingsDialog && selectedVariant?.variantId === variant.variantId} 
                        onOpenChange={(open) => {
                          if (!open) setShowListingsDialog(false);
                        }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedVariant(variant);
                              setShowListingsDialog(true);
                            }}
                          >
                            View All
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          {selectedVariant && (
                            <div className="p-2">
                              <h3 className="text-lg font-semibold mb-4">Listings for Size {selectedVariant.size}</h3>
                              <Tabs value={activeMarketTab} onValueChange={setActiveMarketTab}>
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="stockx">StockX</TabsTrigger>
                                  <TabsTrigger value="goat">GOAT</TabsTrigger>
                                </TabsList>
                                <TabsContent value="stockx" className="mt-4">
                                  <StockXListings 
                                    listings={[]} 
                                    lastUpdated={new Date().toISOString()} 
                                  />
                                </TabsContent>
                                <TabsContent value="goat" className="mt-4">
                                  <GoatListings 
                                    listings={[]} 
                                    lastUpdated={new Date().toISOString()} 
                                  />
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span>StockX: <Badge variant="outline" className="ml-1">0 active</Badge></span>
                      <span>GOAT: <Badge variant="outline" className="ml-1">0 active</Badge></span>
                    </div>
                  </div>
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
      
      {/* Market Data Section */}
      {selectedVariant && (
        <Card className="mt-6 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Market Data - Size {selectedVariant.size}</h3>
            {loadingMarketData && <Loader2 className="animate-spin h-4 w-4" />}
          </div>
          
          <Tabs defaultValue="stockx">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stockx">StockX</TabsTrigger>
              <TabsTrigger value="goat">GOAT</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stockx" className="space-y-4 mt-4">
              {loadingMarketData ? (
                <div className="h-32 flex items-center justify-center">
                  <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Lowest Ask</div>
                    <div className="text-xl font-semibold">${mockStockXMarketData.lowestAskAmount}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Highest Bid</div>
                    <div className="text-xl font-semibold">${mockStockXMarketData.highestBidAmount}</div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="goat" className="space-y-4 mt-4">
              {loadingMarketData ? (
                <div className="h-32 flex items-center justify-center">
                  <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {(() => {
                    const data = getGoatMarketDataForSize(selectedVariant.size);
                    if (!data) return (
                      <div className="col-span-2 text-center py-6">
                        <p className="text-muted-foreground">No market data available for this size</p>
                      </div>
                    );
                    
                    return (
                      <>
                        <div className="border rounded-md p-3">
                          <div className="text-sm text-muted-foreground">Lowest Ask</div>
                          <div className="text-xl font-semibold">
                            {formatPrice(data.availability.lowest_listing_price_cents)}
                          </div>
                        </div>
                        <div className="border rounded-md p-3">
                          <div className="text-sm text-muted-foreground">Highest Offer</div>
                          <div className="text-xl font-semibold">
                            {formatPrice(data.availability.highest_offer_price_cents)}
                          </div>
                        </div>
                        <div className="border rounded-md p-3">
                          <div className="text-sm text-muted-foreground">Last Sold</div>
                          <div className="text-xl font-semibold">
                            {formatPrice(data.availability.last_sold_listing_price_cents)}
                          </div>
                        </div>
                        <div className="border rounded-md p-3">
                          <div className="text-sm text-muted-foreground">Market Value</div>
                          <div className="text-xl font-semibold">
                            {formatPrice(data.availability.global_indicator_price_cents)}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </>
  );
}
