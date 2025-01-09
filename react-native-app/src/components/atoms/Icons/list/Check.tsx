import { colors } from '@theme';
import React from 'react';
import Svg, { Path, G, Rect } from 'react-native-svg';

const Check = ({ width = 32, height = 32 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Rect width={32} height={32} rx={8} fill={colors.darkCyan} />
      <G transform="translate(8, 10)">
        <Path
          d="M5.16613 11.8439C4.71195 11.8441 4.27638 11.6635 3.9555 11.3421L0.295374 7.68334C-0.098458 7.28939 -0.098458 6.65078 0.295374 6.25682C0.689332 5.86299 1.32794 5.86299 1.72189 6.25682L5.16613 9.70105L14.2781 0.589075C14.6721 0.195243 15.3107 0.195243 15.7046 0.589075C16.0985 0.983033 16.0985 1.62164 15.7046 2.0156L6.37675 11.3421C6.05587 11.6635 5.6203 11.8441 5.16613 11.8439Z"
          fill={colors.white}
        />
      </G>
    </Svg>
  );
};

export default Check;
