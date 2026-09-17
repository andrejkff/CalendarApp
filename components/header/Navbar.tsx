import { View, Button, StyleSheet } from 'react-native';

interface Props { onNavSelected: (location: string) => void, onClose: () => void };

import { SCREEN_NAMES } from '../../constants/appNavigation';

export default function Navbar({
  onNavSelected,
  onClose,
}: Props) {
  return (
    <View style={styles.header}>
      <Button
        title="Calendar"
        onPress={() => onNavSelected(SCREEN_NAMES.CALENDAR)}
      />
      <Button
        title="Profile"
        onPress={() => onNavSelected(SCREEN_NAMES.PROFILE)}
      />
      <Button
        title="Close"
        onPress={onClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 999,
    position: 'absolute',
    width: 128,
    padding: 12,
    display: 'flex',
    backgroundColor: 'rgba(215, 215, 215, .8)',
    left: 0,
    top: 64,
    height: '100%',
    justifyContent: 'flex-start',
    gap: 8,
  },
});
