const fs = require('fs');
const path = require('path');

const filePath = process.env.DB_PATH || path.join(__dirname, 'data.json');

function load() {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: [], complaints: [] };
  }
}

function save(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function getUserByEmail(email) {
  const data = load();
  return data.users.find(u => u.email === (email || '').toLowerCase());
}

function getUserById(id) {
  const data = load();
  return data.users.find(u => u.id === id);
}

function createUser(user) {
  const data = load();
  data.users.push(user);
  save(data);
  return user;
}

function createComplaint(c) {
  const data = load();
  data.complaints.push(c);
  save(data);
  return c;
}

function listComplaints() {
  const data = load();
  return data.complaints.slice().sort((a,b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}

function getComplaintById(id) {
  const data = load();
  return data.complaints.find(c => c.id === id);
}

function updateComplaint(id, updates) {
  const data = load();
  const idx = data.complaints.findIndex(c => c.id === id);
  if (idx === -1) return null;
  data.complaints[idx] = { ...data.complaints[idx], ...updates };
  save(data);
  return data.complaints[idx];
}

function deleteComplaint(id) {
  const data = load();
  const idx = data.complaints.findIndex(c => c.id === id);
  if (idx === -1) return null;
  const removed = data.complaints.splice(idx, 1)[0];
  save(data);
  return removed;
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  createComplaint,
  listComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
};
