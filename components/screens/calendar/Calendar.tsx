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

  const [showForm, setShowForm] = useState(false);

  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showForm) {
      Animated.timing(slide, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [showForm, slide]);

  function handleSelection(selection: IEventView | INewEventDetails) {
    if ('id' in selection) {
      setSelectedEvent(selection);
    } else {
      setSelectedEvent(null);
      setSelectedHours(selection.hours);
    }

    setShowForm(true);
  }

  function closeForm() {
    Animated.timing(slide, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShowForm(false);
        setSelectedEvent(undefined);
      }
    });
  }

  const translateX = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container} testID="calendar-screen">
      <DatepickerComponent
        onDateChanged={setSelectedDate}
      />

      <View style={styles.content}>
        {!showForm ? (
          <EventsSearchComponent
            key="event-search"
            user={user}
            selectedDate={selectedDate}
            onSelected={handleSelection}
          />
        ) : (
          <Animated.View
            key={selectedEvent?.id ?? 'new-event'}
            style={[
              styles.form,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <EventForm
              key={selectedEvent?.id ?? 'new-event'}
              user={user}
              selectedDate={selectedDate}
              selectedEvent={selectedEvent as IEventView | null}
              selectedHours={
                selectedEvent?.startHours ?? selectedHours!
              }
              onClose={closeForm}
            />
          </Animated.View>
        )}
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
  },

  form: {
    flex: 1,
  },
});
