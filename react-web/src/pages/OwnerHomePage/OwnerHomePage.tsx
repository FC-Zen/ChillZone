import React, { useState } from 'react';
import { OwnerHomeLayout } from '@components/templates';
import { OwnerDashboardGraphs } from '@components/organisms';
import { CustomSwitch, StatCard } from '@components/molecules'; // Réutilisation du StatCard d'Admin
import { colors } from '@theme'; // Couleurs
import OwnerCardData from '@assets/fr.json'; // Import des données FR (renommées)
import OwnerCardDataValues from '@assets/data/stat_card_value.json'; // Import des données FR (renommées)
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';

export const OwnerHomePage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [restaurantOpen, setRestaurantOpen] = useState<boolean>(false);
    
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

  return (
    <OwnerHomeLayout
      user={user}
      part={t('navbar.home')}
      statsSection={statsSection}
      mainContent={mainContent}
    />
  );
};
