import React, { ReactElement } from 'react';
import Svg, { Defs, G, Path, Rect, ClipPath } from 'react-native-svg';
import { IconProps } from '../Icon';
import { colors } from '@theme';

const Download = ({
  color = colors.silver,
  height = 16,
  width = 16,
}: Omit<IconProps, 'name'>): ReactElement => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_2777_2060)">
        <Path 
          d="M6.40054 11.8C7.5721 12.9716 9.4716 12.9716 10.6432 11.8L10.6432 11.8L12.7846 9.65866C13.1818 9.27497 13.1928 8.64191 12.8091 8.24466C12.4254 7.84741 11.7924 7.83641 11.3951 8.22009C11.3868 8.22812 11.3786 8.23634 11.3706 8.24466L9.51523 10.0993L9.49988 1C9.49988 0.447719 9.05216 0 8.49988 0C7.9476 0 7.49988 0.447719 7.49988 1L7.51388 10.0847L5.67323 8.244C5.27598 7.86031 4.64291 7.87131 4.25923 8.26856C3.88495 8.65609 3.88495 9.27047 4.25923 9.658L6.40054 11.8Z" 
          fill={color}
        />
        <Path 
          d="M15.5 9.6665C14.9477 9.6665 14.5 10.1142 14.5 10.6665V13.7272C14.4996 13.8776 14.3778 13.9995 14.2273 13.9998H2.77266C2.62222 13.9994 2.50034 13.8776 2.5 13.7272V10.6665C2.5 10.1142 2.05228 9.6665 1.5 9.6665C0.947719 9.6665 0.5 10.1142 0.5 10.6665V13.7272C0.501469 14.9817 1.51812 15.9984 2.77266 15.9998H14.2273C15.4819 15.9984 16.4985 14.9817 16.5 13.7272V10.6665C16.5 10.1142 16.0523 9.6665 15.5 9.6665Z" 
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2777_2060">
          <Rect 
            width={width} 
            height={height} 
            fill={color} 
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Download;
