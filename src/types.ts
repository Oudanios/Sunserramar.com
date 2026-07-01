export interface Room {
  id: string;
  name: string;
  nameEn: string;
  nameFr?: string;
  nameAr?: string;
  description: string;
  descriptionEn: string;
  descriptionFr?: string;
  descriptionAr?: string;
  type: 'individual' | 'doble' | 'triple' | 'cuadruple';
  bathroom: 'private' | 'shared';
  price: number;
  image: string;
  images?: string[];
  amenities: string[];
  amenitiesEn: string[];
  amenitiesFr?: string[];
  amenitiesAr?: string[];
  maxGuests: number;
  featured?: boolean;
  available?: boolean;
  isLowInventory?: boolean;
  availableCount?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  commentEn?: string;
  roomType?: string;
  origin: 'Spain' | 'UK' | 'Germany' | 'France' | 'Ireland' | 'Sweden' | 'Other';
  verified?: boolean;
}

export interface Booking {
  id: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  textEs: string;
  textEn: string;
  style: 'alert-yellow' | 'alert-blue' | 'alert-green' | 'alert-red' | 'dark';
}

export interface CustomPage {
  id: string;
  titleEs: string;
  titleEn: string;
  contentEs: string;
  contentEn: string;
  icon: string;
  isActive: boolean;
  showInNav: boolean;
}
