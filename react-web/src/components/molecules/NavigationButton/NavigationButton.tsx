import React from 'react';
import { colors } from '@theme';

export type NavigationButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  label?: string; // Si vous souhaitez ajouter une étiquette optionnelle
  active?: boolean; // Pour indiquer si le bouton est actif
};

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  onClick,
  label,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...buttonStyle,
        backgroundColor: active ? colors.resolutionBlue : 'transparent',
      }}
    >
      {icon}
      {label && <span style={labelStyle}>{label}</span>}
    </button>
  );
};

// Styles
const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '0.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  color: colors.white,
};

const labelStyle: React.CSSProperties = {
  marginTop: '0.5rem',
  fontSize: '0.75rem',
};
