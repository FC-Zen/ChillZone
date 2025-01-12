import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { styles } from './style';
import { map } from '@assets/Images';
import { colors, typography } from '@theme';
import { BookingOverlay } from '@services';
import { IconWithText } from '../IconWithText';

export const Overlay: React.FC<BookingOverlay> = ({
  data,
  title,
  titleBtn,
  cancelReservation,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleOverlay = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity onPress={toggleOverlay} style={styles.container}>
      <View style={[styles.overlayBox, isExpanded && styles.expandedContainer]}>
        {!isExpanded && (
          <View style={styles.headerRow}>
            <IconWithText
              icon="Cube"
              variant="horizontal"
              text={data.location.location_name}
              iconColor={colors.resolutionBlue}
              iconWidth={16}
              iconHeight={16}
              textStyle={{ fontSize: 14, fontFamily: typography.h3.fontFamily }}
              textColor={colors.resolutionBlue}
              style={styles.previewText}
            />
            <View style={styles.rightColumn}>
              <IconWithText
                icon="Calendar"
                variant="horizontal"
                text={data.day_reservation}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textStyle={{
                  fontSize: 14,
                  fontFamily: typography.h3.fontFamily,
                }}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
              <IconWithText
                icon="Clock"
                variant="horizontal"
                text={`${data.start_time}-${data.end_time}`}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textStyle={{
                  fontSize: 14,
                  fontFamily: typography.h3.fontFamily,
                }}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
            </View>
          </View>
        )}

        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.titleText}>{title}</Text>
            <IconWithText
              icon="Cube"
              variant="horizontal"
              text={data.location.location_name}
              iconColor={colors.resolutionBlue}
              iconWidth={16}
              iconHeight={16}
              textColor={colors.resolutionBlue}
              style={styles.previewText}
            />
            <Image source={map} style={styles.image} />

            <View style={styles.detailsContainer}>
              <IconWithText
                icon="Calendar"
                variant="horizontal"
                text={data.day_reservation}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
              <IconWithText
                icon="Clock"
                variant="horizontal"
                text={`${data.start_time}-${data.end_time}`}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
              <IconWithText
                icon="Marker"
                variant="horizontal"
                text={data.establishment.establishment_name}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />

              <IconWithText
                icon="HomeLocation"
                variant="horizontal"
                text={data.location.floor_name}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
            </View>

            <Button
              title={titleBtn || ''}
              onPress={cancelReservation}
              style={styles.closeButton}
              textColor={colors.warn}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
