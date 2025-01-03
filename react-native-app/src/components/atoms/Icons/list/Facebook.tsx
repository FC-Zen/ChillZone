import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const Facebook = ({
  width = 42,
  height = 42,
  color = '#FFFFFF', // Couleur de l'icône à l'intérieur (blanc)
  backgroundColor = '#3B5998', // Couleur du cercle de fond (bleu)
}) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    {/* Cercle de fond */}
    <Circle cx="21" cy="21" r="21" fill={backgroundColor} />
    {/* Icône Facebook */}
    <Path
      d="M26.675 12.5h-3.162c-1.193 0-1.863.57-1.863 1.712v2.288h5.067l-.656 4.523h-4.411v11.964h-5.594V21.023H14.5v-4.523h2.556v-3.01c0-3.51 2.144-5.423 5.279-5.423 1.497 0 2.785.11 3.34.16v4.273z"
      fill={color}
    />
  </Svg>
);

export default Facebook;
