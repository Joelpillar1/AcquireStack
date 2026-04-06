
export interface Founder {
  name: string;
  bio: string;
  founderTwitterUrl?: string;
}

export interface Qna {
  question: string;
  answer: string;
}

export interface StartupListing {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  targetAudience: string;
  businessType: 'B2B' | 'B2C';
  projectUrl: string;
  twitterUrl?: string;
  paymentGatewayApiKey?: string;
  techStack: string[];
  mrr: number;
  mrrVerified: boolean;
  users: number;
  usersVerified: boolean;
  price: number;
  lifetimeRevenue: number;
  whatYouGet: string[];
  founder: Founder;
  qna: Qna[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export enum Page {
    Home = 'home',
    Listings = 'listings',
    Details = 'details',
    ListStartup = 'list-startup'
}