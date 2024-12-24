import React, { ReactElement } from 'react';
import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg'; // Importez Svg, Path, G, Defs, et ClipPath
import { IconProps } from '@components/atoms/Icons/Icon';
import { colors } from '@theme';

const Bell: React.FC<Omit<IconProps, 'name'>> = ({
  color = colors.silver,
  height = 24,
  width = 24,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M27.9415 4.87897L22.4001 0.292969L20.6915 1.70697L25.8414 5.96997L0 5.99997V7.99997L25.9139 7.96997L20.6903 12.293L22.3989 13.707L27.9415 9.12097C28.619 8.55748 28.9994 7.79489 28.9994 6.99997C28.9994 6.20504 28.619 5.44246 27.9415 4.87897Z"
        fill={color}
      />
      <Path
        d="M7.09985 20C7.32937 21.1303 7.94258 22.1465 8.8356 22.8764C9.72861 23.6063 10.8465 24.005 11.9999 24.005C13.1532 24.005 14.2711 23.6063 15.1641 22.8764C16.0571 22.1465 16.6703 21.1303 16.8999 20H7.09985Z"
        fill={color}
      />
    </Svg>
  );
};

export default Bell;
