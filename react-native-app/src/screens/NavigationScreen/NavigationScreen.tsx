import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import {
  BottomNavbar,
  NavigationTemplate,
  PageHeader,
  TopBar,
} from '@components';
import { useTranslation } from 'react-i18next';
import { getAllMapFloors, MapFloorProps } from '@services';

export const NavigationScreen = () => {
  const [zoomScale, setZoomScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState<MapFloorProps>();
  const [allFloors, setAllFloors] = useState<MapFloorProps[]>([]);
  const imageRef = useRef(null);
  const { t } = useTranslation();

  const onSelectFloor = (floor: number) => {
    setSelectedFloor(allFloors.find((f) => f.id === floor));
  };

  const handleImagePress = (x: number, y: number) => {
    if (imageRef.current) {
      const realX = (x - offsetX) / zoomScale;
      const realY = (y - offsetY) / zoomScale;
      console.log('Coordonnées réelles :', { x: realX, y: realY });
    } else {
      console.error("Source d'image non trouvée");
    }
  };

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await getAllMapFloors();
        setAllFloors(response);
        setSelectedFloor(response[0]);
        console.log('RDC :', response[0].name);
      } catch (error) {
        console.error('Erreur lors de la récupération des étages:', error);
      }
    };
    fetchFloors();
  }, []);

  return (
    <View style={styles.container}>
      <TopBar />
      <PageHeader
        title={t('headers.map')}
        variant="default"
        style={{ marginBottom: -30 }}
      />

      <NavigationTemplate
        imageSource={selectedFloor?.photo_link || ''}
        selectedFloor={selectedFloor?.name || ''}
        onSelectFloor={onSelectFloor}
        onImagePress={handleImagePress}
        imageRef={imageRef}
        floors={allFloors}
        offsetX={offsetX}
        offsetY={offsetY}
        zoomScale={zoomScale}
      />

      <BottomNavbar activeIcon="Navigation" />
    </View>
  );
};
