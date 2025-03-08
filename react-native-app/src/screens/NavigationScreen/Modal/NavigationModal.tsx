import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { colors, typography } from '@theme';
import { LocationProps } from '@services';
import { IconWithText } from '@components';
import { styles } from './style';

type NavigationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  pinData: LocationProps | null;
};

export const NavigationModal: FC<NavigationModalProps> = ({
  isVisible,
  onClose,
  pinData,
}) => {
  if (!pinData) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.roomInfo}>
            <View style={styles.modalTitle}>
              <IconWithText
                icon="School"
                iconWidth={20}
                iconHeight={20}
                iconColor={colors.white}
                variant="horizontal"
                text={pinData.name}
                textColor={colors.white}
                textStyle={{
                  fontSize: typography.h3.fontSize,
                  fontFamily: typography.h1.fontFamily,
                }}
              />
            </View>

            {/* Photo */}
            <Image
              source={{ uri: pinData.photo_link }}
              style={styles.mapContainer}
            />

            <View style={styles.flexContainer}>
              {/* Description */}
              {pinData.description && (
                <View style={styles.flexItem}>
                  <Text style={styles.txt}>{pinData.description}</Text>
                </View>
              )}

              {/* Capacity */}
              {pinData.capacity && (
                <View style={styles.flexItem}>
                  <Icon name="List" color={colors.white} />
                  <Text style={styles.textStyle}>
                    {pinData.capacity} places
                  </Text>
                </View>
              )}

              {/* Room Type */}
              {pinData.room_type && (
                <View style={styles.flexItem}>
                  <Icon name="HomeLocation" color={colors.white} />
                  <Text style={styles.textStyle}>{pinData.room_type}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
