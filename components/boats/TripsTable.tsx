import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isWithinInterval } from "date-fns";
import { trips, getTripStatus } from "./data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TripsTable() {
  // Use "All" as the default value for dropdowns
  const [charterFilter, setCharterFilter] = useState<string>("All");
  const [itineraryFilter, setItineraryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filtering logic:
  const filteredTrips = trips.filter((trip) => {
    const { status } = getTripStatus(trip.date);

    const charterMatches =
      charterFilter === "All" || trip.charterType === charterFilter;
    const itineraryMatches =
      itineraryFilter === "" ||
      trip.itineraryName.toLowerCase().includes(itineraryFilter.toLowerCase());
    const statusMatches = statusFilter === "All" || status === statusFilter;

    // Date filtering logic:
    const tripDate = parseISO(trip.date);
    let dateMatches = true;
    if (startDate && endDate) {
      // If both dates are provided, check if trip.date is within the interval
      dateMatches = isWithinInterval(tripDate, {
        start: parseISO(startDate),
        end: parseISO(endDate),
      });
    } else if (startDate) {
      // If only startDate is provided, filter trips that occur exactly on startDate
      dateMatches = format(tripDate, "yyyy-MM-dd") === startDate;
    } else if (endDate) {
      // If only endDate is provided, filter trips that occur exactly on endDate
      dateMatches = format(tripDate, "yyyy-MM-dd") === endDate;
    }

    return charterMatches && itineraryMatches && statusMatches && dateMatches;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Trips</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Charter Type Filter */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Charter Type</span>
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
          <span className="mb-1 text-sm font-medium">Itinerary Name</span>
          <Input
            placeholder="Search Itinerary Name"
            className="w-64"
            value={itineraryFilter}
            onChange={(e) => setItineraryFilter(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Status</span>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Start Date</span>
          <Input
            type="date"
            className="w-48"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">End Date</span>
          <Input
            type="date"
            className="w-48"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Reset Filters Button */}
        <Button
          variant="outline"
          onClick={() => {
            setCharterFilter("All");
            setItineraryFilter("");
            setStatusFilter("All");
            setStartDate("");
            setEndDate("");
          }}
        >
          Reset Filters
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            {/* Sticky Table Header */}
            <TableHeader className="sticky top-0 z-10 shadow-md">
              <TableRow>
                <TableHead className="text-left">Charter Type</TableHead>
                <TableHead className="text-left">Itinerary Name</TableHead>
                <TableHead className="text-left">Date</TableHead>
                <TableHead className="text-left">Status</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => {
                  const { status, color } = getTripStatus(trip.date);
                  const statusColors = {
                    green: "bg-green-500",
                    blue: "bg-[#26BDD8]", // Custom Aqua Blue (#26BDD8)
                    yellow: "bg-yellow-500",
                  };

                  return (
                    <TableRow key={trip.id}>
                      <TableCell className="text-left">
                        {trip.charterType}
                      </TableCell>
                      <TableCell className="text-left">
                        {trip.itineraryName}
                      </TableCell>
                      <TableCell className="text-left">
                        {format(parseISO(trip.date), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge
                          className={`${statusColors[color]} text-white px-3 py-1 rounded-full`}
                        >
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
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
