import React from 'react';
import { View, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Zoomable } from '@likashefqet/react-native-image-zoom';
import { styles } from './style';

type MapZoomProps = {
  imageSource: any;
  onImagePress?: (x: number, y: number) => void;
  imageRef?: React.RefObject<any>;
  zoomScale: number;
  offsetX: number;
  offsetY: number;
};

export const MapZoom: React.FC<MapZoomProps> = ({
  imageSource,
  onImagePress,
  imageRef,
  zoomScale,
  offsetX,
  offsetY,
}) => {
  const handleImagePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;

    if (onImagePress) {
      onImagePress(locationX, locationY);
    }
  };

  return (
    <GestureHandlerRootView
      style={[
        styles.zoomableContainer,
        Platform.OS === 'android' && { overflow: 'hidden' },
      ]}
    >
      <View
        style={[
          styles.zoomableWrapper,
          Platform.OS === 'android' && { overflow: 'hidden' },
        ]}
      >
        <Zoomable
          isDoubleTapEnabled
          minScale={1}
          maxScale={3}
          style={[styles.image, { overflow: 'hidden' }]}
        >
          <TouchableWithoutFeedback onPress={handleImagePress}>
            <Image
              ref={imageRef}
              source={imageSource}
              style={[
                styles.image,
                {
                  transform: [
                    { scale: zoomScale },
                    { translateX: offsetX },
                    { translateY: offsetY },
                  ],
                },
              ]}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </Zoomable>
      </View>
    </GestureHandlerRootView>
  );
};

export default MapZoom;
