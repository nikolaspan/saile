import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

interface AddPriceDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddPriceDialog({
  open,
  setOpen,
}: AddPriceDialogProps) {
  const [newPrice, setNewPrice] = useState({
    charterType: "Half Day", // Default value
    itineraryName: "",
    rentalPriceWithoutCommission: "",
    commission: "",
    fuelCost: "",
  });

  const handleAddPrice = () => {
    const {
      charterType,
      itineraryName,
      rentalPriceWithoutCommission,
      commission,
      fuelCost,
    } = newPrice;

    if (
      charterType &&
      itineraryName &&
      rentalPriceWithoutCommission &&
      commission &&
      fuelCost
    ) {
      const netRental =
        Number(rentalPriceWithoutCommission) + Number(commission);
      const vat = netRental * 0.24;
      const finalPrice = netRental + vat + Number(fuelCost);

      console.log("New Price:", {
        charterType,
        itineraryName,
        rentalPriceWithoutCommission: Number(rentalPriceWithoutCommission),
        commission: Number(commission),
        netRental,
        vat,
        fuelCost: Number(fuelCost),
        finalPrice,
      });

      // Reset form and close dialog
      setNewPrice({
        charterType: "Half Day", // Reset to default
        itineraryName: "",
        rentalPriceWithoutCommission: "",
        commission: "",
        fuelCost: "",
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Price</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Predefined Charter Type Dropdown */}
          <div className="space-y-1">
            <Label>Charter Type</Label>
            <Select
              value={newPrice.charterType}
              onValueChange={(value) =>
                setNewPrice({ ...newPrice, charterType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Charter Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Half Day">Half Day</SelectItem>
                <SelectItem value="Full Day">Full Day</SelectItem>
                <SelectItem value="VIP Transfer">VIP Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Itinerary Name */}
          <div className="space-y-1">
            <Label>Itinerary Name</Label>
            <Input
              placeholder="Itinerary Name"
              value={newPrice.itineraryName}
              onChange={(e) =>
                setNewPrice({ ...newPrice, itineraryName: e.target.value })
              }
            />
          </div>

          {/* Rental Price Without Commission */}
          <div className="space-y-1">
            <Label>Rental Price Without Commission (€)</Label>
            <Input
              placeholder="Rental Price Without Commission (€)"
              type="number"
              value={newPrice.rentalPriceWithoutCommission}
              onChange={(e) =>
                setNewPrice({
                  ...newPrice,
                  rentalPriceWithoutCommission: e.target.value,
                })
              }
            />
          </div>

          {/* Commission */}
          <div className="space-y-1">
            <Label>Commission (€)</Label>
            <Input
              placeholder="Commission (€)"
              type="number"
              value={newPrice.commission}
              onChange={(e) =>
                setNewPrice({ ...newPrice, commission: e.target.value })
              }
            />
          </div>

          {/* Fuel Cost */}
          <div className="space-y-1">
            <Label>Fuel Cost (€)</Label>
            <Input
              placeholder="Fuel Cost (€)"
              type="number"
              value={newPrice.fuelCost}
              onChange={(e) =>
                setNewPrice({ ...newPrice, fuelCost: e.target.value })
              }
            />
          </div>

          {/* Save Button */}
          <Button onClick={handleAddPrice}>
            <Check className="mr-2" /> Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
