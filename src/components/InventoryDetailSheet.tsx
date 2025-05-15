import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Package, ListOrdered, Eye, Warehouse, Check, ChevronDown, ChevronUp, Edit, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InventoryItemListings } from './InventoryItemListings';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface InventoryDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}

export function InventoryDetailSheet({ open, onOpenChange, item }: InventoryDetailSheetProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedPlatform, setSelectedPlatform] = useState<'stockx' | 'goat' | null>(null);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [selectedVariantForListing, setSelectedVariantForListing] = useState<string | null>(null);
  
  // Mock listing form state
  const [listingFormData, setListingFormData] = useState({
    price: '',
    condition: 'CONDITION_NEW',
    packagingCondition: 'PACKAGING_CONDITION_GOOD_CONDITION',
    activate: true
  });

  if (!item) return null;
  
  const handleListItem = (platform: 'stockx' | 'goat', variantId?: string) => {
    setSelectedPlatform(platform);
    setSelectedVariantForListing(variantId || null);
    setIsListingFormOpen(true);
    
    // Reset form data
    setListingFormData({
      price: '',
      condition: 'CONDITION_NEW',
      packagingCondition: 'PACKAGING_CONDITION_GOOD_CONDITION',
      activate: true
    });
  };

  const handleSubmitListing = () => {
    toast({
      title: "Listing submitted",
      description: `Successfully listed on ${selectedPlatform?.toUpperCase()} for $${listingFormData.price}`,
    });
    setIsListingFormOpen(false);
  };
  
  // Format price display
  const formatPrice = (price: string) => {
    if (!price) return '-';
    return price.startsWith('$') ? price : `$${price}`;
  };

  // Get selected variant data
  const getSelectedVariantData = () => {
    if (!selectedVariantForListing || !item.variations) return null;
    return item.variations.find(variant => variant.variantId === selectedVariantForListing);
  };

  const selectedVariant = getSelectedVariantData();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-4xl overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">Inventory Details</SheetTitle>
            <SheetClose className="p-2 rounded-full hover:bg-secondary">
              <X size={20} />
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="py-6 overflow-y-auto">
          {isListingFormOpen ? (
            <div className="space-y-6">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => setIsListingFormOpen(false)}
                >
                  <ChevronUp size={16} className="mr-1" />
                  Back
                </Button>
                <h2 className="text-xl font-semibold">
                  List on {selectedPlatform?.toUpperCase()}
                </h2>
              </div>
              
              <div className="flex items-center gap-4 bg-secondary/10 p-4 rounded-md">
                <Avatar className="h-20 w-20 rounded-md">
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback className="bg-secondary text-xl">
                    {item.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.styleId}</p>
                  {selectedVariant && (
                    <Badge className="mt-2">Size: {selectedVariant.size}</Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="listing-price">Listing Price (USD)</Label>
                    <Input
                      id="listing-price"
                      type="number"
                      placeholder="0.00"
                      value={listingFormData.price}
                      onChange={(e) => setListingFormData({...listingFormData, price: e.target.value})}
                    />
                  </div>
                </div>
                
                {selectedPlatform === 'stockx' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>API Identifier</Label>
                      <div className="p-2 border rounded-md text-sm bg-secondary/5">
                        {item.stockx?.productId || 'Not available'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <div className="p-2 border rounded-md text-sm bg-secondary/5">
                        {item.stockx?.sku || 'Not available'}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedPlatform === 'goat' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={listingFormData.condition}
                        onChange={(e) => setListingFormData({...listingFormData, condition: e.target.value})}
                      >
                        <option value="CONDITION_NEW">New</option>
                        <option value="CONDITION_USED">Used</option>
                        <option value="CONDITION_NEW_WITH_DEFECTS">New with defects</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Packaging Condition</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={listingFormData.packagingCondition}
                        onChange={(e) => setListingFormData({...listingFormData, packagingCondition: e.target.value})}
                      >
                        <option value="PACKAGING_CONDITION_GOOD_CONDITION">Good condition</option>
                        <option value="PACKAGING_CONDITION_MISSING_LID">Missing lid</option>
                        <option value="PACKAGING_CONDITION_BADLY_DAMAGED">Badly damaged</option>
                        <option value="PACKAGING_CONDITION_NO_ORIGINAL_BOX">No original box</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="activate-listing"
                      checked={listingFormData.activate}
                      onChange={(e) => setListingFormData({...listingFormData, activate: e.target.checked})}
                    />
                    <Label htmlFor="activate-listing">Activate immediately</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    If unchecked, listing will be saved in a pending state.
                  </p>
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsListingFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitListing}
                    disabled={!listingFormData.price}
                  >
                    Submit Listing
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
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
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                  <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                  <TabsTrigger value="listings" className="flex items-center gap-2">
                    <List size={14} />
                    Listings
                  </TabsTrigger>
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
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                
                <TabsContent value="marketplace" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Package className="h-5 w-5 mr-2" />
                            StockX
                          </CardTitle>
                          <Badge variant={item.stockx?.sku ? "default" : "outline"}>
                            {item.stockx?.sku ? "Connected" : "Not Connected"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">SKU:</span>
                              <p className="font-medium">{item.stockx?.sku || "Not available"}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Product ID:</span>
                              <p className="font-medium truncate" title={item.stockx?.productId}>
                                {item.stockx?.productId ? item.stockx.productId.substring(0, 12) + "..." : "Not available"}
                              </p>
                            </div>
                          </div>
                          
                          {item.stockx?.sku && (
                            <Collapsible className="border p-3 rounded-md mt-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">StockX API Reference</h4>
                                <CollapsibleTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </CollapsibleTrigger>
                              </div>
                              <CollapsibleContent className="pt-2">
                                <div className="bg-secondary/10 p-3 rounded-md text-xs font-mono overflow-x-auto">
                                  <pre>
                                    GET /v2/catalog/{item.stockx?.productId}<br />
                                    Authorization: Bearer YOUR_API_KEY
                                  </pre>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          )}
                          
                          <div className="pt-2">
                            <p className="text-sm mb-3">
                              {item.stockx?.sku 
                                ? "This product is connected to StockX. You can list variants directly."
                                : "Connect this product to StockX to enable direct listing."
                              }
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => handleListItem('stockx')}
                          className="w-full gap-1.5"
                          disabled={!item.stockx?.sku}
                          variant={item.stockx?.sku ? "default" : "outline"}
                        >
                          {item.stockx?.sku ? (
                            <>
                              <Package size={16} />
                              List on StockX
                            </>
                          ) : (
                            <>
                              <Edit size={16} />
                              Connect to StockX
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <ListOrdered className="h-5 w-5 mr-2" />
                            GOAT
                          </CardTitle>
                          <Badge variant={item.goat?.sku ? "default" : "outline"}>
                            {item.goat?.sku ? "Connected" : "Not Connected"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">SKU:</span>
                              <p className="font-medium">{item.goat?.sku || "Not available"}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Size Unit:</span>
                              <p className="font-medium">{item.goat?.size_unit?.replace('SIZE_UNIT_', '') || "Not available"}</p>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-muted-foreground text-sm">Catalog ID:</span>
                            <p className="font-medium text-sm overflow-hidden text-ellipsis">{item.goat?.catalogId || "Not available"}</p>
                          </div>
                          
                          {item.goat?.sku && (
                            <Collapsible className="border p-3 rounded-md mt-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">GOAT API Reference</h4>
                                <CollapsibleTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </CollapsibleTrigger>
                              </div>
                              <CollapsibleContent className="pt-2">
                                <div className="bg-secondary/10 p-3 rounded-md text-xs font-mono overflow-x-auto">
                                  <pre>
                                    POST /api/v1/listings<br/>
                                    catalogId: {item.goat?.catalogId}<br/>
                                    priceCents: PRICE<br/>
                                    condition: CONDITION_NEW<br/>
                                    size: {item.size}<br/>
                                    sizeUnit: {item.goat?.size_unit}
                                  </pre>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          )}
                          
                          <div className="pt-2">
                            <p className="text-sm mb-3">
                              {item.goat?.sku 
                                ? "This product is connected to GOAT. You can list variants directly."
                                : "Connect this product to GOAT to enable direct listing."
                              }
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => handleListItem('goat')}
                          className="w-full gap-1.5"
                          disabled={!item.goat?.sku}
                          variant={item.goat?.sku ? "default" : "outline"}
                        >
                          {item.goat?.sku ? (
                            <>
                              <ListOrdered size={16} />
                              List on GOAT
                            </>
                          ) : (
                            <>
                              <Edit size={16} />
                              Connect to GOAT
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  {/* Quick Listing History Section */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Recent Listing Activity</h3>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-secondary/10 px-4 py-3 flex font-medium text-sm">
                        <div className="w-24">Date</div>
                        <div className="w-16">Platform</div>
                        <div className="flex-1">Size</div>
                        <div className="w-20">Price</div>
                        <div className="w-24">Status</div>
                      </div>
                      
                      {/* Sample recent activity - this would come from API in real implementation */}
                      <div className="divide-y">
                        <div className="px-4 py-3 flex items-center text-sm">
                          <div className="w-24 text-muted-foreground">5/14/2025</div>
                          <div className="w-16">StockX</div>
                          <div className="flex-1">US 9.5</div>
                          <div className="w-20 font-medium">$175.00</div>
                          <div className="w-24">
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                              Active
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 flex items-center text-sm">
                          <div className="w-24 text-muted-foreground">5/12/2025</div>
                          <div className="w-16">GOAT</div>
                          <div className="flex-1">US 10</div>
                          <div className="w-20 font-medium">$185.00</div>
                          <div className="w-24">
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-200">
                              Pending
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 flex items-center text-sm">
                          <div className="w-24 text-muted-foreground">5/10/2025</div>
                          <div className="w-16">StockX</div>
                          <div className="flex-1">US 8</div>
                          <div className="w-20 font-medium">$165.00</div>
                          <div className="w-24">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
                              Sold
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="listings" className="space-y-6">
                  <InventoryItemListings 
                    styleId={item.styleId} 
                    name={item.name}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
        
        <SheetFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
