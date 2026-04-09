import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('onboardai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('onboardai_token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ AUTH API ============
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// ============ GUIDES API ============
export const guidesAPI = {
  getAll: (params) => api.get('/guides', { params }),
  getStats: () => api.get('/guides/stats'),
  getOne: (id) => api.get(`/guides/${id}`),
  getShared: (slug) => api.get(`/guides/shared/${slug}`),
  update: (id, data) => api.put(`/guides/${id}`, data),
  togglePublic: (id) => api.patch(`/guides/${id}/toggle-public`),
  delete: (id) => api.delete(`/guides/${id}`),
  // Checklist
  updateChecklist: (id, data) => api.patch(`/guides/${id}/checklist`, data),
  generateChecklist: (id) => api.post(`/guides/${id}/checklist/generate`),
  // Manager
  getManagerOverview: () => api.get('/guides/manager/overview'),
  // Chat
  chat: (id, message) => api.post(`/guides/${id}/chat`, { message }),
};

// ============ GENERATE API ============
export const generateAPI = {
  generate: (data) => api.post('/generate', data),
  save: (data) => api.post('/generate/save', data),
  regenerateSection: (data) => api.post('/generate/section', data),
  // AI Suggestions
  suggest: (data) => api.post('/suggest', data),
};

export default api;
