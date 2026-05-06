import axios from 'axios';

function resolveApiBaseURL() {
  const fromEnv = (process.env.REACT_APP_API_URL || '').trim().replace(/\/+$/, '');
  if (fromEnv) {
    return fromEnv.endsWith('/api') ? fromEnv : `${fromEnv}/api`;
  }
  // Production: same-origin `/api/*` proxied via frontend/vercel.json → Railway (works even if env var missing at build).
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:5000/api';
}

const API = axios.create({
  baseURL: resolveApiBaseURL(),
});

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const login = (data) => API.post('/auth/login', data);

// Leads
export const getLeads = (params) => API.get('/leads', { params });
export const getLead = (id) => API.get(`/leads/${id}`);
export const createLead = (data) => API.post('/leads', data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);

// Notes
export const getNotes = (leadId) => API.get(`/notes/${leadId}`);
export const createNote = (leadId, data) => API.post(`/notes/${leadId}`, data);