// src/components/organisms/AdminSideBar/AdminSideBar.tsx
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation
import { NavigationButton } from '@components/molecules';
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
        icon='Home'
        onClick={() => handleIconClick(ROUTE.ADMIN_DASHBOARD)}
      />

      {/* Profil de l'admin */}
      <NavigationButton
        icon='User'
        onClick={() => handleIconClick(ROUTE.ADMIN_ACCOUNTS)} // Ajustez cette route si nécessaire
      />

      {/* Produits */}
      <NavigationButton
        icon='Cube'
        onClick={() => handleIconClick(ROUTE.ADMIN_ROOMS)} // Ajustez cette route si nécessaire
      />

      {/* Calendrier */}
      <NavigationButton
        icon='Calendar'
        onClick={() => handleIconClick(ROUTE.ADMIN_BOOKING)} // Ajustez cette route si nécessaire
      />

      {/* Bâtiments */}
      <NavigationButton
        icon='Building'
        onClick={() => handleIconClick(ROUTE.ADMIN_ESTABLISHMENT)} // Ajustez cette route si nécessaire
      />

      {/* Boutique */}
      <NavigationButton
        icon='Shop'
        onClick={() => handleIconClick(ROUTE.ADMIN_OWNERS)} // Ajustez cette route si nécessaire
      />
    </div>
  );
};

export default AdminSideBar;
