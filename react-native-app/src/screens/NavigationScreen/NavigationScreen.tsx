import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import {
  BottomNavbar,
  PageHeader,
  RDCTemplate,
  TopBar,
  NavigationBar,
} from '@components';
import { rdc } from '@assets/Images';
import { useTranslation } from 'react-i18next';

export const NavigationScreen = () => {
  const [selectedFloor, setSelectedFloor] = useState('RDC');

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TopBar />
      <PageHeader title={t('headers.map')} variant="default" />
      <RDCTemplate imageSource={rdc} onSelectFloor={setSelectedFloor} />
      <BottomNavbar activeIcon="Navigation" />
      {/* <NavigationBar
        onSelectFloor={setSelectedFloor}
        selectedFloor={selectedFloor}
      /> */}
    </View>
  );
};
