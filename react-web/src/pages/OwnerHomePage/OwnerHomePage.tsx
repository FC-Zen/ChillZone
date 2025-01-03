import React from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { OwnerDashboardGraphs } from '@components/organisms';
import { StatCard } from '@components/molecules'; // Réutilisation du StatCard d'Admin
import { User, Flag, Layers, Graduation } from '@components/atoms/Icons'; // Icônes nécessaires
import { colors } from '@theme'; // Couleurs
import OwnerCardData from '@assets/fr.json'; // Import des données FR (renommées)
import OwnerCardDataValues from '@assets/data/stat_card_value.json'; // Import des données FR (renommées)
import { useUser } from '@hooks';

export const OwnerHomePage: React.FC = () => {
  const { user } = useUser();
    
  // Section des statistiques
  const statsSection = (
    <div className="space-y-6">
      <StatCard
        icon={<User color={colors.white} />}
        title={OwnerCardData.dashboard.info.mostWantedProduct}
        value={OwnerCardDataValues.mostWantedName}
      />
      <StatCard
        icon={<Flag color={colors.white} />}
        title={OwnerCardData.dashboard.info.mostWantedMenu}
        value={OwnerCardDataValues.mostWantedMenuName}
      />
      <StatCard
        icon={<User color={colors.white} />}
        title={OwnerCardData.dashboard.info.onHour}
        value={OwnerCardDataValues.onHourValue}
      />
      <StatCard
        icon={<Layers color={colors.white} />}
        title={OwnerCardData.dashboard.info.commandsToday}
        value={OwnerCardDataValues.onTodayValue}
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
      userEmail={user?.userEmail ?? ""}
      username={user?.username ?? ""}
      organization={user?.organization ?? ""}
      icon={<Graduation color={colors.black} />} // Icône passée correctement
      part={t('navbar.home')}
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
