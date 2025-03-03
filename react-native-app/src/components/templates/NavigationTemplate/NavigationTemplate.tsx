import React from 'react';
import { View } from 'react-native';
import { IconWithText, MapZoom, NavigationBar } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';

type NavigationTemplateProps = {
  imageSource: any;
  selectedFloor: string;
  onSelectFloor: (floor: string) => void;
  onImagePress?: (x: number, y: number) => void;
  imageRef?: React.RefObject<any>;
  floors: string[];
  zoomScale: number;
  offsetX: number;
  offsetY: number;
};

export const NavigationTemplate: React.FC<NavigationTemplateProps> = ({
  imageSource,
  selectedFloor,
  onSelectFloor,
  onImagePress,
  imageRef,
  floors,
  zoomScale,
  offsetX,
  offsetY,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation(); 

  return (
    <View style={styles.cont}>
      <MapZoom
        imageSource={imageSource}
        onImagePress={onImagePress}
        imageRef={imageRef}
        zoomScale={zoomScale}
        offsetX={offsetX}
        offsetY={offsetY}
      />

      <View style={styles.bottomContainer}>
        <NavigationBar
          onSelectFloor={onSelectFloor}
          selectedFloor={selectedFloor}
          floors={floors}
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
            onPress={() => { navigation.navigate('ARNavigationScreen') }}
          />
        </View>
      </View>
    </View>
  );
};
