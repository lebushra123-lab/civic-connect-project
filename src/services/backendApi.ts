const API_PREFIX = process.env.REACT_APP_API_PREFIX || '';

/* ✅ Citizen-only registration */
export async function register(payload: {
  name?: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_PREFIX}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, role: 'citizen' }) // 🔒 enforced
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ✅ Admin: Create Staff */
export async function createStaff(payload: {
  name: string;
  email: string;
  password: string;
  role: string;
  department?: string;
}) {
  const res = await fetch(`${API_PREFIX}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ✅ Universal login */
export async function login(payload: {
  email: string;
  password: string;
  role?: string;
}) {
  const res = await fetch(`${API_PREFIX}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem('cc_token', token);
  else localStorage.removeItem('cc_token');
}

export function getToken() {
  return localStorage.getItem('cc_token');
}

/* 🛠 Admin usage only */
export async function listUsers(query: { role?: string; department?: string }) {
  const params = new URLSearchParams(query as any).toString();
  const res = await fetch(`${API_PREFIX}/api/auth/users?${params}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_PREFIX}/api/complaints/stats`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateUser(id: string, payload: any) {
  const res = await fetch(`${API_PREFIX}/api/auth/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_PREFIX}/api/auth/users/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default {
  register,
  createStaff,
  login,
  setToken,
  getToken,
  listUsers,
  getStats,
  updateUser,
  deleteUser
};
