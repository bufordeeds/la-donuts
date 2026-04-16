import React from 'react'
import { Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Testimonial = {
  id: string
  name: string
  rating: number
  text: string
  date?: string
}

type Props = {
  title?: string
  subtitle?: string
  overallRating?: number
  reviewCount?: number
  testimonials: Testimonial[]
}

export const Testimonials: React.FC<Props> = ({
  title,
  subtitle,
  overallRating,
  reviewCount,
  testimonials,
}) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-xl text-muted-foreground mb-4">{subtitle}</p>
          )}
          {overallRating && reviewCount && (
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-6 ${
                    i < Math.floor(overallRating)
                      ? 'fill-primary text-primary'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-lg font-semibold ml-2">
                {overallRating}/5 from {reviewCount}+ reviews
              </span>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                {testimonial.date && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}