import mongoose from "mongoose";

const shippingSchema = mongoose.Schema(
  {
    shippingCost: {
      type: Number,
      required: true,
    },

    shippingType: {
      type: String,
      required: true,
    },

    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ShippingAddress = mongoose.model("Shipping", shippingSchema);

export default ShippingAddress;