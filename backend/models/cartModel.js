import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
    },
    quantity: {
        type: Number,
        required: false
    }
});

export default mongoose.model("Cart", cartSchema);
