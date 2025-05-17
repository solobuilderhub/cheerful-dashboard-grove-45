
import React, { useState } from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { FilterValues } from './FilterModal';
import { InventoryDetailDrawer } from './inventory-drawer/InventoryDetailDrawer';
import { InventoryItem } from './inventory-drawer/types';
import { InventoryTableHeader } from './inventory/InventoryTableHeader';
import { InventoryTableRow } from './inventory/InventoryTableRow';
import { InventoryEmptyState } from './inventory/InventoryEmptyState';
import { filterInventoryItems } from '@/utils/inventoryUtils';
import { sampleInventoryItems } from './inventory/InventoryData';

interface InventoryTableProps {
  searchQuery: string;
  filters?: FilterValues | null;
  onViewItem: (item: InventoryItem) => void;
}

export function InventoryTable({ searchQuery, filters, onViewItem }: InventoryTableProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Apply filters using our utility function
  const filteredItems = filterInventoryItems(sampleInventoryItems, searchQuery, filters);

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <InventoryTableHeader />
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <InventoryTableRow 
                  key={item.id} 
                  item={item} 
                  onViewItem={handleViewItem}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <InventoryEmptyState />
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
      
      <InventoryDetailDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        item={selectedItem}
      />
    </>
  );
}
