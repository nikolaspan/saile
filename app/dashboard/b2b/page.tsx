/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Ship, Calendar, Wallet, BarChart3 } from "lucide-react";
import { parseISO } from "date-fns";
import Link from "next/link";
import { DashboardCard } from "@/components/DashboardCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Import trips data
import { trips, getTripStatus } from "@/components/boats/data";


export default function B2BDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const statusOk = statusFilter === "All" || getTripStatus(trip.date).status === statusFilter;
    return statusOk;
  });

  return (
    <DashboardLayout role="B2B">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mt-6">
          <h1 className="text-3xl font-bold">B2B Dashboard</h1>
          <Button variant="outline">View Reports</Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard icon={Ship} title="Total Boats" value="10 Boats" href="/dashboard/b2b/boats" />
          <DashboardCard icon={Calendar} title="Upcoming Trips" value="5 Trips" href="/dashboard/b2b/trips" />
          <DashboardCard icon={Wallet} title="Revenue" value="$15,320" href="/dashboard/b2b/analytics" />
          <DashboardCard icon={BarChart3} title="Bookings" value={`${trips.length} Total`} href="/dashboard/b2b/bookings" />
        </div>

        {/* Trips Table */}
        <Card>
          <CardHeader>
            <CardTitle>Trips Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Overview of all trips</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Charter Type</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map((trip) => {
                  const statusInfo = getTripStatus(trip.date);
                  return (
                    <TableRow key={trip.id}>
                      <TableCell>{trip.id}</TableCell>
                      <TableCell>{trip.itineraryName}</TableCell>
                      <TableCell>{trip.charterType}</TableCell>
                      <TableCell>${trip.revenue}</TableCell>
                      <TableCell>{new Date(trip.date).toLocaleDateString()}</TableCell>
                      <TableCell>{statusInfo.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
