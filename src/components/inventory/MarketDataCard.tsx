
import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, TrendingDown, TrendingUp, Info } from 'lucide-react';

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
  isLoading
}: MarketDataCardProps) {  
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

  const goatDataForSize = getGoatMarketDataForSize(selectedSize);

  if (isLoading) {
    return (
      <Card className="w-full border-0 shadow-none p-8">
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-none mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* StockX Market Data */}
        <div className="bg-gradient-to-br from-gray-900 to-neutral-800 rounded-xl p-5 border border-neutral-700">
          <div className="flex items-center mb-4">
            <div className="bg-white rounded-md p-1.5">
              <h3 className="text-lg font-bold text-black tracking-tight">StockX</h3>
            </div>
          </div>
          
          {!stockXData ? (
            <div className="text-center py-6 text-gray-400">
              <Info className="h-8 w-8 mx-auto mb-2" />
              <p>No StockX data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-800/30">
                <div className="flex items-center gap-2">
                  <div className="text-green-400 text-xs font-medium uppercase tracking-wider">Lowest Ask</div>
                  <TrendingDown className="h-4 w-4 text-green-400" />
                </div>
                <div className="mt-2 text-2xl font-bold text-green-300">${stockXData.lowestAskAmount}</div>
              </div>
              
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800/30">
                <div className="flex items-center gap-2">
                  <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">Highest Bid</div>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <div className="mt-2 text-2xl font-bold text-blue-300">${stockXData.highestBidAmount}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* GOAT Market Data */}
        <div className="bg-gradient-to-br from-gray-900 to-neutral-800 rounded-xl p-5 border border-neutral-700">
          <div className="flex items-center mb-4">
            <div className="bg-white rounded-md p-1.5">
              <h3 className="text-lg font-bold text-black tracking-tight">GOAT</h3>
            </div>
          </div>
          
          {!goatDataForSize ? (
            <div className="text-center py-6 text-gray-400">
              <Info className="h-8 w-8 mx-auto mb-2" />
              <p>No GOAT data available for this size</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between gap-4">
                <div className="flex-1 bg-green-900/20 rounded-lg p-3 border border-green-800/30">
                  <div className="flex items-center gap-2">
                    <div className="text-green-400 text-xs font-medium uppercase tracking-wider">Lowest Listing</div>
                    <TrendingDown className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="mt-1 text-xl font-bold text-green-300">
                    {formatPrice(goatDataForSize.availability.lowest_listing_price_cents)}
                  </div>
                </div>
                
                <div className="flex-1 bg-blue-900/20 rounded-lg p-3 border border-blue-800/30">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">Highest Offer</div>
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="mt-1 text-xl font-bold text-blue-300">
                    {formatPrice(goatDataForSize.availability.highest_offer_price_cents)}
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-800/30">
                <div className="flex items-center gap-2">
                  <div className="text-purple-400 text-xs font-medium uppercase tracking-wider">Last Sold</div>
                  <Info className="h-4 w-4 text-purple-400" />
                </div>
                <div className="mt-1 text-xl font-bold text-purple-300">
                  {formatPrice(goatDataForSize.availability.last_sold_listing_price_cents)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
