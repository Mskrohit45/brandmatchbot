
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, DollarSign, Users } from "lucide-react";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import sponsorshipService from '@/services/sponsorshipService';
import aiService from '@/services/aiService';
import RecommendedSponsorship from '@/components/sponsorships/RecommendedSponsorship';
import MetricsChart from '@/components/analytics/MetricsChart';
import EarningsSummary from '@/components/analytics/EarningsSummary';

export default function CreatorDashboard() {
  const { user } = useAuth();

  const { data: recommendations, isLoading: isRecommendationsLoading } = useQuery({
    queryKey: ['sponsorshipRecommendations', user?.id],
    queryFn: () => user?.id ? aiService.matchCreatorToBrands(user) : Promise.resolve([]),
    enabled: !!user?.id,
  });

  const { data: metrics, isLoading: isMetricsLoading } = useQuery({
    queryKey: ['creatorMetrics', user?.id],
    queryFn: () => user?.id ? sponsorshipService.getCreatorMetrics(user.id) : Promise.resolve([]),
    enabled: !!user?.id,
  });

  const { data: earnings, isLoading: isEarningsLoading } = useQuery({
    queryKey: ['creatorEarnings', user?.id],
    queryFn: () => user?.id ? sponsorshipService.getCreatorEarnings(user.id) : Promise.resolve(null),
    enabled: !!user?.id,
  });

  return (
    <DashboardLayout title="Creator Dashboard">
      {/* AI Insights */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Alert className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <AlertTitle>Top Match Available!</AlertTitle>
            <AlertDescription>
              New tech brand sponsorship with 92% compatibility match.
            </AlertDescription>
          </Alert>
          {/* Add more AI insights here */}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEarningsLoading ? (
              <Skeleton className="h-7 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">
                ${earnings?.totalEarned.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Add more metric cards */}
      </div>

      {/* Recommended Sponsorships */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Sponsorships</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isRecommendationsLoading ? (
            Array(3).fill(null).map((_, i) => (
              <Card key={i} className="h-[200px]">
                <CardContent className="p-4">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>
            ))
          ) : recommendations?.matches?.map((match) => (
            <RecommendedSponsorship key={match.listingId} match={match} />
          ))}
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Your engagement metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isMetricsLoading ? (
              <Skeleton className="h-full w-full" />
            ) : metrics ? (
              <MetricsChart data={metrics} />
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Earnings Summary */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>Your recent earnings and pending payments</CardDescription>
          </CardHeader>
          <CardContent>
            {isEarningsLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : earnings ? (
              <EarningsSummary earnings={earnings} />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
