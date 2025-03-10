
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui-custom/Button';
import { ArrowRight, Star, Sparkles, Users, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSections';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import sponsorshipService from '@/services/sponsorshipService';
import { SponsorshipListing } from '@/types/sponsorship';
import aiService from '@/services/aiService';

// Sample data for charts
const performanceData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 }
];

// Sample activities - would be pulled from API
const recentActivities = [
  {
    id: 1,
    type: 'offer',
    title: 'New sponsorship offer',
    description: 'TechGear wants to collaborate with you',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'match',
    title: 'New AI match',
    description: 'Your profile matches 5 new sponsorships',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'insight',
    title: 'Audience insight',
    description: 'Your engagement rate increased by 2.5%',
    time: '1 day ago'
  }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<SponsorshipListing[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await sponsorshipService.getListings();
        setListings(data.slice(0, 3)); // Just take first 3 for display
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoadingListings(false);
      }
    };
    
    const fetchAIInsights = async () => {
      try {
        if (user.role === 'creator' && user.socialConnections?.length > 0) {
          // Use first connected platform for demo
          const platform = user.socialConnections[0];
          const insights = await aiService.analyzeAudienceMetrics(platform.metrics);
          setInsights(insights.insights);
        }
      } catch (error) {
        console.error('Error fetching AI insights:', error);
      } finally {
        setIsLoadingInsights(false);
      }
    };
    
    fetchListings();
    if (user.role === 'creator') {
      fetchAIInsights();
    }
  }, [user]);
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnimatedSection animation="fade-in" className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-xl text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="mb-4">
              {user.role === 'creator' 
                ? 'Ready to discover new sponsorship opportunities tailored for your audience?' 
                : 'Looking for the perfect content creators for your brand campaigns?'}
            </p>
            <Button variant="secondary" className="bg-white text-brand-800 hover:bg-gray-100" onClick={() => navigate(user.role === 'creator' ? '/opportunities' : '/creators')}>
              {user.role === 'creator' ? 'Browse Opportunities' : 'Discover Creators'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedSection animation="slide-up" delay={1} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs mb-1">
                  {user.role === 'creator' ? 'Avg. Engagement' : 'Active Campaigns'}
                </div>
                <div className="text-2xl font-bold">
                  {user.role === 'creator' ? '4.2%' : '3'}
                </div>
                <div className="flex items-center text-green-500 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+2.5%</span>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={2} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs mb-1">
                  {user.role === 'creator' ? 'Total Sponsors' : 'Matched Creators'}
                </div>
                <div className="text-2xl font-bold">
                  {user.role === 'creator' ? '5' : '18'}
                </div>
                <div className="flex items-center text-green-500 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+3 new</span>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={3} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs mb-1">
                  {user.role === 'creator' ? 'Avg. Deal Rate' : 'Total Spend'}
                </div>
                <div className="text-2xl font-bold">
                  {user.role === 'creator' ? '$420' : '$2.4K'}
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Last 30 days</span>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={4} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs mb-1">
                  {user.role === 'creator' ? 'Audience Reach' : 'Total Reach'}
                </div>
                <div className="text-2xl font-bold">
                  {user.role === 'creator' ? '25K' : '120K'}
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{user.role === 'creator' ? 'Followers' : 'Audience'}</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-in" delay={5} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentActivities.map(activity => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    {activity.type === 'offer' && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'match' && (
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                    {activity.type === 'insight' && (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="space-y-6">
          {user.role === 'creator' && (
            <AnimatedSection animation="slide-in" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">AI Insights</h3>
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>
              
              <div className="p-4">
                {isLoadingInsights ? (
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                  </div>
                ) : insights && insights.length > 0 ? (
                  <ul className="space-y-3">
                    {insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-2">
                          <span className="flex h-6 w-6 rounded-full bg-purple-100 text-purple-500 items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{insight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">
                    Connect your social media accounts to get AI-powered insights about your audience and content performance.
                  </p>
                )}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="text-sm text-purple-600 hover:text-purple-700">
                  View all insights <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection animation="slide-in" delay={1} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">
                {user.role === 'creator' ? 'Top Matches' : 'Top Creators'}
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {isLoadingListings ? (
                <div className="p-4 space-y-4">
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : listings && listings.length > 0 ? (
                listings.map(listing => (
                  <div key={listing.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{listing.title}</h4>
                      <div className="flex items-center">
                        <span className="text-xs font-medium mr-1 px-2 py-1 rounded-full bg-green-100 text-green-800">
                          85% Match
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm" className="text-brand-600 p-0">
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600">No matches available at the moment.</p>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-gray-900">
                View all {user.role === 'creator' ? 'opportunities' : 'creators'} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in" delay={2} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Performance</h3>
            </div>
            
            <div className="p-4">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366F1" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Growth</div>
                  <div className="font-semibold">+12.5%</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Monthly change</div>
                  <div className="font-semibold">+$120</div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-gray-900">
                View detailed analytics <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
