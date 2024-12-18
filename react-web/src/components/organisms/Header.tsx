import React from 'react';
import Avatar from '../atoms/Avatar'; // Importation de ton composant Avatar
import { LogOut } from 'lucide-react';

const Header = () => {
  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        {/* Titre et sous-titre */}
        <h1 style={styles.title}>
          Bonjour, <span style={styles.bold}>Kellian BREDEAU</span>
        </h1>
        <p style={styles.subtitle}>Comptes</p>
      </div>

      {/* Profil utilisateur */}
      <div style={styles.profileContainer}>
        <div style={styles.avatarWrapper}>
          <Avatar size="lg" alt="Kellian Bredeau" />
        </div>
        <div>
          <p style={styles.profileText}>kellianbre@outlook.fr</p>
          <p style={styles.profileText}>Université Gustave Eiffel</p>
        </div>
        <div style={styles.iconWrapper}>
          <LogOut size={20} color="#FFF" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: '500px',
    maxWidth: '1115px',
    padding: '15px 20px 5px 20px',
    gap: '10px',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  title: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: '32px',
    fontWeight: '400',
    lineHeight: '100%',
  },
  bold: {
    fontWeight: '600',
  },
  subtitle: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '100%',
  },
  profileContainer: {
    display: 'flex',
    padding: '25px',
    alignItems: 'center',
    gap: '30px',
    borderRadius: '15px',
    background: '#2E2A85',
    marginLeft: 'auto',
  },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '100%',
  },
  iconWrapper: {
    display: 'flex',
    width: '38px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

export default Header;
