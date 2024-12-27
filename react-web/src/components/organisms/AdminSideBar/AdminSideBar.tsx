import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation
import {
  Home,
  User,
  Cube,
  Calendar,
  Building,
  Shop,
} from '@components/atoms/Icons';
import { NavigationButton } from '@components/molecules';
import { colors } from '@theme';
import { ROUTE } from '@enums'; // Import des routes

export const AdminSideBar = () => {
  const navigate = useNavigate(); // Hook pour naviguer

  const handleIconClick = (route: string) => {
    navigate(route); // Navigation vers la route spécifiée
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
        onClick={() => handleIconClick(ROUTE.ADMIN_DASHBOARD)}
      />

      {/* Profil de l'admin */}
      <NavigationButton
        icon={<User color={colors.white} />}
        onClick={() => handleIconClick('/admin-profile')} // Ajustez cette route si nécessaire
      />

      {/* Produits */}
      <NavigationButton
        icon={<Cube color={colors.white} />}
        onClick={() => handleIconClick('/admin-products')} // Ajustez cette route si nécessaire
      />

      {/* Calendrier */}
      <NavigationButton
        icon={<Calendar color={colors.white} />}
        onClick={() => handleIconClick('/admin-calendar')} // Ajustez cette route si nécessaire
      />

      {/* Bâtiments */}
      <NavigationButton
        icon={<Building color={colors.white} />}
        onClick={() => handleIconClick('/admin-buildings')} // Ajustez cette route si nécessaire
      />

      {/* Boutique */}
      <NavigationButton
        icon={<Shop color={colors.white} />}
        onClick={() => handleIconClick('/admin-shop')} // Ajustez cette route si nécessaire
      />
    </div>
  );
};
