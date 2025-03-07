import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './style';

export type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  style?: object;
  testID?: string; // Ajout de testID
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  style,
  testID, // Ajout de testID dans les props
}) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={onChange}
      testID={testID} // Ajout de testID ici
    >
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};
