// src/components/organisms/AdminSideBar/AdminSideBar.tsx
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation
import { NavigationButton } from '@components/molecules';
import { ROUTE } from '@enums'; // Import des routes

export const SuperAdminSideBar = () => {
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
        onClick={() => handleIconClick(ROUTE.SUPER_ADMIN)}
      />

      {/* Profil de l'admin */}
      <NavigationButton
        icon='User'
        onClick={() => handleIconClick(ROUTE.SUPER_ADMIN_USERS)} // Ajustez cette route si nécessaire
      />
    </div>
  );
};

export default SuperAdminSideBar;
