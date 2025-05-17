
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ExternalLink, Eye } from 'lucide-react';
import { formatTimeAgo, formatPrice, getStatusClass } from './listing-utils';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ListingOrderDetail } from './ListingOrderDetail';

// GOAT listing interface
export interface GoatListing {
  id: string;
  catalog_id: string;
  condition: string;
  packaging_condition: string;
  size: number;
  size_unit: string;
  sku: string;
  consigned: boolean;
  created_at: string;
  updated_at: string;
  status: string;
  price_cents: string;
  activated_at: string;
  defects: any[];
  additional_defects: string;
}

interface GoatListingsProps {
  listings: GoatListing[];
  lastUpdated: string;
  filterBySize?: string; // Added this prop to match what's being passed in VariantListingsDialog
}

export function GoatListings({ listings, lastUpdated, filterBySize }: GoatListingsProps) {
  const [selectedListing, setSelectedListing] = useState<GoatListing | null>(null);
  
  // Filter listings by size if provided
  const filteredListings = filterBySize 
    ? listings.filter(listing => listing.size.toString() === filterBySize) 
    : listings;
  
  // Get a status badge component based on status string
  const getStatusBadge = (status: string) => {
    return <Badge variant="outline" className={getStatusClass(status)}>{status}</Badge>;
  };

  // Convert GOAT listing to order format for detail view
  const getOrderFromListing = (listing: GoatListing) => {
    // In a real app, you might fetch the actual order details from an API
    return {
      ...listing
    };
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">GOAT Listings</CardTitle>
        <CardDescription>
          Showing {filteredListings.length} active listings on GOAT
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">US {listing.size}</TableCell>
                <TableCell className="font-medium">{formatPrice(listing.price_cents)}</TableCell>
                <TableCell>{listing.condition.replace('CONDITION_', '')}</TableCell>
                <TableCell>{getStatusBadge(listing.status)}</TableCell>
                <TableCell>{formatTimeAgo(listing.created_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => setSelectedListing(listing)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-3xl">
                        {selectedListing && (
                          <ListingOrderDetail
                            order={getOrderFromListing(selectedListing)}
                            platform="goat"
                            onClose={() => setSelectedListing(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <DollarSign className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2">
        <div className="text-xs text-muted-foreground w-full text-center">
          Last updated {formatTimeAgo(lastUpdated)}
        </div>
      </CardFooter>
    </Card>
  );
}
