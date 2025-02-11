import React, { useEffect, useState } from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { OwnerDashboardGraphs } from '@components/organisms';
import { CustomSwitch, StatCard } from '@components/molecules'; // Réutilisation du StatCard d'Admin
import { colors } from '@theme'; // Couleurs
import OwnerCardData from '@assets/fr.json'; // Import des données FR (renommées)
import OwnerCardDataValues from '@assets/data/stat_card_value.json'; // Import des données FR (renommées)
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import { getDashboardDataOwner, OwnerDashboardData } from '@services';
import { StatItem } from '@components/organisms/AdminDashboardStatsCards';

export const OwnerHomePage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [restaurantOpen, setRestaurantOpen] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = React.useState<OwnerDashboardData | null>(null);
  const [statsData, setStatsData] = React.useState<StatItem[]>([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardDataOwner();
        setDashboardData(data); // Stocke un tableau de `DashboardData`
        setStatsData([
          {
            icon: 'User',
            title: t('dashboard.info.users'),
            value: data.users_current_year ?? 0,
            trend: { value: data.users_percentage_change ?? 0, isPositive: true, duration: '1 month' },
          },
          {
            icon: 'User',
            title: t('dashboard.info.users'),
            value: data.users_current_year ?? 0,
            trend: { value: data.users_percentage_change ?? 0, isPositive: true, duration: '1 month' },
          }
        ]); 
      } catch (error) {
        console.error("Erreur lors de la récupération des données du dashboard:", error);
      }
    };
  
    fetchData();
  }, []);


  
  // Section des statistiques
  const statsSection = (
    <div className="space-y-6">
      <div className="p-4 bg-red rounded-lg shadow-md flex items-center space-x-4 relative" style={
        { 
          background: restaurantOpen ? colors.green : colors.red,
          fontWeight: "bold",
          color: colors.white,
        }
      }>
        <CustomSwitch onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRestaurantOpen(!restaurantOpen)}/>
        <h2>Votre restaurant est {restaurantOpen ? t('status.open') : t('status.close') }</h2>
      </div>
      <StatCard
        icon='User'
        title={OwnerCardData.dashboard.info.mostWantedProduct}
        value={OwnerCardDataValues.mostWantedName}
      />
      <StatCard
        icon='Flag'
        title={OwnerCardData.dashboard.info.mostWantedMenu}
        value={OwnerCardDataValues.mostWantedMenuName}
      />
      <StatCard
        icon='User'
        title={OwnerCardData.dashboard.info.onHour}
        value={OwnerCardDataValues.onHourValue}
      />
      <StatCard
        icon='Layers'
        title={OwnerCardData.dashboard.info.commandsToday}
        value={OwnerCardDataValues.onTodayValue}
      />
    </div>
  );

  return (
    <OwnerHomeLayout
      user={user}
      part={t('navbar.home')}
      data={dashboardData}
      stats={statsData}
    />
  );
};
