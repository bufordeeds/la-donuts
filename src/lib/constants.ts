export const SITE_CONFIG = {
  name: 'La Donuts',
  tagline: 'Fresh handmade donuts in Gillette, WY',
  description:
    'Warm, fluffy donuts made fresh every morning — classic favorites, filled donuts, and rotating specialty flavors.',
  phone: '210-336-0450',
  email: 'orders@la-donuts.com',
  address: {
    street: '2100 S Douglas Hwy',
    city: 'Gillette',
    state: 'WY',
    zip: '82718',
  },
  venueName: 'Advance Auto Parts',
  hours: {
    sunday: 'Closed',
    monday: 'Closed',
    tuesday: '6:30 AM - sold out',
    wednesday: '6:30 AM - sold out',
    thursday: '6:30 AM - sold out',
    friday: '6:30 AM - sold out',
    saturday: '6:30 AM - sold out',
  },
  social: {
    facebook: 'https://www.facebook.com/share/17WTpMxeov/?mibextid=wwXIfr',
    instagram: '',
    x: '',
  },
  messengerUrl: 'https://www.facebook.com/share/17WTpMxeov/?mibextid=wwXIfr',
  bookingUrl: '/order',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=2100+S+Douglas+Hwy+Gillette+WY+82718',
} as const

export const NAVIGATION_ITEMS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Order', href: '/order' },
  { label: 'About', href: '/about' },
] as const
