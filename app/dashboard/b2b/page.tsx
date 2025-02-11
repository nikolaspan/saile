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
import { BarChart3, Ship, Calendar, Wallet } from "lucide-react";

// Chart imports from react-chartjs-2 and chart.js
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// date-fns imports
import {
  isPast,
  isToday,
  isSameDay,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";
import Link from "next/link";

// Import shadcn/ui components for Select, Label, and Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

// ─── SAMPLE TRIPS DATA AND HELPER FUNCTION ────────────────────────────────

export const trips = [
  { id: 1, charterType: "Full Day", itineraryName: "Luxury Cruise", revenue: 1500, date: "2024-12-30" },
  { id: 2, charterType: "VIP Transfer", itineraryName: "Business Transfer", revenue: 800, date: "2025-01-02" },
  { id: 3, charterType: "Half Day", itineraryName: "Sunset Tour", revenue: 1200, date: "2025-01-08" },
  { id: 4, charterType: "Full Day", itineraryName: "Luxury Cruise", revenue: 1600, date: "2025-01-20" },
  { id: 5, charterType: "VIP Transfer", itineraryName: "Corporate VIP", revenue: 900, date: "2025-01-25" },
  { id: 6, charterType: "Half Day", itineraryName: "Family Escape", revenue: 700, date: "2025-02-05" },
  { id: 7, charterType: "Full Day", itineraryName: "Private Island", revenue: 2000, date: "2025-02-18" },
  { id: 8, charterType: "VIP Transfer", itineraryName: "Luxury Business", revenue: 850, date: "2025-02-22" },
  { id: 9, charterType: "Full Day", itineraryName: "Mediterranean Escape", revenue: 1750, date: "2025-03-05" },
  { id: 10, charterType: "Half Day", itineraryName: "Romantic Sunset", revenue: 1300, date: "2025-03-14" },
  { id: 11, charterType: "Full Day", itineraryName: "Greek Islands Tour", revenue: 2500, date: "2025-04-02" },
  { id: 12, charterType: "VIP Transfer", itineraryName: "Executive Business Charter", revenue: 950, date: "2025-04-10" },
  { id: 13, charterType: "Full Day", itineraryName: "Tropical Paradise", revenue: 1800, date: "2025-04-15" },
  { id: 14, charterType: "VIP Transfer", itineraryName: "Jetsetter Elite", revenue: 950, date: "2025-04-25" },
  { id: 15, charterType: "Half Day", itineraryName: "Coastal Relaxation", revenue: 980, date: "2025-05-12" },
  { id: 16, charterType: "Full Day", itineraryName: "Luxury Island Hopper", revenue: 2200, date: "2025-06-03" },
  { id: 17, charterType: "VIP Transfer", itineraryName: "Yacht Express", revenue: 870, date: "2025-06-15" },
  { id: 18, charterType: "Half Day", itineraryName: "Sunset Bliss", revenue: 1450, date: "2025-07-01" },
  { id: 19, charterType: "Full Day", itineraryName: "Mega Yacht Celebration", revenue: 2800, date: "2025-08-05" },
  { id: 20, charterType: "VIP Transfer", itineraryName: "Corporate Gold Class", revenue: 980, date: "2025-08-18" },
];

export const getTripStatus = (date: string) => {
  const tripDate = parseISO(date);
  if (isPast(tripDate) && !isToday(tripDate)) return { status: "Completed" };
  if (isToday(tripDate)) return { status: "Ongoing" };
  return { status: "Upcoming" };
};

// ─── B2B DASHBOARD COMPONENT ────────────────────────────────────────────────

export default function B2BDashboard() {
  const [isClient, setIsClient] = useState(false);
  // Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [charterTypeFilter, setCharterTypeFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Ensure client-only components (like charts) render only in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter trips based on the selected filters
  const filteredTrips = trips.filter((trip) => {
    let statusOk = true;
    let charterTypeOk = true;
    let dateOk = true;

    // Filter by status
    if (statusFilter !== "All") {
      statusOk = getTripStatus(trip.date).status === statusFilter;
    }
    // Filter by charter type
    if (charterTypeFilter !== "All") {
      charterTypeOk = trip.charterType === charterTypeFilter;
    }
    // Filter by date or date range
    if (startDate && endDate) {
      const tripDate = parseISO(trip.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      dateOk = tripDate >= start && tripDate <= end;
    } else if (startDate) {
      dateOk = isSameDay(parseISO(trip.date), new Date(startDate));
    } else if (endDate) {
      dateOk = isSameDay(parseISO(trip.date), new Date(endDate));
    }
    return statusOk && charterTypeOk && dateOk;
  });

  // ─── WEEKLY BOOKINGS CHART ────────────────────────────────────────────────
  const today = new Date();
  // Define week starting on Monday
  const start = startOfWeek(today, { weekStartsOn: 1 });
  const end = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start, end });
  const weeklyBookingsData = {
    labels: weekDays.map((day) => format(day, "EEE")), // e.g. Mon, Tue...
    datasets: [
      {
        label: "Weekly Bookings",
        data: weekDays.map((day) =>
          trips.filter((trip) => isSameDay(parseISO(trip.date), day)).length
        ),
        backgroundColor: "#6366F1",
      },
    ],
  };

  // ─── MONTHLY BOOKINGS CHART ───────────────────────────────────────────────
  const monthlyCount: Record<string, number> = {};
  trips.forEach((trip) => {
    const date = parseISO(trip.date);
    const month = date.toLocaleString("default", { month: "short" });
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  });
  // Ensure proper order of months (adjust based on your data)
  const monthsOrdered = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const filteredMonthLabels = monthsOrdered.filter((m) => monthlyCount[m] !== undefined);
  const filteredMonthData = filteredMonthLabels.map((m) => monthlyCount[m]);
  const monthlyBookingsData = {
    labels: filteredMonthLabels,
    datasets: [
      {
        label: "Monthly Bookings",
        data: filteredMonthData,
        backgroundColor: "#10B981",
      },
    ],
  };

  // ─── REVENUE PER CHARTER TYPE (PIE CHART) ─────────────────────────────────
  const revenueByCharter: Record<string, number> = {};
  trips.forEach((trip) => {
    const type = trip.charterType;
    revenueByCharter[type] = (revenueByCharter[type] || 0) + trip.revenue;
  });
  const charterTypes = Object.keys(revenueByCharter);
  const revenueData = Object.values(revenueByCharter);
  const revenueChartData = {
    labels: charterTypes,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        backgroundColor: charterTypes.map((_, i) => {
          const colors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
          return colors[i % colors.length];
        }),
      },
    ],
  };

  // ─── Status Badge Mapping ───────────────────────────────────────────────
  const badgeClasses: Record<string, string> = {
    Upcoming: "bg-aquaBlue text-coastalWhite",
    Ongoing: "bg-yellow-500 text-white",
    Completed: "bg-successGreen text-white",
  };

  return (
    <DashboardLayout role="B2B">
      <div className="p-6 space-y-8 ">
        {/* Header */}
        <div className="flex items-center justify-between mt-6">
          <h1 className="text-3xl font-bold">B2B Dashboard</h1>
          <Button variant="outline">View Reports</Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            icon={Ship}
            title="Total Boats"
            value="10 Boats"
            href="/dashboard/b2b/boats"
          />
          <DashboardCard
            icon={Calendar}
            title="Upcoming Trips"
            value="5 Trips"
            href="/dashboard/b2b/trips"
          />
          <DashboardCard
            icon={Wallet}
            title="Revenue"
            value="$15,320"
            href="/dashboard/b2b/analytics"
          />
          <DashboardCard
            icon={BarChart3}
            title="Bookings"
            value={`${trips.length} Total`}
            href="/dashboard/b2b/bookings"
          />
        </div>

        {/* Trips Table */}
        <Card>
          <CardHeader>
            <CardTitle>Trips Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Label htmlFor="statusFilter">Status:</Label>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger id="statusFilter" className="w-[150px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Charter Type Filter */}
              <div className="flex items-center gap-2">
                <Label htmlFor="charterTypeFilter">Charter Type:</Label>
                <Select
                  value={charterTypeFilter}
                  onValueChange={setCharterTypeFilter}
                >
                  <SelectTrigger id="charterTypeFilter" className="w-[150px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Full Day">Full Day</SelectItem>
                    <SelectItem value="Half Day">Half Day</SelectItem>
                    <SelectItem value="VIP Transfer">VIP Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date Filter */}
              <div className="flex items-center gap-2">
                <Label htmlFor="startDate">Start Date:</Label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-auto"
                />
              </div>

              {/* End Date Filter */}
              <div className="flex items-center gap-2">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-auto"
                />
              </div>

              {/* Reset Filters Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("All");
                  setCharterTypeFilter("All");
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Reset Filters
              </Button>
            </div>

            {/* Trips Table */}
            <div className="overflow-auto max-h-[300px]">
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
                        <TableCell>
                          {new Date(trip.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${badgeClasses[statusInfo.status]}`}
                          >
                            {statusInfo.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        {isClient && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weekly Bookings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar
                  data={weeklyBookingsData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </CardContent>
            </Card>

            {/* Monthly Bookings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar
                  data={monthlyBookingsData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </CardContent>
            </Card>

            {/* Revenue per Charter Type Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue per Charter Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Pie
                  data={revenueChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Button variant="default">Manage Boats</Button>
          <Button variant="secondary">View Bookings</Button>
          <Button variant="outline">Add New Booking</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── Reusable Dashboard Card Component ───────────────────────────────
type DashboardCardProps = {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
};
export function DashboardCard({ icon: Icon, title, value, href }: DashboardCardProps) {
  const cardContent = (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} passHref>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
