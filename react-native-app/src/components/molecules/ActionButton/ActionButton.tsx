import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@components/atoms/Button';

export type ActionButtonProps = {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  iconName,
  onPress,
}) => (
  <Button
    label={label}
    onPress={onPress}
    // Forcer l'ajout d'une prop non déclarée
    {...({ icon: <Ionicons name={iconName} size={20} color="#fff" /> } as any)}
  />
);
