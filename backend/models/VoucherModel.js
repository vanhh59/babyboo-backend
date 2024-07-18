import mongoose from "mongoose";

const voucherSchema = mongoose.Schema(
  {
    voucherDiscount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;