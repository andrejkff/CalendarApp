import { View, TextInput, Text } from 'react-native';
import { styles } from './_styles';
import calendarService from '../../calendar/_service';
import { useState } from 'react';
import { IGenericCalendarInputProps } from '../../../types/components/inputs';

type Mode = 'day' | 'year';
interface Props extends IGenericCalendarInputProps {
  mode: Mode,
};

export default function CalendarNumericInput({
  onSelected,
  selectedYear = new Date().getFullYear(),
  selectedMonth = new Date().getMonth(),
  selectedDay = new Date().getDate(),
  label,
  mode,
 }: Props) {
   const [value, setValue] = useState(mode === 'year' ? selectedYear.toString() : selectedDay.toString());

  function getMaxLength(): number {
    switch (mode) {
      case 'year':
        return 4;
      default:
        return 2;
    };
  }

  const handleChange = (value: string) => {
    if (!value.length) return setValue(value);
    let valueNumeric = Number(value);
    if (!Number.isInteger(valueNumeric)) return setValue(value);
    if (mode === 'year') {
      setValue(value);
      onSelected(valueNumeric);
      return;
    };
    const maxDayValue = calendarService.maxDaysIn(selectedMonth, selectedYear);
    if (valueNumeric <= maxDayValue) valueNumeric = maxDayValue;
    setValue(value);
    onSelected(valueNumeric);
  }

  return (
    <View style={styles.container}>
      {label ? <Text>{label}</Text> : <></>}
      <TextInput
        style={styles.calendarInput}
        value={value}
        onChangeText={handleChange}
        placeholder={label}
        keyboardType="number-pad"
        maxLength={getMaxLength()}
      />
    </View>
  )
};
