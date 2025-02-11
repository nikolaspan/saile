"use client";

import React, { useState } from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import BookingSearchForm from "@/components/concierge/BookingSearchForm";
import BoatSelection, { Boat } from "@/components/concierge/BoatSelection";
import PassengerForm, { PassengerInfo, ItineraryOption } from "@/components/concierge/PassengerForm";
import { format } from "date-fns";

// Import boat data from the JSON file and cast it to Boat[]
import boatsData from "@/components/concierge/boats.json";
const allBoats = boatsData.boats as unknown as Boat[];

export default function NewBookingPage() {
  const role = "Concierge";
  const [step, setStep] = useState<number>(1);
  const [destination, setDestination] = useState<string>("");
  const [passengerCount, setPassengerCount] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null); // Chosen day as Date
  const [filteredBoats, setFilteredBoats] = useState<Boat[]>([]);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryOption[]>([]);
  const [hour, setHour] = useState<string>("");

  // Step 1: Search for available boats  
  const handleSearch = () => {
    if (!date) return;
    const formattedDate = format(date, "yyyy-MM-dd");
    const filtered = allBoats.filter((boat: Boat) =>
      boat.destinations.some(
        (dest: string) => dest.toLowerCase() === destination.toLowerCase()
      ) &&
      boat.capacity >= passengerCount &&
      !boat.notAvailableDates.includes(formattedDate)
    );
    setFilteredBoats(filtered);
    setStep(2);
  };

  // Step 2: Boat selection
  const handleBoatSelect = (boat: Boat) => {
    setSelectedBoat(boat);
    setPassengers(
      Array.from({ length: passengerCount }, () => ({ name: "", birthId: "" }))
    );
    setSelectedItinerary([]);
    setStep(3);
  };

  // Step 3: Update passenger info
  const handlePassengerChange = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  // Handle itinerary checkbox change
  const handleItineraryChange = (option: ItineraryOption, checked: boolean) => {
    if (checked) {
      setSelectedItinerary((prev) => [...prev, option]);
    } else {
      setSelectedItinerary((prev) =>
        prev.filter((item) => item.name !== option.name)
      );
    }
  };

  // Final submission
  const handleSubmit = () => {
    const booking = {
      destination,
      date,
      passengerCount,
      selectedBoat,
      selectedItinerary,
      hour,
      passengers,
    };
    console.log("Booking submitted:", booking);
    alert("Booking submitted! Check the console for details.");
    // Reset form
    setStep(1);
    setDestination("");
    setPassengerCount(0);
    setDate(null);
    setFilteredBoats([]);
    setSelectedBoat(null);
    setPassengers([]);
    setSelectedItinerary([]);
    setHour("");
  };

  return (
    <DashboardLayout role={role}>
      <div className="p-6 space-y-6">
        {step === 1 && (
          <BookingSearchForm
            destination={destination}
            setDestination={setDestination}
            passengerCount={passengerCount}
            setPassengerCount={setPassengerCount}
            date={date}
            setDate={setDate}
            onSearch={handleSearch}
          />
        )}

        {step === 2 && (
          <BoatSelection
            boats={filteredBoats}
            destination={destination}
            onBoatSelect={handleBoatSelect}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && selectedBoat && (
          <PassengerForm
            passengers={passengers}
            onPassengerChange={handlePassengerChange}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            selectedBoatName={selectedBoat.name}
            itineraryOptions={selectedBoat.itinerary}
            selectedItinerary={selectedItinerary}
            onItineraryChange={handleItineraryChange}
            hour={hour}
            setHour={setHour}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
