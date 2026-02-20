import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db";
import incidentRoutes from "./routes/incidentRoutes";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Test working" });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});