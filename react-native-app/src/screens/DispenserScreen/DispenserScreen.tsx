import React, { useState } from 'react';
import { View } from 'react-native';
import { DispenserTemplate } from '@components';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';

export const DispenserScreen: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Filtrer');
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    console.log('Option sélectionnée :', option);
  };

  const color = isSelected ? colors.aquaDeep : colors.darkCyan;

  return (
    <View style={styles.container}>
      <DispenserTemplate
        selectedButtonMealProps={[
          {
            title: 'Plats',
            isSelected: isSelected,
            onPress: handlePress,
            color: color,
          },
          {
            title: 'Menus',
            isSelected: !isSelected,
            onPress: handlePress,
            color: color,
          },
        ]}
        searchItemProps={{
          options: ['Option 1', 'Option 2'],
          onSelect: handleFilterSelect,
          initialOption: selectedFilter,
          iconName: 'CarretUp',
        }}
        fieldProps={{
          data: ['Item 1', 'Item 2'],
          onFilter: (filteredData) => console.log(filteredData),
          iconName: 'Search',
          placeholder: 'Chercher',
        }}
        foodCardListProps={{
          foodItems: [],
          onItemSelect: (item) => console.log('Item sélectionnée:', item),
        }}
        buttonProps={{
          title: 'Voir le panier',
          onPress: () => console.log('Go panier'),
        }}
        pageHeaderProps={{
          title: t('categories.restaurants'),
          variant: 'back',
          icon: {
            name: 'Cross',
            color: colors.black,
            width: 16,
            height: 16,
          },
          onBackPress: () => navigation.navigate(ROUTE.HOME),
        }}
      />
    </View>
  );
};
