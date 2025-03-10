
export type UserRole = 'creator' | 'brand' | 'admin';

export type PlanType = 'free' | 'starter' | 'growth' | 'pro' | 'business' | 'enterprise';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanType;
  avatar?: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
  socialConnections: SocialConnection[];
  createdAt: string;
  updatedAt: string;
}

export interface SocialConnection {
  platform: 'youtube' | 'instagram' | 'tiktok' | 'twitter';
  username: string;
  followers: number;
  connected: boolean;
  verified: boolean;
  metrics?: SocialMetrics;
}

export interface SocialMetrics {
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
  avgViews?: number;
  audience?: AudienceDemographics;
}

export interface AudienceDemographics {
  ageGroups?: {
    [key: string]: number; // e.g., "18-24": 35 (percent)
  };
  genderSplit?: {
    male: number;
    female: number;
    other: number;
  };
  topLocations?: {
    [key: string]: number; // e.g., "United States": 45 (percent)
  };
  interests?: string[];
}
