const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Address Schema
const AddressSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  employer: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Address", AddressSchema);
