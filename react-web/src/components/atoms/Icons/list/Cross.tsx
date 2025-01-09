import React from 'react';
import { colors } from '@theme';
import { ReactElement } from 'react';

type IconProps = {
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
};

const Cross = ({
  color = colors.white,
  height = 16,
  width = 16,
}: IconProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M9.41416 8.00022L15.7072 1.70782C16.0979 1.31718 16.0979 0.683833 15.7072 0.293224C15.3166 -0.0974159 14.6833 -0.0974159 14.2926 0.293224L8.00022 6.58628L1.70782 0.293224C1.31718 -0.0974159 0.683833 -0.0974159 0.293224 0.293224C-0.0973846 0.683865 -0.0974159 1.31721 0.293224 1.70782L6.58628 8.00022L0.293224 14.2926C-0.0974159 14.6833 -0.0974159 15.3166 0.293224 15.7072C0.683865 16.0979 1.31721 16.0979 1.70782 15.7072L8.00022 9.41416L14.2926 15.7072C14.6833 16.0979 15.3166 16.0979 15.7072 15.7072C16.0979 15.3166 16.0979 14.6833 15.7072 14.2926L9.41416 8.00022Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Cross;