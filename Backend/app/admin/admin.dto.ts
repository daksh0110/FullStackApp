import { Document } from 'mongoose';

export interface AdminDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin'; 
  refreshToken: string | null; 
  createdAt?: Date;
  updatedAt?: Date;
}
