export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'accessories', label: 'Accessories' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const PRODUCTS = [
  { slug: 'pace-tee', name: 'Pace Tee', category: 'tops', price: 28, color: '#2F5D50', blurb: 'Lightweight running tee with mesh back panel.', stock: 12 },
  { slug: 'lift-tank', name: 'Lift Tank', category: 'tops', price: 24, color: '#B8432F', blurb: 'Dropped-armhole tank for heavy pulling days.', stock: 8 },
  { slug: 'warmup-hoodie', name: 'Warm-up Hoodie', category: 'tops', price: 58, color: '#3A4A6B', blurb: 'Midweight fleece for the walk to the gym.', stock: 0 },
  { slug: 'stride-shorts', name: 'Stride Shorts', category: 'bottoms', price: 34, color: '#22303C', blurb: '5" shorts with a zip phone pocket.', stock: 15 },
  { slug: 'squat-joggers', name: 'Squat Joggers', category: 'bottoms', price: 52, color: '#5B5F4A', blurb: 'Stretch joggers that survive deep squats.', stock: 6 },
  { slug: 'seamless-leggings', name: 'Seamless Leggings', category: 'bottoms', price: 46, color: '#6B3A55', blurb: 'High-rise, squat-proof, no front seam.', stock: 20 },
  { slug: 'chalk-bag', name: 'Chalk Bag', category: 'accessories', price: 16, color: '#C9A227', blurb: 'Belt-clip chalk bag with brush loop.', stock: 30 },
  { slug: 'lifting-straps', name: 'Lifting Straps', category: 'accessories', price: 18, color: '#4A4A4A', blurb: 'Padded cotton straps for deadlifts and rows.', stock: 25 },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const PROMO_CODES = { TEMPO10: 0.1 };
export const FREE_SHIPPING_FROM = 75;
export const SHIPPING_FEE = 6;
