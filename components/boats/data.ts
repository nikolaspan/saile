import { isPast, isToday, parseISO } from "date-fns";

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

// Get status for each trip
export const getTripStatus = (date: string) => {
  const tripDate = parseISO(date);
  if (isPast(tripDate) && !isToday(tripDate)) return { status: "Completed", color: "green" };
  if (isToday(tripDate)) return { status: "Ongoing", color: "yellow" };
  return { status: "Upcoming", color: "blue" };
};

// Price list matching trips
export const priceList = trips.map((trip) => ({
  id: trip.id,
  charterType: trip.charterType,
  itineraryName: trip.itineraryName,
  rentalPrice: Math.round(trip.revenue * 0.5),
  commission: Math.round(trip.revenue * 0.1),
  fuelCost: Math.round(trip.revenue * 0.08),
  finalPrice: Math.round(trip.revenue * 1.1),
}));


// Luxury Add-ons / Itineraries
export const itineraries = [
  { id: 1, name: "Luxury WiFi", price: 50 },
  { id: 2, name: "Wine Service", price: 100 },
  { id: 3, name: "Champagne Package", price: 200 },
  { id: 4, name: "Private Chef", price: 500 },
  { id: 5, name: "Sunset Photography", price: 150 },
  { id: 6, name: "Personalized Music Playlist", price: 30 },
  { id: 7, name: "Gourmet Dinner", price: 400 },
  { id: 8, name: "Jet Ski Experience", price: 250 },
  { id: 9, name: "Underwater Drone Recording", price: 350 },
  { id: 10, name: "Spa & Massage Session", price: 300 },
  { id: 11, name: "Diving & Snorkeling", price: 450 },
  { id: 12, name: "Exclusive Yacht Party DJ", price: 600 },
  { id: 13, name: "Luxury BBQ on Deck", price: 350 },
  { id: 14, name: "Helicopter Pickup & Drop", price: 1500 },
  { id: 15, name: "Movie Night Under the Stars", price: 280 },
];
