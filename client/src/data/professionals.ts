const asset = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/optimized/v1/${fileName}`

const updatedProfileAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/optimized/v1/update/${fileName}`

export type ProfessionalGalleryImage = {
  src: string
  alt: string
  position?: string
}

export type Professional = {
  id: string
  name: string
  title: string
  businessName?: string

  // Use suite for a normal single-suite assignment.
  suite?: number

  // Use suiteLabel when somebody occupies more than one suite.
  // Example: Jenell is currently in Suites 2 & 3.
  suiteLabel?: string

  imageUrl?: string
  initial?: string
  imagePosition?: string
  gallery?: ProfessionalGalleryImage[]
  services?: string[]
  bio: string[]
  bookingUrl?: string
  websiteUrl?: string
  phone?: string
  email?: string
  socialLinks?: {
    label: string
    url: string
  }[]
}

export const professionals: Professional[] = [
  {
    id: 'cindy-vanlue',
    name: 'Cindy Vanlue',
    title: 'Massage Therapist',
    businessName: 'Knots Kneaded Massage LLC',
    suite: 1,
    imageUrl: asset('cindy-vanlue-362.webp'),
    imagePosition: '45% top',
    services: [
      'Relaxation',
      'Stress relief',
      'Muscle recovery',
    ],
    bio: [
      'Hello friends! My name is Cindy Vanlue, owner of Knots Kneaded Massage LLC.',
      'I’ve been a licensed massage therapist here in Citrus County for over 20 years and I’ve loved every minute of it! I was born and raised right here in Citrus County, and I have been blessed to spend my entire career serving the community I call home.',
      'A little about me — I’m married and a proud mom of four amazing kids. When I’m not in the massage room, you usually find me outdoors — running with my local running club, enjoying CrossFit, cheering on my kids’ sports teams, or supporting local events. Family and community mean everything to me.',
      'I’m so excited to share that Knots Kneaded Massage LLC is moving to a new location! I can’t wait to welcome both my longtime clients and new faces into my new space. Whether you require relaxation, stress relief, or muscle recovery, I’m here to help you feel your best, one knot at a time!',
      'Thank you for all your support over the years, Citrus County. I’m looking forward to this next chapter and can’t wait to see you soon.',
    ],
  },

  {
    id: 'jenelle-suleyman',
    name: 'Jenelle Suleyman',
    title: 'Board-Certified Nurse Practitioner',
    businessName: 'Cornerstone Wellness Center, LLC',
    suiteLabel: 'Suites 2 & 3',
    imageUrl: asset('jenelle-suleyman-365.webp'),
    imagePosition: '50% 28%',
    services: [
      'Obesity management',
      'Hormone optimization',
      'Personalized wellness care',
    ],
    bio: [
      'Meet Jenelle, APRN.',
      'Welcome — I’m so glad you’re here!',
      'I’m a board-certified Nurse Practitioner with nearly a decade of experience in healthcare, ranging from emergency medicine, quality, critical care, and primary care. Throughout my journey, I’ve been fueled by a passion for process improvement and a calling to deliver care that’s not only effective but also personal, accessible, and deeply rooted in compassion.',
      'At Cornerstone Wellness, I bring a faith-based, holistic approach to everything I do. I believe healing involves the whole person — body, mind, and spirit — and that God designed our bodies with a powerful capacity to heal when given the right tools and support. My practice is built on personalized care plans that honor your individual story and goals, without the frustrating red tape of traditional insurance models. I’ve removed the barriers to care so that you can focus on what truly matters: your wellness.',
      'I’m especially passionate about obesity management and hormone optimization, areas that are too often misunderstood or overlooked. Instead of masking symptoms, I help patients get to the root of what’s really going on, creating sustainable, lasting change that leads to real transformation from the inside out.',
      'Whether you’re seeking answers, ready for a fresh start, or simply want to feel like yourself again, I’m here to walk alongside you with evidence-based strategies, spiritual guidance, and a heart for service.',
      'Outside of work, I’m active in my church and deeply family-oriented. My faith and family are the foundation of who I am, and they inspire me to lead with integrity, grace, and purpose in every area of life.',
      'Thank you for taking the time to learn a little more about me. It would be my honor to be part of your health journey and to help you build a stronger, healthier you from the inside out.',
    ],
  },

  {
    id: 'malina-glaum',
    name: 'Malina Glaum',
    title: 'Lash and Brow Specialist',
    suite: 4,

    // Updated profile image supplied in the /update folder.
    imageUrl: updatedProfileAsset('MalinaGlaum.png'),
    imagePosition: 'center 18%',

    // Updated room photo.
    gallery: [
      {
        src: updatedProfileAsset('MalinaGlaumRoom.jpg'),
        alt: 'Malina Glaum’s private suite at Diamond Suites Crystal River',
        position: 'center',
      },
    ],

    services: [
      'Lash extensions',
      'Esthetics',
      'Nail services',
    ],

    bio: [
      'Meet Malina.',
      'Born and raised in Crystal River, Florida, Malina is a proud local with deep roots in the community. A graduate of Crystal River High School, she has always had a passion for connecting with others and giving back to the place she calls home.',
      'Malina is a Certified Full Specialist, licensed as both an Esthetician and Nail Technician, with a specialty in lash extensions. She takes pride in helping her clients look and feel their absolute best while creating a relaxing, welcoming environment for everyone who walks through her door.',
      'When she’s not working, you can find Malina reading a good book, spending time with her family and her Great Dane, Sox, or singing along at a concert. Her love for people and positive energy make her a true reflection of Crystal River’s charm and community spirit.',
    ],

    // Updated booking link you supplied.
    bookingUrl: 'https://squareup.com/appointments/book/LEMCB4M7E2ZYV',
  },

  {
    id: 'samantha-jacks',
    name: 'Samantha Jacks',
    title: 'Hair Stylist',
    suite: 5,
    imageUrl: asset('samantha-jacks-360.webp'),
    imagePosition: '50% 18%',
    services: [
      'Blonding',
      'Extensions',
      'Color',
    ],
    bio: [
      'Samantha has been a hairstylist for over four years and loves helping people look and feel their best. She specializes in blonding, extensions, and color, with a focus on keeping hair healthy and beautiful.',
      'Samantha’s favorite part of her job is being a small part in helping someone feel confident and happy. When she’s not in the salon, you’ll find her spending time with her husband and their two dogs, traveling, or antiquing.',
    ],
  },

  {
    id: 'daniela-riley',
    name: 'Daniela Riley',
    title: 'Nail Technician',
    suite: 6,
    imageUrl: asset('daniela-riley-362.webp'),
    imagePosition: 'center top',
    services: [
      'Classic nail sets',
      'Detailed nail art',
      'Custom nail designs',
    ],
    bio: [
      'Hi everyone! I’m Daniela, a passionate nail technician with 4 years of experience in the beauty industry.',
      'I’ve dedicated my career to creating beautiful, detailed nail designs that help my clients feel confident and express their personal style. Whether it’s a simple, classic set or something bold and creative, I love bringing ideas to life through my work.',
      'Nails are more than just a service to me — they’re an art form and a way to connect with amazing people every day.',
    ],
  },

  {
    id: 'marley-methvin',
    name: 'Marley Methvin',
    title: 'Nail Technician',
    suiteLabel: 'Suite 6 • Coming Soon',
    initial: 'M',
    services: [
      'Nail services',
    ],
    bio: [
      'Marley Methvin is joining Diamond Suites Crystal River as a Nail Technician.',
      'Her full profile, services, photos, and booking information will be added as soon as they are available.',
    ],
  },

  {
    id: 'aubrey-novy',
    name: 'Aubrey Novy',
    title: 'Esthetician',
    businessName: 'Glow and Grace Aesthetic, LLC',
    suite: 7,
    imageUrl: asset('aubrey-novy-720.webp'),
    imagePosition: 'center top',
    phone: '352-220-2007',
    email: 'aubrey.glowandgraceaesthetics@gmail.com',
    bookingUrl: 'https://www.vagaro.com/glowandgraceaesthetics2',
    websiteUrl: 'https://www.glowandgraceaesthetics.com/crystal-river/home',
    socialLinks: [
      {
        label: 'Instagram',
        url: 'https://www.instagram.com/glow_graceaesthetics/',
      },
      {
        label: 'Facebook',
        url: 'https://www.facebook.com/aubrey.novy',
      },
    ],
    services: [
      'Hydrafacial treatments',
      'Laser hair removal',
      'Electrolysis',
      'Acne care',
      'Complexion rejuvenation',
    ],
    bio: [
      'With over 18 years of experience in the aesthetic industry, Aubrey Novy is a seasoned esthetician known for her passion, expertise, and commitment to helping clients achieve their healthiest, most radiant skin.',
      'Aubrey’s career has spanned a wide range of services, from Hydrafacial treatments to advanced laser hair removal and electrolysis, making her a trusted expert in both medical aesthetics and everyday skincare needs.',
      'Having provided Hydrafacial services for over a decade, Aubrey understands the importance of combining cutting-edge treatments with a personalized approach to address each client’s unique skin concerns. Her journey of continuous education and self-improvement led her to become a Face Reality Certified Acne Specialist and a Skin Better Science Master in 2024.',
      'At Glow and Grace, clients are not just receiving treatments; they’re embarking on a journey toward healthier skin and a more confident self. Whether it’s tackling acne, rejuvenating the complexion, or addressing other skin care concerns, Aubrey’s expertise and compassionate care create a transformative experience for all who walk through her doors.',
    ],
  },
]