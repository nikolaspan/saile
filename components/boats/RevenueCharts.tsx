/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  format,
  parseISO,
  getYear,
  getMonth,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  addDays,
  endOfMonth,
} from "date-fns";
import { trips } from "./data";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];
const AVAILABLE_YEARS = [2024, 2025]; // List of available years

export default function RevenueCharts() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [filter, setFilter] = useState("Month"); // Default filter is Month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));

  useEffect(() => {
    const today = new Date();
    // Only consider trips that have occurred in the past
    let filteredTrips = trips.filter(
      (trip) => parseISO(trip.date) <= today
    );

    if (filter === "Week") {
      // Show data for the current week
      filteredTrips = filteredTrips.filter((trip) =>
        isWithinInterval(parseISO(trip.date), {
          start: startOfWeek(today, { weekStartsOn: 1 }),
          end: endOfWeek(today, { weekStartsOn: 1 }),
        })
      );
    } else if (filter === "Month") {
      // Filter by selected month and year
      filteredTrips = filteredTrips.filter((trip) => {
        const tripDate = parseISO(trip.date);
        return (
          getMonth(tripDate) === selectedMonth &&
          getYear(tripDate) === selectedYear
        );
      });
    } else if (filter === "Year") {
      // Filter by selected year only
      filteredTrips = filteredTrips.filter(
        (trip) => getYear(parseISO(trip.date)) === selectedYear
      );
    }

    // Pie Chart Data: Group revenue by charter type
    setChartData(
      filteredTrips.length > 0
        ? filteredTrips.reduce((acc: any[], trip) => {
            const existing = acc.find(
              (item) => item.name === trip.charterType
            );
            if (existing) {
              existing.value += trip.revenue;
            } else {
              acc.push({ name: trip.charterType, value: trip.revenue });
            }
            return acc;
          }, [])
        : []
    );

    // Bar Chart Data: Group revenue by time periods
    const groupedRevenue: { [key: string]: number } = {};

    if (filter === "Week") {
      // Create an entry for each day in the current week (using locale day abbreviations)
      const weekStart = startOfWeek(today, { weekStartsOn: 1 });
      for (let i = 0; i < 7; i++) {
        const day = addDays(weekStart, i);
        const label = format(day, "EEE dd");
        groupedRevenue[label] = 0;
      }
      // Sum revenue by day
      filteredTrips.forEach((trip) => {
        const tripDate = parseISO(trip.date);
        const label = format(tripDate, "EEE dd");
        if (groupedRevenue[label] !== undefined) {
          groupedRevenue[label] += trip.revenue;
        }
      });
    } else if (filter === "Month") {
      // Group by week period within the selected month.
      // Determine the first and last day of the month.
      const firstDay = new Date(selectedYear, selectedMonth, 1);
      const lastDay = endOfMonth(firstDay);
      // Build week periods based on Monday as the start of the week.
      const weekPeriods: { label: string; start: Date; end: Date }[] = [];
      let current = firstDay;
      while (current <= lastDay) {
        const periodStart = current;
        let periodEnd = endOfWeek(current, { weekStartsOn: 1 });
        if (periodEnd > lastDay) {
          periodEnd = lastDay;
        }
        const label = `${format(periodStart, "MMM dd")} - ${format(
          periodEnd,
          "MMM dd"
        )}`;
        weekPeriods.push({ label, start: periodStart, end: periodEnd });
        current = addDays(periodEnd, 1);
      }
      weekPeriods.forEach((period) => {
        groupedRevenue[period.label] = 0;
      });
      // Assign revenue to each week period
      filteredTrips.forEach((trip) => {
        const tripDate = parseISO(trip.date);
        weekPeriods.forEach((period) => {
          if (
            isWithinInterval(tripDate, {
              start: period.start,
              end: period.end,
            })
          ) {
            groupedRevenue[period.label] += trip.revenue;
          }
        });
      });
    } else {
      // Year filter: group by month
      for (let i = 0; i < 12; i++) {
        const label = format(new Date(selectedYear, i, 1), "MMM yyyy");
        groupedRevenue[label] = 0;
      }
      filteredTrips.forEach((trip) => {
        const tripDate = parseISO(trip.date);
        const label = format(tripDate, "MMM yyyy");
        if (groupedRevenue[label] !== undefined) {
          groupedRevenue[label] += trip.revenue;
        }
      });
    }

    setBarChartData(
      Object.entries(groupedRevenue).map(([key, revenue]) => ({
        period: key,
        revenue,
      }))
    );
  }, [filter, selectedYear, selectedMonth]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Filter Options */}
      <div className="col-span-2 flex flex-wrap items-center justify-between mb-4">
        <div className="space-x-4">
          {["Week", "Month", "Year"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-lg border ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Year Selector (for Month and Year filters) */}
        {(filter === "Month" || filter === "Year") && (
          <select
            className="px-4 py-2 rounded-lg border bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {AVAILABLE_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}

        {/* Month Selector (for Month filter only) */}
        {filter === "Month" && (
          <select
            className="px-4 py-2 rounded-lg border bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index}>
                {format(new Date(selectedYear, index, 1), "MMMM")}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Pie Chart */}
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Revenue Distribution ({filter})
        </h2>
        {chartData.length > 0 ? (
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No revenue data available for {filter}.
          </p>
        )}
      </div>

      {/* Bar Chart */}
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Revenue Over Time ({filter})
        </h2>
        <BarChart width={500} height={300} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#36A2EB" />
        </BarChart>
      </div>
    </div>
  );
}
