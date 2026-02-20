//src/controllers/incidentController.ts
import { Request, Response } from "express";
import Incident from "../models/Incident";
import mongoose from "mongoose";
import { uploadImage } from "../services/storage.services";


// Create Incident
export const createIncident = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const { title, description, location, severity } = req.body;

    // 1. Guard clause: Ensure a file was uploaded since 'image' is required in the DB
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "An image file is required.",
      });
    }

    // Upload the image
    const uploadResult = await uploadImage(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`
    );

    // 2. Map fields correctly for Mongoose
    const incident = new Incident({
      title,
      description,
      location,
      severity: severity?.toUpperCase(), // Fix: Convert incoming string to uppercase
      image: uploadResult.url,           // Fix: Use 'image' to match the model, not 'imageUrl'
    });

    await incident.save();

    res.status(201).json({
      success: true,
      data: incident,
    });

  } catch (error) {
    console.error("Create incident error:", error);

    res.status(500).json({
      success: false,
      message: "Error creating incident",
    });
  }
};


// Get all incidents
export const getAllIncidents = async (req: Request, res: Response) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: incidents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching incidents",
      error,
    });
  }
};


// Get incident by ID
export const getIncidentById = async (req: Request, res: Response) => {
  console.log("Received request to get incident by ID:", req.params.id);
  try {
    const { id } = req.params;

    // ✅ Check if valid Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Incident ID",
      });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.status(200).json({
      success: true,
      data: incident,
    });

  } catch (error) {
    console.error("Error fetching incident by ID:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};