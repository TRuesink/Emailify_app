const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { Schema } = mongoose; // same as commented out code above

// create a schema for users collection
const userSchema = new Schema({
  googleId: String,
});

// create model with title "users" and Schema userSchema
mongoose.model("users", userSchema);