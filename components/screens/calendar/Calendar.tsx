import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { User } from '@react-native-firebase/auth';

import { IEventView } from '../../../types/api/event';
import { INewEventDetails } from './EventsSearch';

import DatepickerComponent from './Datepicker';
import EventForm from './EventForm';
import EventsSearchComponent from './EventsSearch';

interface Props {
  user: User;
}

export default function Calendar({ user }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] =
    useState<IEventView | null | undefined>(undefined);
  const [selectedHours, setSelectedHours] = useState<number>();

  const animation = useRef(new Animated.Value(0)).current;

  const showingForm = selectedEvent !== undefined;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showingForm ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [showingForm, animation]);

  function handleSelection(selection: IEventView | INewEventDetails) {
    if ((selection as IEventView).id) {
      setSelectedEvent(selection as IEventView);
    } else {
      setSelectedEvent(null);
      setSelectedHours((selection as INewEventDetails).hours);
    }
  }

  const searchTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const formTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const searchOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const formOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container} testID="calendar-screen">
      <DatepickerComponent
        onDateChanged={setSelectedDate}
      />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: searchOpacity,
              transform: [{ translateX: searchTranslateX }],
            },
          ]}
          pointerEvents={showingForm ? 'none' : 'auto'}
        >
          {
            !showingForm &&
            <EventsSearchComponent
              user={user}
              selectedDate={selectedDate}
              onSelected={handleSelection}
            />
          }
        </Animated.View>

        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: formOpacity,
              transform: [{ translateX: formTranslateX }],
            },
          ]}
          pointerEvents={showingForm ? 'auto' : 'none'}
        >
          <EventForm
            user={user}
            selectedDate={selectedDate}
            selectedEvent={selectedEvent as IEventView | null}
            selectedHours={
              selectedEvent?.startHours || selectedHours!
            }
            onClose={() => setSelectedEvent(undefined)}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 36,
    padding: 36,
  },

  content: {
    flex: 1,
    position: 'relative',
  },

  animatedContent: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
