import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eventhub/profiles",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face", quality: "auto" }],
  },
});

const uploadProfile = multer({
  storage: profileStorage,
});

const app = express();

app.post('/upload', uploadProfile.single('profilePicture'), (req, res) => {
  if (req.file) {
    res.json({ url: req.file.path });
  } else {
    res.status(400).json({ error: 'No file' });
  }
});

app.listen(9999, () => {
    console.log("Test server running on port 9999");
});
