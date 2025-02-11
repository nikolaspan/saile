import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { priceList } from "./data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown } from "lucide-react";

// Define `PriceItem` type without `date`
type PriceItem = {
  id: number;
  charterType: string;
  itineraryName: string;
  rentalPrice: number;
  commission: number;
  fuelCost: number;
  finalPrice: number;
};

export default function PriceListTable() {
  // Default filter is now "All"
  const [charterFilter, setCharterFilter] = useState<string>("All");
  const [itineraryFilter, setItineraryFilter] = useState("");
  // Sorting state for finalPrice: ascending or descending
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter price list by charter type and itinerary name (case-insensitive)
  const filteredPriceList = priceList.filter((price: PriceItem) => {
    const charterMatches =
      charterFilter === "All" || price.charterType === charterFilter;
    const itineraryMatches =
      !itineraryFilter ||
      price.itineraryName.toLowerCase().includes(itineraryFilter.toLowerCase());
    return charterMatches && itineraryMatches;
  });

  // Sort the filtered list by finalPrice
  const sortedPriceList = [...filteredPriceList].sort((a, b) => {
    return sortOrder === "asc"
      ? a.finalPrice - b.finalPrice
      : b.finalPrice - a.finalPrice;
  });

  // Toggle sort order when clicking the header
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Price List</h2>

      {/* Filters (without extra background styling) */}
      <div className="p-4 mb-4 flex flex-wrap gap-4 items-end">
        {/* Charter Type Filter */}
        <div className="flex flex-col">
          <Label className="mb-1">Charter Type</Label>
          <Select
            value={charterFilter}
            onValueChange={(value) => setCharterFilter(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Charter Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Half Day">Half Day</SelectItem>
              <SelectItem value="Full Day">Full Day</SelectItem>
              <SelectItem value="VIP Transfer">VIP Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Itinerary Name Search */}
        <div className="flex flex-col">
          <Label className="mb-1">Itinerary Name</Label>
          <Input
            placeholder="Search Itinerary Name"
            className="w-64"
            value={itineraryFilter}
            onChange={(e) => setItineraryFilter(e.target.value)}
          />
        </div>

        {/* Reset Filters Button */}
        <div className="flex flex-col">
          {/* Invisible label for vertical alignment */}
          <Label className="invisible mb-1">Reset</Label>
          <Button
            variant="outline"
            onClick={() => {
              setCharterFilter("All");
              setItineraryFilter("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        {/* Increased container height for a bigger table */}
        <div className="relative max-h-96 overflow-y-auto">
          <Table>
            {/* Sticky header without background styling */}
            <TableHeader className="sticky top-0 z-10">
              <TableRow>
                <TableHead className="text-left">Charter Type</TableHead>
                <TableHead className="text-left">Itinerary Name</TableHead>
                <TableHead className="text-right">Rental Price (€)</TableHead>
                <TableHead className="text-right">Commission (€)</TableHead>
                <TableHead className="text-right">Fuel Cost (€)</TableHead>
                {/* Make "Final Price (€)" header clickable for sorting */}
                <TableHead
                  className="text-right cursor-pointer select-none"
                  onClick={toggleSortOrder}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Final Price (€)</span>
                    {sortOrder === "asc" ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPriceList.length > 0 ? (
                sortedPriceList.map((price: PriceItem) => (
                  <TableRow key={price.id}>
                    <TableCell className="text-left">
                      {price.charterType}
                    </TableCell>
                    <TableCell className="text-left">
                      {price.itineraryName}
                    </TableCell>
                    <TableCell className="text-right">
                      €{price.rentalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      €{price.commission.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      €{price.fuelCost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      €{price.finalPrice.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
