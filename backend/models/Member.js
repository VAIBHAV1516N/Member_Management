
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: String,
  mobile: String,
  city: String,
  membershipType: {
    type: String,
    enum: ["Basic", "Premium"],
    default: "Basic"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);
