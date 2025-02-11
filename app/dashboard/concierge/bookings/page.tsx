"use client";
import DashboardLayout from "../../../layouts/DashboardLayout";
import TripsTable from "@/components/concierge/TripsTable";
import Calendar from "@/components/concierge/Calendar";

export default function ConciergeDashboard() {
  const role = "Concierge"; // Replace with dynamic role detection logic

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Concierge Dashboard</h1>
        <p>Welcome! Search for boats and manage bookings from here.</p>
        
        <Calendar />
        <TripsTable />
        <div className="mt-36" /> {/* Added spacing below TripsTable */}
      </div>
    </DashboardLayout>
  );
}
