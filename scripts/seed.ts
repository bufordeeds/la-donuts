import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('• Hours')
  await payload.updateGlobal({
    slug: 'hours',
    data: {
      schedule: [
        { day: 'sunday', isClosed: true },
        { day: 'monday', isClosed: true },
        { day: 'tuesday', isClosed: false, openTime: '6:30 AM', closeTime: 'until sold out' },
        { day: 'wednesday', isClosed: false, openTime: '6:30 AM', closeTime: 'until sold out' },
        { day: 'thursday', isClosed: false, openTime: '6:30 AM', closeTime: 'until sold out' },
        { day: 'friday', isClosed: false, openTime: '6:30 AM', closeTime: 'until sold out' },
        { day: 'saturday', isClosed: false, openTime: '6:30 AM', closeTime: 'until sold out' },
      ],
      soldOutMessage: 'We sell out daily — come early or message ahead to reserve!',
    },
  })

  console.log('• Location')
  await payload.updateGlobal({
    slug: 'location',
    data: {
      venueName: 'Advance Auto Parts',
      address: '2100 S Douglas Hwy',
      city: 'Gillette',
      state: 'WY',
      zip: '82718',
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=2100+S+Douglas+Hwy+Gillette+WY+82718',
      parkingNote: 'Look for the pink trailer in the parking lot.',
    },
  })

  console.log('• Contact links')
  await payload.updateGlobal({
    slug: 'contact-links',
    data: {
      messengerUrl: 'https://www.facebook.com/share/17WTpMxeov/?mibextid=wwXIfr',
      smsPhone: '210-336-0450',
      email: 'orders@la-donuts.com',
      facebookUrl: 'https://www.facebook.com/share/17WTpMxeov/?mibextid=wwXIfr',
    },
  })

  console.log('• Site settings')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      heroTagline: 'Fresh handmade donuts daily',
      heroSubtitle:
        'Warm, fluffy donuts made fresh every morning — classic favorites, filled donuts, and rotating specialty flavors.',
      primaryColor: '#e11d62',
      accentColor: '#f59e0b',
      orderingEnabled: false,
      sameDayCutoffMinutesBeforeClose: 30,
    },
  })

  console.log('• Sample flavors')
  const seedFlavors = [
    { name: 'Glazed', category: 'classic' as const, description: 'Classic yeast donut, warm glaze.', priceCents: 250, sortOrder: 10, isOnRotation: true, isAvailableToday: true },
    { name: 'Chocolate Iced', category: 'classic' as const, description: 'Glossy chocolate frosting on a fluffy yeast donut.', priceCents: 300, sortOrder: 20, isOnRotation: true, isAvailableToday: true },
    { name: 'Maple', category: 'classic' as const, description: 'Real maple glaze, lightly sweet.', priceCents: 300, sortOrder: 30, isOnRotation: true, isAvailableToday: true },
    { name: 'Cinnamon Sugar', category: 'classic' as const, description: 'Rolled in cinnamon sugar while still warm.', priceCents: 275, sortOrder: 40, isOnRotation: true, isAvailableToday: true },
    { name: 'Boston Cream', category: 'filled' as const, description: 'Vanilla custard filling, chocolate top.', priceCents: 425, sortOrder: 50, isOnRotation: true, isAvailableToday: true },
    { name: 'Oreo', category: 'specialty' as const, description: 'Cookies-and-cream glaze with crushed Oreo.', priceCents: 450, sortOrder: 60, isOnRotation: true, isAvailableToday: false },
    { name: 'Fruity Pebbles', category: 'specialty' as const, description: 'Cereal-topped nostalgia donut.', priceCents: 450, sortOrder: 70, isOnRotation: true, isAvailableToday: false },
    { name: 'Dubai Pistachio', category: 'specialty' as const, description: 'Viral pistachio cream filling with kataifi crunch.', priceCents: 595, sortOrder: 80, isOnRotation: true, isAvailableToday: false },
  ]

  // Upsert-ish: clear out any prior sample flavors with these names, then insert
  for (const flavor of seedFlavors) {
    const existing = await payload.find({
      collection: 'flavors',
      where: { name: { equals: flavor.name } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'flavors',
        id: existing.docs[0].id,
        data: flavor,
      })
    } else {
      await payload.create({
        collection: 'flavors',
        data: flavor,
      })
    }
  }

  console.log('✓ Seed complete')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
