import mongoose from '../database/database.js';

const invoiceHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  period: { type: Number, required: true },
  roomPrice: { type: Number, required: true },
  additionalFeatures: [{ type: String }],
  additionalFeaturesBreakdown: [
    {
      feature: { type: String, required: true }, 
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true }, 
}, { timestamps: true });

const InvoiceHistory = mongoose.model('InvoiceHistory', invoiceHistorySchema);

export default InvoiceHistory;
