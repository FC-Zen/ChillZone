// src/components/organisms/AdminSideBar/AdminSideBar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation
import { NavigationButton } from '@components/molecules';
import { ROUTE } from '@enums'; // Import des routes
import { colors } from '@theme'; // Import des couleurs
import {
  Home,
  User,
  Cube,
  Calendar,
  Building,
  Shop,
} from '@components/atoms/Icons'; // Import des icônes nécessaires

export const AdminSideBar = () => {
  const navigate = useNavigate(); // Hook pour naviguer

  const handleIconClick = (route: string) => {
    navigate(route); // Navigation vers la route spécifiée
  };

  return (
    <div
      style={{
        background: '#2E2A85',
        height: 'auto',
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
        onClick={() => handleIconClick(ROUTE.ADMIN_DASHBOARD)}
      />

      {/* Profil de l'admin */}
      <NavigationButton
        icon={<User color={colors.white} />}
        onClick={() => handleIconClick(ROUTE.ADMIN_ACCOUNTS)} // Ajustez cette route si nécessaire
      />

      {/* Produits */}
      <NavigationButton
        icon={<Cube color={colors.white} />}
        onClick={() => handleIconClick(ROUTE.ADMIN_ROOMS)} // Ajustez cette route si nécessaire
      />

      {/* Calendrier */}
      <NavigationButton
        icon={<Calendar color={colors.white} />}
        onClick={() => handleIconClick(ROUTE.ADMIN_BOOKING)} // Ajustez cette route si nécessaire
      />

      {/* Bâtiments */}
      <NavigationButton
        icon={<Building color={colors.white} />}
        onClick={() => handleIconClick('/admin-buildings')} // Ajustez cette route si nécessaire
      />

      {/* Boutique */}
      <NavigationButton
        icon={<Shop color={colors.white} />}
        onClick={() => handleIconClick(ROUTE.ADMIN_OWNERS)} // Ajustez cette route si nécessaire
      />
    </div>
  );
};

export default AdminSideBar;
