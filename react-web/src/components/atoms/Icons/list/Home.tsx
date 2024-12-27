import React from 'react';
import { colors } from '@theme';
import { ReactElement } from 'react';

export type IconProps = {
  color?: string;
  height?: string | number;
  width?: string | number;
};

const Home = ({
  color = colors.silver,
  height = 24,
  width = 24,
}: IconProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 14.9917C10.3432 14.9917 9 16.3349 9 17.9917V23.9917H15V17.9917C15 16.3349 13.6568 14.9917 12 14.9917Z"
        fill={color}
      />
      <path
        d="M17 17.9921V23.9921H21C22.6568 23.9921 24 22.649 24 20.9921V11.8712C24.0002 11.3516 23.7983 10.8524 23.437 10.4792L14.939 1.29212C13.4396 -0.330223 10.9089 -0.429832 9.28655 1.06961C9.20949 1.14086 9.13523 1.21506 9.06403 1.29212L0.581016 10.4762C0.208734 10.851 -0.000140554 11.3579 7.09607e-08 11.8862V20.9921C7.09607e-08 22.649 1.34316 23.9921 3 23.9921H6.99998V17.9921C7.01869 15.2653 9.22027 13.0386 11.8784 12.9745C14.6255 12.9082 16.9791 15.1728 17 17.9921Z"
        fill={color}
      />
      <path
        d="M12 14.9917C10.3432 14.9917 9 16.3349 9 17.9917V23.9917H15V17.9917C15 16.3349 13.6568 14.9917 12 14.9917Z"
        fill={color}
      />
    </svg>
  );
};

export default Home;
