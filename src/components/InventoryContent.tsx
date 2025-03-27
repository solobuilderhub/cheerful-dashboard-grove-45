
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Upload, Trash2 } from 'lucide-react';
import { InventoryTable } from './InventoryTable';
import { MasterInventoryUpload } from './MasterInventoryUpload';

export function InventoryContent() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        
        <MasterInventoryUpload />
        
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Standard Listings</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter size={16} />
                Filter
              </Button>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search listings by name or style ID" 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <InventoryTable searchQuery={searchQuery} />
        </div>
      </div>
    </main>
  );
}
