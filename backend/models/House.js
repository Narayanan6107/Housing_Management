const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
  {
    loanNo: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    locationUrl: {
      type: String,   // Google Maps / any map link
      trim: true,
    },
    imageUrls: {
      type: [String],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
      default: [],
    },
    videoUrls: {
      type: [String],
      validate: [arrayLimitVideo, '{PATH} exceeds the limit of 5'],
      default: [],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

function arrayLimitVideo(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('House', houseSchema);
