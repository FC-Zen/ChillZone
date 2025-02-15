import React from 'react';
import { Text, TouchableOpacity, RecursiveArray, ViewStyle } from 'react-native';
import dayjs from 'dayjs';
import { CalendarEvent } from '@services';
import { styles } from './style';

export type CalendarCellProps = {
    event: {
        id: number;
        title: string;
        start: Date;
        end: Date;
    };
    touchableOpacityProps: any;
    brutEvents: CalendarEvent[];
};

export const CalendarCell: React.FC<CalendarCellProps> = ({
    event,
    touchableOpacityProps,
    brutEvents,
}) => {

    const findClassroom = (id: number) => {
        const classroom = brutEvents.find((event) => event.id === id);
        return classroom?.location;
    }

    return (
      <TouchableOpacity {...touchableOpacityProps} key={touchableOpacityProps.key}
        style={[
          ...(touchableOpacityProps.style as RecursiveArray<ViewStyle>), 
          styles.container
        ]}
      >
        {dayjs(event.end).diff(event.start, 'hour') <= 1 ? (
        <>
            <Text style={styles.text}>...{'\n'}{findClassroom(event.id)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>{event.title}</Text>
            <Text style={styles.text}>
                {findClassroom(event.id)}
            </Text>
          </>
        )}
      </TouchableOpacity>
    )
  }