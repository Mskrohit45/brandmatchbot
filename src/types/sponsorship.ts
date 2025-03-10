
export interface SponsorshipListing {
  id: string;
  brandId: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: {
    minFollowers: number;
    platforms: string[];
    contentType: string[];
    deliverables: string[];
  };
  targetAudience: {
    ageGroups?: string[];
    locations?: string[];
    interests?: string[];
  };
  industry: string;
  status: 'active' | 'paused' | 'completed';
  applications: SponsorshipApplication[];
  createdAt: string;
  expiresAt: string;
  brandLogo?: string;
  brandName?: string;
  aiMatchScore?: number;
  aiMatchReasons?: string[];
}

export interface SponsorshipApplication {
  id: string;
  creatorId: string;
  listingId: string;
  proposal: string;
  suggestedRate: number;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  createdAt: string;
  updatedAt: string;
}

export interface SponsorshipDeal {
  id: string;
  creatorId: string;
  brandId: string;
  listingId: string;
  applicationId: string;
  terms: {
    rate: number;
    deliverables: string[];
    timeline: string;
    paymentTerms: string;
  };
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  payments: {
    status: 'pending' | 'paid';
    amount: number;
    date: string;
  }[];
  createdAt: string;
  completedAt?: string;
}

export interface AnalyticsData {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  engagementRate: number;
  periodStart: string;
  periodEnd: string;
}

export interface CampaignMetrics {
  id: string;
  campaignId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  updatedAt: string;
}

export interface CreatorMetrics {
  id: string;
  creatorId: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'twitter';
  followers: number;
  engagement: number;
  views: number;
  likes: number;
  comments: number;
  updatedAt: string;
}

export interface AiRecommendation {
  listingId: string;
  matchScore: number;
  reasons: string[];
  suggestedRate?: number;
}

export interface AiSponsorshipInsight {
  type: 'tip' | 'warning' | 'opportunity';
  message: string;
  actionable: boolean;
  action?: {
    label: string;
    url?: string;
  };
}

export interface SponsorshipEarnings {
  totalEarned: number;
  pendingPayments: number;
  thisMonth: number;
  lastMonth: number;
  currency: string;
  recentPayments: {
    id: string;
    amount: number;
    date: string;
    brandName: string;
    status: 'pending' | 'paid';
  }[];
}
