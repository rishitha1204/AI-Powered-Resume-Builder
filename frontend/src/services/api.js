import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Resume API calls
export const resumeAPI = {
  getAll: () => api.get('/api/resume/all'),
  getById: (id) => api.get(`/api/resume/${id}`),
  create: (data) => api.post('/api/resume/create', data),
  update: (id, data) => api.put(`/api/resume/update/${id}`, data),
  delete: (id) => api.delete(`/api/resume/delete/${id}`),
};

// AI API calls
export const aiAPI = {
  generateSummary: (data) => api.post('/api/ai/generate-summary', data),
  generateObjective: (data) => api.post('/api/ai/generate-objective', data),
  analyzeResume: (data) => api.post('/api/ai/analyze-resume', data),
};
