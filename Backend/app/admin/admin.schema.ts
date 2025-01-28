import mongoose, { Schema } from 'mongoose';
import { AdminDocument } from './admin.dto';

const AdminSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'admin' }, 
    refreshToken: { type: String, default: null }, // Add refresh token field
  },
  { timestamps: true }
);

const Admin = mongoose.model<AdminDocument>('Admin', AdminSchema);

export { Admin };
