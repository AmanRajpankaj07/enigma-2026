//src/controllers/incidentController.ts
import { Request, Response } from "express";
import Incident from "../models/Incident";
import mongoose from "mongoose";
import { uploadImage } from "../services/storage.services";
import OpenAI from "openai";

// Initialize OpenAI (Make sure OPENAI_API_KEY is in your .env file)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create Incident
export const createIncident = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const { title, description, location, severity } = req.body;

    // 1. Guard clause: Ensure a file was uploaded since 'image' is required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "An image file is required.",
      });
    }

    // --- AI VALIDATION STEP ---
    // Convert the image buffer to a base64 data URL string for OpenAI
    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    const prompt = `
      You are a disaster response moderator. 
      A user is reporting with the title: "${title}" and description: "${description}".
      Does the provided image realistically show a lighter burning that matches this text?
      Reply strictly with "VALID" if it matches, or "INVALID" if it is unrelated, fake, or spam.
    `;

    // Call OpenAI Vision API
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      max_tokens: 10, // We only need a 1-word response
    });

    const validationResult = aiResponse.choices[0]?.message?.content?.trim().toUpperCase() || "";

    // If OpenAI says it's not a match, reject it immediately and prompt a retake
    if (validationResult.includes("INVALID")) {
      return res.status(400).json({
        success: false,
        errorType: "IMAGE_MISMATCH",
        message: "Retake picture, image doesn't match the title.",
      });
    }
    // --- END AI VALIDATION STEP ---

    // 2. Upload the valid image to ImageKit
    const uploadResult = await uploadImage(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`
    );

    // 3. Map fields correctly for Mongoose
    const incident = new Incident({
      title,
      description,
      location,
      severity: severity?.toUpperCase(), // Convert incoming string to uppercase
      image: uploadResult.url,           // Match the model field 'image'
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