"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { roleMenus, MenuItem } from "@/lib/roleMenus";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  role: keyof typeof roleMenus;
}

/**
 * Recursively render menu items.
 */
function renderMenuItems(items: MenuItem[], currentPath: string) {
  return items.map((item) => {
    const isActive =
      currentPath === item.url || currentPath.startsWith(item.url);
    return (
      <SidebarMenuItem key={item.title} className={isActive ? "" : ""}>
        <SidebarMenuButton asChild>
          <Link href={item.url} className="flex items-center space-x-2 p-2">
            {item.icon && <item.icon className="w-6 h-6" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
        {item.items && (
          <div className="ml-6 mt-1 space-y-1">
            {renderMenuItems(item.items, currentPath)}
          </div>
        )}
      </SidebarMenuItem>
    );
  });
}

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();
  const menuItems = roleMenus[role] || [];

  return (
    <Sidebar className="h-full w-64 border-r border-gray-200 flex-shrink-0">
      <SidebarContent>
        <SidebarGroup>
          {/* Sidebar header with avatar */}
          <div className="flex items-center space-x-3 p-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatars/shadcn.jpg" alt="User Avatar" />
              <AvatarFallback>{role.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium capitalize">{role}</span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuItems, pathname)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
