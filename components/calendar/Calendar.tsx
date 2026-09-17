import { User } from '@react-native-firebase/auth';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import calendarService from './_service';

import CalendarDayDropdownComponent from '../shared/inputs/calendarDayDropdown';
import CalendarMonthDropdownComponent from '../shared/inputs/calendarMonthDropdown';
import CalendarYearInputComponent from '../shared/inputs/calendarYear';

type Props = { user: User };

export default function Calendar({ user }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  function selectYear(year: number) {
    const _selectedDate = new Date(selectedDate);
    const day = _selectedDate.getDate();
    const month = _selectedDate.getMonth();

    _selectedDate.setDate(1);
    _selectedDate.setFullYear(year);

    const maxDay = calendarService.maxDaysIn(
      month,
      year
    );

    _selectedDate.setDate(Math.min(day, maxDay));

    setSelectedDate(_selectedDate);
  };

  function selectMonth(month: number) {
    setSelectedDate(previousDate => {
      const year = previousDate.getFullYear();
      const day = previousDate.getDate();

      const maxDay = calendarService.maxDaysIn(month, year);
      const safeDay = Math.min(day, maxDay);

      const newDate = new Date(year, month, safeDay);

      return newDate;
    });
  }
  function selectDate(date: number) {
    const _selectedDate = new Date(selectedDate);
    _selectedDate.setDate(date);
    setSelectedDate(_selectedDate);
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateSelectWrapper}>
        <CalendarDayDropdownComponent
          onSelected={selectDate}
          selectedMonth={selectedDate.getMonth()}
          selectedYear={selectedDate.getFullYear()}
          selectedDate={selectedDate.getDate()}
        />
        <CalendarMonthDropdownComponent
          onSelected={selectMonth}
          selectedMonth={selectedDate.getMonth()}
        />
        <CalendarYearInputComponent
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
