import React from 'react';
import { View, Switch } from 'react-native';
import { colors } from '@theme';
import { styles } from './style';

export type ToggleSwitchProps = {
  value: boolean;
  onToggle: (newValue: boolean) => void;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onToggle,
}) => {
  return (
    <View style={[styles.container]}>
      <Switch
        trackColor={{
          false: colors.silver,
          true: colors.resolutionBlue,
        }}
        thumbColor={value ? colors.white : colors.resolutionBlue} // Bouton rond
        ios_backgroundColor="transparent" // Pas de fond visible sur iOS
        onValueChange={onToggle}
        value={value}
        style={styles.switch}
      />
    </View>
  );
};
