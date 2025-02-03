import React from 'react';
import { View, Image } from 'react-native';
import { IconWithText, NavigationBar } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';

type Floor1Props = {
  imageSource: any;
  onSelectFloor: (floor: string) => void;
};

export const Floor1Template: React.FC<Floor1Props> = ({
  imageSource,
  onSelectFloor,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.cont}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <NavigationBar onSelectFloor={onSelectFloor} selectedFloor="Floor1" />
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
