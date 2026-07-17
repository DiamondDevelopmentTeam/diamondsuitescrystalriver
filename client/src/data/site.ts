export const site = {
  name: 'Diamond Suites Crystal River',
  phoneDisplay: '352-244-8352',
  phoneHref: 'tel:+13522448352',
  email: 'ashley@diamondsuitesocala.com',
  addressLine1: '825 N Citrus Ave.',
  addressLine2: 'Crystal River, FL 34428',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=825+N+Citrus+Ave+Crystal+River+FL+34428',
  facebookUrl: 'https://www.facebook.com/people/Diamond-Crystal-River/61582692346140/',
  instagramUrl: 'https://www.instagram.com/diamondsuitescrystalriver/',
} as const

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Suites', to: '/suites' },
  { label: "FAQ's", to: '/faqs' },
  { label: 'Directory', to: '/directory' },
  { label: 'Contact', to: '/contact' },
] as const

export const professionals = [
  {
    suite: 1,
    name: 'Cindy Vanlue',
    business: 'Knots Kneaded Massage LLC',
    specialty: 'Massage Therapist',
    image: 'images/cindy-vanlue.webp',
    phone: '',
    summary:
      'A licensed massage therapist serving Citrus County for more than 20 years, Cindy offers relaxation, stress relief, and muscle recovery with a warm, community-centered approach.',
  },
  {
    suite: 2,
    name: 'Available Suite',
    business: 'Now welcoming inquiries',
    specialty: 'Private Salon Suite',
    image: 'images/hallway.webp',
    phone: '',
    summary:
      'Contact the Diamond Suites team for current leasing information and to schedule a tour of the Crystal River location.',
  },
  {
    suite: 3,
    name: 'Jenelle Suleyman',
    business: 'Cornerstone Wellness Center, LLC',
    specialty: 'Nurse Practitioner',
    image: 'images/jenelle-suleyman.webp',
    phone: '',
    summary:
      'Jenelle provides personalized, holistic wellness care with special focus on obesity management, hormone optimization, and sustainable health strategies.',
  },
  {
    suite: 4,
    name: 'Malina Glaum',
    business: 'Independent Beauty Professional',
    specialty: 'Lash and Brow Specialist',
    image: 'images/malina-glaum.webp',
    phone: '',
    summary:
      'A Crystal River local and certified full specialist, Malina creates welcoming lash, brow, esthetic, and nail experiences with a focus on confidence and care.',
  },
  {
    suite: 5,
    name: 'Samantha Jacks',
    business: 'Independent Hair Professional',
    specialty: 'Hair Stylist',
    image: 'images/samantha-jacks.webp',
    phone: '',
    summary:
      'Samantha specializes in blonding, extensions, and color while keeping hair healthy, polished, and tailored to each client.',
  },
  {
    suite: 6,
    name: 'Daniela Riley',
    business: 'Independent Nail Professional',
    specialty: 'Nail Technician',
    image: 'images/daniela-riley.webp',
    phone: '',
    summary:
      'Daniela brings detailed nail artistry to life, from clean classic sets to bold custom designs that help clients express their style.',
  },
  {
    suite: 7,
    name: 'Aubrey Novy',
    business: 'Glow and Grace Aesthetic, LLC',
    specialty: 'Esthetician',
    image: 'images/aubrey-novy.jpeg',
    phone: '352-220-2007',
    summary:
      'With more than 18 years in aesthetics, Aubrey offers advanced skincare expertise, personalized treatment plans, and a compassionate approach to healthy, radiant skin.',
  },
] as const
