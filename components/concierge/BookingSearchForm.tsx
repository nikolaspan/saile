"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";

interface BookingSearchFormProps {
  destination: string;
  setDestination: (value: string) => void;
  passengerCount: number;
  setPassengerCount: (value: number) => void;
  date: Date | null;
  setDate: (value: Date) => void;
  onSearch: () => void;
}

const BookingSearchForm: React.FC<BookingSearchFormProps> = ({
  destination,
  setDestination,
  passengerCount,
  setPassengerCount,
  date,
  setDate,
  onSearch,
}) => {
  return (
    <div className="space-y-4 p-6  shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center">New Booking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination Input */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Destination</label>
          <Input
            placeholder="Enter destination (e.g. Mykonos, Santorini)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        {/* Passenger Count Input */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Number of Passengers</label>
          <Input
            type="number"
            placeholder="Enter number of passengers"
            value={passengerCount > 0 ? passengerCount : ""}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
          />
        </div>
        {/* Date Picker */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold">Choose Day</label>
          <DatePicker value={date} onChange={setDate} />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={onSearch} disabled={!destination || passengerCount <= 0 || !date}>
          Search Boats
        </Button>
      </div>
    </div>
  );
};

export default BookingSearchForm;
