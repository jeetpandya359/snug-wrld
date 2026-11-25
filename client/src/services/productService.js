import api from './api'

export function fetchProducts() {
  return api.get('/products').then((response) => response.data)
}

export function fetchProductBySlug(slug) {
  return api.get(`/products/${slug}`).then((response) => response.data)
}
