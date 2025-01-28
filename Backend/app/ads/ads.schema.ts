import mongoose, { Document, Schema } from 'mongoose';
import { AdDocument } from './ads.dto';
const AdSchema: Schema = new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      mediaUrl: { type: String, required: true },
      pricePerView: { type: Number, required: true },
      pricePerClick: { type: Number, required: true },
      totalViews: { type: Number, default: 0 },
      totalClicks: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true } 
  );
  


  const Ad = mongoose.model<AdDocument>('Ad', AdSchema);
export { Ad };