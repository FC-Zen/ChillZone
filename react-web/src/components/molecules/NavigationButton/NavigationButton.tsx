import React from 'react';
import { buttonStyle, labelStyle, hoverStyle, activeStyle } from './style';

export type NavigationButtonProps = {
  icon: React.ReactNode;
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
  return (
    <button
      onClick={onClick}
      style={{
        ...buttonStyle,
        ...(active ? activeStyle : {}),
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        Object.assign(target.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        Object.assign(target.style, buttonStyle, active ? activeStyle : {});
      }}
    >
      {icon}
      {label && <span style={labelStyle}>{label}</span>}
    </button>
  );
};
