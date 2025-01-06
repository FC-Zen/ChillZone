import React from 'react';
import { View, Switch } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';

export type ToggleSwitchProps = {
  value: boolean;
  onToggle: (newValue: boolean) => void;
  isDarkTheme?: boolean; // Optionnel pour s'adapter au thème
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onToggle,
  isDarkTheme = false, // Par défaut, thème clair
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: value
            ? isDarkTheme
              ? colors.white // Fond blanc en mode sombre et activé
              : colors.darkCyan // Fond cyan en mode clair et activé
            : isDarkTheme
              ? colors.darkCyan // Fond cyan en mode sombre et désactivé
              : colors.white, // Fond blanc en mode clair et désactivé
        },
      ]}
    >
      <Switch
        trackColor={{
          false: 'transparent', // Transparence pour ne pas gêner le fond du conteneur
          true: 'transparent', // Transparence pour laisser le conteneur gérer la couleur
        }}
        thumbColor={value ? colors.white : colors.darkCyan} // Bouton rond
        ios_backgroundColor="transparent" // Pas de fond visible sur iOS
        onValueChange={onToggle}
        value={value}
        style={styles.switch}
      />
    </View>
  );
};
