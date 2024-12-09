import React, { ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme';

export const VectorBottom = (): ReactElement => {
  return (
    <Svg width="402" height="223" viewBox="0 0 402 223" fill="none">
      <Path
        d="M402 223C402 223 374.49 114.689 295 91C215.51 67.3106 175.5 120.5 85 91C33.8117 74.3143 17.0656 41.3971 0 0V223H402Z"
        fill={colors.resolutionBlue}
      />
      <Path
        d="M401 223C401 223 380.5 137.5 288.5 119C196.5 100.5 155 161.5 71 110.5C24.979 82.5587 17.0656 41.3971 0 0V223H401Z"
        fill={colors.darkCyan}
      />
    </Svg>
  );
};
