import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const setupAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ defaultRole: "admin" });
    
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123456", salt);

    // Create admin user
    const adminUser = await User.create({
      name: "System Administrator",
      email: "admin@materix.com", // Change this to your email
      password: hashedPassword,
      isEmailVerified: true,
      defaultRole: "admin",
      isApproved: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email:", adminUser.email);
    console.log("Password: admin123456");
    console.log("Role: admin");
    console.log("\n⚠️  IMPORTANT: Change the password immediately after first login!");
    console.log("\nYou can now:");
    console.log("1. Login to the admin dashboard");
    console.log("2. Access /admin/users to manage other users");
    console.log("3. Approve users and assign roles");

  } catch (error) {
    console.error("Error setting up admin:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

setupAdmin();
