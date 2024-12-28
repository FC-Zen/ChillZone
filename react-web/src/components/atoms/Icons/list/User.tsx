import { colors } from '@theme';
import { ReactElement } from 'react';

type IconProps = {
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
};

const User = ({
  color = colors.silver,
  height = 24,
  width = 24,
}: IconProps): ReactElement => {
  return (
    <svg fill={color} height={height} width={width} viewBox="0 0 12 17">
      <path
        d="M6 8.5C8.20914 8.5 10 6.70914 10 4.5C10 2.29086 8.20914 0.5 6 0.5C3.79086 0.5 2 2.29086 2 4.5C2 6.70914 3.79086 8.5 6 8.5Z"
        fill={color}
      />
      <path
        d="M6 9.8327C2.68781 9.83639 0.0036875 12.5205 0 15.8327C0 16.2009 0.298469 16.4994 0.666656 16.4994H11.3333C11.7015 16.4994 12 16.2009 12 15.8327C11.9963 12.5205 9.31219 9.83636 6 9.8327Z"
        fill={color}
      />
    </svg>
  );
};

export default User;
