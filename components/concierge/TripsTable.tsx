import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; 
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// ✅ Import JSON directly
import tripsData from "./trips.json";

type Trip = {
  tripId: string;
  charterType: string;
  itineraryName: string;
  revenue: number;
  date: string;
  roomId: string;
  passengers: {
    passengerId: string;
    name: string;
    birthId: string;
  }[];
};

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
} | null;

export default function TripsTable() {
  const router = useRouter();

  // Use the imported trips directly (we're not modifying the data, so no need for state setter)
  const trips: Trip[] = tripsData.trips;

  const [charterFilter, setCharterFilter] = useState("All");
  const [itineraryFilter, setItineraryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Set default sorting by date (change to "descending" if needed)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "ascending",
  });

  const getTripStatus = (date: string): { status: string; color: string } => {
    const tripDate = new Date(date);
    const today = new Date();

    if (tripDate < today) return { status: "Completed", color: "green" };
    if (tripDate.toDateString() === today.toDateString())
      return { status: "Ongoing", color: "yellow" };
    return { status: "Pending", color: "blue" };
  };

  // ✅ Apply filters
  const filteredTrips = trips.filter((trip) => {
    const { status } = getTripStatus(trip.date);
    const charterMatches =
      charterFilter === "All" || trip.charterType === charterFilter;
    const itineraryMatches =
      itineraryFilter === "" ||
      trip.itineraryName.toLowerCase().includes(itineraryFilter.toLowerCase());
    const statusMatches = statusFilter === "All" || status === statusFilter;

    const tripDate = parseISO(trip.date);
    let dateMatches = true;
    if (startDate && endDate) {
      dateMatches = isWithinInterval(tripDate, {
        start: parseISO(startDate),
        end: parseISO(endDate),
      });
    } else if (startDate) {
      dateMatches = format(tripDate, "yyyy-MM-dd") === startDate;
    } else if (endDate) {
      dateMatches = format(tripDate, "yyyy-MM-dd") === endDate;
    }

    return charterMatches && itineraryMatches && statusMatches && dateMatches;
  });

  // ✅ Sorting function for filtered trips
  const sortedTrips = useMemo(() => {
    const sortableTrips = [...filteredTrips];
    if (sortConfig !== null) {
      sortableTrips.sort((a, b) => {
        let aValue: string | Date;
        let bValue: string | Date;
        // Determine the values based on the sort key
        switch (sortConfig.key) {
          case "charterType":
            aValue = a.charterType.toLowerCase();
            bValue = b.charterType.toLowerCase();
            break;
          case "itineraryName":
            aValue = a.itineraryName.toLowerCase();
            bValue = b.itineraryName.toLowerCase();
            break;
          case "date":
            aValue = new Date(a.date);
            bValue = new Date(b.date);
            break;
          case "status":
            aValue = getTripStatus(a.date).status.toLowerCase();
            bValue = getTripStatus(b.date).status.toLowerCase();
            break;
          default:
            aValue = "";
            bValue = "";
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTrips;
  }, [filteredTrips, sortConfig]);

  // ✅ Function to update sorting config when a header is clicked
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // ✅ Helper function to show sort indicators
  const getSortIndicator = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Charter Type
              </span>
              <Select value={charterFilter} onValueChange={setCharterFilter}>
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

            <div className="flex flex-col">
              <span className="mb-1 text-sm font-medium">
                Itinerary Name
              </span>
              <Input
                placeholder="Search Itinerary Name"
                className="w-64"
                value={itineraryFilter}
                onChange={(e) => setItineraryFilter(e.target.value)}
              />
            </div>

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

          <div className="border rounded-lg shadow-md overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => requestSort("charterType")}
                      className="cursor-pointer select-none"
                    >
                      Charter Type{getSortIndicator("charterType")}
                    </TableHead>
                    <TableHead
                      onClick={() => requestSort("itineraryName")}
                      className="cursor-pointer select-none"
                    >
                      Itinerary Name{getSortIndicator("itineraryName")}
                    </TableHead>
                    <TableHead
                      onClick={() => requestSort("date")}
                      className="cursor-pointer select-none"
                    >
                      Date{getSortIndicator("date")}
                    </TableHead>
                    <TableHead
                      onClick={() => requestSort("status")}
                      className="cursor-pointer select-none"
                    >
                      Status{getSortIndicator("status")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTrips.length > 0 ? (
                    sortedTrips.map((trip) => {
                      const { status, color } = getTripStatus(trip.date);
                      const statusColors: Record<string, string> = {
                        green: "bg-green-500",
                        blue: "bg-[#26BDD8]",
                        yellow: "bg-yellow-500",
                      };

                      return (
                        <TableRow
                          key={trip.tripId}
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            router.push(
                              `/dashboard/concierge/bookings/${trip.tripId}`
                            )
                          }
                        >
                          <TableCell>{trip.charterType}</TableCell>
                          <TableCell>{trip.itineraryName}</TableCell>
                          <TableCell>
                            {format(parseISO(trip.date), "yyyy-MM-dd")}
                          </TableCell>
                          <TableCell>
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
      </CardContent>
    </Card>
  );
}
