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
  height = 408,
  width = 1569,
}: VectorHeaderProps): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1569 408"
      fill="none"
      style={{
        position: 'absolute',
        zIndex: -1,
        right: 0,
        top: 0,
      }}
    >
      <path
        d="M0 -8C0 -8 107.372 194.05 417.619 238.242C727.867 282.434 884.026 183.211 1237.25 238.242C1437.03 269.369 1502.39 330.775 1569 408V-8H0Z"
        fill={color1}
      />
      <path
        d="M3.90298 -8C3.90298 -8 83.9142 151.498 442.989 186.009C802.063 220.52 964.037 106.726 1291.89 201.865C1471.51 253.989 1502.39 330.775 1569 408V-8H3.90298Z"
        fill={color2}
      />
    </svg>
  );
};

export default VectorHeader;
