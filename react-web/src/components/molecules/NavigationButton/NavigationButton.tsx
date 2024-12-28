// src/components/molecules/NavigationButton.tsx
import React from 'react';
import './NavigationButton.css'; // Import du fichier CSS
import { colors } from '@theme';

export type NavigationButtonProps = {
  icon: React.ReactNode; // Accepte un élément React
  onClick: () => void;
  label?: string; // Étiquette optionnelle
  active?: boolean; // État actif
};

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  onClick,
  label,
  active = false,
}) => {
  // Définir les classes CSS en fonction de l'état actif
  const buttonClass = active ? 'button button--active' : 'button';

  return (
    <button className={buttonClass} onClick={onClick}>
      {icon}
      {label && <span className="label">{label}</span>}
    </button>
  );
};

export default NavigationButton;
