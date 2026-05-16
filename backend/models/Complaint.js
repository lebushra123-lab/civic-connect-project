const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, default: 'Complaint' },
  description: String,
  category: String,
  department: String,
  location: String,
  reporter: String,
  status: { type: String, default: 'Pending' }, // Pending, In Progress, Work Completed, Blocked, Verified, Resolved
  supervisor: String,
  worker: String,
  workerNote: String, // Reason for inability to complete or completion notes
  supervisorNote: String, // Final report/verification note by supervisor
  imageUrl: String // Path to uploaded image
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
