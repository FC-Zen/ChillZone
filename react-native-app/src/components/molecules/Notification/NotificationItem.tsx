// src/components/molecules/NotificationItem.tsx
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';

export type NotificationProps = {
  id: number;
  title: string;
  description: string;
  time: string;
  handlePress: () => void;
};

export const NotificationItem: React.FC<NotificationProps> = ({
  title,
  description,
  time,
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
        <Text style={styles.time}>{time}</Text>
      </TouchableOpacity>
    </View>
  );
};
