import React from 'react';
import { Button } from '@components/molecules';
import { View } from 'react-native';
import { styles } from './style';

export type ActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onPress,
}) => (
  <View style={styles.buttonContainer}>
    <Button
      title={label}
      onPress={onPress}
      {...({
        icon: icon,
      } as any)}
      textColor={colors.white}
    />
  </View>
);
