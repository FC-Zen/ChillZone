import { View } from 'react-native';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ReservationTemplateProps } from '@components/templates/ReservationTemplate/ReservationTemplate';
import { BottomNavbar, PageHeader, TopBar } from '@components';

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

  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <PageHeader title={t('headers.reservation')} variant="default" />
      <ReservationTemplate
        inputs={inputs}
        subTitle={t('filters.filterTitle')}
        subTitle2={'Horaires disponibles'}
      />
      <BottomNavbar activeIcon="Reserve" />
    </View>
  );
};
