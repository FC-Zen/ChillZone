import React from 'react';
import { Avatar } from '@atoms/Avatar';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@services'; // Service de déconnexion
import { ROUTE } from '@enums';
import { useNavigate } from 'react-router-dom';
import { styles } from './style'; // Import des styles
import { Icon } from '@components/atoms';
import { colors } from '@theme';

type HeaderProps = {
  userName: string;
  userEmail: string;
  organization: string;
  part: string;
};

export const Header: React.FC<HeaderProps> = ({
  userName,
  userEmail,
  organization,
  part,
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
          Bonjour, <span style={styles.bold}>{userName}</span>
        </h1>
        <p style={styles.part}>{part}</p>
        <div style={styles.organizationContainer}>
          <Icon name={'Graduation'} color={colors.black}/>
          <p style={styles.organization}>{organization}</p>
        </div>
      </div>

      {/* Section Droite */}
      <div style={styles.rightSection}>
        <div style={styles.profileCard}>
          <Avatar alt={userName} size="lg" />
          <div style={styles.profileInfo}>
            <p style={styles.userName}>
              {userName} <span style={styles.role}>(Admin)</span>
            </p>
            <p style={styles.email}>{userEmail}</p>
            <p style={styles.organizationRight}>{organization}</p>
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
