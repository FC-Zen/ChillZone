import React from 'react';
import { AdminAccountLayout } from '@components/templates'; // Layout principal
import { StatCard } from '@components/molecules'; // Cartes statistiques
import { DashboardGraphs } from '@components/organisms'; // Composant pour les graphiques
import { Users, MessageSquare, Package, Percent } from 'lucide-react'; // Icônes nécessaires

export const AdminAccountPage: React.FC = () => {
  // Section des statistiques
  const statsSection = (
    <div className="flex flex-col gap-6">
      <StatCard
        icon={<Users />}
        title="Utilisateurs actifs"
        value="410"
        trend={{ value: 9.9, isPositive: true }}
      />
      <StatCard
        icon={<MessageSquare />}
        title="Signalements reçus"
        value="10"
        trend={{ value: 1.2, isPositive: false }}
      />
      <StatCard icon={<Package />} title="Salles disponibles" value="41" />
      <StatCard
        icon={<Percent />}
        title="Taux d'occupation"
        value="84%"
        trend={{ value: 9.9, isPositive: true }}
      />
    </div>
  );

  // Section du contenu principal
  const mainContent = (
    <div className="space-y-6">
      <DashboardGraphs />
    </div>
  );

  // Rendu de la page avec le layout
  return (
    <AdminAccountLayout
      username="Kellian Bredeau"
      userEmail="kellianbre@outlook.fr"
      organization="Université Gustave Eiffel"
      part="Accueil"
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
