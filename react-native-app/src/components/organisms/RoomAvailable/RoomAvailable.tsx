import React, { FC } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { colors } from '@theme';
import { styles } from './style';
import { RoomAvailability } from '@services';
import { API_URL } from '@env';

export type RoomSelectorProps = {
  title: string;
  rooms: RoomAvailability[];
  selectedRoom: RoomAvailability | null;
  handlePress: (room: RoomAvailability) => void;
};

export const RoomAvailable: FC<RoomSelectorProps> = ({
  title,
  rooms,
  selectedRoom,
  handlePress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {rooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedRoom?.id === room.id && styles.buttonActive,
            ]}
            onPress={() => handlePress(room)}
          >
            <Icon
              name="Cube"
              color={
                selectedRoom?.id === room.id ? colors.white : colors.darkCyan
              }
            />
            <Text
              style={[
                styles.buttonText,
                selectedRoom?.id === room.id && styles.buttonTextActive,
              ]}
            >
              {room.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      { selectedRoom &&
          <View style={styles.separator} />
      }

      { selectedRoom &&
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: `${API_URL}${selectedRoom?.photo}` }}
          style={styles.roomImage}
        />
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="School" width={16} height={16} color={colors.white} />
            <Text style={styles.infoText}>{selectedRoom?.name || ''}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              name="HomeLocation"
              width={16}
              height={16}
              color={colors.white}
            />
            <Text style={styles.infoText}>{selectedRoom?.floor || '?'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="List" width={16} height={16} color={colors.white} />
            <Text style={styles.infoText}>
              {selectedRoom?.capacity || 0} places
            </Text>
          </View>
        </View>
      </View>
      }
    </View>
  );
};
