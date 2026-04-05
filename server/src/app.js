import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";
import connectDB from "./database.js";
import auth from "./routes/auth.js";
import events from "./routes/events.js";
import registrationRoute from "./routes/registration.js";
import clubs from "./routes/clubs.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(logger);
app.use(cookieParser());




const PORT = process.env.PORT || 8080; // ✅ Move here

app.get("/", (req, res) => {
  res.json({
    appname: "EventHub",
    version: "1.0.0",
    port: PORT,
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", auth);
app.use("/api/events", events);
app.use("/api/registrations", registrationRoute);
app.use("/api/clubs", clubs);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listen at port ${PORT}...........`);
});
