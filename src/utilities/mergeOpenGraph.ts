import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Warm, fluffy handmade donuts made fresh every morning in Gillette, Wyoming. Classic favorites, filled donuts, and rotating specialty flavors.',
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  ],
  siteName: 'La Donuts',
  title: 'La Donuts | Fresh handmade donuts in Gillette, WY',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
