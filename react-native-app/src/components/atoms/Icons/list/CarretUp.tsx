import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '@theme';

const CaretUpIcon = ({ width = 24, height = 24, color = colors.silver }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G id="caret_up">
        <Path id="coolicon" d="M12 14L7 9H17L12 14Z" fill={color} />
      </G>
    </Svg>
  );
};

export default CaretUpIcon;
