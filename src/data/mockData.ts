
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
  category: string;
  provider: string;
  rating: number;
  price?: string;
  location: string;
  image?: string;
}

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Professional website development services',
    category: 'Technology',
    provider: 'John Doe',
    rating: 4.8,
    price: '$50/hour',
    location: 'New York',
    image: '/images/1.jpg'
  },
  {
    id: '2',
    title: 'Garden Design',
    description: 'Beautiful garden design and landscaping',
    category: 'Home & Garden',
    provider: 'Jane Smith',
    rating: 4.9,
    price: '$75/hour',
    location: 'Los Angeles'
  }
];

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
