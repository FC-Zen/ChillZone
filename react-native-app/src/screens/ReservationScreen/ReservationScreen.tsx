import React from 'react';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BottomNavbar, PageHeader, TopBar } from '@components';
import { styles } from './style';
import { InputProps } from '@components/molecules';

export const ReservationScreen = () => {
  const { t } = useTranslation();

  const inputs: InputProps[] = [
    {
      placeholder: 'Search',
      icon: 'Cube',
      subIcon: 'Lock',
      variant: 'select',
      data: ['Option 1', 'Option 2'],
      onSelect: (selected: string) => console.log('Selected:', selected),
      style: { marginTop: 20 },
    },
    {
      placeholder: 'Search',
      icon: 'Cube',
      subIcon: 'Lock',
      variant: 'select',
      data: ['Option 1', 'Option 2'],
      onSelect: (selected: string) => console.log('Selected:', selected),
      style: { marginTop: 20 },
    },
    {
      placeholder: 'Search',
      icon: 'Cube',
      subIcon: 'Lock',
      variant: 'select',
      data: ['Option 1', 'Option 2'],
      onSelect: (selected: string) => console.log('Selected:', selected),
      style: { marginTop: 20 },
    },
  ];

  return (
    <View style={styles.container}>
      <TopBar />
      <PageHeader title={t('headers.reservation')} variant="default" />
      <ReservationTemplate
        inputs={inputs}
        subTitle={t('filters.filterTitle')}
      />
      <BottomNavbar activeIcon="Reserve" />
    </View>
  );
};
