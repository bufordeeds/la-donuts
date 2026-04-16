// Google Places API utility for fetching reviews
// Place ID for Skateland West: ChIJvxYG7VBbXIYRYuLtFUGxZ0c

const SKATELAND_PLACE_ID = 'ChIJvxYG7VBbXIYRYuLtFUGxZ0c'

export type GoogleReview = {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url?: string
}

export type PlaceDetails = {
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

export async function fetchGoogleReviews(): Promise<{
  reviews: GoogleReview[]
  rating: number
  totalReviews: number
} | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    console.warn('GOOGLE_PLACES_API_KEY not configured')
    return null
  }

  try {
    // Use Places API (New) - Place Details
    const url = `https://places.googleapis.com/v1/places/${SKATELAND_PLACE_ID}?fields=displayName,rating,userRatingCount,reviews&key=${apiKey}`

    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Google Places API error:', response.status, await response.text())
      return null
    }

    const data = await response.json()

    // Transform to our format
    const reviews: GoogleReview[] = (data.reviews || []).map((review: {
      authorAttribution?: { displayName?: string; photoUri?: string }
      rating?: number
      text?: { text?: string }
      publishTime?: string
      relativePublishTimeDescription?: string
    }) => ({
      author_name: review.authorAttribution?.displayName || 'Anonymous',
      rating: review.rating || 5,
      text: review.text?.text || '',
      time: new Date(review.publishTime || Date.now()).getTime() / 1000,
      relative_time_description: review.relativePublishTimeDescription || '',
      profile_photo_url: review.authorAttribution?.photoUri,
    }))

    return {
      reviews,
      rating: data.rating || 4.2,
      totalReviews: data.userRatingCount || 444,
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return null
  }
}

// Get only 5-star reviews
export async function getFiveStarReviews(limit: number = 3): Promise<GoogleReview[]> {
  const result = await fetchGoogleReviews()

  if (!result) return []

  return result.reviews
    .filter((review) => review.rating === 5)
    .slice(0, limit)
}
