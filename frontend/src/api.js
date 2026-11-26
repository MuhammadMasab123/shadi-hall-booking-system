// API helper - Axios se frontend forms backend ko data bhejte hain
// Flow: React component -> Axios (yahan) -> Express server -> Routes -> Controller
import axios from 'axios'

const API_URL = 'http://localhost:5000'

// Axios instance - har request isi se jayegi
const api = axios.create({ baseURL: API_URL })

// Request interceptor - har request ke saath token bhejo
// Backend verifyToken isay check karta hai
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

// Token localStorage mein save hota hai - login ke baad LoginForm isay save karta hai
export function saveToken(token, user) {
  localStorage.setItem('token', token)
  if (user) localStorage.setItem('user', JSON.stringify(user))
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Har request ke saath token bhejo - backend verifyToken isay check karta hai
export function authHeaders() {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = 'Bearer ' + token
  return headers
}

// Forms ke liye - POST request Axios se
export async function submitForm(path, data) {
  try {
    const res = await api.post(path, data)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Something went wrong')
  }
}

// Manage Data (GET / PUT / DELETE) ke liye - Axios se, token ke saath
export async function apiFetch(path, options = {}) {
  try {
    const method = (options.method || 'GET').toLowerCase()
    let data
    if (options.body) {
      data = typeof options.body === 'string' ? JSON.parse(options.body) : options.body
    }
    const res = await api.request({ url: path, method, data })
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Something went wrong')
  }
}
