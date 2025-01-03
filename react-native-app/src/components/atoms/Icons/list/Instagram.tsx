import React from 'react';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

export const Instagram = ({ width = 42, height = 42 }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    {/* Cercle de fond avec dégradé */}
    <Defs>
      <LinearGradient
        id="paint0_linear_2846_541"
        x1="21"
        y1="0"
        x2="21"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F46F30" />
        <Stop offset="0.825" stopColor="#C32AA3" />
      </LinearGradient>
    </Defs>
    <Circle cx="21" cy="21" r="21" fill="url(#paint0_linear_2846_541)" />

    {/* Icône Instagram */}
    <Path
      d="M26.6361 16H26.6477M18 31H24C29 31 31 29 31 24V18C31 13 29 11 24 11H18C13 11 11 13 11 18V24C11 29 13 31 18 31ZM24.5 21C24.5 22.933 22.933 24.5 21 24.5C19.067 24.5 17.5 22.933 17.5 21C17.5 19.067 19.067 17.5 21 17.5C22.933 17.5 24.5 19.067 24.5 21Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Instagram;
