const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// -------------------------
// REGISTER
// -------------------------
router.post('/register', async (req, res) => {
  try {
    console.log('📝 REGISTER ATTEMPT:', req.body);
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() }).exec();
    if (existing) return res.status(409).json({ error: 'User already exists' });

    // Assign department if role requires it
    let department = req.body.department || null;

    if (['head', 'supervisor', 'worker'].includes(role)) {
      if (!department) {
        // Fallback: Try to guess from email
        const lowerEmail = email.toLowerCase();
        if (lowerEmail.includes('road')) department = 'Roads Maintenance';
        else if (lowerEmail.includes('drain')) department = 'Urban Drainage';
        else if (lowerEmail.includes('waste')) department = 'Waste Management';
      }

      if (!department) {
        return res.status(400).json({
          error: 'Department is required for staff roles. Please select one or use a department-specific email.'
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create user
    const user = new User({
      name: name || null,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'citizen',
      department
    });
    console.log('💾 SAVING USER:', user);
    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role, department },
      JWT_SECRET
    );

    // Return user + token
    res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        department
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// -------------------------
// LOGIN
// -------------------------
router.post('/login', async (req, res) => {
  try {
    console.log('🔥 LOGIN HIT');
    console.log('BODY:', req.body);

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() }).exec();
    console.log('USER FOUND:', user ? 'YES' : 'NO');

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('PASSWORD MATCH:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Self-repair department if missing
    if (!user.department && ['head', 'supervisor', 'worker'].includes(user.role)) {
      const lowerEmail = user.email.toLowerCase();
      if (lowerEmail.includes('road')) user.department = 'Roads Maintenance';
      else if (lowerEmail.includes('drain')) user.department = 'Urban Drainage';
      else if (lowerEmail.includes('waste')) user.department = 'Waste Management';
      if (user.department) await user.save();
    }

    // Create token
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role, department: user.department },
      JWT_SECRET
    );

    // Return user + token
    res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      },
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// -------------------------
// LIST USERS
// -------------------------
router.get('/users', async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.department) filter.department = req.query.department;

    const users = await User.find(filter).select('-password').exec();
    res.json(users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// -------------------------
// UPDATE USER
// -------------------------
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const updates = { name, role, department };

    if (email) updates.email = email.toLowerCase();

    // Hash new password if provided
    if (password && password.trim() !== '') {
      updates.password = await bcrypt.hash(password, 8);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password').exec();
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// -------------------------
// DELETE USER
// -------------------------
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).exec();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
