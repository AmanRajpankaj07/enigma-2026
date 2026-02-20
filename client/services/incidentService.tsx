import axios from "axios";

const baseUrl = "http://localhost:5001/api";

export const incidentService = {
  getIncidents: async () => {
    try {
      const response = await axios.get(`${baseUrl}/incidents/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching incidents:", error);
      throw error;
    }
  },
};