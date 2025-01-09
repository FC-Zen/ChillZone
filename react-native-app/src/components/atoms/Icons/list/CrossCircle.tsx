import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '@theme';

const CrossCircle = ({ width = 16, height = 16, color = colors.white }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 12" fill="none">
      <G clipPath="url(#clip0_3255_2523)">
        <Path
          d="M6.5 0C5.31331 0 4.15328 0.351894 3.16658 1.01118C2.17989 1.67047 1.41085 2.60754 0.956726 3.7039C0.5026 4.80026 0.38378 6.00666 0.615291 7.17054C0.846802 8.33443 1.41825 9.40353 2.25736 10.2426C3.09648 11.0818 4.16558 11.6532 5.32946 11.8847C6.49335 12.1162 7.69975 11.9974 8.7961 11.5433C9.89246 11.0892 10.8295 10.3201 11.4888 9.33342C12.1481 8.34673 12.5 7.18669 12.5 6C12.5 4.4087 11.8679 2.88258 10.7426 1.75736C9.61743 0.632141 8.0913 0 6.5 0V0ZM8.8535 7.6465L8.1465 8.3535L6.5 6.707L4.8535 8.3535L4.1465 7.6465L5.793 6L4.1465 4.3535L4.8535 3.6465L6.5 5.293L8.1465 3.6465L8.8535 4.3535L7.207 6L8.8535 7.6465Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3255_2523">
          <Rect
            width="12"
            height="12"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CrossCircle;
