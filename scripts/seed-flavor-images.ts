/**
 * Uploads the 8 generated flavor photos to Payload Media and attaches each
 * to its Flavor doc by name match. Idempotent — re-uploads replace existing
 * image.
 *
 * Usage (on VPS, via migrator image):
 *   docker compose -f docker-compose.prod.yml --profile tools run --rm \
 *     ladonuts-migrate pnpm exec tsx scripts/seed-flavor-images.ts
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const IMAGE_DIR = path.resolve(process.cwd(), 'scripts/seed-images')

// Map flavor NAME (must match what was seeded) → image filename + alt text
const FLAVOR_IMAGES: Array<{ name: string; file: string; alt: string }> = [
  { name: 'Glazed', file: 'glazed.jpg', alt: 'A classic glazed donut on a cream linen, soft morning light' },
  { name: 'Chocolate Iced', file: 'chocolate-iced.jpg', alt: 'A yeast donut with glossy dark chocolate frosting' },
  { name: 'Maple', file: 'maple.jpg', alt: 'A yeast donut with amber maple glaze' },
  { name: 'Cinnamon Sugar', file: 'cinnamon-sugar.jpg', alt: 'A yeast donut rolled in cinnamon sugar' },
  { name: 'Boston Cream', file: 'boston-cream.jpg', alt: 'A filled Boston cream donut with chocolate top and cream filling peeking out' },
  { name: 'Oreo', file: 'oreo.jpg', alt: 'A donut with vanilla glaze topped with crushed Oreo pieces' },
  { name: 'Fruity Pebbles', file: 'fruity-pebbles.jpg', alt: 'A donut with white glaze generously topped with colorful Fruity Pebbles cereal' },
  { name: 'Dubai Pistachio', file: 'dubai-pistachio.jpg', alt: 'A pistachio-cream-filled donut, cut to show bright green filling, topped with crispy kataifi' },
]

async function seed() {
  const payload = await getPayload({ config })

  for (const { name, file, alt } of FLAVOR_IMAGES) {
    const imagePath = path.join(IMAGE_DIR, file)

    // Read image as buffer
    const data = await fs.readFile(imagePath)

    // Find the flavor
    const flavorRes = await payload.find({
      collection: 'flavors',
      where: { name: { equals: name } },
      limit: 1,
    })
    const flavor = flavorRes.docs[0]
    if (!flavor) {
      console.warn(`⚠ Flavor "${name}" not found — skipping`)
      continue
    }

    // Check for existing media with same filename and delete (idempotent replace)
    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: file } },
      limit: 1,
    })
    if (existingMedia.docs[0]) {
      await payload.delete({ collection: 'media', id: existingMedia.docs[0].id })
    }

    // Upload
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data,
        mimetype: 'image/jpeg',
        name: file,
        size: data.byteLength,
      },
    })

    // Attach
    await payload.update({
      collection: 'flavors',
      id: flavor.id,
      data: { image: media.id },
    })

    console.log(`✓ ${name} ← ${file}`)
  }

  console.log('Done')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
