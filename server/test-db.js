import mongoose from "mongoose";
import dotenv from "dotenv";
import Registration from "./src/models/Registration.js";
import Event from "./src/models/Events.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const regs = await Registration.find().populate('event').sort({createdAt: -1}).limit(5);
    console.log("Recent Registrations:");
    regs.forEach(r => {
        console.log(`ID: ${r._id}, Status: ${r.status}, User: ${r.user}, Event: ${r.event ? r.event._id : 'null'} - isPaid: ${r.event ? r.event.isPaid : 'N/A'}`);
    });
    process.exit(0);
});
