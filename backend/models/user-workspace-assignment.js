import mongoose, { Schema } from "mongoose";

const userWorkspaceAssignmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "member", "admin", "viewer"],
      default: "viewer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Ensure unique user-workspace combinations
userWorkspaceAssignmentSchema.index({ user: 1, workspace: 1 }, { unique: true });

const UserWorkspaceAssignment = mongoose.model("UserWorkspaceAssignment", userWorkspaceAssignmentSchema);

export default UserWorkspaceAssignment;
