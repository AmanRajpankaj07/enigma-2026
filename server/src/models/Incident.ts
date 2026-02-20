//src/models/Incident.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IIncident extends Document {
  title: string;
  description: string;
  location: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  image: string;
  status: "ACTIVE" | "RESOLVED";
  createdAt: Date;
  updatedAt: Date;
}

const IncidentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RESOLVED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIncident>("Incident", IncidentSchema);