import React from 'react';
import { AdminHomeLayout } from '@components/templates'; // Layout principal
import { StatCard } from '@components/molecules'; // Cartes statistiques
import { AdminDashboardGraphs } from '@components/organisms'; // Composant pour les graphiques
import AdminCardData from '@assets/fr.json'; // Import des données FR (renommées)
import AdminCardDataValue from '@assets/data/stat_card_value.json'; // Import des données FR (renommées)

import {
  User,
  Flag,
  Cube,
  Dashboard,
  Graduation,
} from '@components/atoms/Icons';
import { colors } from '@theme';
import { useUser } from '@hooks';

export const AdminHomePage: React.FC = () => {
  const { user } = useUser();
  
  // Section des statistiques
  const statsSection = (
    <div className="flex flex-col gap-6">
      <StatCard
        icon={<User color={colors.white} />}
        title={AdminCardData.dashboard.info.users}
        value={AdminCardDataValue.usersValue}
        trend={{ value: 9.9, isPositive: true, duration: '1 month' }}
      />
      <StatCard
        icon={<Flag color={colors.white} />}
        title={AdminCardData.dashboard.info.conflict}
        value={AdminCardDataValue.conflictValue}
        trend={{ value: 1.2, isPositive: false, duration: '1 month' }}
      />
      <StatCard
        icon={<Cube color={colors.white} />}
        title={AdminCardData.dashboard.info.openRooms}
        value={AdminCardDataValue.openRoomsValue}
      />
      <StatCard
        icon={<Dashboard color={colors.white} />}
        title={AdminCardData.dashboard.info.occupationTime}
        value={AdminCardDataValue.occupationTimeValue}
        trend={{ value: 9.9, isPositive: true, duration: '1 month' }}
      />
    </div>
  );

  // Section du contenu principal
  const mainContent = (
    <div className="space-y-6">
      <AdminDashboardGraphs />
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
      userEmail={user?.userEmail ?? ""}
      username={user?.username ?? ""}
      organization={user?.organization ?? ""}
      part={t('navbar.home')}
      role={user?.role ?? ""}
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
