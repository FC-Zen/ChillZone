import { useNavigate } from 'react-router-dom'; // Utilisation de React Router
import { Home, Pizza, Package } from '@components/atoms/Icons';
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
        icon='Home'
        onClick={() => handleIconClick(ROUTE.OWNER_DASHBOARD)}
      />

      {/* Produits */}
      <NavigationButton
        icon='Pizza'
        onClick={() =>  handleIconClick(ROUTE.OWNER_MEALS)}
      />

      {/* Menus SEMESTRE 2 */}
      <NavigationButton
        icon='Document'
        onClick={() => handleIconClick(ROUTE.OWNER_MENUS)} 
      />
      

      {/* Commandes */}
      <NavigationButton
        icon='Package'
        onClick={() => handleIconClick(ROUTE.OWNER_ORDERS)} 
      />
    </div>
  );
};
