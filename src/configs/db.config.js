const mongoose = require("mongoose");

connectDB().catch((err) =>
   app
      .sendStatus(500)
      .json({ status: 500, message: "Something went wrong. Please try again later" })
);
async function connectDB() {
   await mongoose.connect(process.env.MONGODB_URI);
}
