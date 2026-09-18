import { View, StyleSheet } from 'react-native';
import { User } from '@react-native-firebase/auth';
import { IEventView } from '../../../types/api/event';
import { INewEventDetails } from './EventsSearch';

import DatepickerComponent from './Datepicker';
import EventForm from './EventForm';
import EventsSearchComponent from './EventsSearch';

import { useState } from 'react';

interface Props { user: User };

export default function Calendar({ user }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<IEventView | null | undefined>(undefined);
  const [selectedHours, setSelectedHours] = useState<number>();

  function handleSelection(selection: IEventView | INewEventDetails) {
    if ((selection as IEventView).id) {
      setSelectedEvent(selection as IEventView);
    } else {
      setSelectedEvent(null);
      setSelectedHours((selection as INewEventDetails).hours)
    };
  }

  return (
    <View style={styles.container} testID="calendar-screen">
      <DatepickerComponent
        onDateChanged={setSelectedDate}
      />
      {
        selectedEvent === undefined ?
        <EventsSearchComponent
          user={user}
          selectedDate={selectedDate}
          onSelected={handleSelection}
        /> :
        <EventForm
          user={user}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          selectedHours={selectedEvent?.startHours || selectedHours!}
          onClose={() => setSelectedEvent(undefined)}
        />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
    padding: 36,
  }
})
