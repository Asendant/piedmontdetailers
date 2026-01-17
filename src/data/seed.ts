import type { BlogPost, GalleryItem, PackageType, VideoItem } from '../types'

export const servicePackages: { 
  title: PackageType
  details: string
  includes: string[]
  notIncludes?: string[]
  benefits: string[]
}[] = [
  {
    title: 'Interior Package',
    details:
      'Complete interior cleaning service that removes dirt, dust, and debris from inside your vehicle. Perfect for maintaining a fresh, clean cabin between full details.',
    includes: [
      'Thorough vacuum of all floors, seats, and cargo areas',
      'Wipe down of all interior surfaces (dashboard, console, door panels)',
      'Window cleaning (inside and out)',
      'Trash removal and organization',
      'Basic interior protection treatment',
    ],
    notIncludes: [
      'Deep stain removal',
      'Leather conditioning',
      'Exterior washing',
    ],
    benefits: [
      'Removes allergens and dust for healthier air quality',
      'Extends the life of your interior materials',
      'Maintains your vehicle\'s resale value',
      'Creates a more pleasant driving experience',
    ],
  },
  {
    title: 'Exterior Package',
    details:
      'Professional exterior wash and protection service that keeps your car looking showroom-ready. Hand-washed with premium products to protect your paint.',
    includes: [
      'Hand wash with pH-balanced car shampoo',
      'Wheel and tire cleaning',
      'Thorough rinse and dry with microfiber towels',
      'Tire shine application',
      'Basic paint protection spray',
    ],
    notIncludes: [
      'Paint correction or polishing',
      'Interior cleaning',
      'Ceramic coating',
    ],
    benefits: [
      'Protects your paint from UV damage and oxidation',
      'Removes harmful contaminants that can damage paint',
      'Maintains your vehicle\'s appearance and value',
      'Makes your car look professionally maintained',
    ],
  },
  {
    title: 'Full Wash Package',
    details:
      'Complete inside and outside detailing service. The most comprehensive package that includes everything from both Interior and Exterior packages for a total vehicle refresh.',
    includes: [
      'Everything in Interior Package',
      'Everything in Exterior Package',
      'Extra attention to detail',
      'Comprehensive vehicle inspection',
    ],
    benefits: [
      'Complete vehicle refresh in one service',
      'Best value for comprehensive cleaning',
      'Protects both interior and exterior',
      'Perfect for regular maintenance or before special events',
    ],
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
  // Intentionally empty: gallery items are managed via the Admin page and stored locally.
]

export const seedBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Often Should You Detail Your Car in Greensboro NC?',
    excerpt:
      'Learn the best car detailing schedule for Piedmont Triad weather and driving conditions. Protect your investment with regular professional care.',
    content:
      'Living in the Piedmont Triad means dealing with pollen, road salt, and varying weather conditions. For most daily drivers in Greensboro, Winston-Salem, and High Point, we recommend a full detail every 3-4 months. This schedule helps protect your paint from UV damage, removes pollen and contaminants, and maintains your interior. Combine professional detailing with monthly exterior washes during peak pollen season (spring) and before winter to maximize protection. Regular detailing not only keeps your car looking great but also maintains its resale value—especially important in our region where vehicles face year-round challenges.',
    date: '2026-01-15',
    author: 'Piedmont Detailers',
    tags: ['maintenance', 'tips', 'Greensboro', 'car care'],
    coverImage:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-2',
    title: 'Best Time of Year for Car Detailing in the Piedmont Triad',
    excerpt:
      'Discover when to schedule your mobile car detailing service in Greensboro, Winston-Salem, and High Point for optimal results and protection.',
    content:
      'The best times for car detailing in the Piedmont Triad are spring (after pollen season) and fall (before winter). Spring detailing removes winter road salt and prepares your vehicle for pollen season. Fall detailing protects your paint before harsh winter conditions. Summer detailing helps remove pollen buildup and protects against UV damage. Our mobile service makes it easy to schedule during these optimal times—we come to you at home or work. Regular detailing throughout the year maintains your vehicle\'s appearance and value, especially important in North Carolina\'s varying climate.',
    date: '2026-01-10',
    author: 'Piedmont Detailers',
    tags: ['seasonal', 'tips', 'Piedmont Triad', 'car maintenance'],
    coverImage:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'blog-3',
    title: 'Mobile Car Detailing vs. Drive-Through Car Wash: Which is Better?',
    excerpt:
      'Compare mobile detailing services to traditional car washes in Greensboro, Winston-Salem, and High Point. Learn why mobile detailing offers better value and results.',
    content:
      'Mobile car detailing offers significant advantages over drive-through car washes in the Piedmont Triad. Unlike automated washes that can scratch your paint, mobile detailing uses hand-washing techniques with premium products. We come to your location, saving you time and eliminating the need to drive anywhere. Our service includes interior cleaning, which drive-through washes don\'t offer. Mobile detailing also allows for personalized attention to your vehicle\'s specific needs. For residents of Greensboro, Winston-Salem, High Point, and surrounding areas, mobile detailing provides convenience, quality, and value that traditional car washes simply can\'t match.',
    date: '2026-01-05',
    author: 'Piedmont Detailers',
    tags: ['comparison', 'mobile detailing', 'car wash', 'Greensboro'],
    coverImage:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
  },
]

export const seedVideos: VideoItem[] = [
  {
    id: 'video-1',
    title: 'Interior Cleaning Walkthrough',
    url: 'https://www.youtube.com/embed/fZrDeN6cUis',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    description:
      'See our step-by-step process for a spotless cabin.',
  },
  {
    id: 'video-2',
    title: 'Exterior Cleaning Before & After',
    url: 'https://www.youtube.com/embed/5NV6Rdv1a3I',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
    description:
      'Watch swirl marks disappear with multi-stage polishing.',
  },
]
