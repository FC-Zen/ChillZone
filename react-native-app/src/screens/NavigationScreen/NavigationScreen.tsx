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
  const [zoomScale, setZoomScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState('RDC');
  const imageRef = useRef(null);
  const { t } = useTranslation();

  const floors = ['RDC', 'Floor1', 'Floor2', 'Floor3'];

  const floorImages: { [key: string]: any } = {
    RDC: rdc,
    Floor1: floor1,
    Floor2: floor2,
    Floor3: floor3,
  };

  const handleImagePress = (x: number, y: number) => {
    if (imageRef.current) {
      const realX = (x - offsetX) / zoomScale;
      const realY = (y - offsetY) / zoomScale;
      console.log('Coordonnées réelles :', { x: realX, y: realY });
    } else {
      console.error('Image ref is undefined');
    }
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
        floors={floors}
        offsetX={offsetX}
        offsetY={offsetY}
        zoomScale={zoomScale}
      />

      <BottomNavbar activeIcon="Navigation" />
    </View>
  );
};
