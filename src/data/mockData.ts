
export interface CommunityStats {
  totalUsers: number;
  totalServices: number;
  totalExchanges: number;
  activeUsers: number;
}

export const communityStats: CommunityStats = {
  totalUsers: 1250,
  totalServices: 340,
  totalExchanges: 890,
  activeUsers: 420
};

export interface Service {
  id: string;
  title: string;
  description: string;
  images?: string[];
  categoryId: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
    bio: string;
    location: {
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
    };
    memberSince: Date;
    verificationBadge?: boolean;
    skills: string[];
    ratings: any[];
    averageRating?: number;
    responseRate?: number;
  };
  location: {
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  availability: string;
  pricingType: 'free' | 'exchange' | 'fee';
  pricingDetails?: string;
  createdAt: Date;
  tags: string[];
  status: 'active' | 'paused' | 'completed';
  views: number;
}

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Professional website development services using modern frameworks and best practices',
    images: ['/images/1.jpg'],
    categoryId: '1',
    provider: {
      id: 'provider1',
      name: 'John Doe',
      avatar: '/placeholder.svg',
      bio: 'Experienced web developer with 5+ years in the industry',
      location: {
        neighborhood: 'Manhattan',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      memberSince: new Date('2023-01-15'),
      verificationBadge: true,
      skills: ['React', 'TypeScript', 'Node.js'],
      ratings: [],
      averageRating: 4.8,
      responseRate: 95
    },
    location: {
      neighborhood: 'Manhattan',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    availability: 'Weekdays and weekends',
    pricingType: 'fee',
    pricingDetails: '$50/hour',
    createdAt: new Date('2024-01-15'),
    tags: ['web', 'development', 'react'],
    status: 'active',
    views: 127
  },
  {
    id: '2',
    title: 'Garden Design',
    description: 'Beautiful garden design and landscaping services for residential properties',
    images: [],
    categoryId: '2',
    provider: {
      id: 'provider2',
      name: 'Jane Smith',
      avatar: '/placeholder.svg',
      bio: 'Professional landscaper specializing in sustainable garden design',
      location: {
        neighborhood: 'Beverly Hills',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      },
      memberSince: new Date('2022-06-20'),
      verificationBadge: false,
      skills: ['Landscaping', 'Garden Design', 'Plant Care'],
      ratings: [],
      averageRating: 4.9,
      responseRate: 88
    },
    location: {
      neighborhood: 'Beverly Hills',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    availability: 'Weekends preferred',
    pricingType: 'fee',
    pricingDetails: '$75/hour',
    createdAt: new Date('2024-02-10'),
    tags: ['garden', 'landscaping', 'design'],
    status: 'active',
    views: 89
  }
];

// Export services for backward compatibility
export const services = mockServices;

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  serviceCount: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    description: 'Web development, IT support, and digital services',
    icon: '💻',
    serviceCount: 45
  },
  {
    id: '2',
    name: 'Home & Garden',
    description: 'Gardening, home improvement, and maintenance',
    icon: '🏡',
    serviceCount: 67
  },
  {
    id: '3',
    name: 'Education',
    description: 'Tutoring, language learning, and skill development',
    icon: '📚',
    serviceCount: 38
  }
];

// Mock function to simulate Firebase fetching
export const fetchServicesFromFirebase = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockServices;
};
