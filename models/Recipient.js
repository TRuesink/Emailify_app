const mongoose = require("mongoose");
const { Schema } = mongoose; // same as commented out code above

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
