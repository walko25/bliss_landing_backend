const router = require('express').Router();
const CourtReservation = require('../models/CourtReservation');

// GET /reservations?date=YYYY-MM-DD — get all reservations for a date
router.get('/', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'Date is required' });
  try {
    const reservations = await CourtReservation.find({ date });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching reservations' });
  }
});

// POST /reservations — create a reservation
router.post('/', async (req, res) => {
  const { name, courtType, date, timeSlot } = req.body;
  if (!name || !courtType || !date || !timeSlot) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const reservation = await CourtReservation.create({ name, courtType, date, timeSlot });
    res.status(201).json(reservation);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'That time slot is already booked' });
    }
    res.status(500).json({ message: 'Server error creating reservation' });
  }
});

module.exports = router;
