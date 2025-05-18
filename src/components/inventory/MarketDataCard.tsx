
import React, { useState } from 'react';
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
  stockXData: StockXMarketData | null;
  goatData: GoatMarketData[] | null;
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
  const [activeTab, setActiveTab] = useState('stockx');
  
  // Format price function
  const formatPrice = (cents: string) => {
    if (!cents || cents === "0") return '$0';
    if (cents.includes('.')) return `$${cents}`;
    const dollars = parseInt(cents) / 100;
    return `$${dollars}`;
  };

  // Get GOAT market data for a specific size
  const getGoatMarketDataForSize = (size: string) => {
    if (!goatData) return null;
    const numericSize = parseFloat(size);
    return goatData.find(item => item.size === numericSize);
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <div className="bg-white rounded-md">
        <h3 className="text-blue-800 font-medium p-4">Market Data - Size {selectedSize}</h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-md">
            <TabsTrigger 
              value="stockx" 
              className="data-[state=active]:bg-white"
            >
              StockX
            </TabsTrigger>
            <TabsTrigger 
              value="goat" 
              className="data-[state=active]:bg-white"
            >
              GOAT
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stockx" className="p-2">
            {isLoading || !stockXData ? (
              <div className="h-32 flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-md p-3 border border-green-100">
                  <div className="text-sm text-green-700">Lowest Ask</div>
                  <div className="text-xl font-semibold text-green-800">${stockXData.lowestAskAmount}</div>
                </div>
                <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
                  <div className="text-sm text-blue-700">Highest Bid</div>
                  <div className="text-xl font-semibold text-blue-800">${stockXData.highestBidAmount}</div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="goat" className="p-2">
            {isLoading || !goatData ? (
              <div className="h-32 flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {(() => {
                  const data = getGoatMarketDataForSize(selectedSize);
                  if (!data) return (
                    <div className="col-span-2 text-center py-6">
                      <p className="text-muted-foreground">No market data available for this size</p>
                    </div>
                  );
                  
                  return (
                    <>
                      <div className="bg-green-50 rounded-md p-3 border border-green-100">
                        <div className="text-sm text-green-700">Lowest Listing Price</div>
                        <div className="text-xl font-semibold text-green-800">
                          {formatPrice(data.availability.lowest_listing_price_cents)}
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
                        <div className="text-sm text-blue-700">Highest Offer Price</div>
                        <div className="text-xl font-semibold text-blue-800">
                          {formatPrice(data.availability.highest_offer_price_cents)}
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-md p-3 border border-purple-100">
                        <div className="text-sm text-purple-700">Last Sold Price</div>
                        <div className="text-xl font-semibold text-purple-800">
                          {formatPrice(data.availability.last_sold_listing_price_cents)}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
