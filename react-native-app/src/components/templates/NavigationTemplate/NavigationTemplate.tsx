import React from 'react';
import { View, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { IconWithText, NavigationBar } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { Zoomable } from '@likashefqet/react-native-image-zoom';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type NavigationTemplateProps = {
  imageSource: any;
  selectedFloor: string;
  onSelectFloor: (floor: string) => void;
  onImagePress?: (event: any) => void;
  imageRef?: React.RefObject<any>;
};

export const NavigationTemplate: React.FC<NavigationTemplateProps> = ({
  imageSource,
  selectedFloor,
  onSelectFloor,
  onImagePress,
  imageRef,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.cont}>
      <GestureHandlerRootView
        style={[
          styles.zoomableContainer,
          Platform.OS === 'android' && {
            overflow: 'hidden',
          },
        ]}
      >
        <View
          style={[
            styles.zoomableWrapper,
            Platform.OS === 'android' && {
              overflow: 'hidden',
            },
          ]}
        >
          <Zoomable
            isDoubleTapEnabled
            minScale={1}
            maxScale={3}
            style={[styles.image, { overflow: 'hidden' }]}
          >
            <TouchableWithoutFeedback onPress={onImagePress}>
              <Image
                ref={imageRef}
                source={imageSource}
                style={[
                  styles.image,
                  Platform.OS === 'android' && {
                    width: '100%',
                    height: '100%',
                  },
                ]}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </Zoomable>
        </View>
      </GestureHandlerRootView>

      <View style={styles.bottomContainer}>
        <NavigationBar
          onSelectFloor={onSelectFloor}
          selectedFloor={selectedFloor}
        />
        <View style={styles.iconContainer}>
          <IconWithText
            icon="AR"
            text={t('rooms.AR')}
            variant="horizontal"
            textColor={colors.white}
            textStyle={{ fontSize: 12 }}
            iconWidth={16}
            iconHeight={16}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};
