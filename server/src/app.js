import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";
import connectDB from "./database.js";


import auth from "./routes/auth.js";

const app = express();
dotenv.config();
await connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
// app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    appname: "EventHub",
    version: "1.0.0",
    port: PORT,
  });
});

app.use("/api/auth", auth);


const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



export default app;
