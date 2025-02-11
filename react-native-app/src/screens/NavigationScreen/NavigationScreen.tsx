import React, { useState, useRef } from 'react';
import { Image, View } from 'react-native';
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
    const imageSource = floorImages[selectedFloor];

    if (imageSource) {
      const resolvedSource = Image.resolveAssetSource(imageSource);

      if (resolvedSource) {
        Image.getSize(
          resolvedSource.uri,
          (width, height) => {
            // Dimensions réelles de l'image
            console.log("Dimensions de l'image :", { width, height });

            // Calcul des coordonnées réelles
            const realX =
              ((x - offsetX) / zoomScale) * (width / resolvedSource.width);
            const realY =
              ((y - offsetY) / zoomScale) * (height / resolvedSource.height);

            console.log('Coordonnées réelles :', { x: realX, y: realY });
          },
          (error) => {
            console.error(
              "Erreur lors de la récupération des dimensions de l'image :",
              error
            );
          }
        );
      } else {
        console.error("Source d'image non résolue");
      }
    } else {
      console.error("Source d'image non trouvée");
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
