//src/routes/incidentRoutes.ts
import express from "express";
import {
  createIncident,
  getAllIncidents,
  getIncidentById,
} from "../controllers/incidentController";
import upload from "../utils/multer";

const router = express.Router();

router.post("/create", upload.single("image"),createIncident);

router.get("/all", getAllIncidents);

router.get("/:id", getIncidentById);


export default router;