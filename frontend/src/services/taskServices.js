import api from './api'

export const taskService = {
  getAll: (params) => api.get('/tasks', { params }),
  get: (id) => api.get(`/tasks/${id}`),
  create: (taskData) => api.post('/tasks', taskData),
  update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  delete: (id) => api.delete(`/tasks/${id}`),
  bulkUpdateStatus: (updates) => api.put('/tasks/bulk/status', { updates }),
}