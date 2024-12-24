// src/components/molecules/NotificationItem.tsx
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';
import { diff_time } from '@utils/functions/Notification';

export type NotificationProps = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: {
    name: IconProps['name'];
    color: string;
  }
  handlePress?: () => void;
};

export const NotificationItem: React.FC<NotificationProps> = ({
  title,
  description,
  time,
  icon,
  handlePress,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={1}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={icon?.name || 'Bell'}
            color={icon?.color || colors.black}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <Text style={styles.time}>{diff_time(new Date(time), new Date())}</Text>
      </TouchableOpacity>
    </View>
  );
};
