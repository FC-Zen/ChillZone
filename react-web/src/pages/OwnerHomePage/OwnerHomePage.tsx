import React from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { OwnerDashboardGraphs } from '@components/organisms';
import { StatCard } from '@components/molecules'; // Réutilisation du StatCard d'Admin
import { User, Flag, Layers } from '@components/atoms/Icons'; // Icônes nécessaires
import { colors } from '@theme'; // Couleurs
import OwnerCardData from '@assets/fr.json'; // Import des données FR (renommées)

export const OwnerHomePage: React.FC = () => {
  // Section des statistiques
  const statsSection = (
    <div className="space-y-6">
      <StatCard
        icon={<User color={colors.white} />}
        title={OwnerCardData.dashboard.info.mostWantedProduct}
        value={OwnerCardData.dashboard.info.mostWantedName}
      />
      <StatCard
        icon={<Flag color={colors.white} />}
        title={OwnerCardData.dashboard.info.mostWantedMenu}
        value={OwnerCardData.dashboard.info.mostWantedMenuName}
      />
      <StatCard
        icon={<User color={colors.white} />}
        title={OwnerCardData.dashboard.info.onHour}
        value={OwnerCardData.dashboard.info.onHourValue}
      />
      <StatCard
        icon={<Layers color={colors.white} />}
        title={OwnerCardData.dashboard.info.commandsToday}
        value={OwnerCardData.dashboard.info.onTodayValue}
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
          [Placeholder pour {OwnerCardData.tables.titles.currentcommands}]
        </p>
      </div>
      <div className="bg-white border rounded-lg p-4 shadow-md">
        <p className="text-gray-400 text-center">
          [Placeholder pour {OwnerCardData.tables.titles.restauration_place}]
        </p>
      </div>
    </div>
  );

  function t(key: string): string {
    const translations: { [key: string]: string } = {
      'navbar.home': 'Accueil',
      // Ajoutez d'autres traductions ici si nécessaire
    };
    return translations[key] || key;
  }
  return (
    <OwnerHomeLayout
      username="Kellian Bredeau"
      userEmail="kellianbre@outlook.fr"
      organization="Université Gustave Eiffel"
      part={t('navbar.home')}
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
