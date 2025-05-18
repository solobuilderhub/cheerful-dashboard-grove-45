
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface InventoryItemSummaryProps {
  item: {
    name: string;
    styleId: string;
    image: string;
    brand?: string;
    cost: string;
    warehouseLocation: string;
    dateAdded: string;
    quantity: number;
    productAttributes?: {
      category?: string;
      gender?: string;
      colorway?: string;
      releaseDate?: string;
      season?: string;
    };
    stockx?: {
      sku?: string;
      productId?: string;
    };
    goat?: {
      sku?: string;
      catalogId?: string;
    };
  };
}

export function InventoryItemSummary({ item }: InventoryItemSummaryProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-6">
      <div className="flex-shrink-0">
        <Avatar className="h-32 w-32 rounded-md">
          <AvatarImage src={item.image} alt={item.name} />
          <AvatarFallback className="bg-secondary text-xl">
            {item.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
        <p className="text-muted-foreground mb-2">Style ID: {item.styleId}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {item.brand && (
            <Badge variant="outline" className="bg-primary/10">
              {item.brand}
            </Badge>
          )}
          {item.productAttributes?.category && (
            <Badge variant="outline" className="bg-secondary/20">
              {item.productAttributes.category}
            </Badge>
          )}
          {item.productAttributes?.gender && (
            <Badge variant="outline">
              {item.productAttributes.gender}
            </Badge>
          )}
        </div>

        {/* Product information moved above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {item.productAttributes?.colorway && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Colorway</span>
              <span className="font-medium">{item.productAttributes.colorway}</span>
            </div>
          )}
          
          {item.productAttributes?.releaseDate && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Release Date</span>
              <span className="font-medium">{new Date(item.productAttributes.releaseDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {item.productAttributes?.season && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Season</span>
              <span className="font-medium">{item.productAttributes.season}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Quantity</p>
            <p className="font-medium">{item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
