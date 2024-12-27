import React from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { OwnerDashboardGraphs } from '@components/organisms';
import { StatCard } from '@components/molecules'; // Réutilisation du StatCard d'Admin
import { User, Flag, Layers } from '@components/atoms/Icons'; // Icône nécessaire
import { colors } from '@theme'; // Couleurs

export const OwnerHomePage: React.FC = () => {
  // Section des statistiques
  const statsSection = (
    <div className="space-y-6">
      <StatCard
        icon={<User color={colors.white} />}
        title="Cookies"
        value="Produit le plus vendu"
      />
      <StatCard
        icon={<Flag color={colors.white} />}
        title="Menu étudiant"
        value="Menu le plus vendu"
      />
      <StatCard
        icon={<User color={colors.white} />}
        title="8"
        value="Commandes dans l'heure"
      />
      <StatCard
        icon={<Layers color={colors.white} />}
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
