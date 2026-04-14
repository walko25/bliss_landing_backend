const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// All posts routes require authentication
router.use(authMiddleware);

// GET /posts — get the current user's post history
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('postHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.postHistory);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching posts' });
  }
});

// POST /posts — add a new post to history
router.post('/', async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $push: { postHistory: { content } } },
      { new: true, select: 'postHistory' }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPost = user.postHistory[user.postHistory.length - 1];
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error creating post' });
  }
});

// DELETE /posts/:postId — delete a post from history
router.delete('/:postId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { postHistory: { _id: req.params.postId } } },
      { new: true, select: 'postHistory' }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting post' });
  }
});

module.exports = router;
