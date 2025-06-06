
import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InventoryItemSummary } from './inventory/InventoryItemSummary';
import { InventoryDetailTabs } from './inventory/InventoryDetailTabs';
import { ListingForm } from './inventory/ListingForm';

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

interface ProductAttributes {
  color: string | null;
  gender: string | null;
  releaseDate: string | null;
  retailPrice: number | null;
  season: string | null;
  colorway: string | null;
  category: string | null;
  _id: string;
}

interface InventoryItem {
  id: string;
  image: string;
  name: string;
  styleId: string;
  size: string;
  quantity: number;
  dateAdded: string;
  warehouseLocation: string;
  cost: string;
  daysListed?: number;
  spread?: number;
  isLowestAsk?: boolean;
  isExpired?: boolean;
  stockx?: {
    sku: string;
    productId?: string;
  };
  goat?: {
    sku: string;
    size_unit?: string;
    catalogId?: string;
    name?: string;
  };
  _id?: string;
  brand?: string;
  productAttributes?: ProductAttributes;
  variations?: Variant[];
}

interface InventoryDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}

export function InventoryDetailSheet({ open, onOpenChange, item }: InventoryDetailSheetProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedPlatform, setSelectedPlatform] = useState<'stockx' | 'goat' | null>(null);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [selectedVariantForListing, setSelectedVariantForListing] = useState<string | null>(null);
  
  // Mock listing form state
  const [listingFormData, setListingFormData] = useState({
    price: '',
    condition: 'CONDITION_NEW',
    packagingCondition: 'PACKAGING_CONDITION_GOOD_CONDITION',
    activate: true
  });

  if (!item) return null;
  
  const handleListItem = (platform: 'stockx' | 'goat', variantId?: string) => {
    setSelectedPlatform(platform);
    setSelectedVariantForListing(variantId || null);
    setIsListingFormOpen(true);
    
    // Reset form data
    setListingFormData({
      price: '',
      condition: 'CONDITION_NEW',
      packagingCondition: 'PACKAGING_CONDITION_GOOD_CONDITION',
      activate: true
    });
  };

  const handleSubmitListing = () => {
    toast({
      title: "Listing submitted",
      description: `Successfully listed on ${selectedPlatform?.toUpperCase()} for $${listingFormData.price}`,
    });
    setIsListingFormOpen(false);
  };
  
  // Get selected variant data
  const getSelectedVariantData = () => {
    if (!selectedVariantForListing || !item.variations) return null;
    return item.variations.find(variant => variant.variantId === selectedVariantForListing);
  };

  const selectedVariant = getSelectedVariantData();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-4xl overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">Inventory Details</SheetTitle>
            <SheetClose className="p-2 rounded-full hover:bg-secondary">
              <X size={20} />
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="py-6 overflow-y-auto">
          {isListingFormOpen ? (
            <ListingForm 
              selectedPlatform={selectedPlatform}
              item={item}
              selectedVariant={selectedVariant}
              listingFormData={listingFormData}
              setListingFormData={setListingFormData}
              onBack={() => setIsListingFormOpen(false)}
              onSubmit={handleSubmitListing}
            />
          ) : (
            <>
              <InventoryItemSummary item={item} />
              
              <InventoryDetailTabs 
                item={item} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                handleListItem={handleListItem} 
              />
            </>
          )}
        </div>
        
        <SheetFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
