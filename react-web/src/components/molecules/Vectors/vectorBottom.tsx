import { colors } from '@theme';
import { ReactElement } from 'react';

export type VectorBottomProps = {
  color1?: string;
  color2?: string;
  height?: number;
  width?: number;
};

export const VectorBottom = ({
  color1 = colors.resolutionBlue,
  color2 = colors.darkCyan,
  height = 223,
  width = 402,
}: VectorBottomProps): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 402 223" fill="none">
      <path
        d="M402 223C402 223 374.49 114.689 295 91C215.51 67.3106 175.5 120.5 85 91C33.8117 74.3143 17.0656 41.3971 0 0V223H402Z"
        fill={color1}
      />
      <path
        d="M401 223C401 223 380.5 137.5 288.5 119C196.5 100.5 155 161.5 71 110.5C24.979 82.5587 17.0656 41.3971 0 0V223H401Z"
        fill={color2}
      />
    </svg>
  );
};

export default VectorBottom;
