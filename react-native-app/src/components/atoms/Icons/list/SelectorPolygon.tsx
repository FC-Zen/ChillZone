import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme'; // Utilisez vos couleurs définies si nécessaire

const SelectorPolygon = ({ width = 8, height = 7, color = colors.white }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 8 7"
      fill="none"
    >
      <Path d="M3.96531 6.51205L0.49715 0.50099L7.45754 0.532124L3.96531 6.51205Z" fill={color} />
    </Svg>
  );
};

export default SelectorPolygon;
