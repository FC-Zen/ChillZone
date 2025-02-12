import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { IconProps } from '@components/atoms';
import { colors } from '@theme';

const Facebook: React.FC<Omit<IconProps, 'name'>> = ({
  color = colors.white,
  height = 42,
  width = 42,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
      <Circle cx="21" cy="21" r="21" fill={'#3B5998'} />
      <Path
        d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(8, 9)"
      />
    </Svg>
  );
};

export default Facebook;
