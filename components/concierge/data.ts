export interface Passenger {
  passengerId: string;
  name: string;
  birthId: string;
}

export interface Trip {
  tripId: string;
  charterType: string;
  itineraryName: string;
  revenue: number;
  date: string;
  roomId: string;
  passengers: Passenger[];
}

export const trips: Trip[] = [
  {
    tripId: "T-20240615-001",
    charterType: "Full Day",
    itineraryName: "Island Tour",
    revenue: 5000,
    date: "2024-06-15",
    roomId: "R-101",
    passengers: [
      { passengerId: "P-001", name: "John Doe", birthId: "BID12345" },
      { passengerId: "P-002", name: "Jane Smith", birthId: "BID67890" }
    ]
  },
  {
    tripId: "T-20240618-002",
    charterType: "Half Day",
    itineraryName: "Sunset Cruise",
    revenue: 3000,
    date: "2024-06-18",
    roomId: "R-102",
    passengers: [
      { passengerId: "P-003", name: "Alice Brown", birthId: "BID54321" }
    ]
  },
  {
    tripId: "T-20240701-003",
    charterType: "VIP Transfer",
    itineraryName: "Deep Sea Fishing",
    revenue: 7000,
    date: "2024-07-01",
    roomId: "R-103",
    passengers: [
      { passengerId: "P-004", name: "Charlie Johnson", birthId: "BID98765" },
      { passengerId: "P-005", name: "Daniel Lee", birthId: "BID19283" }
    ]
  },
  {
    tripId: "T-20250310-004",
    charterType: "Full Day",
    itineraryName: "Coral Reef Adventure",
    revenue: 8000,
    date: "2025-03-10",
    roomId: "R-104",
    passengers: [
      { passengerId: "P-006", name: "Sophia Wilson", birthId: "BID34567" },
      { passengerId: "P-007", name: "Michael Davis", birthId: "BID65432" }
    ]
  },
  {
    tripId: "T-20250522-005",
    charterType: "Half Day",
    itineraryName: "Bay Exploration",
    revenue: 4500,
    date: "2025-05-22",
    roomId: "R-105",
    passengers: [
      { passengerId: "P-008", name: "Emma White", birthId: "BID11223" }
    ]
  }
];

export function getTripStatus(date: string): { status: string; color: string } {
  const tripDate = new Date(date);
  const today = new Date();

  if (tripDate < today) return { status: "Completed", color: "green" };
  if (tripDate.toDateString() === today.toDateString()) return { status: "Ongoing", color: "yellow" };
  return { status: "Pending", color: "blue" };
}
