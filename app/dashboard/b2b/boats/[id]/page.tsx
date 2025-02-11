"use client";  // Ensure this is a client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import TripsTable from "@/components/boats/TripsTable";
import PriceListTable from "@/components/boats/PriceListTable";
import ItineraryTable from "@/components/boats/ItineraryTable";
import TripsCalendar from "@/components/boats/TripsCalendar";
import RevenueCharts from "@/components/boats/RevenueCharts";
import AddItineraryDialog from "@/components/boats/AddItineraryDialog";
import AddPriceDialog from "@/components/boats/AddPriceDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import boatsData from "../boats.json";  // Importing boats data

export default function BoatsPage() {
  const router = useRouter();
  const [isItineraryDialogOpen, setItineraryDialogOpen] = useState(false);
  const [isPriceDialogOpen, setPriceDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [boatName, setBoatName] = useState<string>("Loading...");

  useEffect(() => {
    setIsClient(true);

    // Get selected boat from sessionStorage (assuming it's stored when navigating from the Boats page)
    const selectedBoatId = sessionStorage.getItem("selectedBoatId");

    if (selectedBoatId) {
      const foundBoat = boatsData.find((boat) => boat.id.toString() === selectedBoatId);
      if (foundBoat) {
        setBoatName(foundBoat.name);
      } else {
        setBoatName("Boat Not Found");
      }
    } else if (boatsData.length > 0) {
      // Default to the first boat if none is selected
      setBoatName(boatsData[0].name);
    }
  }, []);

  return (
    <DashboardLayout role="B2B">
      <div className="p-6 space-y-8 mt-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{boatName} - Manage Boats</h1>
          <div className="flex gap-4">
            <Button onClick={() => setItineraryDialogOpen(true)}>
              <PlusCircle className="mr-2" /> Add Itinerary
            </Button>
            <Button onClick={() => setPriceDialogOpen(true)}>
              <PlusCircle className="mr-2" /> Add Trip
            </Button>
          </div>
        </div>

        {/* Calendar & Tables */}
        <TripsCalendar />
        <TripsTable />
        <PriceListTable />
        <ItineraryTable />

        {/* ✅ Render charts only after client mount */}
        {isClient && <RevenueCharts />}

        {/* Modals */}
        <AddItineraryDialog open={isItineraryDialogOpen} setOpen={setItineraryDialogOpen} />
        <AddPriceDialog open={isPriceDialogOpen} setOpen={setPriceDialogOpen} />
      </div>
    </DashboardLayout>
  );
}
