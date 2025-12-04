// server.js  <-- entry, dotenv loaded BEFORE anything else
import dotenv from "dotenv";
dotenv.config(); // MUST run first

import app from "./index.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Mongo connected");
    console.log("Loaded OPENAI_API_KEY length:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : "NOT SET");
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
