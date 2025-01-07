import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '@theme';

const Facebook = ({
  width = 24,
  height = 24,
  backgroundColor = '#3B5998', // Couleur du cercle de fond
  iconColor = '#3B5998', // Couleur du "f" (fond bleu par défaut)
  borderColor = colors.white, // Couleur de la bordure blanche
}: {
  width?: number;
  height?: number;
  backgroundColor?: string;
  iconColor?: string;
  borderColor?: string;
}) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    {/* Cercle de fond */}
    <Circle
      cx="21"
      cy="21"
      r="20.5" // Taille du cercle légèrement réduite pour la bordure
      fill={backgroundColor}
      stroke={borderColor} // Ajout d'une bordure blanche
      strokeWidth={2} // Épaisseur de la bordure
    />
    {/* Icône Facebook (le "f") */}
    <Path
      d="M26.675 12.5h-3.162c-1.193 0-1.863.57-1.863 1.712v2.288h5.067l-.656 4.523h-4.411v11.964h-5.594V21.023H14.5v-4.523h2.556v-3.01c0-3.51 2.144-5.423 5.279-5.423 1.497 0 2.785.11 3.34.16v4.273z"
      fill={iconColor} // Assure que le "f" reste de la couleur de fond
      stroke={borderColor} // Ajoute une bordure blanche au "f"
      strokeWidth={1.5} // Épaisseur de la bordure pour le "f"
    />
  </Svg>
);

export default Facebook;
