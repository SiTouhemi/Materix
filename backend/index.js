import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes/index.js";

dotenv.config({ path: './env_ya_bro' });

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));

// db connection
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => console.log("✅ Database Connected successfully."))
  .catch((err) => {
    console.log("❌ Failed to connect to DB:", err.message);
    if (err.message.includes("whitelist")) {
      console.log("💡 Solution: Add your IP address to MongoDB Atlas Network Access whitelist");
      console.log("   Visit: https://cloud.mongodb.com → Network Access → Add IP Address");
    }
  });

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to TaskHub API",
  });
});

// Test endpoint to verify Cloudinary configuration
app.get("/api/test-cloudinary", (req, res) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  res.json({
    cloudName: cloudName ? "Configured" : "Not configured",
    apiKey: apiKey ? "Configured" : "Not configured",
    apiSecret: apiSecret ? "Configured" : "Not configured",
    allConfigured: !!(cloudName && apiKey && apiSecret)
  });
});
// http:localhost:500/api/
app.use("/api", routes);

// error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// not found middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
