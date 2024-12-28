import React from 'react';
import { colors } from '@theme';
import { ReactElement } from 'react';

type IconProps = {
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
};

const Cube = ({
  color = colors.silver,
  height = 24,
  width = 24,
}: IconProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <g clipPath="url(#clip0_2599_2937)">
        <path
          d="M14.7619 12.3869C14.2152 12.6981 13.6193 12.9132 12.9999 13.0229V24.6739C13.5269 24.5712 14.0336 24.3831 14.4999 24.1169L20.5269 20.6379C21.286 20.1977 21.9164 19.5661 22.3551 18.8061C22.7938 18.0461 23.0254 17.1844 23.0269 16.3069V9.34686C23.0237 8.81266 22.9342 8.2825 22.7619 7.77686L14.7619 12.3869Z"
          fill={color}
        />
        <path
          d="M10.242 10.6569C10.7775 10.965 11.3846 11.1271 12.0024 11.1271C12.6203 11.1271 13.2274 10.965 13.7629 10.6569L21.763 6.04695C21.4086 5.63983 20.9905 5.29298 20.525 5.01995L14.5 1.53695C13.7394 1.09957 12.8773 0.869385 12 0.869385C11.1226 0.869385 10.2605 1.09957 9.49995 1.53695L3.47295 5.01695C3.024 5.27984 2.61908 5.61154 2.27295 5.99995L10.242 10.6569Z"
          fill={color}
        />
        <path
          d="M11 13.0231C10.3803 12.9137 9.78392 12.6986 9.23702 12.3871L1.25702 7.72314C1.07235 8.24483 0.976355 8.79375 0.973022 9.34714V16.3071C0.974485 17.1847 1.20613 18.0464 1.64481 18.8064C2.0835 19.5664 2.71389 20.198 3.47302 20.6381L9.50002 24.1171C9.9663 24.3834 10.473 24.5715 11 24.6741V13.0231Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2599_2937">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.800049)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Cube;
