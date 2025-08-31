import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import User from "../models/user.js";
import Workspace from "../models/workspace.js";
import UserWorkspaceAssignment from "../models/user-workspace-assignment.js";

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

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    // Check if current admin has access
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const users = await User.find({}, { password: 0, twoFAOtp: 0, twoFAOtpExpires: 0 });
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Approve user for workspace creation
const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isApproved, role } = req.body;

    // Check if current admin has access
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user approval status and role
    user.isApproved = isApproved;
    if (role) {
      user.defaultRole = role;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isApproved: user.isApproved,
        defaultRole: user.defaultRole,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Promote user to admin
const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if current admin has access
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.defaultRole = "admin";
    user.isApproved = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User promoted to admin successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        defaultRole: user.defaultRole,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Demote user to viewer
const demoteToViewer = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if current admin has access
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent demoting yourself (if admin is also a user)
    if (user._id.toString() === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot demote yourself",
      });
    }

    user.defaultRole = "viewer";
    user.isApproved = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User demoted to viewer successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        defaultRole: user.defaultRole,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    // Check if current admin has access
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const totalUsers = await User.countDocuments();
    const approvedUsers = await User.countDocuments({ isApproved: true });
    const pendingUsers = await User.countDocuments({ isApproved: false });
    const adminUsers = await User.countDocuments({ defaultRole: "admin" });
    const viewerUsers = await User.countDocuments({ defaultRole: "viewer" });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        approvedUsers,
        pendingUsers,
        adminUsers,
        viewerUsers,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all workspaces (admin only)
const getAllWorkspaces = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const workspaces = await Workspace.find()
      .populate("owner", "name email")
      .populate("members.user", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: workspaces
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user workspace assignments
const getUserWorkspaceAssignments = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const { userId } = req.params;

    const assignments = await UserWorkspaceAssignment.find({ user: userId })
      .populate("workspace", "name description color")
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Assign workspace to user
const assignWorkspaceToUser = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const { userId } = req.params;
    const { workspaceId, role } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Check if assignment already exists
    const existingAssignment = await UserWorkspaceAssignment.findOne({
      user: userId,
      workspace: workspaceId,
    });

    if (existingAssignment) {
      // Update existing assignment
      existingAssignment.role = role || existingAssignment.role;
      existingAssignment.isActive = true;
      await existingAssignment.save();

      return res.status(200).json({
        success: true,
        message: "Workspace assignment updated successfully",
        data: existingAssignment,
      });
    }

    // Create new assignment
    const assignment = await UserWorkspaceAssignment.create({
      user: userId,
      workspace: workspaceId,
      assignedBy: req.admin._id,
      role: role || "viewer",
    });

    // Add user to workspace members if not already a member
    const isMember = workspace.members.some(
      (member) => member.user.toString() === userId.toString()
    );

    if (!isMember) {
      workspace.members.push({
        user: userId,
        role: role || "viewer",
        joinedAt: new Date(),
      });
      await workspace.save();
    }

    res.status(201).json({
      success: true,
      message: "Workspace assigned successfully",
      data: assignment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Remove workspace assignment from user
const removeWorkspaceAssignment = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const { userId, workspaceId } = req.params;

    // Find and deactivate assignment
    const assignment = await UserWorkspaceAssignment.findOne({
      user: userId,
      workspace: workspaceId,
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Workspace assignment not found",
      });
    }

    assignment.isActive = false;
    await assignment.save();

    // Remove user from workspace members
    const workspace = await Workspace.findById(workspaceId);
    if (workspace) {
      workspace.members = workspace.members.filter(
        (member) => member.user.toString() !== userId
      );
      await workspace.save();
    }

    res.status(200).json({
      success: true,
      message: "Workspace assignment removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get workspace assignment statistics
const getWorkspaceAssignmentStats = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    const totalAssignments = await UserWorkspaceAssignment.countDocuments({ isActive: true });
    const totalWorkspaces = await Workspace.countDocuments();
    const totalUsers = await User.countDocuments({ isApproved: true });

    res.status(200).json({
      success: true,
      data: {
        totalAssignments,
        totalWorkspaces,
        totalUsers,
        averageAssignmentsPerUser: totalUsers > 0 ? (totalAssignments / totalUsers).toFixed(2) : 0,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  getAllUsers,
  approveUser,
  promoteToAdmin,
  demoteToViewer,
  getUserStats,
  getAllWorkspaces,
  getUserWorkspaceAssignments,
  assignWorkspaceToUser,
  removeWorkspaceAssignment,
  getWorkspaceAssignmentStats,
};
