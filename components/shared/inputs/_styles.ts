import { StyleSheet } from 'react-native';

const calendarInputBackgroundColor = '#d7d7d7';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: 64,
  },
  textInput: {
    backgroundColor: '#dbdbdb',
  },
  error: {
    paddingLeft: 4,
  },
  calendarInput: {
    backgroundColor: calendarInputBackgroundColor,
    padding: 12,
    height: 56,
    fontSize: 16,
    width: 120,
  },
  calendarDropdown: {
    backgroundColor: calendarInputBackgroundColor,
    width: 120,
    height: 56,
  },
});
