// Schema
import mongoose from "mongoose";

const SavingSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: String, required: true },
  today: { type: String, required: true },
  time: { type: String, required: true },
});

const Saving = mongoose.model("Saving", SavingSchema);

export default Saving;
