import React from 'react'
import { Calendar, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  title: string
  description?: string
  primaryButton?: {
    label: string
    url?: string
    icon?: 'calendar' | 'phone'
  }
  secondaryButton?: {
    label: string
    url?: string
    phone?: string
    icon?: 'calendar' | 'phone'
  }
  gradient?: boolean
}

export const CTASection: React.FC<Props> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  gradient = true,
}) => {
  const getIcon = (icon?: string) => {
    switch (icon) {
      case 'calendar':
        return <Calendar className="size-5 mr-2" />
      case 'phone':
        return <Phone className="size-5 mr-2" />
      default:
        return null
    }
  }

  return (
    <section
      className={`py-16 ${
        gradient
          ? 'bg-gradient-to-r from-primary to-secondary text-white'
          : 'bg-background'
      }`}
    >
      <div className="container">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          {description && (
            <p className={`text-xl ${gradient ? 'opacity-90' : 'text-muted-foreground'}`}>
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButton && (
              <Button
                size="lg"
                variant={gradient ? 'secondary' : 'default'}
                className="text-lg px-8"
                asChild
              >
                <a href={primaryButton.url || '#'}>
                  {getIcon(primaryButton.icon)}
                  {primaryButton.label}
                </a>
              </Button>
            )}
            {secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                className={`text-lg px-8 ${
                  gradient
                    ? 'bg-transparent border-white text-white hover:bg-white hover:text-primary dark:hover:text-primary'
                    : ''
                }`}
                asChild
              >
                <a
                  href={
                    secondaryButton.phone
                      ? `tel:${secondaryButton.phone.replace(/\D/g, '')}`
                      : secondaryButton.url || '#'
                  }
                >
                  {getIcon(secondaryButton.icon)}
                  {secondaryButton.label}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}