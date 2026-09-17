import { Picker } from '@react-native-picker/picker';
import { IGenericCalendarInputProps } from '../../../types/components/inputs';
import { View, Text } from 'react-native';
import { styles } from './_styles';

interface Props extends IGenericCalendarInputProps {};

const monthsMap = [
  { name: 'January', index: 0 },
  { name: 'February', index: 1 },
  { name: 'March', index: 2 },
  { name: 'April', index: 3 },
  { name: 'May', index: 4 },
  { name: 'June', index: 5 },
  { name: 'July', index: 6 },
  { name: 'August', index: 7 },
  { name: 'September', index: 8 },
  { name: 'October', index: 9 },
  { name: 'November', index: 10 },
  { name: 'December', index: 11 },
]

export default function CalendarMonthDropdown({
  onSelected,
  selectedMonth = new Date().getMonth(),
  label,
}: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text>{label}</Text> : <></>}
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(value) => onSelected(Number(value))}
        mode="dropdown"
        style={styles.calendarDropdown}
      >
        {monthsMap.map(month => (
          <Picker.Item label={month.name} value={month.index} key={month.index}/>
        ))}
      </Picker>
    </View>
  );
};
