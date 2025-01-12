import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms';

export type PickupSlotProps = {
    text: string;
    startTime: number;
    endTime: number;
    selected: boolean;
    style?: StyleProp<ViewStyle>;
    variant?: 'default' | 'counter';
    onSelect: () => void;
    onAdd?: () => void;
    onLess?: () => void;
};

export const PickupSlot: React.FC<PickupSlotProps> = ({
    text,
    startTime,
    endTime,
    selected,
    style,
    variant = 'default',
    onSelect,
    onAdd,
    onLess,
}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onSelect} activeOpacity={1}>
            <View style={[styles.horizontalContainer, { paddingHorizontal: 10 }]}>
                <Text style={styles.title} >{text}</Text>
                <View style={styles.radioCircle}>
                    {selected && <View style={styles.selectedCircle} />}
                </View>
            </View>

            <View style={[styles.horizontalContainer, variant !== 'counter' && { justifyContent: 'center' }]}>
                { variant === 'counter' && <Icon name='Less' onPress={onLess}/> }
                <Text style={styles.time}>{startTime}H00 - {endTime}H00</Text>
                { variant === 'counter' && <Icon name='More' onPress={onAdd}/> }
            </View>
        </TouchableOpacity>
    );
}
