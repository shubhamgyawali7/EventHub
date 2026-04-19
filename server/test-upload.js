import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  try {
    console.log("Uploading...");
    const res = await cloudinary.uploader.upload("https://picsum.photos/200/300", { folder: "eventhub/test" });
    console.log("SUCCESS:", res.secure_url);
  } catch (err) {
    console.error("ERROR:", err);
  }
}
run();
