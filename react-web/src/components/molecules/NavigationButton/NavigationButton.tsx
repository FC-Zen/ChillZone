import React from 'react';
import './NavigationButton.css'; // Import du fichier CSS
import { colors } from '@theme';
import { Icon, IconList } from '@components/atoms';

export type NavigationButtonProps = {
  icon: keyof typeof IconList; 
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
      <Icon color={colors.white} name={icon}  />
      {label && <span className="label">{label}</span>}
    </button>
  );
};

export default NavigationButton;
