import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '@theme';

const CustomIcon = ({ width = 16, height = 16, color = colors.silver }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
      <G id="Group" clipPath="url(#clip0_1)">
        <Path
          id="Vector"
          d="M6.67097 13.8396C8.20955 13.8416 9.70108 13.3093 10.8907 12.3336L14.8697 16.3119C15.1347 16.5678 15.5569 16.5605 15.8128 16.2955C16.0624 16.0371 16.0624 15.6273 15.8128 15.3689L11.8345 11.3899C14.165 8.53747 13.7419 4.33584 10.8894 2.00533C8.03698 -0.325171 3.83535 0.0979434 1.50485 2.95039C-0.825659 5.80283 -0.402545 10.0044 2.4499 12.335C3.64127 13.3083 5.13252 13.8399 6.67097 13.8396Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1">
          <Rect width="16" height="17" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CustomIcon;
