import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';

type ProductCardProps = {
  title: string;
  price: string;
  subTitle: string;
  imageUrl: any;
  iconName: IconProps['name'];
};

export const FoodCard: React.FC<ProductCardProps> = ({
  title,
  price,
  subTitle,
  imageUrl,
  iconName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.iconContainer}>
          <Icon name={iconName} width={32} height={32} color={colors.white} />
        </View>
      </View>
    </View>
  );
};
