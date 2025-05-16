
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ExternalLink } from 'lucide-react';
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
  defects: string[];
  additional_defects: string;
}

interface GoatListingsProps {
  listings: GoatListing[];
  lastUpdated: string;
}

export function GoatListings({ listings, lastUpdated }: GoatListingsProps) {
  // Get a status badge component based on status string
  const getStatusBadge = (status: string) => {
    return <Badge variant="outline" className={getStatusClass(status)}>{status.replace('LISTING_STATUS_', '')}</Badge>;
  };

  // Format condition text
  const formatCondition = (condition: string) => {
    if (condition === 'CONDITION_NEW') return 'New';
    if (condition === 'CONDITION_USED') return 'Used';
    if (condition === 'CONDITION_NEW_WITH_DEFECTS') return 'New w/ Defects';
    return condition;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">GOAT Listings</CardTitle>
        <CardDescription>
          Showing {listings.length} active listings on GOAT
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">
                  {listing.size} {listing.size_unit.replace('SIZE_UNIT_', '')}
                </TableCell>
                <TableCell className="font-medium">{formatPrice(listing.price_cents)}</TableCell>
                <TableCell>{getStatusBadge(listing.status)}</TableCell>
                <TableCell>{formatCondition(listing.condition)}</TableCell>
                <TableCell>{formatTimeAgo(listing.created_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
