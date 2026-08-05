/** Tailwind theme tone used to tint an ImagePlaceholder color block. */
export type PlaceholderTone =
  | 'neutral-100'
  | 'neutral-200'
  | 'neutral-300'
  | 'neutral-400'
  | 'accent-100'
  | 'accent-200'

/** A single service offering shown in the "How can I help you?" section. */
export interface Service {
  title: string
  tone: PlaceholderTone
}

/** A client testimonial / quote card. */
export interface Testimonial {
  quote: string
  name: string
  role: string
  tone: PlaceholderTone
}

/** An image tile in the practice gallery collage. */
export interface GalleryItem {
  tone: PlaceholderTone
  /** Optional label shown on the tile (e.g. a tech name). */
  label?: string
  /** Extra grid-span utility classes (e.g. 'row-span-2'). */
  spanClass?: string
}
