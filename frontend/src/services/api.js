import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
})

export const getProducts = (params = {}) =>
  api.get('/b2c/products', { params })

export const getProduct = (slug) =>
  api.get(`/b2c/products/${slug}`)

export const getCategories = () =>
  api.get('/b2c/categories')

export default api
