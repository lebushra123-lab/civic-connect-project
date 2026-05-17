const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');

// Create complaint (protected)
const { requireAuth } = require('../middleware/authMiddleware');
router.post('/', requireAuth, async (req, res) => {
  const { title, description, category, location, department, reporter, imageUrl } = req.body;
  // title is optional (defaulted in model)
  const complaint = new Complaint({
    title: title || 'Complaint',
    description: description || '',
    category: category || 'general',
    department: department || 'General',
    location: location || null,
    reporter: reporter || req.user.id,
    status: 'Pending',
    imageUrl: imageUrl || null
  });
  await complaint.save();
  res.status(201).json(complaint);
});

// List
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.reporter) filter.reporter = req.query.reporter;
  if (req.query.department) filter.department = req.query.department;
  if (req.query.supervisor) filter.supervisor = req.query.supervisor;
  if (req.query.worker) filter.worker = req.query.worker;
  if (req.query.status) filter.status = req.query.status;

  console.log('GET /api/complaints Filter:', filter);

  const rows = await Complaint.find(filter).sort({ createdAt: -1 }).exec();
  console.log(`GET /api/complaints Found: ${rows.length} rows`);
  res.json(rows);
});

// stats
router.get('/stats', async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });

    // Latest 10 complaints for the dashboard
    const complaints = await Complaint.find().sort({ createdAt: -1 }).limit(10).exec();

    // Aggregation for byDept
    const byDeptRaw = await Complaint.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]);

    const byDept = {};
    byDeptRaw.forEach(item => {
      if (item._id) byDept[item._id] = item.count;
    });

    res.json({
      total,
      resolved,
      pending,
      inProgress,
      complaints,
      byDept
    });
  } catch (err) {
    console.error('Stats Error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  const c = await Complaint.findById(req.params.id).exec();
  if (!c) return res.status(404).json({ error: 'not found' });
  res.json(c);
});

// Update (protected)
router.put('/:id', requireAuth, async (req, res) => {
  console.log(`PUT /api/complaints/${req.params.id} Body:`, req.body);
  const oldComplaint = await Complaint.findById(req.params.id).exec();
  if (!oldComplaint) return res.status(404).json({ error: 'not found' });

  const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
  
  try {
    if (req.body.status && req.body.status !== oldComplaint.status) {
      if (updated.reporter) {
        await new Notification({
          userId: updated.reporter,
          message: `Your complaint status changed to: ${updated.status}`,
          type: 'STATUS_UPDATE',
          relatedId: updated._id
        }).save();
      }
    }
    
    if (req.body.worker && req.body.worker !== oldComplaint.worker) {
      await new Notification({
        userId: updated.worker,
        message: `You were assigned a new task: ${updated.category}`,
        type: 'ASSIGNMENT',
        relatedId: updated._id
      }).save();
    }
    
    if (req.body.supervisor && req.body.supervisor !== oldComplaint.supervisor) {
      await new Notification({
        userId: updated.supervisor,
        message: `You were assigned as supervisor for: ${updated.category}`,
        type: 'ASSIGNMENT',
        relatedId: updated._id
      }).save();
    }
  } catch (notifErr) {
    console.error('Failed to create notification', notifErr);
  }

  console.log('Updated Complaint:', updated);
  res.json(updated);
});

// Delete (protected)
router.delete('/:id', requireAuth, async (req, res) => {
  const existing = await Complaint.findById(req.params.id).exec();
  if (!existing) return res.status(404).json({ error: 'not found' });
  await Complaint.findByIdAndDelete(req.params.id).exec();
  res.json(existing);
});

module.exports = router;
