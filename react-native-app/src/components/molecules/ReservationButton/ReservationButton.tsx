import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { colors } from '@theme/index';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';

type ReservationButtonProps = {
  title: string;
  onPress: () => void;
  iconName: IconProps['name'];
};

export const ReservationButton: React.FC<ReservationButtonProps> = ({
  title,
  onPress,
  iconName,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.innerContainer}>
        <Icon name={iconName} color={colors.white} width={16} height={16} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReservationButton;
