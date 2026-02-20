import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  name: string;
  type: "FIRE_TRUCK" | "AMBULANCE" | "POLICE" | "BOAT" | "NDRF";
  status: "AVAILABLE" | "ASSIGNED" | "IN_TRANSIT" | "ARRIVED";
  location: string;
  currentIncident: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["FIRE_TRUCK", "AMBULANCE", "POLICE", "BOAT", "NDRF"],
      required: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "ASSIGNED", "IN_TRANSIT", "ARRIVED"],
      default: "AVAILABLE",
    },

    location: {
      type: String,
      required: true,
    },

    currentIncident: {
      type: Schema.Types.ObjectId,
      ref: "Incident",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResource>("Resource", ResourceSchema);