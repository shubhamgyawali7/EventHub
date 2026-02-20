import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";
import connectDB from "./database.js";
import auth from "./routes/auth.js";
import events from './routes/events.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 8080; // ✅ Move here

app.get("/", (req, res) => {
  res.json({
    appname: "EventHub",
    version: "1.0.0",
    port: PORT,
  });
});

app.use("/api/auth", auth);
app.use ('/api/events',events);

app.listen(PORT, () => {
  console.log(`Server is listen at port ${PORT}...........`);
});
