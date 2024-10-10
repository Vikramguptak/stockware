import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  availability: { type: Boolean, default: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Warehouse', warehouseSchema);