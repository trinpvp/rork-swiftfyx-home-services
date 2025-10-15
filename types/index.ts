export interface Worker {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  hourlyRate: number;
  specialties: string[];
  about: string;
  yearsInBusiness: number;
  hiresOnSwiftFyx: number;
  backgroundChecked: boolean;
  languages: string[];
  images: string[];
  category: string;
  available: boolean;
}

export interface Order {
  id: string;
  userId: string;
  workerId: string;
  workerName: string;
  workerImage: string;
  category: string;
  service: string;
  details: string;
  address: string;
  status: 'active' | 'completed';
  date: string;
  estimatedArrival?: string;
  progress: number;
}

export interface Message {
  id: string;
  userId: string;
  workerId: string;
  workerName: string;
  workerImage: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}
