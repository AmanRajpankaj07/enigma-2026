import express from "express";
import {
  createResource,
  getAllResources,
  assignResourceToIncident,
  getResourcesByIncident,
  updateResourceStatus,
} from "../controllers/resourceController";
const router = express.Router();

router.post("/create", createResource);

router.get("/all", getAllResources);

router.post("/assign", assignResourceToIncident);

router.get("/by-incident/:incidentId", getResourcesByIncident);

router.patch("/:resourceId/status", updateResourceStatus);

export default router;