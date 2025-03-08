import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';

type ProductCardProps = {
  title: string;
  price?: string;
  subTitle: string;
  imageUrl: any;
  iconName: IconProps['name'];
  onPress?: () => void;
};

export const FoodCard: React.FC<ProductCardProps> = ({
  title,
  price,
  subTitle,
  imageUrl,
  iconName,
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {price && <Text style={styles.price}>{price}</Text>}
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.iconContainer}>
            <Icon
              name={iconName}
              width={32}
              height={32}
              color={colors.white}
              onPress={onPress}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};
