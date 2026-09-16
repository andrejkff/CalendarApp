import { StyleSheet, View, Button, Text } from 'react-native';
import EmailInput from '../inputs/email';
import PasswordInput from '../inputs/password';
import { auth } from '../../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function RegisterLogin() {
  const [mode, setMode] = useState<'register' | 'login'>('register');
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

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    const actionFn = mode === 'register' ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
    actionFn(auth, email, password)
    .catch(error => {
      setLoading(false);
      setError(error.message);
    });
  };

  function switchToLoginUi() {
    return (
      <View style={styles.modeToggle}>
        <Text>Already have an account?</Text>
        <Button title="Log in" onPress={() => setMode('login')} />
      </View>
    )
  };

  function switchToRegisterUi() {
    return (
      <View style={styles.modeToggle}>
        <Text>Do not have an account?</Text>
        <Button title="Register" onPress={() => setMode('register')} />
      </View>
    )
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
        title={mode === 'register' ? 'Sign up' : 'Log in'}
        disabled={submitDisabled()}
        onPress={submit}
      />
      {mode === 'register' ? switchToLoginUi() : switchToRegisterUi()}
      {error ? <Text>{error}</Text> : <></>}
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
  modeToggle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }
});
