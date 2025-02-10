import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import {
  BottomNavbar,
  NavigationTemplate,
  PageHeader,
  TopBar,
} from '@components';
import { rdc, floor1, floor2, floor3 } from '@assets/Images';
import { useTranslation } from 'react-i18next';

export const NavigationScreen = () => {
  const [selectedFloor, setSelectedFloor] = useState('RDC');

  const { t } = useTranslation();

  const floorImages: { [key: string]: any } = {
    RDC: rdc,
    Floor1: floor1,
    Floor2: floor2,
    Floor3: floor3,
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <PageHeader
        title={t('headers.map')}
        variant="default"
        style={{ marginBottom: -30 }}
      />

      <NavigationTemplate
        imageSource={floorImages[selectedFloor]}
        selectedFloor={selectedFloor}
        onSelectFloor={setSelectedFloor}
      />

      <BottomNavbar activeIcon="Navigation" />
    </View>
  );
};
