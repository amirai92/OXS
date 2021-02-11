const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, require: true },
    debt: { type: Boolean },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
module.exports = mongoose.model("Tenant", tenantSchema);
