const STORAGE_KEY = 'snug-wrld-cart'

export function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const items = raw ? JSON.parse(raw) : []
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

export function addToCart(item) {
  const items = readCart()
  const add = Math.max(1, Number(item.quantity) || 1)
  const existing = items.find((entry) => entry.id === item.id && entry.size === item.size)
  if (existing) {
    existing.quantity = (Number(existing.quantity) || 1) + add
  } else {
    items.push({ ...item, quantity: add })
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('snug-cart-change'))
}
