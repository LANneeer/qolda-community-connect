
export interface ServiceCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface ServiceLocation {
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface UserRating {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  location: ServiceLocation;
  memberSince: Date;
  verificationBadge?: boolean;
  skills: string[];
  ratings: UserRating[];
  averageRating?: number;
  responseRate?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  images?: string[];
  categoryId: string;
  provider: ServiceProvider;
  location: ServiceLocation;
  availability: string;
  pricingType: 'free' | 'exchange' | 'fee';
  pricingDetails?: string;
  createdAt: Date;
  tags: string[];
  status: 'active' | 'paused' | 'completed';
  views: number;
}
