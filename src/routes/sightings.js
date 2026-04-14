const router = require('express').Router();
const WhaleSighting = require('../models/WhaleSighting');

// GET /sightings — get all sightings, newest first
router.get('/', async (req, res) => {
  try {
    const sightings = await WhaleSighting.find().sort({ createdAt: -1 });
    res.json(sightings);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching sightings' });
  }
});

// POST /sightings — submit a new sighting
router.post('/', async (req, res) => {
  const { species, count, direction, date, time, notes } = req.body;
  if (!species || !count || !direction || !date || !time) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }
  try {
    const sighting = await WhaleSighting.create({ species, count, direction, date, time, notes });
    res.status(201).json(sighting);
  } catch (err) {
    res.status(500).json({ message: 'Server error submitting sighting' });
  }
});

module.exports = router;
