
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronUp } from 'lucide-react';

interface ListingFormProps {
  selectedPlatform: 'stockx' | 'goat' | null;
  item: {
    name: string;
    styleId: string;
    image: string;
    stockx?: {
      productId?: string;
      sku?: string;
    };
    goat?: {
      sku?: string;
      size_unit?: string;
    };
  };
  selectedVariant: any;
  listingFormData: {
    price: string;
    condition: string;
    packagingCondition: string;
    activate: boolean;
  };
  setListingFormData: React.Dispatch<React.SetStateAction<{
    price: string;
    condition: string;
    packagingCondition: string;
    activate: boolean;
  }>>;
  onBack: () => void;
  onSubmit: () => void;
}

export function ListingForm({
  selectedPlatform,
  item,
  selectedVariant,
  listingFormData,
  setListingFormData,
  onBack,
  onSubmit
}: ListingFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={onBack}
        >
          <ChevronUp size={16} className="mr-1" />
          Back
        </Button>
        <h2 className="text-xl font-semibold">
          List on {selectedPlatform?.toUpperCase()}
        </h2>
      </div>
      
      <div className="flex items-center gap-4 bg-secondary/10 p-4 rounded-md">
        <Avatar className="h-20 w-20 rounded-md">
          <AvatarImage src={item.image} alt={item.name} />
          <AvatarFallback className="bg-secondary text-xl">
            {item.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.styleId}</p>
          {selectedVariant && (
            <Badge className="mt-2">Size: {selectedVariant.size}</Badge>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="listing-price">Listing Price (USD)</Label>
            <Input
              id="listing-price"
              type="number"
              placeholder="0.00"
              value={listingFormData.price}
              onChange={(e) => setListingFormData({...listingFormData, price: e.target.value})}
            />
          </div>
        </div>
        
        {selectedPlatform === 'stockx' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>API Identifier</Label>
              <div className="p-2 border rounded-md text-sm bg-secondary/5">
                {item.stockx?.productId || 'Not available'}
              </div>
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <div className="p-2 border rounded-md text-sm bg-secondary/5">
                {item.stockx?.sku || 'Not available'}
              </div>
            </div>
          </div>
        )}
        
        {selectedPlatform === 'goat' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Condition</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={listingFormData.condition}
                onChange={(e) => setListingFormData({...listingFormData, condition: e.target.value})}
              >
                <option value="CONDITION_NEW">New</option>
                <option value="CONDITION_USED">Used</option>
                <option value="CONDITION_NEW_WITH_DEFECTS">New with defects</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Packaging Condition</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={listingFormData.packagingCondition}
                onChange={(e) => setListingFormData({...listingFormData, packagingCondition: e.target.value})}
              >
                <option value="PACKAGING_CONDITION_GOOD_CONDITION">Good condition</option>
                <option value="PACKAGING_CONDITION_MISSING_LID">Missing lid</option>
                <option value="PACKAGING_CONDITION_BADLY_DAMAGED">Badly damaged</option>
                <option value="PACKAGING_CONDITION_NO_ORIGINAL_BOX">No original box</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="activate-listing"
              checked={listingFormData.activate}
              onChange={(e) => setListingFormData({...listingFormData, activate: e.target.checked})}
            />
            <Label htmlFor="activate-listing">Activate immediately</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            If unchecked, listing will be saved in a pending state.
          </p>
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={!listingFormData.price}
          >
            Submit Listing
          </Button>
        </div>
      </div>
    </div>
  );
}
