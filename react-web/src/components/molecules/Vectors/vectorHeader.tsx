import { colors } from '@theme';
import { ReactElement } from 'react';

export type VectorHeaderProps = {
  color1?: string;
  color2?: string;
  height?: number;
  width?: number;
};

export const VectorHeader = ({
  color1 = colors.darkCyan,
  color2 = colors.resolutionBlue,
  height = 223,
  width = 402,
}: VectorHeaderProps): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 402 223" fill="none">
      <path
        d="M0 0C0 0 27.5102 108.311 107 132C186.49 155.689 226.5 102.5 317 132C368.188 148.686 384.934 181.603 402 223V0H0Z"
        fill={color1}
      />
      <path
        d="M0 0C0 0 20.5 85.5 112.5 104C204.5 122.5 246 61.5 330 112.5C376.021 140.441 383.934 181.603 401 223V0H0Z"
        fill={color2}
      />
    </svg>
  );
};

export default VectorHeader;
