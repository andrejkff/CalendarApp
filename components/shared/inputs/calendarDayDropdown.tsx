import { Picker } from '@react-native-picker/picker';
import { IGenericCalendarInputProps } from '../../../types/components/inputs';
import { View, Text } from 'react-native';
import { styles } from './_styles';

import calendarService from '../../calendar/_service';

interface Props extends IGenericCalendarInputProps {
  selectedMonth?: number;
  selectedYear?: number;
  selectedDate?: number;
}

export default function CalendarDayDropdown({
  onSelected,
  selectedDate = new Date().getDate(),
  selectedMonth = new Date().getMonth(),
  selectedYear = new Date().getFullYear(),
}: Props) {
  const daysInMonth = () => calendarService.maxDaysIn(
    selectedMonth,
    selectedYear
  );

  return (
    <View style={styles.container}>
      <Text>Day</Text>

      <Picker
        selectedValue={selectedDate}
        onValueChange={value => onSelected(Number(value))}
        mode="dropdown"
        style={styles.calendarDropdown}
      >
        {Array.from(
          { length: daysInMonth() },
          (_, i) => i + 1
        ).map(day => (
          <Picker.Item
            label={day.toString()}
            value={day}
            key={day}
          />
        ))}
      </Picker>
    </View>
  );
}
