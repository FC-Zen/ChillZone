import React from 'react';
import { colors } from '@theme';
import { ReactElement } from 'react';
type IconProps = {
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
};
const Dashboard = ({
  color = colors.silver,
  height = 24,
  width = 24,
}: IconProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 80 81"
      fill="none"
    >
      <circle cx="40" cy="40.5" r="40" fill={color} />
    </svg>
  );
};

export default Dashboard;
