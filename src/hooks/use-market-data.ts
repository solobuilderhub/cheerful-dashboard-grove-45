
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils/apiClient';
import { Variant } from '@/components/inventory-drawer/types';

// Sample market data for mocking
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

// Query keys for React Query
export const marketDataKeys = {
  all: ['marketData'] as const,
  stockx: () => [...marketDataKeys.all, 'stockx'] as const,
  stockxByVariant: (variantId: string) => [...marketDataKeys.stockx(), variantId] as const,
  goat: () => [...marketDataKeys.all, 'goat'] as const,
  goatByVariant: (variantId: string) => [...marketDataKeys.goat(), variantId] as const,
};

/**
 * Hook to fetch StockX market data for a variant
 */
export const useStockXMarketData = (variant: Variant | null) => {
  return useQuery({
    queryKey: marketDataKeys.stockxByVariant(variant?.variantId || ''),
    queryFn: async () => {
      if (!variant) return null;
      
      // In a real app, we would use variant.variantId to fetch specific data
      const response = await apiClient.get('/api/stockx/market-data', mockStockXMarketData);
      return response.data;
    },
    enabled: !!variant,
    staleTime: 1 * 60 * 1000, // 1 minute since market data changes frequently
  });
};

/**
 * Hook to fetch GOAT market data for a variant
 */
export const useGoatMarketData = (variant: Variant | null) => {
  return useQuery({
    queryKey: marketDataKeys.goatByVariant(variant?.variantId || ''),
    queryFn: async () => {
      if (!variant) return null;
      
      // In a real app, we would filter based on variant.size
      // For now, we'll return the mock data that's closest to the variant size
      const response = await apiClient.get('/api/goat/market-data', mockGoatMarketData);
      return response.data;
    },
    enabled: !!variant,
    staleTime: 1 * 60 * 1000, // 1 minute since market data changes frequently
  });
};
