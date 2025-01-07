import { Icon, IconProps } from '@components/atoms';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { styles } from './style';

export type IconWithTextProps = {
  icon: IconProps['name'];
  iconColor : string;
  text: string;
  textColor?: string;
  variant: 'vertical' | 'horizontal';
  iconWidth?: number;
  iconHeight?: number;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const IconWithText: React.FC<IconWithTextProps> = ({
  icon,
  iconColor,
  text,
  textColor,
  variant = 'horizontal',
  iconWidth = 24,
  iconHeight = 24,
  textStyle,
  style,
}) => {
  return (
    <View style={[styles.container, styles[variant], style]}>
      <Icon name={icon} width={iconWidth} height={iconHeight} color={iconColor} />{' '}
      <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>{' '}
    </View>
  );
};
