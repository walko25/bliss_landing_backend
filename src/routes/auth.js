const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    console.log('Signup attempt for:', email);
    const existing = await User.findOne({ email });
    console.log('Existing check done:', !!existing);
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    console.log('Creating user...');
    const user = await User.create({ name, email, password });
    console.log('User created:', user._id);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Token signed');

    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Signup error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
