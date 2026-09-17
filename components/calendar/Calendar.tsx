import { View, StyleSheet } from 'react-native';
import { User } from '@react-native-firebase/auth';

import DatepickerComponent from './Datepicker';
import HoursDropdownComponent from '../shared/inputs/hoursDropdown';
import EventForm from './EventForm';

import { useState } from 'react';

interface Props { user: User };

export default function Calendar({ user }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHours, setSelectedHours] = useState<number>(12);

  return (
    <View style={styles.container}>
      <DatepickerComponent
        onDateChanged={setSelectedDate}
      />
      <HoursDropdownComponent onSelected={setSelectedHours} />
      <EventForm user={user} selectedDate={selectedDate} selectedHours={selectedHours} />
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
