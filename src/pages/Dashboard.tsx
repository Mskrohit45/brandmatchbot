import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedSection } from '@/components/AnimatedSections';
import { ArrowRight, Award, BarChart3, Calendar, DollarSign, MessageSquare, TrendingUp, Users } from 'lucide-react';
import sponsorshipService from '@/services/sponsorshipService';
import aiService from '@/services/aiService';
import { Button } from '@/components/ui-custom/Button';
import { SponsorshipListing } from '@/types/sponsorship';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<SponsorshipListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [aiInsights, setAiInsights] = useState<{
    insights: string[];
    recommendations: string[];
  } | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoadingListings(true);
        const listings = await sponsorshipService.getListings();
        setListings(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoadingListings(false);
      }

      // Fetch AI Insights for creator
      if (user.role === 'creator' && user.socialConnections?.[0]?.metrics) {
        try {
          setLoadingInsights(true);
          const insights = await aiService.analyzeAudienceMetrics(user.socialConnections[0].metrics);
          setAiInsights(insights);
        } catch (error) {
          console.error('Error fetching AI insights:', error);
        } finally {
          setLoadingInsights(false);
        }
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnimatedSection animation="fade-in" className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-xl text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="mb-4">
              {user.role === 'creator'
                ? 'Here are the latest sponsorship opportunities matched to your profile.'
                : 'Here are your campaign stats and recommended creators.'}
            </p>
            <Button variant="secondary" size="sm" className="text-brand-700">
              {user.role === 'creator' ? 'Find Sponsorships' : 'Create Campaign'}
            </Button>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedSection animation="slide-up" delay={1} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="p-2 bg-brand-50 rounded-lg w-fit mb-2">
                  <Users className="h-5 w-5 text-brand-600" />
                </div>
                <span className="text-sm text-gray-500">
                  {user.role === 'creator' ? 'Profile Views' : 'Creator Matches'}
                </span>
                <span className="text-2xl font-bold text-gray-900">128</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={2} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="p-2 bg-green-50 rounded-lg w-fit mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">
                  {user.role === 'creator' ? 'Revenue' : 'Budget Used'}
                </span>
                <span className="text-2xl font-bold text-gray-900">$1,243</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={3} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="p-2 bg-purple-50 rounded-lg w-fit mb-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">
                  {user.role === 'creator' ? 'Proposals' : 'Applications'}
                </span>
                <span className="text-2xl font-bold text-gray-900">7</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={4} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col">
                <div className="p-2 bg-blue-50 rounded-lg w-fit mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">
                  {user.role === 'creator' ? 'Completed Deals' : 'Active Campaigns'}
                </span>
                <span className="text-2xl font-bold text-gray-900">3</span>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-in" delay={5} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-4 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Your profile views increased by 32% this week</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="p-4 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">You received a new sponsorship opportunity</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="p-4 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Your subscription will renew in 7 days</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="space-y-6">
          {user.role === 'creator' && (
            <AnimatedSection animation="slide-in" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">AI Insights</h3>
                <div className="text-xs bg-brand-100 text-brand-800 px-2 py-1 rounded-full">Beta</div>
              </div>
              <div className="p-6">
                {loadingInsights ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Audience Insights</h4>
                    <ul className="space-y-2 mb-4">
                      {aiInsights?.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5"></span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {aiInsights?.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection animation="slide-in" delay={1} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">
                {user.role === 'creator' ? 'Top Opportunities' : 'Top Creator Matches'}
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {loadingListings ? (
                <div className="p-6 space-y-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : (
                listings.slice(0, 3).map((listing) => (
                  <div key={listing.id} className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{listing.title}</h4>
                      <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                        87% Match
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      ${listing.budget.min}-${listing.budget.max} • {listing.industry}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm" className="text-brand-600 p-0">
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="text-brand-600 hover:bg-brand-50"
              >
                View All
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in" delay={2} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Performance</h3>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <BarChart3 className="h-24 w-24 text-gray-300 mb-4" />
              <p className="text-sm text-gray-500 text-center">
                Analytics will appear here after you complete your first deal.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
