import { Home, BarChart, Settings, Users } from "lucide-react";

export const roleSidebarConfig: Record<
  "B2B" | "Concierge" | "Admin",
  Array<{ title: string; icon: React.ComponentType; url: string }>
> = {
  B2B: [
    { title: "Dashboard", icon: Home, url: "/dashboard/b2b" },
    { title: "Boats", icon: BarChart, url: "/dashboard/b2b/boats" },
    { title: "Settings", icon: Settings, url: "/dashboard/b2b/settings" },
  ],
  Concierge: [
    { title: "Search", icon: BarChart, url: "/dashboard/concierge/search" },
    { title: "Bookings", icon: Users, url: "/dashboard/concierge/bookings" },
  ],
  Admin: [
    { title: "Management", icon: Users, url: "/dashboard/admin/management" },
    { title: "System Settings", icon: Settings, url: "/dashboard/admin/settings" },
  ],
};
