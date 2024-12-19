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
  height = 344,
  width = 1428,
}: VectorBottomProps): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1428 344"
      fill="none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <path
        d="M1428 344.336C1428 344.336 1330.28 177.093 1047.91 140.514C765.544 103.935 623.418 186.065 301.94 140.514C120.107 114.749 60.6212 63.9215 0 -6.10352e-05L0 344.336L1428 344.336Z"
        fill={color1}
      />
      <path
        d="M1424.45 344.336C1424.45 344.336 1351.63 212.315 1024.82 183.749C698.015 155.183 550.597 249.373 252.209 170.624C88.7313 127.479 60.6212 63.9215 0 -6.10352e-05L0 344.336L1424.45 344.336Z"
        fill={color2}
      />
    </svg>
  );
};

export default VectorBottom;
