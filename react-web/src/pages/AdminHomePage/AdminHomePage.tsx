import React from 'react';
import { AdminHomeLayout } from '@components/templates'; // Layout principal
import { StatCard } from '@components/molecules'; // Cartes statistiques
import { AdminDashboardGraphs } from '@components/organisms'; // Composant pour les graphiques
import { Users, MessageSquare, Package, Percent } from 'lucide-react'; // Icônes nécessaires
import AdminCardData from '@assets/fr.json'; // Import des données FR (renommées)

export const AdminHomePage: React.FC = () => {
  // Section des statistiques
  const statsSection = (
    <div className="flex flex-col gap-6">
      <StatCard
        icon={<Users />}
        title={AdminCardData.dashboard.info.users}
        value={AdminCardData.dashboard.info.usersValue}
        trend={{ value: 9.9, isPositive: true }}
      />
      <StatCard
        icon={<MessageSquare />}
        title={AdminCardData.dashboard.info.conflict}
        value={AdminCardData.dashboard.info.conflictValue}
        trend={{ value: 1.2, isPositive: false }}
      />
      <StatCard
        icon={<Package />}
        title={AdminCardData.dashboard.info.openRooms}
        value={AdminCardData.dashboard.info.openRoomsValue}
      />
      <StatCard
        icon={<Percent />}
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

  // Rendu de la page avec le layout
  return (
    <AdminHomeLayout
      username="Kellian Bredeau"
      userEmail="kellianbre@outlook.fr"
      organization="Université Gustave Eiffel"
      part="Accueil"
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
