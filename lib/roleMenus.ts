// lib/roleMenus.ts
import { Frame, PieChart, Settings2, Bot, BookOpen, Ship, User, ClipboardList, Calendar, Users } from "lucide-react";

export type MenuItem = {
  title: string;
  url: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  items?: MenuItem[];
};

export type RoleMenus = {
  [role in "B2B" | "Concierge" | "Admin"]: MenuItem[];
};

export const roleMenus: RoleMenus = {
  B2B: [
    {
      title: "Dashboard",
      url: "/dashboard/b2b",
      icon: Frame,
      items: [
        { title: "Skipper", url: "/dashboard/b2b/skipper", icon: User },
        { title: "Boats", url: "/dashboard/b2b/boats", icon: Ship },

      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/b2b/analytics",
      icon: PieChart,
      items: [
        { title: "Overview", url: "/dashboard/b2b/analytics/overview", icon: Calendar },
        { title: "History", url: "/dashboard/b2b/analytics/history", icon: Users, isActive: true },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/b2b/settings",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/dashboard/b2b/settings/profile", icon: User },
        { title: "Options", url: "/dashboard/b2b/settings/options", icon: Settings2 },
      ],
    },
  ],
  Concierge: [
    {
      title: "Dashboard",
      url: "/dashboard/concierge",
      icon: Bot,
      items: [
        { title: "Find Boats", url: "/dashboard/concierge/search/boats", icon: Ship },
        { title: "Find B2B", url: "/dashboard/concierge/search/b2b", icon: User },
      ],
    },
    {
      title: "Bookings",
      url: "/dashboard/concierge/bookings",
      icon: Frame,
      items: [
        { title: "New", url: "/dashboard/concierge/bookings/new", icon: Calendar },
        { title: "History", url: "/dashboard/concierge/bookings", icon: ClipboardList },
      ],
    },
  ],
  Admin: [
    {
      title: "Management",
      url: "/dashboard/admin/management",
      icon: BookOpen,
      items: [
        { title: "Users", url: "/dashboard/admin/management/users", icon: Users },
        { title: "Boats", url: "/dashboard/admin/management/boats", icon: Ship },
        { title: "Hotels", url: "/dashboard/admin/management/hotels", icon: Frame },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings2,
      items: [
        { title: "System Options", url: "/dashboard/admin/settings/system-options", icon: Settings2 },
        { title: "Logs", url: "/dashboard/admin/settings/logs", icon: ClipboardList },
      ],
    },
  ],
};
