import { View, StyleSheet } from 'react-native';
import calendarService from './_service';

import CalendarDayDropdownComponent from '../../shared/inputs/calendarDayDropdown';
import CalendarMonthDropdownComponent from '../../shared/inputs/calendarMonthDropdown';
import CalendarYearDropdownComponent from '../../shared/inputs/calendarYearDropdown';

interface Props {
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Datepicker({
  selectedDate, setSelectedDate,
}: Props) {
  function selectYear(year: number) {
    setSelectedDate((previousDate: Date): Date => {
      const month = previousDate.getMonth();
      const day = previousDate.getDate();

      const maxDay = calendarService.maxDaysIn(month, year);
      const safeDay = Math.min(day, maxDay);

      return new Date(year, month, safeDay);
    });
  }

  function selectMonth(month: number) {
    setSelectedDate((previousDate: Date): Date => {
      const year = previousDate.getFullYear();
      const day = previousDate.getDate();

      const maxDay = calendarService.maxDaysIn(month, year);
      const safeDay = Math.min(day, maxDay);

      return new Date(year, month, safeDay);
    });
  }

  function selectDate(date: number) {
    setSelectedDate((previousDate: Date): Date => {
      return new Date(
        previousDate.getFullYear(),
        previousDate.getMonth(),
        date
      );
    });
  }

  return (
    <View style={styles.container}>
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
        <CalendarYearDropdownComponent
          onSelected={selectYear}
          selectedYear={selectedDate.getFullYear()}
        />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
