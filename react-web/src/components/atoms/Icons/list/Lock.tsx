import { colors } from '@theme';
import { ReactElement } from 'react';
type IconProps = {
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
};

const Lock = ({
  color = colors.silver,
  height = 24,
  width = 24,
}: IconProps): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 17" fill="none">
      <path
        d="M11.6667 6.116V5.16666C11.6667 2.58934 9.57737 0.5 7.00003 0.5C4.42269 0.5 2.33337 2.58934 2.33337 5.16666V6.116C1.12006 6.64553 0.335124 7.84284 0.333374 9.16666V13.1667C0.335562 15.0067 1.82666 16.4978 3.66669 16.5H10.3333C12.1734 16.4978 13.6645 15.0067 13.6667 13.1667V9.16666C13.665 7.84284 12.88 6.64553 11.6667 6.116ZM7.66669 11.8333C7.66669 12.2015 7.36822 12.5 7.00003 12.5C6.63184 12.5 6.33337 12.2015 6.33337 11.8333V10.5C6.33337 10.1318 6.63184 9.83334 7.00003 9.83334C7.36822 9.83334 7.66669 10.1318 7.66669 10.5V11.8333V11.8333ZM10.3334 5.83334H3.66669V5.16669C3.66669 3.32575 5.15906 1.83334 7.00003 1.83334C8.841 1.83334 10.3334 3.32572 10.3334 5.16669V5.83334V5.83334Z"
        fill={color}
      />
    </svg>
  );
};

export default Lock;
