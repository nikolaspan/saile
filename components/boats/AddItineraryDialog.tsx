import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

interface AddItineraryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddItineraryDialog({ open, setOpen }: AddItineraryDialogProps) {
  const [newItinerary, setNewItinerary] = useState({ name: "", price: "" });

  const handleAddItinerary = () => {
    if (newItinerary.name && newItinerary.price) {
      console.log("New Itinerary:", newItinerary); // Replace with actual state update logic
      setNewItinerary({ name: "", price: "" });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Itinerary</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Itinerary Name"
            value={newItinerary.name}
            onChange={(e) => setNewItinerary({ ...newItinerary, name: e.target.value })}
          />
          <Input
            placeholder="Price (€)"
            type="number"
            value={newItinerary.price}
            onChange={(e) => setNewItinerary({ ...newItinerary, price: e.target.value })}
          />
          <Button onClick={handleAddItinerary}>
            <Check className="mr-2" /> Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
