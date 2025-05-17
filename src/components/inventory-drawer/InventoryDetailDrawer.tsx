
import React, { useState } from 'react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InventoryItemSummary } from '../inventory/InventoryItemSummary';
import { InventoryDetailTabs } from '../inventory/InventoryDetailTabs';
import { ListingForm } from '../inventory/ListingForm';
import { InventoryItem, Variant } from '../inventory-drawer/types';

interface InventoryDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}

export function InventoryDetailDrawer({ open, onOpenChange, item }: InventoryDetailDrawerProps) {
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold">Inventory Details</DrawerTitle>
            <DrawerClose className="p-2 rounded-full hover:bg-secondary">
              <X size={20} />
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="p-6 overflow-y-auto">
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
        
        <DrawerFooter className="border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
