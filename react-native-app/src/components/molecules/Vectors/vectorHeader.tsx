import React, { ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme';

export const VectorHeader = (): ReactElement => {
  return (
    <Svg width="402" height="223" viewBox="0 0 402 223" fill="none">
      <Path
        d="M0 0C0 0 27.5102 108.311 107 132C186.49 155.689 226.5 102.5 317 132C368.188 148.686 384.934 181.603 402 223V0H0Z"
        fill={colors.darkCyan}
      />
      <Path
        d="M0 0C0 0 20.5 85.5 112.5 104C204.5 122.5 246 61.5 330 112.5C376.021 140.441 383.934 181.603 401 223V0H0Z"
        fill={colors.resolutionBlue}
      />
    </Svg>
  );
};
