import type { BlogPost, GalleryItem, PackageType, VideoItem } from '../types'

export const servicePackages: { title: PackageType; details: string }[] = [
  {
    title: 'Express Wash',
    details:
      'Quick wash, wheels cleaned, exterior dry, glass wiped, and tire shine.',
  },
  {
    title: 'Full Detail',
    details:
      'Hand wash, clay bar, sealant, interior vacuum, wipe-down, and windows.',
  },
  {
    title: 'Interior Deep Clean',
    details:
      'Steam clean, shampoo, stain removal, leather conditioning, and odor treatment.',
  },
  {
    title: 'Paint Correction',
    details:
      'Multi-stage polishing to remove swirls, scratches, and restore gloss.',
  },
  {
    title: 'Ceramic Coating',
    details:
      'Long-term protection with hydrophobic coating for lasting shine.',
  },
]

export const serviceAreas = [
  'Guilford County',
  'Forsyth County',
  'Davidson County',
  'Randolph County',
  'Stokes County',
  'Surry County',
  'Yadkin County',
]

export const seedGallery: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Express Wash - Sedan',
    packageType: 'Express Wash',
    imageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description:
      'A quick refresh that restores a glossy finish and crisp glass.',
  },
  {
    id: 'gallery-2',
    title: 'Full Detail - SUV',
    packageType: 'Full Detail',
    imageUrl:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
    description:
      'Deep clean with a smooth, mirror-like exterior seal.',
  },
  {
    id: 'gallery-3',
    title: 'Interior Deep Clean - Truck',
    packageType: 'Interior Deep Clean',
    imageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description:
      'Odor removal and fabric extraction for a fresh cabin.',
  },
  {
    id: 'gallery-4',
    title: 'Paint Correction - Coupe',
    packageType: 'Paint Correction',
    imageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    description:
      'Swirl-free finish with enhanced depth and clarity.',
  },
  {
    id: 'gallery-5',
    title: 'Ceramic Coating - Luxury',
    packageType: 'Ceramic Coating',
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    description:
      'Durable protection that beads water and resists grime.',
  },
]

export const seedBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Often Should You Detail Your Vehicle?',
    excerpt:
      'Protect your paint and interior with a schedule that matches your lifestyle.',
    content:
      'For most daily drivers, a full detail every 3-4 months keeps surfaces protected. Combine that with monthly washes and interior wipe-downs to prevent buildup and fading.',
    date: '2026-01-10',
    author: 'Piedmont Detailers',
    tags: ['maintenance', 'tips'],
    coverImage:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-2',
    title: 'Ceramic Coating: What It Does and Why It Matters',
    excerpt:
      'A protective layer that keeps your vehicle cleaner and shinier longer.',
    content:
      'Ceramic coating bonds to your paint, creating a hydrophobic barrier that repels water and contaminants. It makes maintenance easier and keeps your finish looking showroom-ready.',
    date: '2026-01-05',
    author: 'Piedmont Detailers',
    tags: ['ceramic', 'paint'],
    coverImage:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
]

export const seedVideos: VideoItem[] = [
  {
    id: 'video-1',
    title: 'Interior Deep Clean Walkthrough',
    url: 'https://www.youtube.com/embed/fZrDeN6cUis',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description:
      'See our step-by-step process for a spotless cabin.',
  },
  {
    id: 'video-2',
    title: 'Paint Correction Before & After',
    url: 'https://www.youtube.com/embed/5NV6Rdv1a3I',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
    description:
      'Watch swirl marks disappear with multi-stage polishing.',
  },
]
