// ItineraryTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { itineraries } from "./data";

export default function ItineraryTable() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Luxury Add-ons</h2>
      <div className="border rounded-lg shadow-md overflow-hidden">
        <div className="max-h-72 overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 shadow-md">
              <TableRow>
                <TableHead className="text-left">Service Name</TableHead>
                <TableHead className="text-right">Price (€)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itineraries.map((itinerary) => (
                <TableRow key={itinerary.id} className="">
                  <TableCell className="text-left">{itinerary.name}</TableCell>
                  <TableCell className="text-right">€{itinerary.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
