import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { API_URL } from '@env';

export type NavItem = {
  icon: IconProps['name'];
  label: string;
  typeLabel?: string;
};

type BookingInfoProps = {
  items: NavItem[];
  roomPhotoLink: string;
};

export const BookingInfo: React.FC<BookingInfoProps> = ({
  items,
  roomPhotoLink,
}) => {
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.container,
        items.length === 0 && {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.resolutionBlue,
          height: 100,
        },
      ]}
    >
      {items.length === 0 ? (
        // Message lorsque la liste est vide
        <Text style={styles.noReservation}>{t('info.noReservations')}</Text>
      ) : (
        // Affichage des informations si la liste n'est pas vide
        <>
          <Image
            source={{ uri: `${API_URL}media/${roomPhotoLink}` }}
            style={styles.image}
          />
          <View style={styles.content}>
            <View style={styles.iconRow}>
              {items.map((item, index) => (
                <View key={index} style={styles.iconContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Icon
                      name={item.icon}
                      color={colors.white}
                      height={16}
                      width={16}
                    />
                    <Text style={styles.iconText}>{item.label}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
};
