import { StyleSheet } from 'react-native';

const calendarInputBackgroundColor = '#d7d7d7';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: 52,
  },
  error: {
    paddingLeft: 4,
  },
  calendarInput: {
    backgroundColor: calendarInputBackgroundColor,
    padding: 12,
    height: 56,
    fontSize: 16,
  },
  calendarDropdown: {
    backgroundColor: calendarInputBackgroundColor,
    width: 100,
    height: 56,
  },
});
