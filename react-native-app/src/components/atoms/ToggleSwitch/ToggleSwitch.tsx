import React from 'react';
import { View, Switch } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';

export type ToggleSwitchProps = {
  value: boolean;
  onToggle: (newValue: boolean) => void;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onToggle }) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: colors.darkCyan, true: colors.aquaDeep }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
};

export default ToggleSwitch;
