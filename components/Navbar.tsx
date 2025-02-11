"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-deepSeaGreen text-coastalWhite p-4 shadow-md">
      {/* Sidebar Toggle Button */}

      {/* Logo */}
      <div className="text-2xl font-logo tracking-wide">SAIL-E</div>
      {/* Actions */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <button className="relative">
          <Bell className="h-6 w-6 text-coastalWhite" />
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-coastalWhite rounded-full px-1">
            3
          </span>
        </button>
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://via.placeholder.com/150" alt="User Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-softGray text-deepSeaGreen">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                document.cookie = "authToken=; path=/; max-age=0";
                document.cookie = "userRole=; path=/; max-age=0";
                window.location.href = "/";
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
