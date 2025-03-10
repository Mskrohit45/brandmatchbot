
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
