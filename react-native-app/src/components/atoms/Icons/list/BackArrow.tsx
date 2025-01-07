import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../Icon';
import { colors } from '@theme';

const BackArrow = ({
  color = colors.silver,
  height = 16,
  width = 16,
  onPress, // Ajout de la propriété `onPress`
}: Omit<IconProps, 'name'> & { onPress?: () => void }): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path
          d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default BackArrow;
