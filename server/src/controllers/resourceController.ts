import { Request, Response } from "express";
import Resource from "../models/Resource";


// Create resource
export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, type, location } = req.body;

    const resource = new Resource({
      name,
      type,
      location,
    });

    await resource.save();

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating resource",
      error,
    });
  }
};


// Get all resources
export const getAllResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.find();

    res.status(200).json({
      success: true,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching resources",
      error,
    });
  }
};



// Assign resource to incident
export const assignResourceToIncident = async (req: Request, res: Response) => {
  try {
    const { resourceId, incidentId } = req.body;

    // Find resource
    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Check if already assigned
    if (resource.status !== "AVAILABLE") {
      return res.status(400).json({
        success: false,
        message: "Resource is not available",
      });
    }

    // Assign resource
    resource.status = "ASSIGNED";
    resource.currentIncident = incidentId;

    await resource.save();

    res.status(200).json({
      success: true,
      message: "Resource assigned successfully",
      data: resource,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error assigning resource",
      error,
    });
  }
};



// Get resources assigned to specific incident
export const getResourcesByIncident = async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;

    const resources = await Resource.find({
      currentIncident: incidentId,
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assigned resources",
      error,
    });
  }
};





// Update resource status
export const updateResourceStatus = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.params;
    const { status } = req.body;

    const validStatuses = ["AVAILABLE", "ASSIGNED", "IN_TRANSIT", "ARRIVED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    resource.status = status;

    // If resource becomes AVAILABLE, remove incident link
    if (status === "AVAILABLE") {
      resource.currentIncident = null;
    }

    await resource.save();

    res.status(200).json({
      success: true,
      message: "Resource status updated successfully",
      data: resource,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating resource status",
      error,
    });
  }
};