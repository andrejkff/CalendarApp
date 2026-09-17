import { StyleSheet, View, Button, Text } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { User } from '@react-native-firebase/auth';

type Props = { actionCompleted: () => void, user: User };

export default function BiometricAuthPrompt({ user, actionCompleted }: Props) {
  const setBiometricAuth = async () => {
    await Keychain.setGenericPassword(
      user.uid,
      'biometric-login',
      {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      }
    );
    actionCompleted();
  };
  return (
    <View style={styles.container}>
      <Text>Set up biometric authentication?</Text>
      <View style={styles.buttonsWrapper}>
        <Button title="Yes" onPress={() => setBiometricAuth()}/>
        <Button title="No" onPress={actionCompleted}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 24,
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  }
});
