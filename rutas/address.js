// models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: String,
  department: String,
  municipality: String,
  nomenclature: String,
});

module.exports = mongoose.model("Address", addressSchema);
