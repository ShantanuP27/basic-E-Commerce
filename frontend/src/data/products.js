// Mock product data (JIRA-2). Used as a fallback until the backend
// /api/products endpoints are wired in (JIRA-4).
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 2499,
    image: 'https://picsum.photos/seed/headphones/400/300',
    description:
      'Over-ear wireless headphones with active noise cancellation and 30-hour battery life.',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 3999,
    image: 'https://picsum.photos/seed/keyboard/400/300',
    description:
      'Compact 75% mechanical keyboard with hot-swappable switches and RGB backlighting.',
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 5999,
    image: 'https://picsum.photos/seed/watch/400/300',
    description:
      'Fitness-focused smart watch with heart-rate tracking, GPS, and AMOLED display.',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 1799,
    image: 'https://picsum.photos/seed/speaker/400/300',
    description:
      'Portable waterproof Bluetooth speaker with deep bass and 12-hour playtime.',
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 1299,
    image: 'https://picsum.photos/seed/hub/400/300',
    description:
      '7-in-1 USB-C hub with HDMI, card readers, and 100W power delivery pass-through.',
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 999,
    image: 'https://picsum.photos/seed/mouse/400/300',
    description:
      'Ergonomic wireless mouse with silent clicks and a rechargeable battery.',
  },
  {
    id: 7,
    name: 'Laptop Stand',
    price: 1499,
    image: 'https://picsum.photos/seed/stand/400/300',
    description:
      'Adjustable aluminium laptop stand for better posture and airflow.',
  },
  {
    id: 8,
    name: 'Webcam 1080p',
    price: 2199,
    image: 'https://picsum.photos/seed/webcam/400/300',
    description:
      'Full HD 1080p webcam with autofocus and a built-in noise-reducing mic.',
  },
]

export default products
