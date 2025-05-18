
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { InventoryItem } from '../inventory-drawer/types';

interface InventoryTableRowProps {
  item: InventoryItem;
  onViewItem: (item: InventoryItem) => void;
}

export function InventoryTableRow({ item, onViewItem }: InventoryTableRowProps) {
  const stockxStyleId = item.stockx?.sku || "-";
  const goatStyleId = item.goat?.sku || "-";

  return (
    <TableRow className="border-b hover:bg-secondary/10">
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>
        <Avatar className="h-10 w-10 rounded">
          <AvatarImage src={item.image} alt={item.name} />
          <AvatarFallback className="bg-secondary text-xs">
            {item.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        <p className="font-medium">{item.name}</p>
      </TableCell>
      <TableCell>{item.brand || "Unknown"}</TableCell>
      <TableCell>{stockxStyleId}</TableCell>
      <TableCell>{goatStyleId}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary"
            onClick={() => onViewItem(item)}
          >
            <Eye size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
