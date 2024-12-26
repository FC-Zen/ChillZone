import { Icon, IconProps } from '@components/atoms';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './style';

export type IconWithTextProps = {
    icon: {
        name: IconProps['name'];
        color: string;
        width?: number;
        height?: number;
    };
    text: string;
    textColor?: string;
    variant: 'vertical' | 'horizontal';
    style?: StyleProp<ViewStyle>;
};

export const IconWithText: React.FC<IconWithTextProps> = ({
    icon,
    text,
    textColor,
    variant = 'horizontal',
    style,
}) => {
    return (
        <View style={[styles.container, styles[variant], style]}>
            <Icon
                name={icon.name}
                color={icon.color}
                width={icon.width || 16}
                height={icon.height || 16}
            />
            <Text style={[styles.text, {color: textColor}]}>{text}</Text>
        </View>
    );

};