import { View, StyleSheet, Button } from 'react-native';
import { User } from '@react-native-firebase/auth';

import DatepickerComponent from './Datepicker';
import HoursDropdownComponent from '../shared/inputs/hoursDropdown';
import EventForm from './EventForm';

import { useState } from 'react';
import calendarService from './_service';

interface Props { user: User };
import { IEventView } from '../../types/api/event';

export default function Calendar({ user }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHours, setSelectedHours] = useState<number>(12);
  const [selectedEvent, setSelectedEvent] = useState<IEventView | null>(null);

  async function searchEvents() {
    const result = await calendarService.getEvents(
      user.uid,
      selectedDate.getDate(),
      selectedDate.getMonth(),
      selectedDate.getFullYear(),
      selectedHours,
    );
    if (!result?.length) return setSelectedEvent(null);
    setSelectedEvent(result[0]);
  };

  return (
    <View style={styles.container}>
      <DatepickerComponent
        onDateChanged={setSelectedDate}
      />
      <HoursDropdownComponent onSelected={setSelectedHours} />
      <Button title="Search events" onPress={searchEvents}/>
      <EventForm user={user} selectedDate={selectedDate} selectedHours={selectedHours} selectedEvent={selectedEvent}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 36,
  }
})
