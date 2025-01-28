import  { Schema, Document } from 'mongoose';

export interface AdDocument extends Document {
  title: string;
  description: string;
  mediaUrl: string;
  pricePerView: number;
  pricePerClick: number;
  totalViews: number;
  totalClicks: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
