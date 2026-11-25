export function formatPrice(amount, currency = 'INR') {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return ''
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
