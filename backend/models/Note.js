const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  lead:       { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  content:    { type: String, required: true },
  created_by: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);