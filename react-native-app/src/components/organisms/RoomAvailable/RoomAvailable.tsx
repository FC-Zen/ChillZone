import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { colors } from '@theme';
import { map } from '@assets/Images';
import { styles } from './style';

export type Room = {
  id?: number;
  name?: string;
  description?: string;
  capacity?: number;
  status?: boolean;
  position_x?: number;
  position_y?: number;
  floor?: number;
  photo_link?: any;
  tag_label?: string;
};

export type RoomSelectorProps = {
  title: string;
  rooms: Room[];
};

export const RoomAvailable: FC<RoomSelectorProps> = ({ title, rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms]);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  if (!selectedRoom) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text>Aucune salle disponible</Text>
      </View>
    );
  }

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
              selectedRoom?.name === room.name && styles.buttonActive,
            ]}
            onPress={() => handleRoomSelect(room)}
          >
            <Icon
              name="Cube"
              color={
                selectedRoom?.name === room.name
                  ? colors.white
                  : colors.darkCyan
              }
            />
            <Text
              style={[
                styles.buttonText,
                selectedRoom?.name === room.name && styles.buttonTextActive,
              ]}
            >
              {room.name || ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.separator} />

      <View style={styles.contentContainer}>
        <Image source={map} style={styles.roomImage} />
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="School" width={16} height={16} color={colors.white} />
            <Text style={styles.infoText}>{selectedRoom.name || ''}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              name="HomeLocation"
              width={16}
              height={16}
              color={colors.white}
            />
            <Text style={styles.infoText}>
              Étage {selectedRoom.floor || '?'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="List" width={16} height={16} color={colors.white} />
            <Text style={styles.infoText}>
              {selectedRoom.capacity || 0} places
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
