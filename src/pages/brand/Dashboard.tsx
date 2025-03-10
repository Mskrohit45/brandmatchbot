
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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BrandDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: campaigns, isLoading: isCampaignsLoading } = useQuery({
    queryKey: ['brandCampaigns', user?.id],
    queryFn: () => user?.id ? sponsorshipService.getListings({ brandId: user.id }) : Promise.resolve([]),
    enabled: !!user?.id,
  });

  return (
    <DashboardLayout title="Brand Dashboard">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Campaign Overview</h2>
        <Button onClick={() => navigate('/campaigns/new')} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Currently running sponsorships</CardDescription>
          </CardHeader>
          <CardContent>
            {isCampaignsLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <div className="text-3xl font-bold">
                {campaigns?.filter(c => c.status === 'active').length || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Applications</CardTitle>
            <CardDescription>Creators interested in your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            {isCampaignsLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <div className="text-3xl font-bold">
                {campaigns?.reduce((acc, curr) => acc + curr.applications.length, 0) || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Spent</CardTitle>
            <CardDescription>Total campaign investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0.00</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
