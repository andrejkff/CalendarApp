import { View, Button, StyleSheet } from 'react-native';
import { User } from '@react-native-firebase/auth';

interface Props { onNavSelected: (location: string) => void, onClose: () => void, user: User | null };

import { SCREEN_NAMES } from '../../../constants/appNavigation';

export default function Navbar({
  onNavSelected,
  onClose,
  user,
}: Props) {
  return (
    <View style={styles.navbar}>
      {
        user !== null &&
        <>
          <Button
            title="Calendar"
            onPress={() => onNavSelected(SCREEN_NAMES.CALENDAR)}
          />
          <Button
            title="Profile"
            onPress={() => onNavSelected(SCREEN_NAMES.PROFILE)}
          />
        </>
      }
      <Button
        title="Close"
        onPress={onClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: 128,
    height: '100%',
    padding: 12,
    backgroundColor: 'rgba(215, 215, 215, .8)',
    justifyContent: 'flex-start',
    gap: 8,
    zIndex: 999,
  },
});
