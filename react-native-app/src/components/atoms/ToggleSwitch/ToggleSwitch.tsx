import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import { styles } from './style';

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
        trackColor={{ false: '#767577', true: '#512D6D' }} // Couleurs personnalisées
        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default ToggleSwitch;
