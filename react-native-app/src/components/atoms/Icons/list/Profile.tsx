import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Profile = ({ width = 80, height = 80 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none">
      {/* Fond bleu */}
      <Circle cx="40" cy="40" r="39.5" fill="#2E2A85" />

      {/* Icône utilisateur */}
      <Circle cx="40" cy="24" r="11.85" fill="white" />
      <Path
        d="M45.0865 61.49C55.3665 61.49 64.0275 51.0006 56.7585 43.7316C52.3139 39.287 46.2857 36.79 40 36.79C33.7144 36.79 27.6862 39.287 23.2416 43.7316C15.9726 51.0006 24.6336 61.49 34.9136 61.49H40H45.0865Z"
        fill="white"
      />

      {/* Cercle blanc avec contour vert derrière le crayon */}
      <Circle
        cx="62"
        cy="12"
        r="10"
        fill="white"
        stroke="#19887E"
        strokeWidth="2"
      />

      {/* Icône crayon */}
      <Path
        d="M13.814 1.186C13.3681 0.759963 12.7752 0.522217 12.1585 0.522217C11.5418 0.522217 10.9489 0.759963 10.503 1.186L0.5 11.189V14.5H3.811L13.814 4.497C14.2524 4.0576 14.4987 3.46222 14.4987 2.8415C14.4987 2.22078 14.2524 1.6254 13.814 1.186ZM3.0865 12.75H2.25V11.9135L9.63092 4.53317L10.4674 5.36908L3.0865 12.75Z"
        fill="#19887E"
        transform="translate(54, 6)" /* Ajustement parfait pour centrer le crayon */
      />
    </Svg>
  );
};

export default Profile;
