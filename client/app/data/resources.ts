import {
  Ambulance,
  Flame,
  Radar,
  Shell,
  Ship,
  Tent,
  Truck,
  Radio,
} from "lucide-react";

export type ResourceStatus = "standby" | "in-transit";

export interface Resource {
  id: string;
  name: string;
  icon: typeof Ambulance;
  totalUnits: number;
  deployed: number;
  status: ResourceStatus;
  location: string;
  fuelLevel: number; // 0-100
}

export const resources: Resource[] = [
  {
    id: "ambulances",
    name: "Ambulances",
    icon: Ambulance,
    totalUnits: 12,
    deployed: 8,
    status: "in-transit",
    location: "Central Medical Base",
    fuelLevel: 72,
  },
  {
    id: "fire-trucks",
    name: "Fire Trucks",
    icon: Flame,
    totalUnits: 15,
    deployed: 6,
    status: "standby",
    location: "Station Alpha-7",
    fuelLevel: 91,
  },
  {
    id: "drones",
    name: "Drones",
    icon: Radar,
    totalUnits: 20,
    deployed: 14,
    status: "in-transit",
    location: "Aerial Command Post",
    fuelLevel: 58,
  },
  {
    id: "helicopters",
    name: "Helicopters",
    icon: Shell,
    totalUnits: 5,
    deployed: 3,
    status: "in-transit",
    location: "Helipad Bravo",
    fuelLevel: 64,
  },
  {
    id: "rescue-boats",
    name: "Rescue Boats",
    icon: Ship,
    totalUnits: 8,
    deployed: 2,
    status: "standby",
    location: "Harbor Delta-3",
    fuelLevel: 85,
  },
  {
    id: "medical-tents",
    name: "Medical Tents",
    icon: Tent,
    totalUnits: 10,
    deployed: 7,
    status: "in-transit",
    location: "Field Hospital Zone",
    fuelLevel: 100,
  },
  {
    id: "supply-trucks",
    name: "Supply Trucks",
    icon: Truck,
    totalUnits: 18,
    deployed: 11,
    status: "in-transit",
    location: "Logistics Depot",
    fuelLevel: 47,
  },
  {
    id: "command-units",
    name: "Command Units",
    icon: Radio,
    totalUnits: 4,
    deployed: 2,
    status: "standby",
    location: "HQ Sector-1",
    fuelLevel: 93,
  },
];
