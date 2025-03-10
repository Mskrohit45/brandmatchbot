
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AiRecommendation } from '@/types/sponsorship';
import { ExternalLink, Sparkles } from 'lucide-react';

interface RecommendedSponsorshipProps {
  match: AiRecommendation;
}

export default function RecommendedSponsorship({ match }: RecommendedSponsorshipProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="mb-2">
            {match.matchScore}% Match
          </Badge>
          <Sparkles className="h-4 w-4 text-purple-500" />
        </div>
        <CardTitle className="text-lg">Brand Name Here</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {match.reasons[0]}
          </div>
          <div className="text-sm font-medium">
            Suggested Rate: ${match.suggestedRate?.toLocaleString()}
          </div>
          <Button className="w-full" variant="outline">
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
