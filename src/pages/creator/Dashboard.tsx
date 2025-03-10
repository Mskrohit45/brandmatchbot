
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
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import sponsorshipService from '@/services/sponsorshipService';
import { SponsorshipListing } from '@/types/sponsorship';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CreatorDashboard() {
  const { user } = useAuth();

  const { data: listings, isLoading: isListingsLoading } = useQuery({
    queryKey: ['sponsorshipListings'],
    queryFn: () => sponsorshipService.getListings(),
  });

  const { data: applications, isLoading: isApplicationsLoading } = useQuery({
    queryKey: ['creatorApplications', user?.id],
    queryFn: () => user?.id ? sponsorshipService.getApplicationsByCreatorId(user.id) : Promise.resolve([]),
    enabled: !!user?.id,
  });

  // Mock engagement data - replace with real API call
  const engagementData = [
    { date: '2024-01', value: 65 },
    { date: '2024-02', value: 72 },
    { date: '2024-03', value: 68 },
    { date: '2024-04', value: 85 },
  ];

  return (
    <DashboardLayout title="Creator Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Applications</CardTitle>
            <CardDescription>Your pending sponsorship applications</CardDescription>
          </CardHeader>
          <CardContent>
            {isApplicationsLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <div className="text-3xl font-bold">
                {applications?.length || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Opportunities</CardTitle>
            <CardDescription>Matching sponsorship listings</CardDescription>
          </CardHeader>
          <CardContent>
            {isListingsLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <div className="text-3xl font-bold">
                {listings?.length || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
            <CardDescription>From approved sponsorships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0.00</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
            <CardDescription>Monthly engagement rate across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="engagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#engagement)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
