
import React from 'react';
import { Package } from 'lucide-react';

export function InventoryEmptyState() {
  return (
    <div className="py-10 flex flex-col items-center justify-center text-muted-foreground">
      <Package size={48} className="mb-4 opacity-50" />
      <h3 className="text-lg font-medium mb-1">No inventory items found</h3>
      <p className="text-sm">Try adjusting your filters or search query, or add new items to your inventory</p>
    </div>
  );
}
