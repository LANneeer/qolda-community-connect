
import { Service, ServiceCategory, ServiceProvider } from "@/types";

export const categories: ServiceCategory[] = [
  {
    id: "1",
    name: "Home Maintenance",
    icon: "tools",
    description: "Repairs, gardening, cleaning and other home services"
  },
  {
    id: "2",
    name: "Education",
    icon: "book",
    description: "Tutoring, lessons, workshops and skill sharing"
  },
  {
    id: "3",
    name: "Personal Care",
    icon: "heart",
    description: "Child care, elder care, pet care and personal assistance"
  },
  {
    id: "4",
    name: "Professional",
    icon: "briefcase",
    description: "Legal advice, consulting, business services and more"
  },
  {
    id: "5",
    name: "Creative",
    icon: "palette",
    description: "Design, music, art, photography and creative services"
  },
  {
    id: "6",
    name: "Technology",
    icon: "laptop",
    description: "Tech support, device repair, software help and digital services"
  },
  {
    id: "7",
    name: "Transportation",
    icon: "car",
    description: "Rides, deliveries, moving assistance and transportation help"
  },
  {
    id: "8",
    name: "Community",
    icon: "users",
    description: "Event planning, community organizing and local initiatives"
  }
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Elena Martinez",
    avatar: "/placeholder.svg",
    bio: "Professional gardener with 10+ years of experience. I specialize in sustainable gardening practices and native plant landscapes.",
    location: {
      neighborhood: "Greenfield",
      city: "Riverdale",
      state: "CA",
      zipCode: "90210"
    },
    memberSince: new Date("2020-03-15"),
    verificationBadge: true,
    skills: ["Gardening", "Landscaping", "Plant Care", "Sustainable Practices"],
    ratings: [
      {
        userId: "101",
        rating: 5,
        comment: "Elena transformed my garden into a beautiful, sustainable space. Highly recommend!",
        createdAt: new Date("2023-05-20")
      },
      {
        userId: "102",
        rating: 5,
        comment: "Knowledgeable, punctual and friendly. Will definitely work with Elena again.",
        createdAt: new Date("2023-06-12")
      }
    ],
    averageRating: 5,
    responseRate: 98
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg",
    bio: "Math tutor with a degree in Applied Mathematics. I love helping students build confidence in their math skills.",
    location: {
      neighborhood: "University Heights",
      city: "Riverdale",
      state: "CA",
      zipCode: "90211"
    },
    memberSince: new Date("2021-09-01"),
    verificationBadge: true,
    skills: ["Mathematics", "Calculus", "Algebra", "Statistics", "Test Prep"],
    ratings: [
      {
        userId: "103",
        rating: 5,
        comment: "Marcus helped my daughter ace her calculus final. Patient and clear explanations.",
        createdAt: new Date("2023-06-30")
      },
      {
        userId: "104",
        rating: 4,
        comment: "Good tutor, explains concepts well. Sometimes runs a bit over time.",
        createdAt: new Date("2023-07-15")
      }
    ],
    averageRating: 4.5,
    responseRate: 95
  },
  {
    id: "3",
    name: "Aisha Patel",
    avatar: "/placeholder.svg",
    bio: "Certified yoga instructor specializing in beginner and intermediate classes. I focus on mindfulness and building strength gradually.",
    location: {
      neighborhood: "Riverside",
      city: "Riverdale",
      state: "CA",
      zipCode: "90213"
    },
    memberSince: new Date("2019-11-10"),
    verificationBadge: true,
    skills: ["Yoga", "Meditation", "Stretching", "Mindfulness"],
    ratings: [
      {
        userId: "105",
        rating: 5,
        comment: "Aisha is an amazing instructor! Her classes are the highlight of my week.",
        createdAt: new Date("2023-04-18")
      },
      {
        userId: "106",
        rating: 5,
        comment: "Perfect for beginners. Aisha is patient and provides great modifications.",
        createdAt: new Date("2023-05-22")
      }
    ],
    averageRating: 5,
    responseRate: 99
  },
  {
    id: "4",
    name: "Carlos Rodriguez",
    avatar: "/placeholder.svg",
    bio: "Handyman with extensive experience in home repairs. No job too small - from leaky faucets to furniture assembly.",
    location: {
      neighborhood: "Downtown",
      city: "Riverdale",
      state: "CA",
      zipCode: "90214"
    },
    memberSince: new Date("2020-07-22"),
    skills: ["Plumbing", "Electrical", "Carpentry", "Furniture Assembly"],
    ratings: [
      {
        userId: "107",
        rating: 4,
        comment: "Carlos fixed my leaky sink quickly and professionally. Would hire again.",
        createdAt: new Date("2023-03-10")
      },
      {
        userId: "108",
        rating: 5,
        comment: "Excellent work assembling my IKEA furniture. Saved me hours of frustration!",
        createdAt: new Date("2023-04-05")
      }
    ],
    averageRating: 4.5,
    responseRate: 90
  },
  {
    id: "5",
    name: "Sophia Chen",
    avatar: "/placeholder.svg",
    bio: "Web developer offering help with website issues, WordPress setup, and basic coding problems.",
    location: {
      neighborhood: "Tech District",
      city: "Riverdale",
      state: "CA",
      zipCode: "90215"
    },
    memberSince: new Date("2021-02-15"),
    verificationBadge: true,
    skills: ["Web Development", "WordPress", "HTML/CSS", "JavaScript"],
    ratings: [
      {
        userId: "109",
        rating: 5,
        comment: "Sophia fixed issues with my WordPress site that had been plaguing me for months. Very knowledgeable!",
        createdAt: new Date("2023-06-20")
      }
    ],
    averageRating: 5,
    responseRate: 85
  }
];

