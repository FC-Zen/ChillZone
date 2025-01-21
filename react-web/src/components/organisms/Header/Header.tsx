import React from 'react';
import { Avatar } from '@atoms/Avatar';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@services'; // Service de déconnexion
import { ROUTE } from '@enums';
import { useNavigate } from 'react-router-dom';
import { styles } from './style'; // Import des styles
import { Icon } from '@components/atoms';
import { colors } from '@theme';
import { User } from '@hooks';

type HeaderProps = {
  user : User | null;
  part : string
};

export const Header: React.FC<HeaderProps> = ({
  user,
  part
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      'Êtes-vous sûr de vouloir vous déconnecter ?'
    );
    if (!confirmLogout) return;

    try {
      await logoutUser(); // Appel du service de déconnexion
      navigate(ROUTE.LOGIN); // Redirection après déconnexion
    } catch {
      alert('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
  };

  return (
    <div style={styles.headerContainer}>
      {/* Section Gauche */}
      <div style={styles.leftSection}>
        <h1 style={styles.title}>
          Bonjour, <span style={styles.bold}>{user?.username}</span>
        </h1>
        <p style={styles.part}>{part}</p>
        <div style={styles.organizationContainer}>
          <Icon name={'Graduation'} color={colors.black}/>
          <p style={styles.organization}>{user?.organization}</p>
        </div>
      </div>

      {/* Section Droite */}
      <div style={styles.rightSection}>
        <div style={styles.profileCard}>
          <Avatar alt={user?.username || "image inconnue"} size="lg" src={user?.photo_link} />
          <div style={styles.profileInfo}>
            <p style={styles.userName}>
              {user?.username} <span style={styles.role}>({user?.role})</span>
            </p>
            <p style={styles.email}>{user?.userEmail}</p>
            <p style={styles.organizationRight}>{user?.organization}</p>
          </div>
          <LogOut
            size={20}
            color={styles.logoutIcon.color}
            style={styles.logoutIcon}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};
