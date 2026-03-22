const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all messages
router.get('/', auth, async (req, res) => {
  try {
    const { roomId = 'general', limit = 50, page = 1 } = req.query;

    const messages = await Message.find({ roomId })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 })
      .populate('userId', 'username email');

    res.json({ success: true, messages: messages.reverse() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching messages' });
  }
});

// Get message count
router.get('/count/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const count = await Message.countDocuments({ roomId });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
