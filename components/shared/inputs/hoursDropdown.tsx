import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import { styles } from './_styles';

interface Props {
  onSelected: (hours: number) => void,
  selectedHours?: number;
};

export default function HoursDropdown({
  onSelected,
  selectedHours = 12,
}: Props) {
  return (
    <View style={styles.container}>
      <Text>Hours</Text>
      <Picker
        selectedValue={selectedHours}
        onValueChange={value => onSelected(Number(value))}
        mode="dropdown"
        style={styles.calendarDropdown}
      >
        {Array.from(
          { length: 24 },
          (_, i) => i
        ).map(hour => (
          <Picker.Item
            label={`${hour.toString()}:00`}
            value={hour}
            key={hour}
          />
        ))}
      </Picker>
    </View>
  );
};
