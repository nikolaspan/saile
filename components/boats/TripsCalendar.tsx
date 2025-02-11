import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { trips, getTripStatus } from "./data";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TripsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  const selectedTrips = selectedDate
    ? trips.filter((trip) => format(parseISO(trip.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full">
      {/* Calendar Section */}
      <Card className="w-full max-w-[750px]"> {/* Increased width */}
        <CardHeader>
          <CardTitle>Trips Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              tripDays: (date) =>
                trips.some((trip) => format(parseISO(trip.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")),
            }}
            modifiersClassNames={{
              tripDays: "bg-aquaBlue text-black dark:text-white rounded-full",
              selected: "bg-blue-500 dark:bg-blue-400 text-white font-bold",
            }}
            className="w-full h-[450px] max-w-[600px]" // Increased width and height
          />
        </CardContent>
      </Card>

      {/* Trip Details Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTrips.length > 0 ? (
            <ul className="space-y-2">
              {selectedTrips.map((trip) => {
                const { status, color } = getTripStatus(trip.date);
                return (
                  <li key={trip.id} className="p-3 border rounded-lg bg-white dark:bg-gray-700 shadow">
                    <p><strong>Charter Type:</strong> {trip.charterType}</p>
                    <p><strong>Itinerary:</strong> {trip.itineraryName}</p>
                    <p><strong>Revenue:</strong> €{trip.revenue.toFixed(2)}</p>
                    <p><strong>Date:</strong> {format(parseISO(trip.date), "yyyy-MM-dd")}</p>
                    <Badge className={`bg-${color}-500 text-white mt-2`}>{status}</Badge>
                    <Button
                      variant="default"
                      className="mt-2"
                      onClick={() => router.push(`/dashboard/concierge/bookings/${trip.id}`)}
                    >
                      Learn More
                    </Button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">No trips on this date.</p>
              {/* Ensure Book Now Button is always visible */}
              <Button
                variant="secondary"
                className="mt-4 px-4 py-2"
                onClick={() => router.push(`/dashboard/concierge/bookings/new`)}
              >
                Book Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
