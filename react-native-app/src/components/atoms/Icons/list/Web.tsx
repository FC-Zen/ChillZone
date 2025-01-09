import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@theme';
const Web = ({
  width = 42,
  height = 42,
  backgroundColor = colors.aquaDeep, // Fond vert par défaut
  iconColor = colors.white, // Couleur de l'icône (blanc)
}: {
  width?: number;
  height?: number;
  backgroundColor?: string;
  iconColor?: string;
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 42 42" // S'assure que le contenu s'adapte au cadre
    fill="none"
  >
    {/* Cercle de fond */}
    <Circle cx="20" cy="20" r="20" fill={backgroundColor} />

    {/* Icône "Web" */}
    <Path
      d="M29.707 28.293L23.737 22.324C25.364 20.335 26.164 17.797 25.972 15.234C25.779 12.672 24.609 10.281 22.703 8.557C20.798 6.833 18.302 5.908 15.733 5.972C13.165 6.036 10.718 7.085 8.901 8.902C7.084 10.719 6.035 13.165 5.971 15.734C5.907 18.303 6.832 20.799 8.556 22.704C10.281 24.61 12.671 25.78 15.233 25.973C17.796 26.165 20.334 25.365 22.324 23.738L28.293 29.707C28.481 29.89 28.734 29.991 28.996 29.988C29.258 29.986 29.509 29.881 29.695 29.696C29.88 29.51 29.985 29.259 29.987 28.997C29.99 28.735 29.889 28.482 29.707 28.293ZM16 23C14.418 23 12.871 22.531 11.555 21.652C10.24 20.774 9.214 19.524 8.609 18.062C8.003 16.6 7.845 14.992 8.153 13.44C8.462 11.888 9.224 10.463 10.343 9.344C11.461 8.225 12.887 7.463 14.439 7.154C15.991 6.845 17.599 7.004 19.061 7.609C20.523 8.215 21.773 9.24 22.652 10.556C23.531 11.872 24 13.418 24 15C23.997 17.122 23.154 19.155 21.654 20.655C20.154 22.155 18.121 22.999 16 23Z"
      fill={iconColor}
    />
  </Svg>
);

export default Web;
