import { View, StyleSheet, Text, Button } from 'react-native';
import { User } from '@react-native-firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { hasActiveBiometricCredentials, removeBiometricCredentials } from '../auth/_service';
import { useEffect, useState } from 'react';

interface Props { user: User };

export default function Profile({ user }: Props) {
  const [usesBiometrics, setUsesBiometrics] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkUsesBiometrics() {
    const hasCredentials = await hasActiveBiometricCredentials();
    setUsesBiometrics(hasCredentials);
  };

  async function deactivateUseBiometrics() {
    setLoading(true);
    await removeBiometricCredentials();
    setUsesBiometrics(false);
    setLoading(false);
  }

  useEffect(() => {
    checkUsesBiometrics();
  }, []);

  async function logout() {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>Email: {user.email}</Text>
      <Button title="Logout" onPress={logout} disabled={loading} />
      {usesBiometrics && <Button title="Deactivate biometric login" onPress={deactivateUseBiometrics} disabled={loading}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 36,
  }
})
