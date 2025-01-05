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
        placeholder="Search"
        icon="Cube"
        subIcon="Lock"
        variant="select"
        data={['Option 1', 'Option 2']}
        onSelect={(selected) => console.log('Selected:', selected)}
        style={{ marginTop: 20 }}
      />
      <Input
        placeholder="Search"
        icon="Cube"
        subIcon="Lock"
        variant="select"
        data={['Option 1', 'Option 2']}
        onSelect={(selected) => console.log('Selected:', selected)}
        style={{ marginTop: 20 }}
      />
      <Input
        placeholder="Search"
        icon="Cube"
        subIcon="Lock"
        variant="select"
        data={['Option 1', 'Option 2']}
        onSelect={(selected) => console.log('Selected:', selected)}
        style={{ marginTop: 20 }}
      />

      <BottomNavbar activeIcon="Reserve" />
    </View>
  );
};
