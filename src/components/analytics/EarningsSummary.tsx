
import React from 'react';
import { SponsorshipEarnings } from '@/types/sponsorship';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface EarningsSummaryProps {
  earnings: SponsorshipEarnings;
}

export default function EarningsSummary({ earnings }: EarningsSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Earned</p>
          <p className="text-2xl font-bold">${earnings.totalEarned.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold">${earnings.pendingPayments.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-2xl font-bold">${earnings.thisMonth.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Month</p>
          <p className="text-2xl font-bold">${earnings.lastMonth.toLocaleString()}</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Recent Payments</h4>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {earnings.recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{payment.brandName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">${payment.amount.toLocaleString()}</p>
                  <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
