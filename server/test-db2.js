import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const db = mongoose.connection.db;
    const regs = await db.collection("registrations").find().toArray();
    console.log("ALL REGISTRATIONS IN DB:");
    for (const r of regs) {
        console.log(`ID: ${r._id}, event: ${r.event}, user: ${r.user}, status: ${r.status}`);
        const event = await db.collection("events").findOne({ _id: r.event });
        console.log(`  Event isPaid: ${event ? event.isPaid : 'NOT FOUND'}, price: ${event ? event.price : 'N/A'}`);
    }
    process.exit(0);
});
