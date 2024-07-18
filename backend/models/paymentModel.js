import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    voucher: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Voucher" 
    },

    priceBeforeDiscount: {
      type: Number,
      required: true,
    },

    priceAfterDiscount: {
        type: Number,
        required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    isPayment: {
      type: Boolean,
      required: true,
      default: false,
    },

    detail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;