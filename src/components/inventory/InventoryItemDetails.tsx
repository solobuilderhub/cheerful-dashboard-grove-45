
import React from 'react';

interface InventoryItemDetailsProps {
  item: {
    productAttributes?: {
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

export function InventoryItemDetails({ item }: InventoryItemDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="font-semibold">Product Information</h3>
        <div className="grid grid-cols-1 gap-2">
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
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold">Marketplace Information</h3>
        <div className="grid grid-cols-1 gap-2">
          {item.stockx?.sku && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">StockX SKU</span>
              <span className="font-medium">{item.stockx.sku}</span>
            </div>
          )}
          
          {item.stockx?.productId && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">StockX Product ID</span>
              <span className="font-medium">{item.stockx.productId}</span>
            </div>
          )}
          
          {item.goat?.sku && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">GOAT SKU</span>
              <span className="font-medium">{item.goat.sku}</span>
            </div>
          )}
          
          {item.goat?.catalogId && (
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm text-muted-foreground">GOAT Catalog ID</span>
              <span className="font-medium">{item.goat.catalogId}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
