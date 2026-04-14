const mongoose = require('mongoose');

const courtReservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    courtType: { type: String, required: true, enum: ['pickleball', 'tennis'] },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent double-booking
courtReservationSchema.index({ courtType: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('CourtReservation', courtReservationSchema);
