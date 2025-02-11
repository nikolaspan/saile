"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import boatsData from "./boats.json";

// Boat Type Definition
type Boat = {
  id: number;
  name: string;
  type: string;
  length: number;
  capacity: number;
};

export default function BoatsPage() {
  const router = useRouter();
  const [boats, setBoats] = useState<Boat[]>(boatsData);
  const [newBoat, setNewBoat] = useState<Omit<Boat, "id">>({
    name: "",
    type: "Catamaran",
    length: 0,
    capacity: 0,
  });

  const handleAddBoat = () => {
    if (!newBoat.name || newBoat.length <= 0 || newBoat.capacity <= 0) return;
    setBoats((prevBoats) => [
      ...prevBoats,
      { ...newBoat, id: prevBoats.length + 1 },
    ]);
    setNewBoat({ name: "", type: "Catamaran", length: 0, capacity: 0 });
  };

  return (
    <DashboardLayout role="B2B">
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold">Manage Boats</h1>

        {/* Add Boat Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Boat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Boat</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Name</Label>
              <Input
                placeholder="Enter boat name"
                value={newBoat.name}
                onChange={(e) =>
                  setNewBoat({ ...newBoat, name: e.target.value })
                }
              />
              <Label>Type</Label>
              <Select
                value={newBoat.type}
                onValueChange={(value) =>
                  setNewBoat({ ...newBoat, type: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Boat Type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Catamaran",
                    "Yacht",
                    "Monohull",
                    "RIB",
                    "Speedboat",
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Length (ft)</Label>
              <Input
                type="number"
                placeholder="Enter boat length"
                value={newBoat.length}
                onChange={(e) =>
                  setNewBoat({ ...newBoat, length: Number(e.target.value) })
                }
              />
              <Label>Capacity (People)</Label>
              <Input
                type="number"
                placeholder="Enter boat capacity"
                value={newBoat.capacity}
                onChange={(e) =>
                  setNewBoat({ ...newBoat, capacity: Number(e.target.value) })
                }
              />
              <Button onClick={handleAddBoat} variant="default" className="w-full">
                Add Boat
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Boats List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Boats List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left px-4 py-2">
                    Boat Name
                  </TableHead>
                  <TableHead className="text-left px-4 py-2">Type</TableHead>
                  <TableHead className="text-right px-4 py-2">
                    Length (ft)
                  </TableHead>
                  <TableHead className="text-right px-4 py-2">
                    Capacity
                  </TableHead>
                  <TableHead className="text-center px-4 py-2">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boats.map((boat) => (
                  <TableRow key={boat.id}>
                    <TableCell className="px-4 py-2">{boat.name}</TableCell>
                    <TableCell className="px-4 py-2">{boat.type}</TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      {boat.length} ft
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      {boat.capacity}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          sessionStorage.setItem(
                            "selectedBoatId",
                            boat.id.toString()
                          );
                          router.push(`/dashboard/b2b/boats/${boat.id}`);
                        }}
                      >
                        View <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
