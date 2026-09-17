import { View, StyleSheet, Text, Button } from 'react-native';
import { User } from '@react-native-firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

interface Props { user: User };

export default function Profile({ user }: Props) {
  async function logout() {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>Email: {user.email}</Text>
      <Button title="Logout" onPress={logout} />
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
