import { View, TextInput, Text } from 'react-native';
import { styles } from './_styles';
import { useState } from 'react';
import { IGenericCalendarInputProps } from '../../../types/components/inputs';

interface Props extends IGenericCalendarInputProps {
  selectedYear?: number,
};

export default function CalendarYearInput({
  onSelected,
  selectedYear = new Date().getFullYear(),
 }: Props) {
   const [value, setValue] = useState(selectedYear.toString());

  const handleChange = (value: string) => {
    if (!value.length) return setValue(value);
    let valueNumeric = Number(value);
    if (!Number.isInteger(valueNumeric)) return setValue(value);
    setValue(value);
    onSelected(valueNumeric);
  }

  return (
    <View style={styles.container}>
      <Text>Year</Text>
      <TextInput
        style={styles.calendarInput}
        value={value}
        onChangeText={handleChange}
        placeholder="Year"
        keyboardType="number-pad"
        maxLength={4}
      />
    </View>
  )
};
