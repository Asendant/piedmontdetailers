export type CountyInfo = {
  name: string
  slug: string
  cities: string[]
  description: string
  primaryKeyword: string
}

export const counties: CountyInfo[] = [
  {
    name: 'Guilford County',
    slug: 'guilford-county',
    cities: ['Greensboro', 'High Point', 'Jamestown', 'Gibsonville', 'Oak Ridge'],
    description: 'Professional mobile car detailing services throughout Guilford County, including Greensboro, High Point, and surrounding communities. We bring premium car cleaning directly to your location.',
    primaryKeyword: 'car detailing Guilford County NC',
  },
  {
    name: 'Forsyth County',
    slug: 'forsyth-county',
    cities: ['Winston-Salem', 'Kernersville', 'Clemmons', 'Lewisville', 'Rural Hall'],
    description: 'Expert mobile car detailing in Forsyth County, serving Winston-Salem, Kernersville, Clemmons, and all surrounding areas. Convenient mobile service comes to you.',
    primaryKeyword: 'car detailing Forsyth County NC',
  },
  {
    name: 'Davidson County',
    slug: 'davidson-county',
    cities: ['Lexington', 'Thomasville', 'Denton', 'Welcome'],
    description: 'Professional mobile car detailing services in Davidson County, including Lexington, Thomasville, and nearby communities. Quality car cleaning at your location.',
    primaryKeyword: 'car detailing Davidson County NC',
  },
  {
    name: 'Randolph County',
    slug: 'randolph-county',
    cities: ['Asheboro', 'Archdale', 'Trinity', 'Seagrove'],
    description: 'Mobile car detailing throughout Randolph County, serving Asheboro, Archdale, Trinity, and surrounding areas. We come to you with professional-grade equipment.',
    primaryKeyword: 'car detailing Randolph County NC',
  },
  {
    name: 'Stokes County',
    slug: 'stokes-county',
    cities: ['King', 'Walnut Cove', 'Danbury'],
    description: 'Quality mobile car detailing services in Stokes County, including King, Walnut Cove, and Danbury. Professional car cleaning delivered to your door.',
    primaryKeyword: 'car detailing Stokes County NC',
  },
  {
    name: 'Surry County',
    slug: 'surry-county',
    cities: ['Mount Airy', 'Elkin', 'Dobson', 'Pilot Mountain'],
    description: 'Expert mobile car detailing in Surry County, serving Mount Airy, Elkin, Dobson, Pilot Mountain, and all surrounding communities. Convenient service at your location.',
    primaryKeyword: 'car detailing Surry County NC',
  },
  {
    name: 'Yadkin County',
    slug: 'yadkin-county',
    cities: ['Yadkinville', 'East Bend', 'Jonesville'],
    description: 'Professional mobile car detailing services throughout Yadkin County, including Yadkinville, East Bend, and Jonesville. Premium car cleaning brought to you.',
    primaryKeyword: 'car detailing Yadkin County NC',
  },
]
