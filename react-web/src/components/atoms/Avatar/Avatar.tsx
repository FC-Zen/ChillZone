import React from 'react';

export type AvatarProps = {
  src?: string; // URL de l'image de l'utilisateur
  alt: string; // Texte alternatif en cas d'absence de l'image
  size?: 'sm' | 'md' | 'lg'; // Taille de l'avatar : petite, moyenne ou grande
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  // Définir les tailles en fonction des options
  const sizeClasses = {
    sm: 'w-8 h-8', // Taille petite
    md: 'w-12 h-12', // Taille moyenne
    lg: 'w-16 h-16', // Taille grande
  };

  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ${sizeClasses[size]}`}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <span className="text-gray-500 text-sm">
          {alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};
