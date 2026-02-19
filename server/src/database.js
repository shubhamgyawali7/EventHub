import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URL;

const connectDB = async () => {

  if (!url) {
    console.error("❌ Error: MONGODB_URL is not defined in your .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(url, {
      // This ensures your data goes into the correct database inside your cluster
      dbName: "job_seeking_platform", 
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {

    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
   
    process.exit(1);
  }
};

export default connectDB;