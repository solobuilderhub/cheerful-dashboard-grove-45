
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface Variant {
  _id: string;
  variantId: string;
  variantName: string;
  variantValue: string;
  size: string;
  sizeChart?: any;
  quantity?: number;
}

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

interface MarketDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: Variant;
  stockXData: StockXMarketData;
  goatData: GoatMarketData[];
}

export function MarketDataDialog({ 
  open, 
  onOpenChange, 
  variant,
  stockXData,
  goatData
}: MarketDataDialogProps) {
  const [activeTab, setActiveTab] = useState('stockx');
  const [isLoading, setIsLoading] = useState(false);

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
  
  // Simulate API loading when changing tabs
  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            Market Data
            <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200">Size: {variant.size}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/10">
            <TabsTrigger 
              value="stockx" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              StockX
            </TabsTrigger>
            <TabsTrigger 
              value="goat"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              GOAT
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stockx" className="space-y-4 mt-6 min-h-48">
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4 bg-green-50 border-green-100 transition-all hover:shadow-md">
                  <div className="text-sm text-green-700">Lowest Ask</div>
                  <div className="text-xl font-semibold text-green-800">${stockXData.lowestAskAmount}</div>
                  <div className="mt-2 text-xs text-green-600">The lowest price someone is willing to sell for</div>
                </div>
                <div className="border rounded-md p-4 bg-blue-50 border-blue-100 transition-all hover:shadow-md">
                  <div className="text-sm text-blue-700">Highest Bid</div>
                  <div className="text-xl font-semibold text-blue-800">${stockXData.highestBidAmount}</div>
                  <div className="mt-2 text-xs text-blue-600">The highest price someone is willing to buy for</div>
                </div>
                <div className="col-span-2 mt-2">
                  <div className="text-xs text-muted-foreground border-t pt-2">
                    <p>Suggested List Price: ${Math.round(parseInt(stockXData.lowestAskAmount) * 0.95)}</p>
                    <p className="mt-1">Last Updated: {new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="goat" className="space-y-4 mt-6 min-h-48">
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {(() => {
                  const data = getGoatMarketDataForSize(variant.size);
                  if (!data) return (
                    <div className="col-span-2 text-center py-6 border rounded-md bg-gray-50">
                      <p className="text-muted-foreground">No market data available for this size</p>
                    </div>
                  );
                  
                  return (
                    <>
                      <div className="border rounded-md p-4 bg-green-50 border-green-100 transition-all hover:shadow-md">
                        <div className="text-sm text-green-700">Lowest Ask</div>
                        <div className="text-xl font-semibold text-green-800">
                          {formatPrice(data.availability.lowest_listing_price_cents)}
                        </div>
                        <div className="mt-2 text-xs text-green-600">The lowest price someone is willing to sell for</div>
                      </div>
                      <div className="border rounded-md p-4 bg-blue-50 border-blue-100 transition-all hover:shadow-md">
                        <div className="text-sm text-blue-700">Highest Offer</div>
                        <div className="text-xl font-semibold text-blue-800">
                          {formatPrice(data.availability.highest_offer_price_cents)}
                        </div>
                        <div className="mt-2 text-xs text-blue-600">The highest price someone is willing to buy for</div>
                      </div>
                      <div className="border rounded-md p-4 bg-purple-50 border-purple-100 transition-all hover:shadow-md">
                        <div className="text-sm text-purple-700">Last Sold</div>
                        <div className="text-xl font-semibold text-purple-800">
                          {formatPrice(data.availability.last_sold_listing_price_cents)}
                        </div>
                        <div className="mt-2 text-xs text-purple-600">The most recent sale price</div>
                      </div>
                      <div className="border rounded-md p-4 bg-orange-50 border-orange-100 transition-all hover:shadow-md">
                        <div className="text-sm text-orange-700">Market Value</div>
                        <div className="text-xl font-semibold text-orange-800">
                          {formatPrice(data.availability.global_indicator_price_cents)}
                        </div>
                        <div className="mt-2 text-xs text-orange-600">Current estimated market value</div>
                      </div>
                      <div className="col-span-2 mt-2">
                        <div className="text-xs text-muted-foreground border-t pt-2">
                          <p>Suggested List Price: {formatPrice(Math.round(parseInt(data.availability.lowest_listing_price_cents) * 0.95).toString())}</p>
                          <p className="mt-1">Last Updated: {new Date().toLocaleString()}</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
