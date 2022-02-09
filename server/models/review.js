const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var reviewSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
     username: {
      type: String,
      required: true,
      maxlength: 5000,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 5000,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
