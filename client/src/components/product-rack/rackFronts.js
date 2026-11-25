const RACK_FRONT = {
  'tshirt-01': 'white.png',
  'tshirt-02': 'black.png',
  'tshirt-03': 'Sand Beige.png',
  'tshirt-04': 'Stone Grey.png',
  'tshirt-05': 'Cream.png',
  'tshirt-06': 'Olive Green.png',
  'tshirt-07': 'Chocolate Brown.png',
  'tshirt-08': 'Navy Blue.png',
  'tshirt-09': 'Charcoal.png',
  'tshirt-10': 'Dusty Rose.png',
}

export function rackFrontSrc(id) {
  const file = RACK_FRONT[id]
  return file ? `/images/rack/front-side/${encodeURIComponent(file)}` : ''
}
