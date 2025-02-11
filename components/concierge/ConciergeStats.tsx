import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ConciergeStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Search Boats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Find available boats for your clients.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>3 bookings awaiting approval</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <p>2 trips scheduled</p>
        </CardContent>
      </Card>
    </div>
  );
}
