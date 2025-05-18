
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function InventoryTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-secondary/20">
        <TableHead className="w-[40px]">
          <Checkbox />
        </TableHead>
        <TableHead className="w-[60px]"></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Size</TableHead>
        <TableHead>SKU</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Qty</TableHead>
        <TableHead>Market Price</TableHead>
        <TableHead className="w-[80px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
