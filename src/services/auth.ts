
import { UserProfile } from '@/types/user';
import { toast } from '@/components/ui/use-toast';

// Mock user data - in a real app, this would be fetched from Supabase or another backend
const MOCK_USERS = [
  {
    id: 'creator-123',
    email: 'creator@example.com',
    password: 'password123',
    name: 'Alex Creator',
    role: 'creator',
    plan: 'growth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Lifestyle content creator passionate about travel and food',
    website: 'https://alexcreator.com',
    location: 'New York, USA',
    socialConnections: [
      {
        platform: 'instagram',
        username: 'alex_creates',
        followers: 25000,
        connected: true,
        verified: true,
        metrics: {
          engagementRate: 3.2,
          avgLikes: 1200,
          avgComments: 45,
          audience: {
            ageGroups: { '18-24': 35, '25-34': 45, '35-44': 15, '45+': 5 },
            genderSplit: { male: 35, female: 60, other: 5 },
            topLocations: { 'United States': 65, 'Canada': 15, 'UK': 10 },
            interests: ['Travel', 'Food', 'Lifestyle', 'Photography']
          }
        }
      },
      {
        platform: 'youtube',
        username: 'AlexCreates',
        followers: 15000,
        connected: true,
        verified: true,
        metrics: {
          engagementRate: 4.5,
          avgLikes: 850,
          avgComments: 120,
          avgViews: 5000
        }
      }
    ],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-05-20T14:30:00Z'
  },
  {
    id: 'brand-456',
    email: 'brand@example.com',
    password: 'password123',
    name: 'TechGear',
    role: 'brand',
    plan: 'business',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechGear',
    bio: 'Innovative tech accessories for modern lifestyles',
    company: 'TechGear Inc.',
    website: 'https://techgear.com',
    location: 'San Francisco, USA',
    socialConnections: [],
    createdAt: '2022-11-05T09:15:00Z',
    updatedAt: '2023-06-10T11:45:00Z'
  }
];

// Mock implementation - would be replaced with actual auth service like Supabase/Firebase/etc
class AuthService {
  private currentUser: UserProfile | null = null;
  
  async login(email: string, password: string): Promise<UserProfile> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = MOCK_USERS.find(user => user.email === email && user.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password from returned user object
    const { password: _, ...userProfile } = user;
    this.currentUser = userProfile as UserProfile;
    
    // Save to localStorage
    localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
    
    return this.currentUser;
  }
  
  async register(email: string, password: string, name: string, role: 'creator' | 'brand'): Promise<UserProfile> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: UserProfile = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
      plan: 'free',
      socialConnections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, would save to database here
    
    this.currentUser = newUser;
    localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
    
    return newUser;
  }
  
  async logout(): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.currentUser = null;
    localStorage.removeItem('auth_user');
  }
  
  async getCurrentUser(): Promise<UserProfile | null> {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    // Try to get from localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    return null;
  }
  
  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }
    
    // Update user
    this.currentUser = {
      ...this.currentUser,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
    
    return this.currentUser;
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
