// @/services/incidentService.ts
import axios from "axios";
import { get } from "http";

// 1. Define exactly what the data looks like
export interface Incident {
  _id: string;
  title: string;
  description: string;
  location: string;
  severity: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  __v?: number;
}

export interface IncidentResponse {
  success: boolean;
  data: Incident[];
}

export interface resources {
  _id: string;
  name: string;
  type: "FIRE_TRUCK" | "AMBULANCE" | "POLICE" | "BOAT" | "NDRF";
  status: "AVAILABLE" | "ASSIGNED" | "IN_TRANSIT" | "ARRIVED";
  location: string;
  currentIncident:string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 2. In Next.js, client-accessible env vars MUST start with NEXT_PUBLIC_
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const incidentService = {
  // 3. Strongly type the return value
  getAllIncidents: async (): Promise<IncidentResponse> => {
    try {
      const response = await apiClient.get("/incidents/all");
      // Since we return response.data here, our component doesn't need to unwrap it again
      return response.data; 
    } catch (error) {
      console.error("Error in incidentService.getIncidents:", error);
      throw error;
    }
  },

  getIncidentById: async (id: string): Promise<{success:boolean, data: Incident | null}> => {
    try {
      const response = await apiClient.get(`/incidents/${id}`);
      console.log("API response for getIncidentById:", response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching incident with id ${id}:`, error);
      throw error;
    }
  },

  getAllResources: async (): Promise<{success:boolean, data: resources[], error?: string}> => {
    try {
      const response = await apiClient.get("/resources/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error;
    }
  },

  assignResourceToIncident: async (resourceId: string, incidentId: string): Promise<{success:boolean, data?: any, error?: string}> => {
    try {
      const response = await apiClient.post("/resources/assign", { resourceId, incidentId });
      return response.data;
    } catch (error) {
      console.error(`Error assigning resource ${resourceId} to incident ${incidentId}:`, error);
      throw error;
    }
  },

};