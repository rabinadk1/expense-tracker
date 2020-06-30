import { model, Schema } from "mongoose";

const TransactionSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Transaction", TransactionSchema);
