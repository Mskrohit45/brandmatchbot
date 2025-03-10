
import { SponsorshipListing, SponsorshipApplication, SponsorshipDeal } from '@/types/sponsorship';

// Mock data - would be replaced with real API calls
const MOCK_LISTINGS: SponsorshipListing[] = [
  {
    id: 'sp-1',
    brandId: 'brand-456',
    title: 'Tech Accessories Review Campaign',
    description: 'Looking for tech influencers to review our new line of smartphone accessories. We want honest, detailed reviews focusing on quality and functionality.',
    budget: {
      min: 300,
      max: 1000,
      currency: 'USD'
    },
    requirements: {
      minFollowers: 10000,
      platforms: ['youtube', 'instagram'],
      contentType: ['review', 'unboxing'],
      deliverables: ['1 detailed review video', '2 Instagram Stories', '1 Instagram post']
    },
    targetAudience: {
      ageGroups: ['18-24', '25-34'],
      locations: ['United States', 'Canada', 'United Kingdom'],
      interests: ['Technology', 'Gadgets', 'Smartphones']
    },
    industry: 'Technology',
    status: 'active',
    applications: [],
    createdAt: '2023-06-01T09:00:00Z',
    expiresAt: '2023-08-01T09:00:00Z'
  },
  {
    id: 'sp-2',
    brandId: 'brand-789',
    title: 'Fitness App Promotion',
    description: 'Seeking fitness and wellness creators to showcase our workout app. We want to highlight the app\'s features in authentic workout and wellness routines.',
    budget: {
      min: 250,
      max: 800,
      currency: 'USD'
    },
    requirements: {
      minFollowers: 5000,
      platforms: ['instagram', 'tiktok'],
      contentType: ['tutorial', 'lifestyle'],
      deliverables: ['3 TikTok videos', '2 Instagram Reels', '1 detailed app review']
    },
    targetAudience: {
      ageGroups: ['18-24', '25-34', '35-44'],
      locations: ['United States', 'Australia', 'Germany'],
      interests: ['Fitness', 'Health', 'Wellness', 'Technology']
    },
    industry: 'Health & Fitness',
    status: 'active',
    applications: [],
    createdAt: '2023-06-15T14:30:00Z',
    expiresAt: '2023-07-30T14:30:00Z'
  }
];

const MOCK_APPLICATIONS: SponsorshipApplication[] = [
  {
    id: 'app-1',
    creatorId: 'creator-123',
    listingId: 'sp-1',
    proposal: 'I would love to create a detailed review of your tech accessories. My audience is very tech-savvy and always looking for quality accessories.',
    suggestedRate: 500,
    status: 'pending',
    createdAt: '2023-06-10T11:20:00Z',
    updatedAt: '2023-06-10T11:20:00Z'
  }
];

const MOCK_DEALS: SponsorshipDeal[] = [];

class SponsorshipService {
  // Listings
  async getListings(filters?: any): Promise<SponsorshipListing[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, would apply filters from the server
    return MOCK_LISTINGS;
  }
  
  async getListingById(id: string): Promise<SponsorshipListing | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const listing = MOCK_LISTINGS.find(listing => listing.id === id);
    return listing || null;
  }
  
  async createListing(listing: Omit<SponsorshipListing, 'id' | 'applications' | 'createdAt' | 'expiresAt'>): Promise<SponsorshipListing> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newListing: SponsorshipListing = {
      ...listing,
      id: `sp-${Date.now()}`,
      applications: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };
    
    // In a real app, would save to database
    MOCK_LISTINGS.push(newListing);
    
    return newListing;
  }
  
  // Applications
  async getApplicationsByCreatorId(creatorId: string): Promise<SponsorshipApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return MOCK_APPLICATIONS.filter(app => app.creatorId === creatorId);
  }
  
  async getApplicationsByListingId(listingId: string): Promise<SponsorshipApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return MOCK_APPLICATIONS.filter(app => app.listingId === listingId);
  }
  
  async createApplication(application: Omit<SponsorshipApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<SponsorshipApplication> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already applied
    const existingApplication = MOCK_APPLICATIONS.find(
      app => app.creatorId === application.creatorId && app.listingId === application.listingId
    );
    
    if (existingApplication) {
      throw new Error('You have already applied to this listing');
    }
    
    const newApplication: SponsorshipApplication = {
      ...application,
      id: `app-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, would save to database
    MOCK_APPLICATIONS.push(newApplication);
    
    return newApplication;
  }
  
  // Deals
  async createDeal(deal: Omit<SponsorshipDeal, 'id' | 'createdAt'>): Promise<SponsorshipDeal> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDeal: SponsorshipDeal = {
      ...deal,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    // In a real app, would save to database
    MOCK_DEALS.push(newDeal);
    
    // Update application status
    const application = MOCK_APPLICATIONS.find(app => app.id === deal.applicationId);
    if (application) {
      application.status = 'accepted';
      application.updatedAt = new Date().toISOString();
    }
    
    return newDeal;
  }
  
  async getDealsByCreatorId(creatorId: string): Promise<SponsorshipDeal[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return MOCK_DEALS.filter(deal => deal.creatorId === creatorId);
  }
  
  async getDealsByBrandId(brandId: string): Promise<SponsorshipDeal[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return MOCK_DEALS.filter(deal => deal.brandId === brandId);
  }
  
  // AI Services
  async getAIMatchScore(creatorId: string, listingId: string): Promise<{
    score: number;
    reasons: string[];
    suggestedRate: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real app, would call AI service with creator and listing data
    
    return {
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      reasons: [
        'Audience demographics match listing requirements',
        'Previous engagement rate with similar products is high',
        'Content style aligns with brand values'
      ],
      suggestedRate: Math.floor(Math.random() * 500) + 300 // Random rate between 300-800
    };
  }
  
  async getSuggestedPricing(metrics: any): Promise<{
    minRate: number;
    maxRate: number;
    avgRate: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In a real app, would use AI to calculate based on metrics
    
    const followers = metrics.followers || 10000;
    const engagementRate = metrics.engagementRate || 3;
    
    // Simple formula for demo purposes
    const baseRate = (followers / 1000) * (engagementRate / 2);
    
    return {
      minRate: Math.round(baseRate * 0.7),
      maxRate: Math.round(baseRate * 1.3),
      avgRate: Math.round(baseRate)
    };
  }
}

// Create singleton instance
const sponsorshipService = new SponsorshipService();

export default sponsorshipService;
