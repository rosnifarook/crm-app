const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/authMiddleware');

router.use(auth);

// GET /api/notes/:leadId
router.get('/:leadId', async (req, res) => {
  try {
    const notes = await Note.find({ lead: req.params.leadId })
                            .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/notes/:leadId
router.post('/:leadId', async (req, res) => {
  try {
    const note = await Note.create({
      lead:       req.params.leadId,
      content:    req.body.content,
      created_by: req.user.email
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;