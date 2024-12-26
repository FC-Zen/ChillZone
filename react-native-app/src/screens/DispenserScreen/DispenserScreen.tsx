import React, { useState } from 'react';
import { View } from 'react-native';
import {
  // Field,
  // SelectedButtonMeal,
  // SearchItem,
  FoodCard,
  TopBar,
} from '@components/molecules';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { meal } from '@assets/data/Images_test';

export const DispenserScreen: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Filtrer');
  const { t } = useTranslation();

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
      <TopBar />
      {/* <SelectedButtonMeal
        title={t('categories.product')}
        isSelected={isSelected}
        onPress={handlePress}
        color={color}
      /> */}

      {/* Ajout du composant SearchItem */}
      {/* <SearchItem
        options={[
          t('categories.menus'),
          t('categories.product'),
          t('categories.drink'),
          t('categories.desserts'),
        ]}
        onSelect={handleFilterSelect}
        initialOption={selectedFilter}
        iconName="CarretUp"
      />

      <Field
        data={[]}
        onFilter={(filteredData) => console.log(filteredData)}
        iconName="Search"
        placeholder={t('fields.search')}
        keyboardType="default"
        autoCapitalize="none"
      /> */}

      <FoodCard
        title={'Pasta Crous'}
        price={'3,30 €'}
        subTitle={'Pasta Crous au saumon'}
        imageUrl={meal}
        iconName="Add"
      />
    </View>
  );
};
