
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeAgo, formatPrice, getStatusClass } from './listing-utils';

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
  filterBySize?: string;
  isLoading?: boolean; // Add isLoading prop
}

export function GoatListings({ 
  listings, 
  lastUpdated, 
  filterBySize,
  isLoading = false 
}: GoatListingsProps) {
  // Filter listings by size if provided
  const filteredListings = filterBySize 
    ? listings.filter(listing => String(listing.size) === filterBySize) 
    : listings;
  
  // Get a status badge component based on status string
  const getStatusBadge = (status: string) => {
    return <Badge variant="outline" className={getStatusClass(status)}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">GOAT Listings</CardTitle>
          <CardDescription>Loading listings...</CardDescription>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 bg-secondary/30 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-secondary/30 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              <TableHead>Status</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.size} {listing.size_unit}</TableCell>
                <TableCell className="font-medium">{formatPrice(listing.price_cents, true)}</TableCell>
                <TableCell>{getStatusBadge(listing.status)}</TableCell>
                <TableCell>{formatTimeAgo(listing.created_at)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-secondary/10">
                    {listing.condition.replace('CONDITION_', '')}
                  </Badge>
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
