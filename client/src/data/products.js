export const CATALOG_CURRENCY = 'INR'

/** Temporary display price until the catalog is finalized. */
export const SAMPLE_PRICE = 2490
export const COMPARE_AT_PRICE = 4999

const COLORWAYS = [
  ['tshirt-01', '01', 'Pure White', '#FFFFFF'],
  ['tshirt-02', '02', 'Jet Black', '#111111'],
  ['tshirt-03', '03', 'Sand Beige', '#CDB38F'],
  ['tshirt-04', '04', 'Stone Grey', '#969696'],
  ['tshirt-05', '05', 'Ivory Cream', '#E9E0D0'],
  ['tshirt-06', '06', 'Olive Green', '#68734D'],
  ['tshirt-07', '07', 'Chocolate Brown', '#60412F'],
  ['tshirt-08', '08', 'Midnight Navy', '#1B3048'],
  ['tshirt-09', '09', 'Charcoal Grey', '#414141'],
  ['tshirt-10', '10', 'Dusty Pink', '#C99198'],
]

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export const products = COLORWAYS.map(([id, number, colorName, colorHex]) => ({
  id,
  slug: id,
  name: 'OVERSIZED ESSENTIAL TEE',
  colorName,
  colorHex,
  price: SAMPLE_PRICE,
  compareAtPrice: COMPARE_AT_PRICE,
  currency: CATALOG_CURRENCY,
  sizes: AVAILABLE_SIZES,
  images: {
    front: `/images/products/${id}/front.png`,
    back: `/images/products/${id}/back.png`,
    detail: `/images/products/${id}/detail.png`,
    lifestyle: `/images/products/${id}/lifestyle.png`,
    hanging: `/images/rack/hanging-shirts/rack-${number}.png`,
  },
}))

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null
}
