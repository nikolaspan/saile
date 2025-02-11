import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Ensure you have this component from Shadcn

// Export the Boat interface so it can be imported elsewhere
export interface Boat {
  boatId: string;
  name: string;
  destinations: string[];
  prices: { [key: string]: number };
  capacity: number;
  notAvailableDates: string[];
  itinerary: { name: string; price: number }[];
}

interface BoatSelectionProps {
  boats: Boat[];
  destination: string;
  onBoatSelect: (boat: Boat) => void;
  onBack: () => void;
}

const BoatSelection: React.FC<BoatSelectionProps> = ({
  boats,
  destination,
  onBoatSelect,
  onBack,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Select a Boat</h2>
      {boats.length === 0 ? (
        <p className="text-muted-foreground">
          No boats available for the given destination, day, and passenger count.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boats.map((boat) => (
            <Card
              key={boat.boatId}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onBoatSelect(boat)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{boat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm">
                    <strong>Destination:</strong> {destination}
                  </p>
                  <p className="text-sm">
                    <strong>Capacity:</strong> {boat.capacity}
                  </p>
                  <p className="text-sm">
                    <strong>Price for {destination}:</strong>{" "}
                    {boat.prices[destination] !== undefined
                      ? `$${boat.prices[destination]}`
                      : "N/A"}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">Itinerary:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {boat.itinerary.map((item) => (
                      <Badge
                        key={item.name}
                        className="text-xs"
                        variant={item.price > 0 ? "secondary" : "outline"}
                      >
                        {item.price > 0
                          ? `${item.name} ($${item.price})`
                          : item.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
    </div>
  );
};

export default BoatSelection;
