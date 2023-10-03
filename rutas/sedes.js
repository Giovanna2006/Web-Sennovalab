// models/Sede.js
const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema({
  sede_name: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  contact: String,
});

module.exports = mongoose.model("Sede", sedeSchema);
