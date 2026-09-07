export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  airlineLogo: string;
  origin: string;
  originCity: string;
  originAirport: string;
  destination: string;
  destinationCity: string;
  destinationAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  aircraft: string;
  cabinClass: 'economy' | 'premium_economy' | 'business';
  priceCOP: number;
  priceUSD: number;
  availableSeats: number;
  baggageIncluded: boolean;
  refundable: boolean;
  score?: number;
  scoreReasons?: string[];
}

export interface BookingConfirmation {
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
  pnr: string;
  ticketNumber: string;
  issuedAt: string;
  flight: Flight;
  alternativeOptions?: Flight[];
  passenger: {
    name: string;
    document: string;
    email: string;
    phone: string;
    seat: string;
    gate: string;
    terminal: string;
    boardingTime: string;
  };
  payment: {
    status: string;
    method: string;
    currency: 'COP' | 'USD';
    amount: number;
    authorizationCode: string;
    securityHash: string;
  };
  validationAudit: {
    engine: string;
    latencyMs: number;
    airlinesQueried: string[];
    budgetRequested: number;
    criteriaMatchScore: string;
    verificationBadge: string;
  };
}

export interface DestinationPackage {
  id: string;
  title: string;
  tagline: string;
  location: string;
  country: string;
  category: 'playa' | 'naturaleza' | 'cultural' | 'internacional' | 'aventura';
  image: string;
  durationDays: number;
  priceCOP: number;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  highlights: string[];
  included: string[];
  departureFrequency: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  coverImage: string;
  destination: string;
  content: string[];
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  destination: string;
  tripDate: string;
  comment: string;
  verified: boolean;
  tripPhotos?: string[];
  helpfulCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionLink?: {
    label: string;
    tab: string;
  };
}

export interface EmailNotification {
  id: string;
  recipient: string;
  subject: string;
  type: 'BOOKING_CONFIRMATION' | 'PROMOTION' | 'FLIGHT_UPDATE';
  date: string;
  read: boolean;
  previewSnippet: string;
  bookingData?: BookingConfirmation;
  promoCode?: string;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  icon?: string;
  type: 'booking' | 'flight_status' | 'promo' | 'security';
  read: boolean;
  data?: any;
}
