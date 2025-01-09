import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@theme';

export const LinkedIn = ({
  width = 24,
  height = 24,
  backgroundColor = '#007BB5', // Couleur du cercle de fond (bleu LinkedIn)
  iconColor = '#007BB5', // Couleur du "in" identique à la couleur de fond LinkedIn
  strokeColor = colors.white, // Bordure blanche autour du "in"
}) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    {/* Cercle de fond */}
    <Circle cx="21" cy="21" r="21" fill={backgroundColor} />
    {/* Logo LinkedIn */}
    <Path
      d="M15.02 16.02H11.52V29H15.02V16.02ZM13.27 14.48C14.36 14.48 15.12 13.7 15.12 12.77C15.11 11.82 14.37 11.05 13.3 11.05H13.27C12.2 11.05 11.45 11.82 11.45 12.77C11.45 13.7 12.21 14.48 13.28 14.48H13.27ZM19.52 16.02H16.03V29H19.42V21.83C19.42 20.9 19.6 20.04 20.74 20.04C21.87 20.04 21.88 21.06 21.88 21.91V29H25.38V21.56C25.38 18.92 24.58 17.56 22.42 17.56C21.01 17.56 20.33 18.31 20.04 18.86H20.02V16.02H19.52Z"
      fill={iconColor} // Utilisation de la couleur de fond pour le "in"
      stroke={strokeColor} // Ajout d'une bordure blanche
      strokeWidth={1} // Largeur de la bordure
    />
  </Svg>
);

export default LinkedIn;
