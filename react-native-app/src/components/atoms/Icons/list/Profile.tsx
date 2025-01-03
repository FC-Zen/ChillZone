import React from 'react';
import Svg, { Circle, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '@theme';

const Profile = ({ width = 80, height = 80, color = colors.white }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none">
      {/* Fond bleu */}
      <Circle cx="40" cy="40" r="39.5" fill="#2E2A85" />

      {/* Icône utilisateur */}
      <Circle cx="40" cy="24" r="11.85" fill={color} />
      <Path
        d="M45.0865 61.49C55.3665 61.49 64.0275 51.0006 56.7585 43.7316C52.3139 39.287 46.2857 36.79 40 36.79C33.7144 36.79 27.6862 39.287 23.2416 43.7316C15.9726 51.0006 24.6336 61.49 34.9136 61.49H40H45.0865Z"
        fill={color}
      />

      {/* Icône crayon */}
      <G clipPath="url(#clip0)">
        <Path
          d="M53.814 21.186C53.3681 20.76 52.7752 20.5222 52.1585 20.5222C51.5418 20.5222 50.9489 20.76 50.503 21.186L40.5 31.189V34.5H43.811L53.814 24.497C54.2524 24.0576 54.4987 23.4622 54.4987 22.8415C54.4987 22.2208 54.2524 21.6254 53.814 21.186ZM43.0865 32.75H42.25V31.9135L49.6309 24.5332L50.4674 25.3691L43.0865 32.75Z"
          fill="#19887E"
        />
      </G>

      {/* Définition du clip-path */}
      <Defs>
        <ClipPath id="clip0">
          <Rect
            width="14"
            height="14"
            fill="white"
            transform="translate(40.5 20.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Profile;
