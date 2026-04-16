import { cn } from "@/utilities/ui"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide" | "narrow"
}

const containerVariants = {
  default: "max-w-7xl",
  wide: "max-w-[1400px]",
  narrow: "max-w-4xl",
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerVariants[size],
        className
      )}
      {...props}
    />
  )
}