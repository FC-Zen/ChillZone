import React, { useState } from 'react';
import { View, Image, Platform } from 'react-native';
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
};

export const NavigationTemplate: React.FC<NavigationTemplateProps> = ({
  imageSource,
  selectedFloor,
  onSelectFloor,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.cont}>
      <GestureHandlerRootView style={styles.zoomableContainer}>
        <Zoomable
          isDoubleTapEnabled
          minScale={1}
          maxScale={3}
          style={styles.image}
        >
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </Zoomable>
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
