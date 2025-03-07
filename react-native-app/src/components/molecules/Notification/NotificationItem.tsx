import { View } from 'react-native';
import { IconProps } from '@components/atoms';
import { styles } from './style';
import React, { useState } from 'react';
import { IconWithText } from '../IconWithText';
import { ToggleSwitch } from '@components/atoms';
import { colors, typography } from '@theme';

export type NotificationProps = {
  title: string;
  icon: IconProps['name'];
  handleSwitch: (newValue: boolean) => void;
  isEnabled: boolean;
};

export const NotificationItem: React.FC<NotificationProps> = ({
  title,
  icon,
  handleSwitch,
  isEnabled,
}) => {
  const [switchValue, setSwitchValue] = useState(isEnabled);

  const onToggle = (newValue: boolean) => {
    setSwitchValue(newValue);
    handleSwitch(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconTextContainer}>
        <IconWithText
          icon={icon}
          text={title}
          iconColor={colors.resolutionBlue}
          variant={'horizontal'}
          textColor={colors.resolutionBlue}
          textStyle={{
            fontSize: 18,
            fontFamily: typography.h3.fontFamily,
          }}
          style={styles.iconText}
        />
      </View>
      <ToggleSwitch onToggle={onToggle} value={switchValue} />
    </View>
  );
};
