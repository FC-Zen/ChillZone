import React from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { OwnerDashboardGraphs } from '@components/organisms';
import { StatCard } from '@components/molecules'; // Réutilisation du StatCard d'Admin
import { Users, MessageSquare, Clock, Layers } from 'lucide-react';

export const OwnerHomePage: React.FC = () => {
  // Section des statistiques
  const statsSection = (
    <div className="space-y-6">
      <StatCard
        icon={<Users />}
        title="Cookies"
        value="Produit le plus vendu"
      />
      <StatCard
        icon={<MessageSquare />}
        title="Menu étudiant"
        value="Menu le plus vendu"
      />
      <StatCard icon={<Clock />} title="8" value="Commandes dans l'heure" />
      <StatCard
        icon={<Layers />}
        title="28"
        value="Commandes réalisées aujourd'hui"
      />
    </div>
  );

  // Contenu principal
  const mainContent = (
    <div className="space-y-6">
      {/* Graphiques */}
      <OwnerDashboardGraphs />

      {/* Placeholder pour les tableaux */}
      <div className="bg-white border rounded-lg p-4 shadow-md">
        <p className="text-gray-400 text-center">
          [Placeholder pour "Dernières commandes en cours"]
        </p>
      </div>
      <div className="bg-white border rounded-lg p-4 shadow-md">
        <p className="text-gray-400 text-center">
          [Placeholder pour "Mes lieux de restauration"]
        </p>
      </div>
    </div>
  );

  return (
    <OwnerHomeLayout
      username="Kellian Bredeau"
      userEmail="kellianbre@outlook.fr"
      organization="Université Gustave Eiffel"
      part="Accueil"
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
