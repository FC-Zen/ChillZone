import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowRight = ({
  color = '#2E2A85', // Couleur par défaut (bleu)
  width = 29,
  height = 14,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 14" fill="none">
      <Path
        d="M27.9415 4.87897L22.4001 0.292969L20.6915 1.70697L25.8414 5.96997L0 5.99997V7.99997L25.9139 7.96997L20.6903 12.293L22.3989 13.707L27.9415 9.12097C28.619 8.55748 28.9994 7.79489 28.9994 6.99997C28.9994 6.20504 28.619 5.44246 27.9415 4.87897Z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowRight;
