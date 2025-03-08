import React from 'react';
import { View, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { styles } from './style';
import { LocationProps } from '@services';
import { colors, layout } from '@theme';
import { SharedValue } from 'react-native-reanimated';
import { Icon } from '@components/atoms';

type MapZoomProps = {
  imageSource: any;
  onImagePress?: (x: number, y: number) => void;
  imageRef?: React.RefObject<any>;
  zoomScale: SharedValue<number>;
  offsetX: number;
  offsetY: number;
  pins: LocationProps[];
  onPressPin?: (pinId: LocationProps) => void;
  onLoad: (event: any) => void;
  onLayoutZoomable: (event: any) => void;
};

export const MapZoom: React.FC<MapZoomProps> = ({
  imageSource,
  onImagePress,
  imageRef,
  pins,
  onPressPin,
  onLoad,
  onLayoutZoomable,
}) => {
  const getTooltipColor = (type: LocationProps['room_type']) => {
    switch (type) {
      case 'Salle de cours':
        return '#3789A3';
      case 'Salle de réunion':
        return '#FA8507';
      case 'Salle informatique':
        return '#78B200';
      case 'Box acoustique':
        return '#8800A1';
      case 'Amphithéâtre':
        return '#BB3254';
      default:
        return colors.resolutionBlue;
    }
  };

  const handleImagePress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;

    if (onImagePress) {
      onImagePress(locationX, locationY);
    }
  };

  let blankSpace = 0;
  let imageSize = { width: 0, height: 0 };
  let containerSize = { width: 0, height: 0 };

  return (
    <GestureHandlerRootView
      style={[
        styles.zoomableContainer,
        Platform.OS === 'android' && { overflow: 'hidden' },
      ]}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        console.log(
          'GestureHandlerRootView : \n' + `Width: ${width}, Height: ${height}`
        );
        containerSize = { width, height };
      }}
    >
      <View
        style={[
          styles.zoomableWrapper,
          Platform.OS === 'android' && { overflow: 'hidden' },
          { height: 250 },
        ]}
        onLayout={onLoad}
      >
        <ReactNativeZoomableView
          minZoom={1}
          maxZoom={3}
          onLayout={onLayoutZoomable}
          style={[
            styles.image,
            { overflow: 'hidden', justifyContent: 'flex-end' },
          ]}
          doubleTapZoomToCenter={true}
        >
          <TouchableWithoutFeedback
            onPress={handleImagePress}
            style={[styles.image, { justifyContent: 'flex-end', height: 300 }]}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              console.log(
                'TouchableWithoutFeedback : \n' +
                  `Width: ${width}, Height: ${height}`
              );
            }}
          >
            <View
              style={styles.image}
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                console.log(
                  "View qui entoure l'Image : \n" +
                    `Width: ${width}, Height: ${height}`
                );
              }}
            >
              <Image
                ref={imageRef}
                source={{ uri: imageSource }}
                style={[
                  styles.image,
                  {
                    position: 'relative',
                  },
                ]}
                resizeMode="contain"
              />
              {/* Affichage des pins */}
              {pins.map((pin, index) => {
                console.log(`Rendering Pin ${index}`);
                const pinX = pin.position_x;
                const pinY = pin.position_y;

                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => onPressPin && onPressPin(pin)}
                  >
                    <View
                      style={[
                        {
                          position: 'absolute',
                          left: pinX - 10,
                          top: pinY - 30,
                          width: 15,
                          height: 15,
                          borderRadius: 10,
                        },
                      ]}
                    >
                      <Icon
                        name="Marker"
                        color={getTooltipColor(pin.room_type)}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </ReactNativeZoomableView>
      </View>
    </GestureHandlerRootView>
  );
};
