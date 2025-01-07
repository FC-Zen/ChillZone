import React from 'react';
import Svg, { Circle, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '@theme';
const Ent = ({
  width = 24,
  height = 24,
  backgroundColor = colors.aquaDeep, // Couleur du fond (vert)
  iconColor = colors.white, // Couleur des détails de l'icône (blanc)
}: {
  width?: number;
  height?: number;
  backgroundColor?: string;
  iconColor?: string;
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 42 42" // Vue adaptée pour un cercle de 42x42
    fill="none"
  >
    {/* Cercle de fond */}
    <Circle cx="21" cy="21" r="21" fill={backgroundColor} />

    {/* Conteneur pour le contenu principal */}
    <G clipPath="url(#clip0)">
      <Path
        d="M31.5 6H10.5C9.1 6 7.9 6.5 6.9 7.5C5.9 8.5 5.5 9.7 5.5 11V31C5.5 32.3 5.9 33.5 6.9 34.5C7.9 35.5 9.1 36 10.5 36H31.5C32.9 36 34.1 35.5 35.1 34.5C36.1 33.5 36.5 32.3 36.5 31V11C36.5 9.7 36.1 8.5 35.1 7.5C34.1 6.5 32.9 6 31.5 6ZM10.5 8H31.5C32.4 8 33.2 8.3 33.8 8.8C34.4 9.3 34.5 10 34.5 11V12H7.5V11C7.5 10 7.6 9.3 8.2 8.8C8.8 8.3 9.6 8 10.5 8ZM31.5 34H10.5C9.6 34 8.8 33.7 8.2 33.2C7.6 32.7 7.5 32 7.5 31V15H34.5V31C34.5 32 34.4 32.7 33.8 33.2C33.2 33.7 32.4 34 31.5 34ZM31.5 20.5C31.5 21 31.3 21.5 30.9 21.9C30.5 22.3 30 22.5 29.5 22.5H12.5C12 22.5 11.5 22.3 11.1 21.9C10.7 21.5 10.5 21 10.5 20.5C10.5 20 10.7 19.5 11.1 19.1C11.5 18.7 12 18.5 12.5 18.5H29.5C30 18.5 30.5 18.7 30.9 19.1C31.3 19.5 31.5 20 31.5 20.5ZM25.5 28.5C25.5 29 25.3 29.5 24.9 29.9C24.5 30.3 24 30.5 23.5 30.5H12.5C12 30.5 11.5 30.3 11.1 29.9C10.7 29.5 10.5 29 10.5 28.5C10.5 28 10.7 27.5 11.1 27.1C11.5 26.7 12 26.5 12.5 26.5H23.5C24 26.5 24.5 26.7 24.9 27.1C25.3 27.5 25.5 28 25.5 28.5Z"
        fill={iconColor}
      />
    </G>

    {/* ClipPath */}
    <Defs>
      <ClipPath id="clip0">
        <Rect width="42" height="42" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Ent;