export const services: Service[] = [
  {
    id: "1",
    title: "Sustainable Garden Design & Maintenance",
    description: "I offer garden design consultations, planting services, and regular maintenance using sustainable practices. Specializing in native plants that thrive in our local climate with minimal water and care.",
    images: ["/placeholder.svg"],
    categoryId: "1",
    provider: serviceProviders[0],
    location: serviceProviders[0].location,
    availability: "Weekdays, some weekends",
    pricingType: "fee",
    pricingDetails: "Hourly rate or monthly maintenance packages available",
    createdAt: new Date("2023-01-15"),
    tags: ["gardening", "sustainable", "landscaping", "native plants"],
    status: "active",
    views: 245
  },
  {
    id: "2",
    title: "Math Tutoring - All Levels",
    description: "Personalized math tutoring for students from elementary through college level. I can help with homework, test preparation, or general concept understanding. I specialize in making math accessible and building confidence.",
    images: ["/placeholder.svg"],
    categoryId: "2",
    provider: serviceProviders[1],
    location: serviceProviders[1].location,
    availability: "Afternoons and weekends",
    pricingType: "fee",
    pricingDetails: "1 hour sessions, package discounts available",
    createdAt: new Date("2023-02-10"),
    tags: ["tutoring", "mathematics", "education", "homework help"],
    status: "active",
    views: 189
  },
  {
    id: "3",
    title: "Private Yoga Sessions",
    description: "Personalized yoga sessions tailored to your needs and experience level. Focus on mindfulness, flexibility, and strength building. I provide all necessary equipment. Can travel to your location or host at my home studio.",
    images: ["/placeholder.svg"],
    categoryId: "3",
    provider: serviceProviders[2],
    location: serviceProviders[2].location,
    availability: "Mornings and evenings",
    pricingType: "fee",
    pricingDetails: "Single sessions or packages of 5/10 sessions",
    createdAt: new Date("2023-01-05"),
    tags: ["yoga", "wellness", "fitness", "mindfulness"],
    status: "active",
    views: 302
  },
  {
    id: "4",
    title: "General Handyman Services",
    description: "Need something fixed around the house? I can help with a variety of home repairs, furniture assembly, minor plumbing and electrical work, and more. Reliable service with attention to detail.",
    images: ["/placeholder.svg"],
    categoryId: "1",
    provider: serviceProviders[3],
    location: serviceProviders[3].location,
    availability: "Flexible schedule, including weekends",
    pricingType: "fee",
    pricingDetails: "Hourly rate, minimum 1 hour",
    createdAt: new Date("2023-03-20"),
    tags: ["handyman", "repairs", "home maintenance", "assembly"],
    status: "active",
    views: 175
  },
  {
    id: "5",
    title: "Website Troubleshooting & WordPress Help",
    description: "Having issues with your website? I can help diagnose and fix problems with your WordPress site, update plugins, improve site speed, and provide basic WordPress training.",
    images: ["/placeholder.svg"],
    categoryId: "6",
    provider: serviceProviders[4],
    location: serviceProviders[4].location,
    availability: "Evenings and weekends",
    pricingType: "exchange",
    pricingDetails: "Happy to exchange for other services or skills",
    createdAt: new Date("2023-02-28"),
    tags: ["tech support", "WordPress", "website", "web development"],
    status: "active",
    views: 142
  },
  {
    id: "6",
    title: "Community Garden Consultation",
    description: "Planning a community garden? I offer consultation services for community groups looking to establish or improve shared garden spaces. Advice on layout, plant selection, maintenance schedules, and community engagement.",
    images: ["/placeholder.svg"],
    categoryId: "8",
    provider: serviceProviders[0],
    location: serviceProviders[0].location,
    availability: "By appointment",
    pricingType: "free",
    pricingDetails: "Free for community initiatives",
    createdAt: new Date("2023-04-05"),
    tags: ["community", "gardening", "consultation", "urban agriculture"],
    status: "active",
    views: 98
  },
  {
    id: "7",
    title: "STEAM Workshops for Kids",
    description: "Fun, educational workshops combining science, technology, engineering, arts and math for children ages 8-13. Great for homeschool groups, after-school programs, or birthday parties.",
    images: ["/placeholder.svg"],
    categoryId: "2",
    provider: serviceProviders[1],
    location: serviceProviders[1].location,
    availability: "Weekends and school holidays",
    pricingType: "fee",
    pricingDetails: "Per workshop, group rates available",
    createdAt: new Date("2023-05-10"),
    tags: ["education", "kids", "STEAM", "workshops"],
    status: "active",
    views: 112
  },
  {
    id: "8",
    title: "Small Office/Home Office Setup",
    description: "Need help setting up a functional home office? I can help with furniture arrangement, cable management, basic computer setup, and organizing for productivity.",
    images: ["/placeholder.svg"],
    categoryId: "1",
    provider: serviceProviders[3],
    location: serviceProviders[3].location,
    availability: "Weekdays and some Saturdays",
    pricingType: "exchange",
    pricingDetails: "Happy to barter for equivalent services",
    createdAt: new Date("2023-03-15"),
    tags: ["home office", "organization", "productivity", "setup"],
    status: "active",
    views: 87
  }
];

export const communityStats = {
  totalMembers: 1205,
  activeServices: 348,
  completedExchanges: 2741,
  neighborhoodsServed: 17,
  topCategories: [
    { name: "Home Maintenance", percentage: 28 },
    { name: "Education", percentage: 22 },
    { name: "Technology", percentage: 18 },
    { name: "Creative", percentage: 15 },
    { name: "Personal Care", percentage: 10 },
    { name: "Other", percentage: 7 }
  ],
  exchangesByMonth: [
    { month: "Jan", exchanges: 178 },
    { month: "Feb", exchanges: 190 },
    { month: "Mar", exchanges: 221 },
    { month: "Apr", exchanges: 243 },
    { month: "May", exchanges: 257 },
    { month: "Jun", exchanges: 289 },
    { month: "Jul", exchanges: 305 },
    { month: "Aug", exchanges: 278 },
    { month: "Sep", exchanges: 260 },
    { month: "Oct", exchanges: 267 },
    { month: "Nov", exchanges: 240 },
    { month: "Dec", exchanges: 213 }
  ]
};
