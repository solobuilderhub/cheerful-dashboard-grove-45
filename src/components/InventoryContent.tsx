
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Upload, Plus, Package } from 'lucide-react';
import { InventoryTable } from './InventoryTable';
import { MasterInventoryUpload } from './MasterInventoryUpload';
import { FilterModal, FilterValues } from './FilterModal';

export function InventoryContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);

  const handleApplyFilters = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        
        <MasterInventoryUpload />
        
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Inventory Items</h2>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter size={16} />
                Filter
              </Button>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by name or style ID" 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="gap-1.5">
                <Plus size={16} />
                Add Item
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package size={16} />
              <span>Click on the view icon to see detailed item information and marketplace listings</span>
            </div>
            
            <InventoryTable searchQuery={searchQuery} filters={appliedFilters} />
          </div>
        </div>
      </div>

      <FilterModal 
        open={isFilterOpen} 
        onOpenChange={setIsFilterOpen} 
        onApplyFilters={handleApplyFilters} 
      />
    </main>
  );
}
