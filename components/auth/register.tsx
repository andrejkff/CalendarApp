import { StyleSheet, View, Button } from 'react-native';
import EmailInput from '../inputs/email';
import PasswordInput from '../inputs/password';
import { auth } from '../../firebase';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';

export default function Register() {
  // const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validityState, setValidityState] = useState<{ password: boolean, email: boolean}>({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formIsValid = (): boolean => Object.values(validityState).every(value => value === true);

  const submitDisabled = (): boolean => loading || !formIsValid();

  const registerUser = async () => {
    if (loading) return;
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log(userCredential)
    })
    .catch(error => {
      setLoading(false);
      setError(error.message);
    });
  };

  return (
    <View style={styles.container}>
      <EmailInput
        onValueChange={setEmail}
        onValidityChange={(newValidity: boolean) => setValidityState({
          ...validityState,
          email: newValidity,
        })}
      />
      <PasswordInput
        onValueChange={setPassword}
        onValidityChange={(newValidity: boolean) => setValidityState({
          ...validityState,
          password: newValidity,
        })}
      />
      <Button
        title="Create account"
        disabled={submitDisabled()}
        onPress={registerUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 24,
  },
});
