import React, { useEffect, useState } from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import { getDashboardDataOwner, OwnerDashboardData, updateRestaurantStatus } from '@services';
import { StatItem } from '@components/organisms/AdminDashboardStatsCards';

export const OwnerHomePage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [restaurantOpen, setRestaurantOpen] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = React.useState<OwnerDashboardData | null>(null);
  const [statsData, setStatsData] = React.useState<StatItem[]>([]);
    
  const fetchData = async () => {
    try {
      const data = await getDashboardDataOwner();
      setDashboardData(data); // Stocke un tableau de `DashboardData`
      setRestaurantOpen(data.status);
      setStatsData([
        {
          icon: 'User',
          title: t('dashboard.info.mostWantedProduct'),
          value: data.most_sold_meal,
        },
        {
          icon: 'Flag',
          title: t('dashboard.info.mostWantedMenu'),
          value: data.most_sold_menu ?? 0,
        },
        {
          icon: 'Cube',
          title: t('dashboard.info.commandsNow'),
          value: data.commands_completed_today ?? 0,
        },
        {
          icon: 'Package',
          title: t('dashboard.info.commandsToday'),
          value: data.commands_in_progress ?? 0,
          trend: { value: data.percentage_commands_completed_yesterday ?? 0, isPositive: false, duration: t('dashboard.info.yesterday') },
        },
      ]); 
    } catch (error) {
      console.error("Erreur lors de la récupération des données du dashboard:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRestaurantToggle = async (status: boolean) => {
    const res = await updateRestaurantStatus(status);
    if (res == 200) {
      setRestaurantOpen(status);
    }
  };

  return (
    <OwnerHomeLayout
      user={user}
      part={t('navbar.home')}
      data={dashboardData}
      restaurantOpen={restaurantOpen}
      onClick={handleRestaurantToggle}
      stats={statsData}
    />
  );
};
