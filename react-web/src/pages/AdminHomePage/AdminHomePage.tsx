import React from 'react';
import { AdminHomeLayout } from '@components/templates'; // Layout principal
import { StatCard } from '@components/molecules'; // Cartes statistiques
import { AdminDashboardGraphs } from '@components/organisms'; // Composant pour les graphiques
import AdminCardData from '@assets/fr.json'; // Import des données FR (renommées)
import { User, Flag, Cube, Dashboard } from '@components/atoms/Icons';
import { colors } from '@theme';

export const AdminHomePage: React.FC = () => {
  // Section des statistiques
  const statsSection = (
    <div className="flex flex-col gap-6">
      <StatCard
        icon={<User color={colors.white} />}
        title={AdminCardData.dashboard.info.users}
        value={AdminCardData.dashboard.info.usersValue}
        trend={{ value: 9.9, isPositive: true }}
      />
      <StatCard
        icon={<Flag color={colors.white} />}
        title={AdminCardData.dashboard.info.conflict}
        value={AdminCardData.dashboard.info.conflictValue}
        trend={{ value: 1.2, isPositive: false }}
      />
      <StatCard
        icon={<Cube color={colors.white} />}
        title={AdminCardData.dashboard.info.openRooms}
        value={AdminCardData.dashboard.info.openRoomsValue}
      />
      <StatCard
        icon={<Dashboard color={colors.white} />}
        title={AdminCardData.dashboard.info.occupationTime}
        value={AdminCardData.dashboard.info.occupationTimeValue}
        trend={{ value: 9.9, isPositive: true }}
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
      // Ajoutez d'autres traductions ici si nécessaire
    };
    return translations[key] || key;
  }
  // Rendu de la page avec le layout
  return (
    <AdminHomeLayout
      username="Kellian Bredeau"
      userEmail="kellianbre@outlook.fr"
      organization="Université Gustave Eiffel"
      part={t('navbar.home')}
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
