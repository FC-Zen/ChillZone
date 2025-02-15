import React, { useCallback } from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle, View, StyleProp } from "react-native";
import { styles } from "./style";
import { IconWithText } from "@components";
import { colors } from "@theme";

export type SelectProps = {
    items: string[];
    selectedValue: string;
    state: 'open' | 'closed';
    setState: () => void;
    onSelect: (item: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    activeOpacity?: number;
};

export const Select: React.FC<SelectProps> = ({
    items,
    selectedValue,
    state,
    setState,
    onSelect = (item) => {},
    containerStyle,
    itemStyle,
    textStyle,
    textColor = 'white',
    borderRadius = 8,
    backgroundColor = colors.resolutionBlue,
    borderColor = 'transparent',
    borderWidth = 1,
    activeOpacity = 1,
}) => {
    return (
        <View  style={[styles.selectContainer, containerStyle, { backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: borderWidth, borderRadius: borderRadius }]}>
            <TouchableOpacity onPress={() => setState()} activeOpacity={activeOpacity}>
                <IconWithText 
                    text={selectedValue} 
                    variant="horizontal"
                    icon="CarretUp" 
                    iconHeight={24}
                    iconWidth={24}
                    iconColor={textColor}
                    textColor={textColor}
                    textStyle={[styles.selectedText, textStyle, {color: textColor}]}
                    style={styles.selectedTextContainer}
                />
            </TouchableOpacity>
            <View style={[styles.selectMenu, state === 'open' ? styles.active : styles.inactive]} >
            {items.map((item) => (
                <TouchableOpacity key={item} onPress={() => onSelect(item)} style={[styles.selectItem, itemStyle]} activeOpacity={activeOpacity}>
                    <Text style={[styles.text, textStyle, { color: textColor }]}>{item}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    );
};