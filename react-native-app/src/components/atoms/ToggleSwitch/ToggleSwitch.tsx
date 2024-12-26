import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';

export type ToggleSwitchProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
};

export const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: colors.darkCyan, true: colors.aquaDeep }} // Couleurs personnalisées
        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default ToggleSwitch;
