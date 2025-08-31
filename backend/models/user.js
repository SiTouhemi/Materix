import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    profilePicture: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    is2FAEnabled: { type: Boolean, default: false },
    twoFAOtp: { type: String, select: false },
    twoFAOtpExpires: { type: Date, select: false },
    defaultRole: {
      type: String,
      enum: ["viewer", "member", "admin", "owner"],
      default: "viewer",
    },
    isApproved: {
      type: Boolean,
      default: false, // Only approved users can create workspaces
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
