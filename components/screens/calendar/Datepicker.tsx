import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import calendarService from './_service';
import { useWindowDimensions } from 'react-native';

import CalendarDayDropdownComponent from '../../shared/inputs/calendarDayDropdown';
import CalendarMonthDropdownComponent from '../../shared/inputs/calendarMonthDropdown';
import CalendarYearDropdownComponent from '../../shared/inputs/calendarYearDropdown';

interface Props {
  onDateChanged: (newDate: Date) => void;
}

export default function Datepicker({
  onDateChanged,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { width } = useWindowDimensions();

  useEffect(() => {
    onDateChanged(selectedDate);
  }, [selectedDate]);

  function selectYear(year: number) {
    setSelectedDate(previousDate => {
      const month = previousDate.getMonth();
      const day = previousDate.getDate();

      const maxDay = calendarService.maxDaysIn(month, year);
      const safeDay = Math.min(day, maxDay);

      return new Date(year, month, safeDay);
    });
  }

  function selectMonth(month: number) {
    setSelectedDate(previousDate => {
      const year = previousDate.getFullYear();
      const day = previousDate.getDate();

      const maxDay = calendarService.maxDaysIn(month, year);
      const safeDay = Math.min(day, maxDay);

      return new Date(year, month, safeDay);
    });
  }

  function selectDate(date: number) {
    setSelectedDate(previousDate => {
      return new Date(
        previousDate.getFullYear(),
        previousDate.getMonth(),
        date
      );
    });
  }

  return (
    <View style={width < 500 ? styles.container : styles.containerRow}>
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
      </View>
      <View style={styles.dateSelectWrapper}>
        <CalendarYearDropdownComponent
          onSelected={selectYear}
          selectedYear={selectedDate.getFullYear()}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center'
  },
  dateSelectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
});
