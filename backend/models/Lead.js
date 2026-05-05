const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  company:     { type: String },
  email:       { type: String },
  phone:       { type: String },
  source:      { type: String, enum: ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event', 'Other'] },
  salesperson: { type: String },
  status:      { type: String, enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'], default: 'New' },
  deal_value:  { type: Number, default: 0 },

  // For activity timeline bonus
  statusHistory: [{
    from:      { type: String },
    to:        { type: String },
    changedAt: { type: Date, default: Date.now }
  }]

}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);