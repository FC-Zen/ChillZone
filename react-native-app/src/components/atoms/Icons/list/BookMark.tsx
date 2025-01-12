import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '@theme';

const Bookmark = ({
  width = 24,
  height = 24,
  color = colors.resolutionBlue,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={{ marginTop: 9 }}
    >
      <Defs>
        <ClipPath id="clip0_3532_492">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_3532_492)">
        <Path
          d="M2.39929 15.7C2.76332 15.8556 3.16579 15.8978 3.55419 15.8212C3.94259 15.7447 4.29889 15.5528 4.57662 15.2707L8.49995 11.3687L12.4233 15.2707C12.6062 15.4563 12.8241 15.6037 13.0645 15.7046C13.3048 15.8054 13.5627 15.8575 13.8233 15.858C14.0912 15.8572 14.3562 15.8035 14.6033 15.7C14.9703 15.5515 15.284 15.2957 15.5034 14.9662C15.7228 14.6366 15.8378 14.2486 15.8333 13.8527V3.33333C15.8322 2.4496 15.4807 1.60237 14.8558 0.97748C14.2309 0.352588 13.3837 0.00105857 12.5 0L4.49995 0C3.61622 0.00105857 2.76899 0.352588 2.1441 0.97748C1.51921 1.60237 1.16768 2.4496 1.16662 3.33333V13.8527C1.16232 14.2489 1.27767 14.6372 1.4976 14.9667C1.71752 15.2963 2.03178 15.5519 2.39929 15.7V15.7Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default Bookmark;
