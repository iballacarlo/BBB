import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost/barangay_api/api.php',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Auto-attach token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
