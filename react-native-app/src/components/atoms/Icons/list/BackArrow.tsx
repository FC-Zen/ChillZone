import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../Icon';
import { colors } from '@theme';

const BackArrow = ({
  color = colors.silver,
  height = 16,
  width = 16,
}: Omit<IconProps, 'name'>) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
        fill={color}
      />
    </Svg>
  );
};

export default BackArrow;
