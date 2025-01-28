import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  refreshToken?: string;
  walletBalance: number;  // Add this line for wallet balance
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],  // Update enum to include 'admin'
      default: "user",
    },
    refreshToken: {
      type: String,
      default: null,
    },
    walletBalance: {
      type: Number,
      default: 0,  // Initialize wallet balance to 0
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
