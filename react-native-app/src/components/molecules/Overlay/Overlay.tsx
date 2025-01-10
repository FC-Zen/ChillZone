import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { styles } from './style';
import { map } from '@assets/Images';
import { colors } from '@theme';

type ReservationOverlayProps = {
  title: string;
  salle: string;
  date: string;
  horaire: string;
  location: string;
  etage: string;
  titleBtn: string;
  cancelReservation?: () => void;
};

export const Overlay: React.FC<ReservationOverlayProps> = ({
  title,
  salle,
  date,
  horaire,
  location,
  etage,
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
            <Text style={styles.previewText}>{salle}</Text>
            <View style={styles.rightColumn}>
              <Text style={styles.previewText}>{date}</Text>
              <Text style={styles.previewText}>{horaire}</Text>
            </View>
          </View>
        )}

        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.previewText}>{salle}</Text>
            <Image source={map} style={styles.image} />

            <View style={styles.detailsContainer}>
              <Text style={styles.previewText}>{date}</Text>
              <Text style={styles.previewText}>{horaire}</Text>
              <Text style={styles.previewText}>{location}</Text>
              <Text style={styles.previewText}>{etage}</Text>
            </View>

            <Button
              title={titleBtn}
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
