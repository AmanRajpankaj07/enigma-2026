// @/services/incidentService.ts
import axios from "axios";

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
  __v?: number;
}

export interface IncidentResponse {
  success: boolean;
  data: Incident[];
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
  getIncidents: async (): Promise<IncidentResponse> => {
    try {
      const response = await apiClient.get("/incidents/all");
      // Since we return response.data here, our component doesn't need to unwrap it again
      return response.data; 
    } catch (error) {
      console.error("Error in incidentService.getIncidents:", error);
      throw error;
    }
  },
};