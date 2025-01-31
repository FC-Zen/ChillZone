import React, { useEffect } from 'react';
import { AdminHomeLayout } from '@components/templates'; // Layout principal
import { useUser } from '@hooks';
import { DashboardData, getDashboardData } from '@services/AdminServices';
import { useTranslation } from 'react-i18next';
import { StatItem } from '@components/organisms/AdminDashboardStatsCards';

export const AdminHomePage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = React.useState<DashboardData | null>(null);
  const [statsData, setStatsData] = React.useState<StatItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data); // Stocke un tableau de `DashboardData`
        setStatsData([
          {
            icon: 'User',
            title: t('dashboard.info.users'),
            value: data.users_current_year ?? 0,
            trend: { value: data.users_percentage_change ?? 0, isPositive: true, duration: '1 month' },
          },
          {
            icon: 'Flag',
            title: t('dashboard.info.conflict'),
            value: data.reports_current_month ?? 0,
            trend: { value: data.reports_percentage_change ?? 0, isPositive: false, duration: '1 month' },
          },
          {
            icon: 'Cube',
            title: t('dashboard.info.openRooms'),
            value: data.available_locations ?? 0,
          },
          {
            icon: 'Dashboard',
            title: t('dashboard.info.openrestaurants'),
            value: data.available_restaurants ?? 0,
          },
        ]); // Créer les données pour les cartes de statistiques
      } catch (error) {
        console.error("Erreur lors de la récupération des données du dashboard:", error);
      }
    };
  
    fetchData();
  }, []);

  // Rendu de la page avec le layout
  return (
    <AdminHomeLayout
      user={user}
      part={t('navbar.home')}
      data={dashboardData}
      stats={statsData}
    />
  );
};
