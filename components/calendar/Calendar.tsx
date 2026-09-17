import { User } from '@react-native-firebase/auth';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

import CalendarNumericInputComponent from '../shared/inputs/calendarNumeric';
import CalendarMonthDropdownComponent from '../shared/inputs/calendarMonthDropdown';

type Props = { user: User };

export default function Calendar({ user }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  function selectYear(year: number) {
    const date = new Date(selectedDate);
    date.setFullYear(year);
    setSelectedDate(date);
  };

  function selectMonth(month: number) {
    const date = new Date(selectedDate);
    date.setMonth(month);
    setSelectedDate(date);
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateSelectWrapper}>
        <CalendarNumericInputComponent
          mode="day"
          label="Day"
          onSelected={selectYear}
          selectedYear={selectedDate.getFullYear()}
          selectedMonth={selectedDate.getMonth()}
          selectedDay={selectedDate.getDate()}
        />
        <CalendarMonthDropdownComponent
          label="Month"
          onSelected={selectMonth}
          selectedMonth={selectedDate.getMonth()}
        />
        <CalendarNumericInputComponent
          mode="year"
          label="Year"
          onSelected={selectYear}
          selectedYear={selectedDate.getFullYear()}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 36,
  },
  dateSelectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});
