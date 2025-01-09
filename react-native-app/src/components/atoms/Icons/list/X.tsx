import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const X = ({
  width = 24,
  height = 24,
  circleColor = '#000000', // Couleur du cercle (noir par défaut)
  pathColor = '#FFFFFF', // Couleur du X (blanc par défaut)
}) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    {/* Cercle de fond */}
    <Circle cx="21" cy="21" r="21" fill={circleColor} />
    {/* Forme X */}
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.6723 12H12L18.7253 21.7886L12.4302 30H15.3388L20.1 23.7895L24.3277 29.9429H30L23.0792 19.8699L23.0915 19.8873L29.0504 12.1143H26.1418L21.7167 17.8866L17.6723 12ZM15.131 13.7143H16.8968L26.869 28.2285H25.1032L15.131 13.7143Z"
      fill={pathColor}
    />
  </Svg>
);

export default X;
