import React from 'react';
import { View, Image } from 'react-native';
import { IconWithText, NavigationBar } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';

type RDCTemplateProps = {
  imageSource: any;
  onSelectFloor: (floor: string) => void;
};

export const RDCTemplate: React.FC<RDCTemplateProps> = ({
  imageSource,
  onSelectFloor,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.cont}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <NavigationBar onSelectFloor={onSelectFloor} selectedFloor="RDC" />
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
  );
};
