
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from 'lucide-react';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: FilterValues) => void;
}

export interface FilterValues {
  spreadValue: number;
  spreadType: 'greater' | 'less';
  daysListedValue: number;
  daysListedType: 'greater' | 'less';
  lowestAsk: 'lowestAsk' | 'notLowestAsk' | null;
  showOnlyExpired: boolean;
}

export function FilterModal({ open, onOpenChange, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterValues>({
    spreadValue: 0,
    spreadType: 'greater',
    daysListedValue: 0,
    daysListedType: 'greater',
    lowestAsk: null,
    showOnlyExpired: false,
  });

  const handleReset = () => {
    setFilters({
      spreadValue: 0,
      spreadType: 'greater',
      daysListedValue: 0,
      daysListedType: 'greater',
      lowestAsk: null,
      showOnlyExpired: false,
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-[#121212] border-none text-white p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <SheetHeader className="text-left p-0">
              <SheetTitle className="text-white text-xl">Filters</SheetTitle>
            </SheetHeader>
            <SheetClose className="rounded-full p-2 hover:bg-gray-800">
              <X className="h-5 w-5" />
            </SheetClose>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            {/* Spread Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Spread ($)</h3>
                <span className="text-gray-400 text-sm">(for extended groups only)</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="outline"
                  className={`px-4 ${filters.spreadType === 'greater' ? 'bg-secondary' : 'bg-background'}`}
                  onClick={() => setFilters({ ...filters, spreadType: 'greater' })}
                >
                  Greater
                </Button>
                <Input
                  type="number"
                  value={filters.spreadValue}
                  onChange={(e) => setFilters({ ...filters, spreadValue: parseInt(e.target.value) || 0 })}
                  className="w-24 bg-background"
                />
              </div>
              <Slider
                value={[filters.spreadValue]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setFilters({ ...filters, spreadValue: value[0] })}
              />
            </div>

            {/* Days Listed Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Days Listed</h3>
                <span className="text-gray-400 text-sm">(for extended groups only)</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="outline"
                  className={`px-4 ${filters.daysListedType === 'greater' ? 'bg-secondary' : 'bg-background'}`}
                  onClick={() => setFilters({ ...filters, daysListedType: 'greater' })}
                >
                  Greater
                </Button>
                <Input
                  type="number"
                  value={filters.daysListedValue}
                  onChange={(e) => setFilters({ ...filters, daysListedValue: parseInt(e.target.value) || 0 })}
                  className="w-24 bg-background"
                />
              </div>
              <Slider
                value={[filters.daysListedValue]}
                min={0}
                max={30}
                step={1}
                onValueChange={(value) => setFilters({ ...filters, daysListedValue: value[0] })}
              />
            </div>

            {/* Lowest Ask Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Lowest Ask</h3>
                <span className="text-gray-400 text-sm">(for extended groups only)</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className={`px-4 ${filters.lowestAsk === 'lowestAsk' ? 'bg-secondary' : 'bg-background'}`}
                  onClick={() => setFilters({ ...filters, lowestAsk: 'lowestAsk' })}
                >
                  Lowest Ask
                </Button>
                <Button
                  variant="outline"
                  className={`px-4 ${filters.lowestAsk === 'notLowestAsk' ? 'bg-secondary' : 'bg-background'}`}
                  onClick={() => setFilters({ ...filters, lowestAsk: 'notLowestAsk' })}
                >
                  Not Lowest Ask
                </Button>
              </div>
            </div>

            {/* Expired Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Expired</h3>
                <span className="text-gray-400 text-sm">(for extended groups only)</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="expired"
                  checked={filters.showOnlyExpired}
                  onCheckedChange={(checked) => 
                    setFilters({ ...filters, showOnlyExpired: checked === true })
                  }
                />
                <label htmlFor="expired" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Show only expired Listings
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <Button variant="outline" className="rounded-full" onClick={handleReset}>
              Reset
            </Button>
            <Button className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleApplyFilters}>
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
