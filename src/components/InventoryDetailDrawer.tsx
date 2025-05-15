
import React, { useState } from 'react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Package, ListOrdered, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SizeChart {
  defaultConversion: {
    size: string;
    type: string;
  };
  availableConversions: Array<{
    size: string;
    type: string;
  }>;
}

interface Variant {
  _id: string;
  variantId: string;
  variantName: string;
  variantValue: string;
  size: string;
  sizeChart?: SizeChart;
  quantity?: number;
}

interface ProductAttributes {
  color: string | null;
  gender: string | null;
  releaseDate: string | null;
  retailPrice: number | null;
  season: string | null;
  colorway: string | null;
  category: string | null;
  _id: string;
}

interface InventoryItem {
  id: string;
  image: string;
  name: string;
  styleId: string;
  size: string;
  quantity: number;
  dateAdded: string;
  warehouseLocation: string;
  cost: string;
  daysListed?: number;
  spread?: number;
  isLowestAsk?: boolean;
  isExpired?: boolean;
  stockx?: {
    sku: string;
    productId?: string;
  };
  goat?: {
    sku: string;
    size_unit?: string;
    catalogId?: string;
    name?: string;
  };
  _id?: string;
  brand?: string;
  productAttributes?: ProductAttributes;
  variations?: Variant[];
}

interface InventoryDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}

export function InventoryDetailDrawer({ open, onOpenChange, item }: InventoryDetailDrawerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedPlatform, setSelectedPlatform] = useState<'stockx' | 'goat' | null>(null);

  if (!item) return null;
  
  const handleListItem = (platform: 'stockx' | 'goat', variantId?: string) => {
    setSelectedPlatform(platform);
    toast({
      title: "Listing initiated",
      description: `Starting ${platform.toUpperCase()} listing process for ${variantId ? `variant ${variantId}` : item.name}`,
    });
    // Here you would implement the actual API call to list the item on the selected platform
  };
  
  // Format price display
  const formatPrice = (price: string) => {
    if (!price) return '-';
    return price.startsWith('$') ? price : `$${price}`;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold">Inventory Details</DrawerTitle>
            <DrawerClose className="p-2 rounded-full hover:bg-secondary">
              <X size={20} />
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32 rounded-md">
                <AvatarImage src={item.image} alt={item.name} />
                <AvatarFallback className="bg-secondary text-xl">
                  {item.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
              <p className="text-muted-foreground mb-2">Style ID: {item.styleId}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {item.brand && (
                  <Badge variant="outline" className="bg-primary/10">
                    {item.brand}
                  </Badge>
                )}
                {item.productAttributes?.category && (
                  <Badge variant="outline" className="bg-secondary/20">
                    {item.productAttributes.category}
                  </Badge>
                )}
                {item.productAttributes?.gender && (
                  <Badge variant="outline">
                    {item.productAttributes.gender}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Retail Price</p>
                  <p className="font-medium">{formatPrice(item.cost)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Warehouse Location</p>
                  <p className="font-medium">{item.warehouseLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Added</p>
                  <p className="font-medium">{item.dateAdded}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Quantity</p>
                  <p className="font-medium">{item.quantity}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="variants" className="space-y-4">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Available Variants</h3>
                <p className="text-sm text-muted-foreground">
                  {(item.variations?.length || 0)} size variants available
                </p>
              </div>
              
              {item.variations && item.variations.length > 0 ? (
                <div className="space-y-2">
                  {item.variations.map((variant) => (
                    <Accordion 
                      type="single" 
                      collapsible 
                      className="border rounded-md" 
                      key={variant.variantId}
                    >
                      <AccordionItem value={variant.variantId}>
                        <AccordionTrigger className="px-4 py-3 hover:bg-secondary/5">
                          <div className="flex items-center justify-between w-full px-2">
                            <div>
                              <span className="font-medium mr-2">Size: {variant.size}</span>
                              <Badge variant="outline" className="ml-2">
                                Qty: {variant.quantity || 1}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="gap-1.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleListItem('stockx', variant.variantId);
                                }}
                              >
                                <Package size={14} />
                                StockX
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="gap-1.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleListItem('goat', variant.variantId);
                                }}
                              >
                                <ListOrdered size={14} />
                                GOAT
                              </Button>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          {variant.sizeChart && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">Size Conversions</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {variant.sizeChart.availableConversions.map((conversion, idx) => (
                                  <div key={idx} className="border rounded-md p-2 text-sm">
                                    <span className="text-muted-foreground">{conversion.type.toUpperCase()}: </span>
                                    <span className="font-medium">{conversion.size}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border rounded-md">
                  <p className="text-muted-foreground">No variant information available</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="marketplace" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">StockX</h3>
                    <Badge variant={item.stockx?.sku ? "default" : "outline"}>
                      {item.stockx?.sku ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <p className="text-sm">
                      {item.stockx?.sku 
                        ? "This product is connected to StockX. You can list variants directly."
                        : "Connect this product to StockX to enable direct listing."
                      }
                    </p>
                    
                    <Button 
                      onClick={() => handleListItem('stockx')} 
                      className="w-full gap-1.5"
                      disabled={!item.stockx?.sku}
                    >
                      <Package size={16} />
                      List on StockX
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">GOAT</h3>
                    <Badge variant={item.goat?.sku ? "default" : "outline"}>
                      {item.goat?.sku ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <p className="text-sm">
                      {item.goat?.sku 
                        ? "This product is connected to GOAT. You can list variants directly."
                        : "Connect this product to GOAT to enable direct listing."
                      }
                    </p>
                    
                    <Button 
                      onClick={() => handleListItem('goat')} 
                      className="w-full gap-1.5"
                      disabled={!item.goat?.sku}
                    >
                      <ListOrdered size={16} />
                      List on GOAT
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DrawerFooter className="border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
