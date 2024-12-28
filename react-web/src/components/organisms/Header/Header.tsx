import React from 'react';
import { Avatar } from '@atoms/Avatar';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@services'; // Service de déconnexion
import { colors } from '@theme';
import { ROUTE } from '@enums';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  userName: string;
  userEmail: string;
  organization: string;
  part: string;
};

export const Header = ({
  userName,
  userEmail,
  organization,
  part,
}: HeaderProps) => {
  const navigate = useNavigate(); // Hook pour naviguer

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      'Êtes-vous sûr de vouloir vous déconnecter ?'
    );
    if (!confirmLogout) return;

    try {
      await logoutUser(); // Appel du service de déconnexion
      navigate(ROUTE.LOGIN); // Redirection après déconnexion
    } catch (error: any) {
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
        <p style={styles.organization}>{organization}</p>
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
          {/* Icône de déconnexion avec gestionnaire de clic */}
          <LogOut
            size={20}
            color="#FFF"
            style={styles.logoutIcon}
            onClick={handleLogout} // Ajout du gestionnaire de déconnexion
          />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  title: {
    fontSize: '24px',
    color: colors.black,
    margin: 0,
  },
  bold: {
    fontWeight: '600',
  },
  part: {
    fontSize: '16px',
    color: '#333',
    margin: 0,
    fontWeight: '600',
  },
  organization: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E2A85',
    borderRadius: '10px',
    padding: '15px 20px',
    gap: '15px',
    color: colors.white,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  },
  role: {
    fontWeight: '400',
  },
  email: {
    fontSize: '12px',
    color: '#E0E0E0',
    margin: 0,
  },
  organizationRight: {
    fontSize: '12px',
    margin: 0,
  },
  logoutIcon: {
    cursor: 'pointer',
  },
};
