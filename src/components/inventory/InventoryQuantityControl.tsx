
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryQuantityControlProps {
  initialQuantity: number;
  variantId: string;
  onQuantityChange?: (variantId: string, newQuantity: number) => void;
}

export function InventoryQuantityControl({ initialQuantity, variantId, onQuantityChange }: InventoryQuantityControlProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(initialQuantity.toString());
  const { toast } = useToast();

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(variantId, newQuantity);
    toast({
      title: "Quantity updated",
      description: `Inventory quantity has been set to ${newQuantity}`,
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(variantId, newQuantity);
      toast({
        title: "Quantity updated",
        description: `Inventory quantity has been set to ${newQuantity}`,
      });
    }
  };

  const handleManualEdit = () => {
    setIsEditing(true);
    setTempQuantity(quantity.toString());
  };

  const handleSaveEdit = () => {
    const newQuantity = Math.max(1, parseInt(tempQuantity, 10) || 1);
    setQuantity(newQuantity);
    setIsEditing(false);
    if (onQuantityChange) onQuantityChange(variantId, newQuantity);
    toast({
      title: "Quantity updated",
      description: `Inventory quantity has been set to ${newQuantity}`,
    });
  };

  return (
    <div className="flex items-center">
      <div className="text-xs text-muted-foreground mr-1">Qty:</div>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={tempQuantity}
            onChange={(e) => setTempQuantity(e.target.value)}
            className="w-16 h-7 text-center text-sm"
            min="1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              }
            }}
          />
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 w-7 p-0 bg-green-50 hover:bg-green-100 border-green-200"
            onClick={handleSaveEdit}
          >
            <Check size={14} className="text-green-600" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-secondary/5 rounded-md border p-0.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 rounded-md hover:bg-secondary/20"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus size={12} />
          </Button>
          <div 
            className="w-6 text-center cursor-pointer hover:bg-secondary/10 transition-colors py-0.5 rounded text-sm font-medium" 
            onClick={handleManualEdit}
          >
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 rounded-md hover:bg-secondary/20"
            onClick={handleIncrement}
          >
            <Plus size={12} />
          </Button>
        </div>
      )}
    </div>
  );
}
