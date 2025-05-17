
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockXMarketData {
  productId: string;
  variantId: string;
  currencyCode: string;
  highestBidAmount: string;
  lowestAskAmount: string;
  flexLowestAskAmount: string | null;
}

interface GoatAvailability {
  lowest_listing_price_cents: string;
  highest_offer_price_cents: string;
  last_sold_listing_price_cents: string;
  global_indicator_price_cents: string;
}

interface GoatMarketData {
  size: number;
  product_condition: string;
  packaging_condition: string;
  availability: GoatAvailability;
}

interface MarketDataCardProps {
  stockXData: StockXMarketData;
  goatData: GoatMarketData[];
  selectedSize: string;
  isLoading: boolean;
  onClose?: () => void;
}

export function MarketDataCard({ 
  stockXData, 
  goatData, 
  selectedSize, 
  isLoading,
  onClose 
}: MarketDataCardProps) {
  // Format price function
  const formatPrice = (cents: string) => {
    if (!cents || cents === "0") return '$0.00';
    const dollars = parseInt(cents) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(dollars);
  };

  // Get GOAT market data for a specific size
  const getGoatMarketDataForSize = (size: string) => {
    const numericSize = parseFloat(size);
    return goatData.find(item => item.size === numericSize);
  };

  return (
    <Card className="p-4 relative animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Market Data - Size {selectedSize}</h3>
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="stockx">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stockx">StockX</TabsTrigger>
          <TabsTrigger value="goat">GOAT</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stockx" className="space-y-4 mt-4">
          {isLoading ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground">Lowest Ask</div>
                <div className="text-xl font-semibold">${stockXData.lowestAskAmount}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground">Highest Bid</div>
                <div className="text-xl font-semibold">${stockXData.highestBidAmount}</div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="goat" className="space-y-4 mt-4">
          {isLoading ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {(() => {
                const data = getGoatMarketDataForSize(selectedSize);
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
  );
}
