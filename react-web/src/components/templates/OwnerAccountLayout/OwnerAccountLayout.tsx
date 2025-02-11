import React from 'react';
import { OwnerSidebar, Header, OwnerDashboardGraphs } from '@components/organisms';
import { User } from '@hooks';
import { OwnerDashboardData } from '@services';
import { AdminDashboardStatsCards, StatItem } from '@components/organisms/AdminDashboardStatsCards';

type OwnerHomeLayoutProps = {
  user : User | null;
  part: string;
  data: OwnerDashboardData | null;
  stats: StatItem[];
};

export const OwnerHomeLayout: React.FC<OwnerHomeLayoutProps> = ({
  user,
  part,
  data,
  stats,
}) => (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar du propriétaire */}
    <OwnerSidebar />
    <div className="flex-1">
      {/* En-tête */}
      <Header
        user={user}
        part={part}
      />
    <div className="flex p-6 gap-6">
          <div className="flex-1 space-y-6">
            <div className="space-y-6">
              {data && <OwnerDashboardGraphs data={data} />}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <AdminDashboardStatsCards stats={stats} />
          </div>
        </div>
      </div>
  </div>
);
