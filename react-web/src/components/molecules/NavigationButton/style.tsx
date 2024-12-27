import { CSSProperties } from 'react';
import { colors } from '@theme';

// Style de base pour le bouton
export const buttonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '0.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: colors.white,
  transition: 'transform 0.2s ease, background-color 0.2s ease',
};

// Style pour l'état actif
export const activeStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '50%',
};

// Style pour le survol
export const hoverStyle: CSSProperties = {
  transform: 'scale(1.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
};

// Style pour l'étiquette
export const labelStyle: CSSProperties = {
  marginTop: '0.5rem',
  fontSize: '0.75rem',
};
