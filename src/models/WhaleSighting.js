const mongoose = require('mongoose');

const whaleSightingSchema = new mongoose.Schema(
  {
    species: { type: String, required: true },
    location: { type: String, required: true },
    count: { type: Number, required: true, min: 1 },
    direction: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhaleSighting', whaleSightingSchema);
