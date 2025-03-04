import { View, Text, Image } from 'react-native';
import { styles } from './style';
import {
  Button,
  PageHeader,
  PickupSlot,
  PickupSlotProps,
} from '@components/molecules';
import { CommandList } from '@components/organisms';
import { ItemProps } from '@components/organisms/CommandList/CommandList';
import { Separation } from '@components/atoms';

export type CartTemplateProps = {
  headerTitle: string;
  restaurantText: string;
  restaurantImage: any;
  commands: ItemProps[];
  commandTitle: string;
  collectTitle: string;
  totalText: string;
  totalPrice: string;
  standardSlot: PickupSlotProps;
  customSlot: PickupSlotProps;
  payButtonTitle: string;
  onPayBtnPress: () => void;
};

export const CartTemplate: React.FC<CartTemplateProps> = ({
  headerTitle,
  restaurantText,
  restaurantImage,
  commands,
  commandTitle,
  collectTitle,
  totalText,
  totalPrice,
  standardSlot,
  customSlot,
  payButtonTitle,
  onPayBtnPress,
}) => {
  return (
    <View style={styles.container}>
      <PageHeader title={headerTitle} variant="back" />
      <View style={styles.commonColumn}>
        {/* Restaurant Title */}
        <View style={[styles.commonColumn, styles.restaurant]}>
          <Text style={[styles.title, { textAlign: 'center' }]}>
            {restaurantText}
          </Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: restaurantImage }} style={styles.image} />
          </View>
        </View>

        {/* Collect Selection */}
        <View style={[styles.commonColumn, styles.collect]}>
          <Text style={styles.title}>{collectTitle}</Text>
          <View style={styles.collectSlots}>
            <PickupSlot {...standardSlot} />

            <PickupSlot {...customSlot} />
          </View>
          <Separation />
        </View>

        {/* Command details */}
        <View style={[styles.commonColumn, styles.command]}>
          <Text style={styles.title}>{commandTitle}</Text>
          <CommandList commands={commands} />
          <Separation />
        </View>

        {/* Total */}
        <View style={styles.total}>
          <Text style={styles.totalText}>{totalText}</Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
      </View>
      <Button
        title={payButtonTitle}
        onPress={onPayBtnPress}
        style={styles.payBtn}
      />
    </View>
  );
};
