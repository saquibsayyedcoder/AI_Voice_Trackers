import api from './api'

export const voiceService = {
  parse: (transcript) => api.post('/voice/parse', { transcript }),
  test: (text) => api.post('/voice/test', { text }),
}