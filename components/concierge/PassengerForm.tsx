"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface PassengerInfo {
  name: string;
  birthId: string;
}

export interface ItineraryOption {
  name: string;
  price: number;
}

interface PassengerFormProps {
  passengers: PassengerInfo[];
  onPassengerChange: (index: number, field: keyof PassengerInfo, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  selectedBoatName: string;
  itineraryOptions: ItineraryOption[];
  selectedItinerary: ItineraryOption[];
  onItineraryChange: (option: ItineraryOption, checked: boolean) => void;
  hour: string;
  setHour: (value: string) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  passengers,
  onPassengerChange,
  onBack,
  onSubmit,
  selectedBoatName,
  itineraryOptions,
  selectedItinerary,
  onItineraryChange,
  hour,
  setHour,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Enter Passenger Information</h2>
      <p>
        Selected Boat: <strong>{selectedBoatName}</strong>
      </p>
      {/* New Choose Hour Input */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">Choose Hour</label>
        <Input
          type="time"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
      </div>
      {/* Itinerary selection section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Select Additional Itinerary Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {itineraryOptions.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <Checkbox
                defaultChecked={selectedItinerary.some((item) => item.name === option.name)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onCheckedChange={(checked: any) => onItineraryChange(option, Boolean(checked))}
              />
              <Label className="cursor-pointer">
                {option.name} {option.price > 0 ? `($${option.price})` : "(Free)"}
              </Label>
            </div>
          ))}
        </div>
      </div>
      {/* Passenger information form */}
      <div className="space-y-4">
        {passengers.map((passenger, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2">
            <h3 className="font-medium">Passenger {index + 1}</h3>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Name"
                value={passenger.name}
                onChange={(e) => onPassengerChange(index, "name", e.target.value)}
              />
              <Input
                placeholder="Birth ID"
                value={passenger.birthId}
                onChange={(e) => onPassengerChange(index, "birthId", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Submit Booking</Button>
      </div>
    </div>
  );
};

export default PassengerForm;
