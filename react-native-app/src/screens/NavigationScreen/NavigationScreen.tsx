import React, { useState, useRef, useEffect } from 'react';
import { View, Image, LayoutChangeEvent } from 'react-native';
import { styles } from './style';
import {
  BottomNavbar,
  NavigationTemplate,
  PageHeader,
  TopBar,
} from '@components';
import { useTranslation } from 'react-i18next';
import { getAllMapFloors, LocationProps, MapFloorProps } from '@services';
import { useSharedValue } from 'react-native-reanimated';
import { NavigationModal } from './Modal';

export const NavigationScreen = () => {
  const zoomScale = useSharedValue(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState<MapFloorProps>();
  const [allFloors, setAllFloors] = useState<MapFloorProps[]>([]);
  const [pins, setPins] = useState<LocationProps[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPin, setSelectedPin] = useState<LocationProps | null>(null);
  const imageRef = useRef(null);
  const { t } = useTranslation();

  const [originalSize, setOriginalSize] = useState({
    width: 3308,
    height: 2339,
  });
  const [currentScale, setCurrentScale] = useState(0.3);

  const [displayedSize, setDisplayedSize] = useState({
    width: 0,
    height: 0,
  });

  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  const onSelectFloor = (floor: number) => {
    setSelectedFloor(allFloors.find((f) => f.id === floor));
  };

  const [ratioHeight, setRatioHeight] = useState(
    displayedSize.height / originalSize.height
  );
  const [ratioWidth, setRatioWidth] = useState(350 / originalSize.width);

  const calculRatio = () => {
    setRatioHeight(displayedSize.height / originalSize.height);
    setRatioWidth(displayedSize.width / originalSize.width);
  };

  const recalculatePins = () => {
    if (
      selectedFloor?.locations &&
      displayedSize.width > 0 &&
      displayedSize.height > 0
    ) {
      const newPins = selectedFloor.locations.map((location) => {
        const scaledX = location.position_x * ratioWidth;
        const scaledY = location.position_y * ratioHeight;
        return {
          ...location,
          position_x: scaledX,
          position_y: scaledY,
        };
      });
      setPins(newPins);
    }
  };

  const handleImagePress = (x: number, y: number) => {
    if (imageRef.current) {
      const realX = (x - offsetX) / zoomScale.get();
      const realY = (y - offsetY) / zoomScale.get();

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

  useEffect(() => {
    if (displayedSize.width > 0 && displayedSize.height > 0) {
      calculRatio();
      recalculatePins();
    }
  }, [displayedSize]);

  //Recalcule les Pins à chaques fois que le zoomScale change
  useEffect(() => {
    recalculatePins();
  }, [selectedFloor, originalSize, currentScale, offsetX, offsetY, zoomScale]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedPin(null);
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
        imageSource={selectedFloor?.photo_link || ''}
        selectedFloor={selectedFloor?.name || ''}
        onSelectFloor={onSelectFloor}
        onImagePress={handleImagePress}
        imageRef={imageRef}
        floors={allFloors}
        offsetX={offsetX}
        offsetY={offsetY}
        pins={pins}
        onPressPin={(pin) => {
          setSelectedPin(pin);
          setIsModalVisible(true);
        }}
        zoomScale={zoomScale}
        onLoad={(event: LayoutChangeEvent) => {
          let { width, height } = event.nativeEvent.layout;
          console.log("Taille de l'image :", { width, height });
          setDisplayedSize({ width, height });
          calculRatio();
        }}
      />

      <NavigationModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        pinData={selectedPin}
      />

      <BottomNavbar activeIcon="Navigation" />
    </View>
  );
};
