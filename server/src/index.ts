import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db";

dotenv.config();

const app = express();
// 

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Disaster Coordination Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});