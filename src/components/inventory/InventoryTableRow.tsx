
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { InventoryItem } from '../inventory-drawer/types';
import { Badge } from "@/components/ui/badge";

interface InventoryTableRowProps {
  item: InventoryItem;
  onViewItem: (item: InventoryItem) => void;
}

export function InventoryTableRow({ item, onViewItem }: InventoryTableRowProps) {
  // Calculate the status based on quantity
  const getStatus = (qty: number) => {
    if (qty <= 0) return { label: "Out of Stock", class: "bg-destructive/10 text-destructive" };
    if (qty < 5) return { label: "Low Stock", class: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500" };
    return { label: "In Stock", class: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500" };
  };
  
  const status = getStatus(item.quantity);
  
  // For market price we'll use a placeholder for now
  const marketPrice = item.cost ? `$${(parseFloat(item.cost) * 1.2).toFixed(2)}` : "N/A";

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
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{item.brand || "Unknown"}</p>
        </div>
      </TableCell>
      <TableCell>{item.size}</TableCell>
      <TableCell>{item.styleId}</TableCell>
      <TableCell>
        <Badge variant="secondary" className={status.class}>
          {status.label}
        </Badge>
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{marketPrice}</TableCell>
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
