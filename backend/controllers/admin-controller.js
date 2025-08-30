import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

// Generate JWT token for admin
const generateAdminToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username: username.toLowerCase() }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Check if account is locked
    if (admin.isLocked()) {
      return res.status(423).json({
        success: false,
        message: "Account is temporarily locked due to multiple failed login attempts. Please try again later.",
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated.",
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await admin.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateAdminToken(admin._id);

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        admin: adminResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Get admin profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (profilePicture) updateData.profilePicture = profilePicture;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: admin,
    });
  } catch (error) {
    console.error("Update admin profile error:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Change Admin Password
export const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long.",
      });
    }

    const admin = await Admin.findById(req.admin._id).select("+password");

    // Verify current password
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change admin password error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin Logout
export const adminLogout = async (req, res) => {
  try {
    // In a more complex system, you might want to blacklist the token
    // For now, we'll just return a success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Admin logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Admin Dashboard Stats
export const getAdminDashboardStats = async (req, res) => {
  try {
    // Import Portfolio model
    const Portfolio = (await import("../models/portfolio.js")).default;
    
    const totalPortfolioItems = await Portfolio.countDocuments();
    const publishedItems = await Portfolio.countDocuments({ status: 'published' });
    const draftItems = await Portfolio.countDocuments({ status: 'draft' });
    const featuredItems = await Portfolio.countDocuments({ featured: true });

    // Get recent portfolio items
    const recentItems = await Portfolio.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name status createdAt');

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalPortfolioItems,
          publishedItems,
          draftItems,
          featuredItems,
        },
        recentItems,
      },
    });
  } catch (error) {
    console.error("Get admin dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
