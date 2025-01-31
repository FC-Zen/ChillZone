import React, { useEffect } from 'react';
import { AdminHomeLayout } from '@components/templates'; // Layout principal
import { StatCard } from '@components/molecules'; // Cartes statistiques
import { AdminDashboardGraphs } from '@components/organisms'; // Composant pour les graphiques
import AdminCardData from '@assets/fr.json'; // Import des données FR (renommées)
import { useUser } from '@hooks';
import { DashboardData, getDashboardData } from '@services/AdminServices';

export const AdminHomePage: React.FC = () => {
  const { user } = useUser();
  const [dashboardData, setDashboardData] = React.useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data); // Stocke un tableau de `DashboardData`
      } catch (error) {
        console.error("Erreur lors de la récupération des données du dashboard:", error);
      }
    };
  
    fetchData();
  }, []);
  
  // Section des statistiques
  const statsSection = (
    <div className="flex flex-col gap-6">
      {dashboardData && 
        <>
          <StatCard
            icon='User'
            title={AdminCardData.dashboard.info.users}
            value={dashboardData.users_current_year}
            trend={{ value: dashboardData.users_percentage_change, isPositive: true, duration: '1 month' }}
          />
          <StatCard
            icon='Flag'
            title={AdminCardData.dashboard.info.conflict}
            value={dashboardData.reports_current_month}
            trend={{ value: dashboardData.reports_percentage_change, isPositive: false, duration: '1 month' }}
          />
          <StatCard
            icon='Cube'
            title={AdminCardData.dashboard.info.openRooms}
            value={dashboardData.available_locations}
          />
          {/* Card pour le taux d'occupation (à implémenter en données dynamiques)
          
          <StatCard
            icon='Dashboard'
            title={AdminCardData.dashboard.info.occupationTime}
            value={AdminCardDataValue.occupationTimeValue}
            trend={{ value: 9.9, isPositive: true, duration: '1 month' }}
          />*/}
        </>
      }
    </div>
  );

  // Section du contenu principal
  const mainContent = (
    <div className="space-y-6">
      {dashboardData && <AdminDashboardGraphs data={dashboardData} />}
    </div>
  );

  function t(key: string): string {
    const translations: { [key: string]: string } = {
      'navbar.home': 'Accueil',
    };
    return translations[key] || key;
  }

  // Rendu de la page avec le layout
  return (
    <AdminHomeLayout
      user={user}
      part={t('navbar.home')}
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
