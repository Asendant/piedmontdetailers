export type PackageType =
  | 'Interior Package'
  | 'Exterior Package'
  | 'Full Wash Package'

export type GalleryItem = {
  id: string
  title: string
  packageType: PackageType
  imageUrl: string
  description: string
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
  coverImage?: string
}

export type VideoItem = {
  id: string
  title: string
  url: string
  thumbnailUrl: string
  description: string
}

export type Booking = {
  id: string
  name: string
  phone: string
  email?: string
  address: string
  city: string
  county: string
  service: PackageType
  date: string
  time: string
  vehicle: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}
