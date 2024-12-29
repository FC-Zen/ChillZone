import { colors } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HorizontalLineIcon = ({
  width = 24,
  height = 24,
  color = colors.aquaDeep,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <Path
        d="M17.1665 13.5H8.1665C7.76868 13.5 7.38715 13.342 7.10584 13.0607C6.82454 12.7794 6.6665 12.3978 6.6665 12C6.6665 11.6022 6.82454 11.2206 7.10584 10.9393C7.38715 10.658 7.76868 10.5 8.1665 10.5H17.1665C17.5643 10.5 17.9459 10.658 18.2272 10.9393C18.5085 11.2206 18.6665 11.6022 18.6665 12C18.6665 12.3978 18.5085 12.7794 18.2272 13.0607C17.9459 13.342 17.5643 13.5 17.1665 13.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default HorizontalLineIcon;
