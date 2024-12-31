import { View } from 'react-native';
import { BottomNavbar, Input, PageHeader, TopBar } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

export const ReservationScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TopBar />
      <PageHeader title={t('headers.reservation')} variant="default" />
      <Input
        variant="select"
        icon="Search"
        value=""
        onChangeText={() => {}}
        placeholder={t('fields.room.type')}
      />
      <BottomNavbar activeIcon="Reserve" />
    </View>
  );
};
