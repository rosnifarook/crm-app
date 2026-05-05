const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/authMiddleware');

router.use(auth);

// GET /api/leads
router.get('/', async (req, res) => {
  try {
    const { status, source, salesperson, search, sort } = req.query;

    const filter = {};
    if (status)      filter.status = status;
    if (source)      filter.source = source;
    if (salesperson) filter.salesperson = salesperson;

    if (search) {
      filter.$or = [
        { name:    { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email:   { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'deal_high') sortOption = { deal_value: -1 };
    if (sort === 'deal_low')  sortOption = { deal_value: 1 };
    if (sort === 'oldest')    sortOption = { createdAt: 1 };

    const leads = await Lead.find(filter).sort(sortOption);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const leadsWithStaleFlag = leads.map(lead => ({
      ...lead.toObject(),
      isStale: lead.updatedAt < sevenDaysAgo && !['Won', 'Lost'].includes(lead.status)
    }));

    res.json(leadsWithStaleFlag);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/leads/:id
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/leads
router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/leads/:id
router.put('/:id', async (req, res) => {
  try {
    const existing = await Lead.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Lead not found' });

    if (req.body.status && req.body.status !== existing.status) {
      await Lead.findByIdAndUpdate(req.params.id, {
        $push: {
          statusHistory: {
            from: existing.status,
            to: req.body.status,
            changedAt: new Date()
          }
        }
      });
    }

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/leads/:id
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;