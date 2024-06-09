const mongoose = require("mongoose");

connectDB().catch((err) => app.sendStatus(500).json({ message: "server error" }));
async function connectDB() {
   await mongoose.connect(process.env.MONGODB_URI);
}
