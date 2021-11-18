const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PawsSchema = new Schema({
  lostOrFound: { type: String, required: true },
  picture: { type: String, required: true },
  animal: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Paws", PawsSchema);
