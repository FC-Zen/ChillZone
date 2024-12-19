import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '@theme';

const ShoppingBagIcon = ({
  width = 24,
  height = 24,
  color = colors.silver,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <G id="fi-sr-shopping-bag" clipPath="url(#clip0_2083_711)">
        <Path
          id="Vector"
          d="M24 9.5C24 8.70435 23.6839 7.94129 23.1213 7.37868C22.5587 6.81607 21.7956 6.5 21 6.5H18C18 4.9087 17.3679 3.38258 16.2426 2.25736C15.1174 1.13214 13.5913 0.5 12 0.5C10.4087 0.5 8.88258 1.13214 7.75736 2.25736C6.63214 3.38258 6 4.9087 6 6.5H3C2.20435 6.5 1.44129 6.81607 0.87868 7.37868C0.31607 7.94129 0 8.70435 0 9.5L0 19.5C0.00158786 20.8256 0.528882 22.0964 1.46622 23.0338C2.40356 23.9711 3.67441 24.4984 5 24.5H19C20.3256 24.4984 21.5964 23.9711 22.5338 23.0338C23.4711 22.0964 23.9984 20.8256 24 19.5V9.5ZM8 6.5C8 5.43913 8.42143 4.42172 9.17157 3.67157C9.92172 2.92143 10.9391 2.5 12 2.5C13.0609 2.5 14.0783 2.92143 14.8284 3.67157C15.5786 4.42172 16 5.43913 16 6.5H8Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2083_711">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ShoppingBagIcon;
