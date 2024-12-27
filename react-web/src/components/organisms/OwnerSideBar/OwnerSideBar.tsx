import React from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisation de React Router
import { Home, Pizza, Document, Package } from '@components/atoms/Icons';
import { NavigationButton } from '@components/molecules';
import { colors } from '@theme';
import { ROUTE } from '@enums'; // Import de vos routes

export const OwnerSidebar = () => {
  const navigate = useNavigate(); // Hook pour naviguer

  const handleIconClick = (route: string) => {
    navigate(route); // Navigation vers la route
  };

  return (
    <div
      style={{
        background: '#2E2A85',
        height: '100vh',
        width: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
      }}
    >
      {/* Tableau de bord */}
      <NavigationButton
        icon={<Home color={colors.white} />}
        onClick={() => handleIconClick(ROUTE.OWNER_DASHBOARD)}
      />

      {/* Profil du propriétaire */}
      <NavigationButton
        icon={<Pizza color={colors.white} />}
        onClick={() => handleIconClick('/owner-profile')} // Ajuster cette route si nécessaire
      />

      {/* Commandes */}
      <NavigationButton
        icon={<Document color={colors.white} />}
        onClick={() => handleIconClick('/owner-orders')} // Ajuster cette route si nécessaire
      />

      {/* Produits */}
      <NavigationButton
        icon={<Package color={colors.white} />}
        onClick={() => handleIconClick('/owner-products')} // Ajuster cette route si nécessaire
      />
    </div>
  );
};
