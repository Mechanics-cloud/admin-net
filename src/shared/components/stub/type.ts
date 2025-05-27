import { typographyVariants } from 'car-robots-library'

export type StubTypes = {
  alt?: string
  className?: string
  imageClassName?: string
  src?: string
  textClassName?: string
  title: string
  variant?: NonNullable<Parameters<typeof typographyVariants>[0]>['variant']
}
