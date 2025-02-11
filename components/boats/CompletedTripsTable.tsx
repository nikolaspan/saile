import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { trips, getTripStatus } from "./data";

export default function TripsTable() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Trips</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Charter Type</TableHead>
            <TableHead>Itinerary Name</TableHead>
            <TableHead>Revenue (€)</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip) => {
            const { status, color } = getTripStatus(trip.date);
            return (
              <TableRow key={trip.id}>
                <TableCell>{trip.charterType}</TableCell>
                <TableCell>{trip.itineraryName}</TableCell>
                <TableCell>€{trip.revenue.toFixed(2)}</TableCell>
                <TableCell>{format(new Date(trip.date), "yyyy-MM-dd")}</TableCell>
                <TableCell>
                  <Badge className={`bg-${color}-500 text-white`}>{status}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
