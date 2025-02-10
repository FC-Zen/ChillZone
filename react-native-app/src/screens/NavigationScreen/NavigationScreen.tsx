import React, { useState, useRef } from 'react';
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
  const imageRef = useRef(null);
  const { t } = useTranslation();

  const floorImages: { [key: string]: any } = {
    RDC: rdc,
    Floor1: floor1,
    Floor2: floor2,
    Floor3: floor3,
  };

  const handleImagePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;

    console.log('Coordonnées du clic :', {
      x: Math.round(locationX),
      y: Math.round(locationY),
    });
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
        onImagePress={handleImagePress}
        imageRef={imageRef}
      />

      <BottomNavbar activeIcon="Navigation" />
    </View>
  );
};
