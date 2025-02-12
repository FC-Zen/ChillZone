import React from 'react';
import { useTranslation } from 'react-i18next';
import { OwnerSidebar, Header, OwnerDashboardGraphs } from '@components/organisms';
import { User } from '@hooks';
import { OwnerDashboardData } from '@services';
import { AdminDashboardStatsCards, StatItem } from '@components/organisms/AdminDashboardStatsCards';
import { colors } from '@theme';
import { CustomSwitch } from '@components/molecules';

type OwnerHomeLayoutProps = {
  user: User | null;
  part: string;
  data: OwnerDashboardData | null;
  stats: StatItem[];
  restaurantOpen: boolean;
  onClick: (status: boolean) => void;
};

export const OwnerHomeLayout: React.FC<OwnerHomeLayoutProps> = ({
  user,
  part,
  data,
  stats,
  restaurantOpen,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OwnerSidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        <Header user={user} part={part} />

        <div className="flex flex-1 p-6 gap-6">
          <div className="w-3/4 space-y-6 h-full">
            {data && <OwnerDashboardGraphs data={data} />}
          </div>

          <div className="w-1/4 flex flex-col gap-6 h-full">
              <div className="p-4 bg-red rounded-lg shadow-md flex items-center space-x-4 relative" style={
                { 
                  background: restaurantOpen ? colors.green : colors.red,
                  fontWeight: "bold",
                  color: colors.white,
                }
              }>
              <CustomSwitch
                checked={restaurantOpen}
                onChange={() => onClick(!restaurantOpen)}
              />
              <h2>
                {t('dashboard.restaurant')} {restaurantOpen ? t('status.open') : t('status.close')}
              </h2>
            </div>

            <AdminDashboardStatsCards stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};
