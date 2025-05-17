
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/utils/apiClient';
import { toast } from './use-toast';

// Mock StockX listings data
const mockStockXListings = [
  {
    id: 'sl1',
    productId: 'b80ff5b5-98ab-40ff-a58c-83f6962fe8aa',
    variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f522',
    price: '15800',
    status: 'ACTIVE',
    createdAt: '2025-04-01T14:30:00Z',
    expiresAt: '2025-07-01T14:30:00Z'
  },
  {
    id: 'sl2',
    productId: 'c5e32ce5-4828-4f49-a345-f83e97285b3d',
    variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f523',
    price: '16500',
    status: 'PENDING',
    createdAt: '2025-04-10T09:15:00Z',
    expiresAt: '2025-07-10T09:15:00Z'
  }
];

// Mock GOAT listings data
const mockGoatListings = [
  {
    id: 'gl1',
    productId: 'timberland-6-boot-just-don-denim-gs',
    size: '5.5Y',
    price: '16000',
    condition: 'PRODUCT_CONDITION_NEW',
    packagingCondition: 'PACKAGING_CONDITION_GOOD_CONDITION',
    status: 'LISTING_STATUS_ACTIVE',
    createdAt: '2025-03-25T11:20:00Z',
    expiresAt: '2025-06-25T11:20:00Z'
  },
  {
    id: 'gl2',
    productId: 'timberland-6-boot-black-nubuck-premium',
    size: '9',
    price: '17500',
    condition: 'PRODUCT_CONDITION_NEW',
    packagingCondition: 'PACKAGING_CONDITION_GOOD_CONDITION',
    status: 'LISTING_STATUS_PENDING',
    createdAt: '2025-04-05T16:45:00Z',
    expiresAt: '2025-07-05T16:45:00Z'
  }
];

// Query keys for React Query
export const listingKeys = {
  all: ['listings'] as const,
  stockx: () => [...listingKeys.all, 'stockx'] as const,
  stockxByVariant: (variantId: string) => [...listingKeys.stockx(), variantId] as const,
  goat: () => [...listingKeys.all, 'goat'] as const,
  goatByVariant: (variantId: string) => [...listingKeys.goat(), variantId] as const,
};

// Types for listings
export interface StockXListing {
  id: string;
  productId: string;
  variantId: string;
  price: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export interface GoatListing {
  id: string;
  productId: string;
  size: string;
  price: string;
  condition: string;
  packagingCondition: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export interface ListingFormData {
  price: string;
  condition: string;
  packagingCondition: string;
  activate: boolean;
}

/**
 * Hook to fetch StockX listings
 */
export const useStockXListings = (variantId?: string) => {
  return useQuery({
    queryKey: listingKeys.stockxByVariant(variantId || 'all'),
    queryFn: async () => {
      const response = await apiClient.get('/api/stockx/listings', mockStockXListings);
      
      // Filter by variantId if provided
      const data = variantId 
        ? response.data.filter((listing: StockXListing) => listing.variantId === variantId) 
        : response.data;
        
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch GOAT listings
 */
export const useGoatListings = (size?: string) => {
  return useQuery({
    queryKey: listingKeys.goatByVariant(size || 'all'),
    queryFn: async () => {
      const response = await apiClient.get('/api/goat/listings', mockGoatListings);
      
      // Filter by size if provided
      const data = size 
        ? response.data.filter((listing: GoatListing) => listing.size === size) 
        : response.data;
        
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a StockX listing
 */
export const useCreateStockXListing = (styleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      variantId, 
      price 
    }: { 
      variantId: string; 
      price: string 
    }) => {
      const newListing: StockXListing = {
        id: `sl-${Date.now()}`, // Generate a temporary ID
        productId: styleId, 
        variantId,
        price,
        status: 'PENDING', // New listings start as pending
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days expiry
      };
      
      const response = await apiClient.post('/api/stockx/listings', { variantId, price }, newListing);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Listing created",
        description: "Your StockX listing has been created successfully.",
      });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: listingKeys.stockx() });
    },
    onError: () => {
      toast({
        title: "Error creating listing",
        description: "There was a problem creating your StockX listing.",
        variant: "destructive",
      });
    },
  });
};

/**
 * Hook to create a GOAT listing
 */
export const useCreateGoatListing = (styleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      size,
      formData
    }: { 
      size: string;
      formData: ListingFormData; 
    }) => {
      const newListing: GoatListing = {
        id: `gl-${Date.now()}`, // Generate a temporary ID
        productId: styleId,
        size,
        price: formData.price,
        condition: formData.condition,
        packagingCondition: formData.packagingCondition,
        status: 'LISTING_STATUS_PENDING', // New listings start as pending
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days expiry
      };
      
      const response = await apiClient.post('/api/goat/listings', { size, formData }, newListing);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Listing created",
        description: "Your GOAT listing has been created successfully.",
      });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: listingKeys.goat() });
    },
    onError: () => {
      toast({
        title: "Error creating listing",
        description: "There was a problem creating your GOAT listing.",
        variant: "destructive",
      });
    },
  });
};
