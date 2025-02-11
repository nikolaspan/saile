"use client";

import * as React from "react";
import { format, isSameDay } from "date-fns";
import Link from "next/link";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import JSON data. Adjust the path as needed.
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

// Extract trips from the JSON data
const trips: Trip[] = tripsData.trips;

export default function Calendar() {
  // Convert all trip dates (stored as "yyyy-MM-dd" strings) into Date objects.
  const bookedDates = trips.map((trip) => new Date(trip.date));

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  // Format the selected date for comparison with the trip dates.
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const tripsForDate = trips.filter((trip) => trip.date === formattedDate);

  return (
    <div className="space-y-6">
      {/* Calendar container */}
      <div className="w-full max-w-4xl mx-auto">
        <ShadcnCalendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="w-full h-96 text-lg"
          modifiers={{
            // Mark a day as "booked" if it matches any trip's date.
            booked: (date: Date) =>
              bookedDates.some((bookedDate) => isSameDay(bookedDate, date)),
          }}
          modifiersClassNames={{
            booked: "bg-blue-500 text-white rounded-full",
          }}
        />
      </div>

      {/* Card displaying trip details for the selected date */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate
              ? format(selectedDate, "MMM dd, yyyy")
              : "Select a date"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDate ? (
            tripsForDate.length > 0 ? (
              tripsForDate.map((trip) => (
                <div key={trip.tripId} className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{trip.itineraryName}</p>
                  <p className="text-xs text-muted-foreground">
                    {trip.charterType}
                  </p>
                  <Link href={`/dashboard/concierge/bookings/${trip.tripId}`}>
                    <Button size="sm" className="mt-2">
                      Learn More
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <Link href="/dashboard/concierge/bookings/new">
                <Button variant="outline" size="sm">
                  Book Now
                </Button>
              </Link>
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              Please select a date to view bookings.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
