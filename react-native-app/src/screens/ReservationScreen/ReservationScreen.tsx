import { View } from 'react-native';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ReservationTemplateProps } from '@components/templates/ReservationTemplate/ReservationTemplate';
import { BottomNavbar, TopBar } from '@components';
import { styles } from './style';
import { colors } from '@theme';

export const ReservationScreen = () => {
  const { t } = useTranslation();

  const inputs: ReservationTemplateProps['inputs'] = [
    [
      {
        placeholder: t('fields.room.type'),
        icon: 'Expand',
        subIcon: 'Lock',
        variant: 'select',
        data: ['Option 1', 'Option 2'],
        onSelect: (selected: string) => console.log('Selected:', selected),
      },
      {
        placeholder: t('fields.common.date'),
        icon: 'Calendar',
        variant: 'select',
        data: ['Option 1', 'Option 2'],
        onSelect: (selected: string) => console.log('Selected:', selected),
      },
      {
        placeholder: t('fields.room.hours'),
        icon: 'Clock',
        variant: 'select',
        data: ['Option 1', 'Option 2'],
        onSelect: (selected: string) => console.log('Selected:', selected),
      },
    ],
    [
      {
        placeholder: t('fields.room.schedules'),
        icon: 'Calendar',
        variant: 'select',
        data: ['Option 1', 'Option 2'],
        onSelect: (selected: string) => console.log('Selected:', selected),
      },
    ],
  ];

  const roomSelectorProps = {
    title: 'Salles disponibles',
    rooms: [
      {
        label: 'N°1',
        info: {
          name: 'Salle N°1',
          level: '1',
          capacity: '50',
        },
      },
      {
        label: 'N°2',
        info: {
          name: 'Salle N°2',
          level: '2',
          capacity: '52',
        },
      },
      {
        label: 'Salle 102',
        info: {
          name: 'Salle 102',
          level: '1',
          capacity: '24',
        },
      },
      {
        label: 'Salle 201',
        info: {
          name: 'Salle 201',
          level: '2',
          capacity: '28',
        },
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <ReservationTemplate
        inputs={inputs}
        titleHeader={t('headers.reservation')}
        subTitle={t('filters.filterTitle')}
        subTitle2={'Horaires disponibles'}
        roomSelectorProps={roomSelectorProps}
        buttonProps={{
          title: t('headers.reservation'),
          onPress: () => console.log('Reserve button pressed'),
        }}
      />
      <BottomNavbar activeIcon="Reserve" />
    </View>
  );
};
