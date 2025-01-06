import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { colors } from '@theme';
import { map } from '@assets/Images';
import { styles } from './style';

type RoomInfo = {
  name: string;
  level: string;
  capacity: string;
  image?: any;
};

export type RoomSelectorProps = {
  title: string;
  rooms: {
    label: string;
    info: RoomInfo;
  }[];
};

export const RoomAvailable: FC<RoomSelectorProps> = ({ title, rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(rooms[0].info);

  const handleRoomSelect = (roomInfo: RoomInfo) => {
    setSelectedRoom(roomInfo);
  };

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
              selectedRoom.name === room.info.name && styles.buttonActive,
            ]}
            onPress={() => handleRoomSelect(room.info)}
          >
            <Icon
              name="Cube"
              color={
                selectedRoom.name === room.info.name
                  ? colors.white
                  : colors.darkCyan
              }
            />
            <Text
              style={[
                styles.buttonText,
                selectedRoom.name === room.info.name && styles.buttonTextActive,
              ]}
            >
              {room.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.separator} />

      <View style={styles.contentContainer}>
        <Image source={map} style={styles.roomImage} />

        {/* Room Details */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="School" width={16} height={16} color={colors.white} />
            <Text style={styles.infoText}>{selectedRoom.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon
              name="HomeLocation"
              width={16}
              height={16}
              color={colors.white}
            />
            <Text style={styles.infoText}>Étage {selectedRoom.level}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="List" width={16} height={16} color={colors.white} />
            <Text style={styles.infoText}>{selectedRoom.capacity} places</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
