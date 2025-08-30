import mongoose from "mongoose";
import Admin from "../models/admin.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "admin" });
    
    if (existingAdmin) {
      console.log("Admin user already exists. Skipping seed.");
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      username: "admin",
      password: "admin", // This will be hashed by the pre-save hook
      email: "admin@materix.com",
      name: "System Administrator",
      role: "super_admin",
      permissions: [
        "manage_portfolio",
        "manage_users", 
        "manage_settings",
        "view_analytics"
      ],
      isActive: true,
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log("✅ Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin");
    console.log("⚠️  IMPORTANT: Change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
