import { Picker } from '@react-native-picker/picker';
import { IGenericCalendarInputProps } from '../../../types/components/inputs';
import { View, Text } from 'react-native';
import { styles } from './_styles';

interface Props extends IGenericCalendarInputProps {
  selectedYear?: number;
}

export default function CalendarYearDropdown({
  onSelected,
  selectedYear = new Date().getFullYear(),
}: Props) {
  return (
    <View style={styles.container}>
      <Text>Year</Text>

      <Picker
        selectedValue={selectedYear}
        onValueChange={value => onSelected(Number(value))}
        mode="dropdown"
        style={styles.calendarDropdown}
        testID="year-picker"
      >
        {Array.from(
          { length: 10 },
          (_, i) => i + 2026
        ).map(year => (
          <Picker.Item
            label={year.toString()}
            value={year}
            key={year}
          />
        ))}
      </Picker>
    </View>
  );
}
