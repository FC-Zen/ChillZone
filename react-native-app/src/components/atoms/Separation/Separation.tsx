import { StyleProp, ViewStyle, View } from "react-native";
import { styles } from "./style";
import { colors } from "@theme";

export type SeparationProps = {
    height?: number;
    width?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
};

export const Separation: React.FC<SeparationProps> = ({ 
    height = 1, 
    width = 350, 
    color = colors.darkCyan, 
    style,
}) => {
    return (
        <View style={[styles.line, { height: height, width: width, backgroundColor: color }, style]} />
    );
}